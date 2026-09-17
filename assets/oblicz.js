/* ==========================================================================
   Część IV — układy sieci, pętla zwarcia, normy rezystancji
   Czysty JavaScript, bez budowania. W treści rozdziałów wystawiamy tylko:
       <div class="dg-widget" data-typ="uklady-sieci"></div>
   a cała interakcja powstaje tutaj.

   Plik korzysta z narzędzi i stylów symulatorów części III:
   window.DIAG_NARZEDZIA (assets/diag.js) oraz assets/diag.css.
   Rejestrujemy się w tym samym rejestrze window.DIAG_BUDOWNICZY, więc app.js
   buduje nasze symulatory tym samym, sprawdzonym wywołaniem — łącznie
   z osłoną try/catch, która nie pozwoli awarii zabrać treści rozdziału.
   ========================================================================== */

'use strict';

(function () {

const N = window.DIAG_NARZEDZIA;
if (!N || !window.DIAG_BUDOWNICZY) {
  console.warn('assets/oblicz.js: brak narzędzi z diag.js — symulatory części IV nie wystartują');
  return;
}

const { lz, ucieczka, sterowanie, stanZeSpec, podlacz, pokaz, dane, komunikat, odczyt, sciezka } = N;

/* ====================================================== wspólne dane liczbowe */

/** Rezystywność w Ω·mm²/m przy 20 °C: miedź 1/56, aluminium 1/35. */
const RHO20 = { cu: 1 / 56, al: 1 / 35 };
const ALFA = 0.004;                     // temperaturowy współczynnik rezystancji [1/K]
const X_JEDN = 0.00008;                 // reaktancja jednostkowa kabla nn: 0,08 Ω/km = 0,08 mΩ/m
const U0 = 230;                         // napięcie fazowe [V]
const UN = 400;                         // napięcie międzyfazowe [V]
const SQRT3 = Math.sqrt(3);

/** Rezystywność przy temperaturze pracy żyły. */
function rho(material, temp) {
  return RHO20[material] * (1 + ALFA * (temp - 20));
}

/**
 * Prąd wyłączający I_a bezpieczników gG — wartości orientacyjne odczytane
 * z pasma charakterystyk czasowo-prądowych (PN-EN 60269). Zawsze sprawdź
 * krzywą producenta: rozrzut pasma to realnie ± 10–20 %.
 */
const GG = [
  { In: 6,   t04: 47,   t5: 27 },
  { In: 10,  t04: 82,   t5: 47 },
  { In: 16,  t04: 107,  t5: 65 },
  { In: 20,  t04: 145,  t5: 85 },
  { In: 25,  t04: 180,  t5: 110 },
  { In: 32,  t04: 270,  t5: 150 },
  { In: 40,  t04: 310,  t5: 190 },
  { In: 50,  t04: 460,  t5: 250 },
  { In: 63,  t04: 550,  t5: 320 },
  { In: 80,  t04: 840,  t5: 425 },
  { In: 100, t04: 1020, t5: 580 },
  { In: 125, t04: 1450, t5: 715 },
  { In: 160, t04: 1740, t5: 950 },
  { In: 200, t04: 2200, t5: 1250 },
  { In: 250, t04: 2900, t5: 1650 },
  { In: 315, t04: 3900, t5: 2200 },
  { In: 400, t04: 5100, t5: 2840 }
];

/** Najbliższy w górę znamionowy prąd wkładki gG (nie ma bezpiecznika 18 A). */
function wkladkaGG(In) {
  return GG.find(w => w.In >= In) || GG[GG.length - 1];
}

const KROTNOSC = { B: 5, C: 10, D: 20 };

/** Transformatory rozdzielcze SN/nn — u_k oraz udział rezystancji w impedancji. */
const TRAFO = {
  63:   { uk: 4.0, kR: 0.42 },
  100:  { uk: 4.0, kR: 0.38 },
  160:  { uk: 4.0, kR: 0.35 },
  250:  { uk: 4.0, kR: 0.32 },
  400:  { uk: 4.5, kR: 0.28 },
  630:  { uk: 4.5, kR: 0.24 },
  1000: { uk: 6.0, kR: 0.18 }
};

const PRZEKROJE = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];

/** Impedancja transformatora sprowadzona na stronę nn: Z = u_k/100 · U²/S. */
function impedancjaTrafo(kVA) {
  const t = TRAFO[kVA] || TRAFO[250];
  const Z = (t.uk / 100) * (UN * UN) / (kVA * 1000);
  const R = Z * t.kR;
  return { Z, R, X: Math.sqrt(Math.max(Z * Z - R * R, 0)), uk: t.uk };
}

/* ========================================================================
   1. GŁÓWNE UKŁADY SIECI — GDZIE ZAMYKA SIĘ PĘTLA ZWARCIA     (rozdział 24)
   ======================================================================== */

/* Geometria schematu — jedna siatka dla wszystkich układów, żeby przy
   przełączaniu układu rysunek nie „skakał”, a różnice były od razu widoczne. */
const G = {
  xGwiazda: 84, xUzwStart: 90, xUzwKon: 122,  // uzwojenie wtórne: szyna gwiazdy i cewki
  xKon: 724,                                  // prawa krawędź obudowy odbiornika
  yL: [52, 70, 88],
  yN: 124, yPE: 158,
  yGrunt: 316, yPodGrunt: 342,
  xRozdz: 392,                                // punkt rozdzielenia PEN w TN-C-S
  xOdbL: 600, yOdbG: 196, yOdbD: 272,         // obudowa metalowa
  xWewL: 616, yWewG: 210, xWewP: 708, yWewD: 256,
  xZasil: 690,                                // pion zasilania fazowego
  xN: 570, yNwe: 232,                         // zejście przewodu N do odbiornika
  xPE: 540, yPEwe: 250,                       // zejście PE do obudowy
  xRA: 672,                                   // uziom lokalny odbiorcy
  yZwarcie: 233,                              // wysokość miejsca zwarcia
  xZwarcieKon: 719,                           // dokąd sięga zygzak zwarcia
  wciecie: 5                                  // odsunięcie pętli od krawędzi obudowy
};

/** Cewka uzwojenia: trzy garby od xUzwStart do xUzwKon na wysokości y. */
function symbolCewki(y) {
  const k = (G.xUzwKon - G.xUzwStart) / 3;
  let d = `M${G.xUzwStart} ${y}`;
  for (let i = 0; i < 3; i++) d += ` q ${k / 2} -9 ${k} 0`;
  return `<path class="dg-przewod zywy" d="${d}"/>`;
}

const UKLADY = {
  'TN-C': {
    nazwa: 'TN-C', pelna: 'TN-C — funkcje N i PE w jednym przewodzie PEN',
    etykietaN: 'PEN', pePrzewod: false, pen: true, zrodloUziemione: true, lokalnyUziom: false,
    skrot: 'Pętla wraca przewodem PEN — tym samym, którym płynie prąd roboczy.'
  },
  'TN-S': {
    nazwa: 'TN-S', pelna: 'TN-S — N i PE rozdzielone od samego źródła',
    etykietaN: 'N', pePrzewod: true, pen: false, zrodloUziemione: true, lokalnyUziom: false,
    skrot: 'Pętla wraca osobnym przewodem PE, którym normalnie nie płynie żaden prąd.'
  },
  'TN-C-S': {
    nazwa: 'TN-C-S', pelna: 'TN-C-S — PEN rozdzielony na N i PE w rozdzielnicy głównej',
    etykietaN: 'N', pePrzewod: true, pen: true, rozdzial: true,
    zrodloUziemione: true, lokalnyUziom: false,
    skrot: 'Pętla wraca przewodem PE do punktu rozdziału, dalej wspólnym PEN do stacji.'
  },
  'TT': {
    nazwa: 'TT', pelna: 'TT — odbiorca ma własny, niezależny uziom',
    etykietaN: 'N', pePrzewod: false, pen: false, zrodloUziemione: true, lokalnyUziom: true,
    skrot: 'Pętla zamyka się przez grunt: uziom odbiorcy R_A + ziemia + uziom stacji R_B.'
  },
  'IT': {
    nazwa: 'IT', pelna: 'IT — punkt neutralny izolowany albo uziemiony przez impedancję',
    etykietaN: 'N', pePrzewod: false, pen: false, zrodloUziemione: false, lokalnyUziom: true,
    pojemnosci: true, bezN: true,
    skrot: 'Pierwsze zwarcie nie domyka pętli — prąd wraca tylko pojemnościami doziemnymi.'
  }
};

/** Symbol uziomu: trzy malejące poprzeczki pod poziomem gruntu. */
function symbolUziomu(x, y, klasa) {
  return `<path class="${klasa}" d="M${x - 14} ${y} H${x + 14}
    M${x - 9} ${y + 7} H${x + 9} M${x - 4} ${y + 14} H${x + 4}"/>`;
}

/** Symbol rezystora na pionowym odcinku (uziom o rezystancji R). */
function symbolRezystora(x, y) {
  return `<rect class="dg-rezystor" x="${x - 9}" y="${y}" width="18" height="26" rx="2"/>`;
}

/** Zygzak zwarcia między dwoma punktami na tej samej wysokości. */
function symbolZwarcia(x1, x2, y) {
  const k = (x2 - x1) / 6;
  const p = [[x1, y]];
  for (let i = 1; i <= 5; i++) p.push([x1 + i * k, y + (i % 2 ? -7 : 7)]);
  p.push([x2, y]);
  return `<path class="dg-iskra" d="${sciezka(p)}"/>`;
}

/** Przerwa w przewodzie — dwie kreski i krzyżyk. */
function symbolPrzerwy(x, y, poziomo) {
  const d = poziomo
    ? `M${x - 9} ${y - 9} L${x + 9} ${y + 9} M${x + 9} ${y - 9} L${x - 9} ${y + 9}`
    : `M${x - 9} ${y - 9} L${x + 9} ${y + 9} M${x + 9} ${y - 9} L${x - 9} ${y + 9}`;
  return `<circle class="dg-przerwa-tlo" cx="${x}" cy="${y}" r="13"/><path class="dg-przerwa" d="${d}"/>`;
}

/**
 * Rysuje schemat układu sieci wraz z zaznaczoną pętlą zwarcia.
 * @param {string} klucz  TN-C | TN-S | TN-C-S | TT | IT
 * @param {object} o      { uszkodzenie, opisy:boolean, liczby:{Ik, Zs} lub null }
 * @returns {string}      zawartość elementu <svg>
 */
function rysujUklad(klucz, o) {
  const u = UKLADY[klucz];
  const tryb = o.uszkodzenie || 'zwarcie';
  const opisy = o.opisy !== false;
  const s = [];

  /* --------------------------------------------- uzwojenie wtórne transformatora */
  // szyna gwiazdy: lewe końce trzech cewek zwarte w punkcie neutralnym
  s.push(`<path class="dg-przewod zywy" d="M${G.xGwiazda} ${G.yL[0]} V${G.yN}"/>`);
  G.yL.forEach(y => s.push(symbolCewki(y)));
  s.push(`<circle class="dg-wezel" cx="${G.xGwiazda}" cy="${G.yN}" r="4.5"/>`);
  s.push(`<text class="dg-t-b" x="14" y="${G.yL[1] + 5}">Tr</text>`);
  s.push(`<text class="dg-t-b" x="14" y="${G.yL[1] + 21}">SN/nn</text>`);
  s.push(`<text class="dg-t-m" x="14" y="${G.yN + 5}">punkt N</text>`);

  /* ------------------------------------------------------------------- grunt */
  s.push(`<path class="dg-grunt" d="M14 ${G.yGrunt} H746"/>`);
  for (let x = 20; x < 746; x += 26) {
    s.push(`<path class="dg-grunt-kreska" d="M${x} ${G.yGrunt} l-7 9"/>`);
  }
  s.push(`<text class="dg-t-m" x="16" y="${G.yGrunt + 26}">grunt</text>`);

  /* ------------------------------------------- uziemienie punktu neutralnego */
  if (u.zrodloUziemione) {
    s.push(`<path class="dg-przewod zywy" d="M${G.xGwiazda} ${G.yN} V${G.yGrunt - 62}"/>`);
    s.push(symbolRezystora(G.xGwiazda, G.yGrunt - 62));
    s.push(`<path class="dg-przewod zywy" d="M${G.xGwiazda} ${G.yGrunt - 36} V${G.yGrunt}"/>`);
    s.push(symbolUziomu(G.xGwiazda, G.yGrunt, 'dg-ziemia czynna'));
    s.push(`<text class="dg-t-num roz" x="${G.xGwiazda + 16}" y="${G.yGrunt - 44}">R_B</text>`);
    if (opisy) {
      s.push(`<text class="dg-t-m" x="14" y="${G.yGrunt + 44}">uziemienie roboczo-ochronne stacji</text>`);
    }
  } else {
    // IT: punkt neutralny nieuziemiony (albo przez dużą impedancję) + kontrola izolacji
    s.push(`<path class="dg-przewod-kropki" d="M${G.xGwiazda} ${G.yN} V${G.yGrunt - 62}"/>`);
    s.push(`<rect class="dg-blok" x="${G.xGwiazda - 22}" y="${G.yGrunt - 62}" width="44" height="26" rx="3"/>`);
    s.push(`<text class="dg-t-m sr" x="${G.xGwiazda}" y="${G.yGrunt - 44}">Z / KSI</text>`);
    s.push(`<path class="dg-przewod-kropki" d="M${G.xGwiazda} ${G.yGrunt - 36} V${G.yGrunt}"/>`);
    s.push(symbolUziomu(G.xGwiazda, G.yGrunt, 'dg-ziemia'));
    s.push(`<text class="dg-t-m uwaga" x="14" y="${G.yGrunt + 44}">punkt N nieuziemiony — tylko kontrola izolacji</text>`);
  }

  /* --------------------------------------------------- przewody fazowe L1–L3 */
  const xEt = G.xUzwKon + 8;                    // wspólna kolumna etykiet przewodów
  const konceFaz = [G.xZasil, 520, 500];
  G.yL.forEach((y, i) => {
    s.push(`<path class="dg-przewod zywy" d="M${G.xUzwKon} ${y} H${konceFaz[i]}"/>`);
    s.push(`<text class="dg-t-m" x="${xEt}" y="${y - 6}">L${i + 1}</text>`);
  });
  [520, 500].forEach((x, i) => {
    s.push(`<path class="dg-strzalka" d="M${x} ${G.yL[i + 1]} l-10 -4 v8 z"/>`);
  });
  s.push(`<text class="dg-t-m" x="424" y="${G.yL[2] + 22}">do innych odbiorników</text>`);

  /* ----------------------------------------------------- N / PEN / PE i odbiornik */
  if (!u.bezN) {
    s.push(`<path class="dg-przewod zywy" d="M${G.xGwiazda} ${G.yN} H${G.xN} V${G.yNwe} H${G.xWewL}"/>`);
    // w TN-C-S przewód przed punktem rozdziału to PEN, dopiero za nim N — etykiety osobno
    s.push(u.rozdzial
      ? `<text class="dg-t-m" x="${G.xRozdz + 10}" y="${G.yN - 6}">N</text>`
      : `<text class="dg-t-m" x="${xEt}" y="${G.yN - 6}">${u.etykietaN}</text>`);
  } else {
    // IT bez przewodu neutralnego: odbiornik zasilany międzyfazowo
    s.push(`<path class="dg-przewod zywy" d="M${G.xUzwKon} ${G.yL[1]} H${G.xN} V${G.yNwe} H${G.xWewL}"/>`);
    s.push(`<text class="dg-t-m kon" x="${G.xN - 6}" y="${G.yNwe - 8}">zasilanie L1–L2</text>`);
  }

  // przewód ochronny
  const petlaPE = [];
  if (u.pePrzewod) {
    const xStart = u.rozdzial ? G.xRozdz : G.xGwiazda;
    s.push(`<path class="dg-przewod" d="M${xStart} ${G.yPE} H${G.xPE} V${G.yPEwe} H${G.xOdbL}"/>`);
    s.push(`<text class="dg-t-m" x="${xStart + 8}" y="${G.yPE - 6}">PE</text>`);
    if (u.rozdzial) {
      // punkt rozdziału PEN → N + PE, z uziemieniem
      s.push(`<path class="dg-przewod zywy" d="M${G.xGwiazda} ${G.yN} H${G.xRozdz} M${G.xRozdz} ${G.yN} V${G.yPE}"/>`);
      s.push(`<circle class="dg-wezel" cx="${G.xRozdz}" cy="${G.yN}" r="4.5"/>`);
      s.push(`<path class="dg-przewod" d="M${G.xRozdz} ${G.yPE} V${G.yGrunt}"/>`);
      s.push(symbolUziomu(G.xRozdz, G.yGrunt, 'dg-ziemia czynna'));
      s.push(`<text class="dg-t-m" x="${xEt}" y="${G.yN - 6}">PEN</text>`);
      s.push(`<text class="dg-t-m sr" x="${G.xRozdz}" y="${G.yGrunt + 44}">punkt rozdziału PEN → N + PE</text>`);
    } else {
      s.push(`<path class="dg-przewod" d="M${G.xGwiazda} ${G.yN} V${G.yPE}"/>`);
    }
  } else if (u.pen) {
    // TN-C: obudowa wisi na tym samym PEN, który prowadzi prąd roboczy
    s.push(`<path class="dg-przewod zywy" d="M${G.xPE} ${G.yN} V${G.yPEwe} H${G.xOdbL}"/>`);
    s.push(`<circle class="dg-wezel" cx="${G.xPE}" cy="${G.yN}" r="4.5"/>`);
  }

  /* ------------------------------------------------------- pojemności doziemne (IT) */
  if (u.pojemnosci) {
    [300, 330, 360].forEach((x, i) => {
      const y = G.yL[i];
      s.push(`<path class="dg-przewod-kropki" d="M${x} ${y} V${y + 60}"/>`);
      s.push(`<path class="dg-kondensator" d="M${x - 9} ${y + 60} H${x + 9} M${x - 9} ${y + 68} H${x + 9}"/>`);
      s.push(`<path class="dg-przewod-kropki" d="M${x} ${y + 68} V${G.yGrunt}"/>`);
    });
    s.push(`<text class="dg-t-m uwaga" x="286" y="${G.yGrunt - 26}">C doziemne linii${opisy ? ' — jedyna droga powrotu przy pierwszym zwarciu' : ''}</text>`);
  }

  /* ------------------------------------------------------------------ odbiornik */
  s.push(`<rect class="dg-obudowa" x="${G.xOdbL}" y="${G.yOdbG}"
    width="${G.xKon - G.xOdbL}" height="${G.yOdbD - G.yOdbG}" rx="4"/>`);
  s.push(`<rect class="dg-blok" x="${G.xWewL}" y="${G.yWewG}"
    width="${G.xWewP - G.xWewL}" height="${G.yWewD - G.yWewG}" rx="3"/>`);
  s.push(`<text class="dg-t-m sr" x="${(G.xWewL + G.xWewP) / 2}" y="${G.yWewG + 26}">odbiornik</text>`);
  s.push(`<text class="dg-t-m sr" x="${(G.xWewL + G.xWewP) / 2}" y="${G.yWewG + 40}">klasy I</text>`);
  s.push(`<text class="dg-t-m kon" x="746" y="${G.yOdbG - 10}">obudowa metalowa</text>`);
  s.push(`<path class="dg-przewod zywy" d="M${G.xZasil} ${G.yL[0]} V${G.yWewG}"/>`);

  // przyłączenie obudowy do PE / PEN (kropka) albo brak takiego przyłączenia
  if (u.pePrzewod || u.pen) {
    s.push(`<circle class="dg-wezel" cx="${G.xOdbL}" cy="${G.yPEwe}" r="4.5"/>`);
  }

  // uziom lokalny odbiorcy (TT, IT)
  if (u.lokalnyUziom) {
    if (tryb === 'przerwa-pe') {
      // przewód do uziomu jest przerwany — rezystora nie rysujemy, bo nic nim nie płynie
      s.push(`<path class="dg-przewod" d="M${G.xRA} ${G.yOdbD} V${G.yGrunt}"/>`);
      s.push(`<text class="dg-t-num roz" x="${G.xRA + 16}" y="${G.yGrunt - 6}">R_A</text>`);
    } else {
      // uziom odbiorcy zaczyna się pod obudową, żeby rezystor nie wchodził na jej obrys
      s.push(`<path class="dg-przewod" d="M${G.xRA} ${G.yOdbD} V${G.yGrunt - 40}"/>`);
      s.push(symbolRezystora(G.xRA, G.yGrunt - 40));
      s.push(`<path class="dg-przewod" d="M${G.xRA} ${G.yGrunt - 14} V${G.yGrunt}"/>`);
      s.push(`<text class="dg-t-num roz" x="${G.xRA + 16}" y="${G.yGrunt - 22}">R_A</text>`);
    }
    s.push(symbolUziomu(G.xRA, G.yGrunt, 'dg-ziemia czynna'));
    s.push(`<text class="dg-t-m kon" x="746" y="${G.yGrunt + 44}">własny uziom odbiorcy</text>`);
  }

  /* ------------------------------------------------------- uszkodzenie i pętla */
  const w = G.wciecie;                 // pętla biegnie tuż wewnątrz obudowy,
  const xKonW = G.xKon - w;            // żeby nie zakryć jej obrysu
  const xOdbLW = G.xOdbL + w;
  const yOdbDW = G.yOdbD - w;

  // od punktu neutralnego, przez cewkę uzwojenia i przewód fazowy, do miejsca zwarcia
  const P = [[G.xGwiazda, G.yN], [G.xGwiazda, G.yL[0]], [G.xUzwKon, G.yL[0]],
             [G.xZasil, G.yL[0]], [G.xZasil, G.yZwarcie], [G.xWewP, G.yZwarcie]];

  // zwarcie rysujemy jako iskrę w przerwie pętli — dlatego P kończy się przed nią
  s.push(symbolZwarcia(G.xWewP, G.xZwarcieKon, G.yZwarcie));
  s.push(`<text class="dg-t-m alarm kon" x="746" y="${G.yOdbG - 26}">zwarcie L1 → obudowa</text>`);

  const Q = [[xKonW, G.yZwarcie]];     // droga powrotna od obudowy do źródła
  if (tryb === 'drugie') {
    // drugie zwarcie: prąd wraca drugą fazą, a nie przewodem ochronnym
    s.push(symbolZwarcia(G.xN - 22, G.xN, G.yNwe));
    Q.push([xKonW, yOdbDW], [xOdbLW, yOdbDW], [xOdbLW, G.yNwe], [G.xN, G.yNwe],
           [G.xN, u.bezN ? G.yL[1] : G.yN]);
    if (!u.bezN) Q.push([G.xGwiazda, G.yN]);
    else Q.push([G.xUzwKon, G.yL[1]], [G.xGwiazda, G.yL[1]], [G.xGwiazda, G.yN]);
    if (opisy) {
      s.push(`<text class="dg-t-m alarm" x="${G.xN - 150}" y="${G.yNwe + 24}">zwarcie 2: druga faza do ziemi / obudowy</text>`);
    }
  } else {
    Q.push([xKonW, yOdbDW]);
    if (u.lokalnyUziom) {
      Q.push([G.xRA, yOdbDW], [G.xRA, G.yGrunt]);
    } else {
      Q.push([xOdbLW, yOdbDW], [xOdbLW, G.yPEwe], [G.xPE, G.yPEwe]);
      if (u.pePrzewod) {
        Q.push([G.xPE, G.yPE]);
        if (u.rozdzial) Q.push([G.xRozdz, G.yPE], [G.xRozdz, G.yN], [G.xGwiazda, G.yN]);
        else Q.push([G.xGwiazda, G.yPE], [G.xGwiazda, G.yN]);
      } else {
        Q.push([G.xPE, G.yN], [G.xGwiazda, G.yN]);
      }
    }
  }

  const przerwa = tryb === 'przerwa-pe';
  const przezGrunt = u.lokalnyUziom && tryb !== 'drugie';
  const pojemnosciowa = u.pojemnosci && tryb === 'zwarcie';

  // klasa pętli: pełny prąd zwarciowy, prąd znikomy albo pętla rozerwana
  const klasaPetli = przerwa ? 'dg-petla przerwana'
    : pojemnosciowa ? 'dg-petla slaba' : 'dg-petla';

  s.push(`<path class="${klasaPetli}" d="${sciezka(P)}"/>`);
  if (!przerwa) {
    s.push(`<path class="${klasaPetli}" d="${sciezka(Q)}"/>`);
  } else {
    // pętla rozerwana: powrót rysujemy do miejsca przerwy i stawiamy krzyżyk
    s.push(`<path class="dg-petla przerwana" d="${sciezka(Q.slice(0, 3))}"/>`);
    const p = u.lokalnyUziom ? [G.xRA, (G.yOdbD + G.yGrunt) / 2] : [G.xPE + 34, G.yPEwe];
    s.push(symbolPrzerwy(p[0], p[1], true));
    s.push(`<text class="dg-t-m alarm ${u.lokalnyUziom ? 'kon' : 'sr'}"
      x="${u.lokalnyUziom ? p[0] - 18 : p[0]}"
      y="${u.lokalnyUziom ? p[1] + 4 : p[1] + 32}">przerwa w ${u.pen && !u.pePrzewod ? 'PEN' : 'PE'}</text>`);
  }

  // domknięcie pętli przez grunt (TT, IT)
  if (przezGrunt && !przerwa) {
    const przez = [[G.xRA, G.yGrunt], [G.xRA, G.yPodGrunt], [G.xGwiazda, G.yPodGrunt], [G.xGwiazda, G.yGrunt]];
    s.push(`<path class="${pojemnosciowa ? 'dg-petla slaba' : 'dg-petla'} grunt" d="${sciezka(przez)}"/>`);
    if (opisy) {
      s.push(`<text class="dg-t-m sr ${pojemnosciowa ? 'uwaga' : 'alarm'}"
        x="${(G.xRA + G.xGwiazda) / 2}" y="${G.yPodGrunt + 16}">powrót przez grunt${pojemnosciowa ? ' — prąd tylko pojemnościowy' : ' — R_A + R_B dominują w pętli'}</text>`);
    }
  }
  if (pojemnosciowa) {
    // przy pierwszym zwarciu w IT prąd zamyka się pojemnościami, nie uziemieniem
    s.push(`<path class="dg-petla slaba" d="M300 ${G.yGrunt} H${G.xGwiazda}"/>`);
  }

  /* ------------------------------------------------------------------ podpis */
  s.push(`<text class="dg-t-b" x="14" y="20">${ucieczka(u.pelna)}</text>`);
  if (o.liczby) {
    s.push(`<text class="dg-t-num roz kon" x="746" y="20">${o.liczby}</text>`);
  }
  return s.join('\n');
}

/* -------------------------------------------------------- symulator interaktywny */

function widgetUkladySieci(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'uklad', etykieta: 'Układ sieci', wartosc: 'TN-S',
      opcje: Object.keys(UKLADY).map(k => ({ w: k, t: k })) },
    { typ: 'wybor', id: 'uszkodzenie', etykieta: 'Uszkodzenie', wartosc: 'zwarcie',
      opcje: [
        { w: 'zwarcie', t: 'zwarcie L–obudowa' },
        { w: 'przerwa-pe', t: 'przerwa w PE / PEN' },
        { w: 'drugie', t: 'drugie zwarcie (inna faza)' }
      ] },
    { typ: 'suwak', id: 'dlugosc', etykieta: 'Długość obwodu <i>L</i>', min: 5, max: 200, krok: 5, wartosc: 40 },
    { typ: 'wybor', id: 'przekroj', etykieta: 'Przekrój żyły (PE = fazowy)', wartosc: '2.5',
      opcje: [1.5, 2.5, 4, 6, 10, 16].map(p => ({ w: String(p), t: `${lz(p, 1)} mm²` })) },
    { typ: 'suwak', id: 'ra', etykieta: 'Uziom odbiorcy <i>R<sub>A</sub></i> (TT, IT)', min: 1, max: 200, krok: 1, wartosc: 30 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Główne układy sieci — którędy wraca prąd zwarciowy</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 760 372" class="dg-svg dg-svg-uklad" role="img" data-svg
           aria-label="Schemat układu sieci z zaznaczoną drogą prądu zwarciowego"></svg>
    </div>
    <div class="dg-legenda">
      <span class="dg-lg dg-lg-petla">droga prądu zwarciowego</span>
      <span class="dg-lg dg-lg-slaba">prąd znikomy (pojemnościowy)</span>
      <span class="dg-lg dg-lg-przerwa">pętla rozerwana</span>
      <span class="dg-lg dg-lg-przewod">przewód pod napięciem</span>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = dane(miejsce, 'svg');

  function odswiez() {
    const u = UKLADY[stan.uklad];
    const S = Number(stan.przekroj);
    const L = stan.dlugosc;
    const RA = stan.ra;
    const RB = 10;                       // typowe uziemienie roboczo-ochronne stacji
    const Zzr = 0.06;                    // transformator + WLZ — patrz kalkulator w rozdziale 25
    const rho70 = rho('cu', 70);
    const Rzyly = rho70 * L / S;         // jedna żyła
    const tryb = stan.uszkodzenie;

    pokaz(miejsce, 'dlugosc', `${L} m`);
    pokaz(miejsce, 'przekroj', `${lz(S, 1)} mm²`);
    pokaz(miejsce, 'ra', `${RA} Ω`);

    /* --- impedancja pętli w zależności od układu i rodzaju uszkodzenia --- */
    let Zs, opisZs, tonPetli;
    if (tryb === 'przerwa-pe') {
      Zs = Infinity;
      opisZs = 'pętla rozerwana — prąd nie ma drogi powrotu';
      tonPetli = 'alarm';
    } else if (tryb === 'drugie') {
      Zs = Zzr + 2 * Rzyly;
      opisZs = 'powrót drugą fazą: Z_źr + 2·R_żyły';
      tonPetli = 'alarm';
    } else if (u.pojemnosci) {
      Zs = U0 / 3;                       // umownie: prąd pojemnościowy rzędu 3 A w małej sieci
      opisZs = 'brak metalicznej drogi powrotu — tylko pojemności doziemne';
      tonPetli = 'uwaga';
    } else if (u.lokalnyUziom) {
      Zs = Zzr + Rzyly + RA + RB;
      opisZs = 'Z_źr + R_fazowa + R_A + R_B (dwa uziomy w szeregu!)';
      tonPetli = 'alarm';
    } else {
      Zs = Zzr + 2 * Rzyly;
      opisZs = 'Z_źr + R_fazowa + R_ochronna (przewody metaliczne)';
      tonPetli = 'ok';
    }

    const Ik = isFinite(Zs) ? U0 / Zs : 0;
    const IaB16 = 5 * 16;                // wyłącznik nadprądowy B16 jako miara odniesienia
    const wylaczy = Ik >= IaB16;

    /* --- rysunek --- */
    svg.innerHTML = rysujUklad(stan.uklad, {
      uszkodzenie: tryb,
      liczby: isFinite(Zs) ? `Z_s ≈ ${lz(Zs, 2)} Ω · I_k ≈ ${lz(Ik, 0)} A` : 'I_k ≈ 0 A'
    });

    /* --- odczyty --- */
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Impedancja pętli Z_s', isFinite(Zs) ? `${lz(Zs, 2)} Ω` : '∞',
        tonPetli === 'ok' ? 'roz' : tonPetli, opisZs),
      odczyt('Prąd zwarciowy I_k', `${lz(Ik, Ik < 10 ? 2 : 0)} A`,
        wylaczy ? 'ok' : 'alarm', 'I_k = U₀ / Z_s przy U₀ = 230 V'),
      odczyt('Krotność I_k / I_n dla B16', `${lz(Ik / 16, Ik / 16 < 10 ? 1 : 0)} ×`,
        wylaczy ? 'ok' : 'alarm', `wyzwalanie magnetyczne B16 wymaga 5·I_n = ${IaB16} A`),
      odczyt('Samoczynne wyłączenie B16', wylaczy ? 'zadziała' : 'nie zadziała',
        wylaczy ? 'ok' : 'alarm', wylaczy ? 'w czasie < 0,1 s' : 'potrzebny inny środek ochrony')
    ].join('');

    /* --- komentarz: to jest właściwa treść nauki --- */
    const kom = dane(miejsce, 'kom');
    const wspolne = `<span class="dg-mikro">Przyjęto: Z_źr = 0,06 Ω (transformator + WLZ),
      przewody Cu w temperaturze pracy 70 °C, S_PE = S_fazowe, R_B = 10 Ω.
      Pełny rachunek z Twoimi danymi — <a href="#/25-kalkulator-petli-zwarcia">kalkulator w rozdziale 25</a>.</span>`;

    if (tryb === 'przerwa-pe') {
      const skutek = (u.pen && !u.pePrzewod)
        ? `W TN-C jest to sytuacja najgroźniejsza z możliwych: przerwany <strong>PEN</strong> to
           jednocześnie utrata przewodu ochronnego <em>i</em> neutralnego. Obudowy wszystkich
           odbiorników za miejscem przerwy zostają podciągnięte przez uzwojenia odbiorników do
           potencjału fazowego — i nic tego nie zgłosi. Dlatego PEN musi mieć zwiększony przekrój
           (≥ 10 mm² Cu) i powtarzalne uziemienia.`
        : u.lokalnyUziom
          ? `Przerwany przewód ochronny do uziomu odsłania obudowę: pojawia się na niej pełne
             napięcie fazowe, a prąd nie płynie, więc <strong>wyłącznik różnicowoprądowy też nie
             zadziała</strong> — nie ma prądu różnicowego, dopóki nikt nie dotknie obudowy.`
          : `Zwarcie jest, napięcie na obudowie jest, a prąd nie płynie — bo pętla jest rozerwana.
             Zabezpieczenie nadprądowe „nie widzi” niczego. Człowiek staje się dopiero pierwszym
             elementem domykającym pętlę.`;
      komunikat(kom, 'alarm',
        `<strong>Pętla nie jest domknięta — ochrona nie działa, a napięcie na obudowie zostaje.</strong>
         ${skutek}<br>To dlatego <strong>ciągłość przewodów ochronnych mierzy się jako pierwszą</strong>
         (PN-HD 60364-6), przed pomiarem pętli: pomiar pętli w takim obwodzie pokaże po prostu
         brak wyniku, ale nie powie, że winna jest przerwa. ${wspolne}`);
    } else if (tryb === 'drugie' && u.pojemnosci) {
      komunikat(kom, 'uwaga',
        `<strong>Drugie zwarcie w układzie IT — i dopiero teraz pętla się domyka.</strong>
         Prąd płynie L1 → obudowa → ziemia/obudowa → druga faza, czyli praktycznie jak zwarcie
         międzyfazowe: Z_s ≈ ${lz(Zs, 2)} Ω, I_k ≈ ${lz(Ik, 0)} A. Zabezpieczenie zadziała,
         ale <strong>zasilanie zostanie przerwane</strong> — a IT stosuje się właśnie tam, gdzie
         przerwa jest niedopuszczalna. Cała wartość układu IT polega więc na tym, żeby
         <strong>usunąć pierwsze zwarcie, zanim pojawi się drugie</strong>. Stąd obowiązkowa
         kontrola stanu izolacji z sygnalizacją i procedura lokalizacji doziemienia. ${wspolne}`);
    } else if (tryb === 'drugie') {
      komunikat(kom, 'alarm',
        `<strong>Zwarcie dwufazowe — prąd wraca drugą fazą.</strong> Pętla nie zawiera już przewodu
         ochronnego ani uziomów, więc impedancja spada do Z_s ≈ ${lz(Zs, 2)} Ω, a prąd rośnie do
         ${lz(Ik, 0)} A. Takie zwarcie wyłączy każde poprawnie dobrane zabezpieczenie nadprądowe —
         problemem ochrony przeciwporażeniowej jest zawsze zwarcie <em>jednofazowe do ziemi</em>,
         bo tylko ono ma w pętli przewód ochronny albo uziomy. ${wspolne}`);
    } else if (u.pojemnosci) {
      komunikat(kom, 'uwaga',
        `<strong>Pierwsze zwarcie w IT nie tworzy pętli zwarciowej.</strong> Punkt neutralny nie jest
         połączony z ziemią, więc prąd nie ma metalicznej drogi powrotu — zamyka się wyłącznie przez
         <strong>pojemności doziemne linii</strong> i wynosi rzędu pojedynczych amperów
         (tu przyjęto ≈ ${lz(Ik, 1)} A). Skutki: zabezpieczenie nadprądowe milczy, zasilanie trwa,
         a napięcia faz zdrowych względem ziemi rosną do wartości międzyfazowej.
         Norma <strong>nie wymaga wyłączenia przy pierwszym zwarciu</strong> — wymaga jego
         <strong>wykrycia i zgłoszenia</strong> (kontrola stanu izolacji). Przełącz uszkodzenie na
         „drugie zwarcie”, żeby zobaczyć, dlaczego pierwszego nie wolno zostawić. ${wspolne}`);
    } else if (u.lokalnyUziom) {
      const RAmax = 50 / 0.03;
      komunikat(kom, wylaczy ? 'uwaga' : 'alarm',
        `<strong>W TT pętla zamyka się przez grunt — i to grunt decyduje o wszystkim.</strong>
         W impedancji pętli ${lz(Zs, 2)} Ω same przewody dają ${lz(Rzyly, 3)} Ω, a dwa uziomy
         (R_A = ${RA} Ω + R_B = ${RB} Ω) — aż ${lz(RA + RB, 0)} Ω. Prąd zwarciowy spada do
         ${lz(Ik, 1)} A, czyli ${lz(Ik / 16, 1)}·I_n wyłącznika B16.
         <strong>Zabezpieczenie nadprądowe nie ma szans</strong> — musiałoby zadziałać przy prądzie
         mniejszym niż roboczy. Dlatego w TT ochronę realizuje
         <strong>wyłącznik różnicowoprądowy</strong>, a kryterium jest zupełnie inne:
         R_A ≤ U_L / I_Δn = 50 / 0,03 = ${lz(RAmax, 0)} Ω dla 30 mA
         (w praktyce ogranicza się do kilkudziesięciu omów ze względu na napięcie na obudowie
         i stabilność uziomu). ${wspolne}`);
    } else {
      const trasa = u.rozdzial
        ? 'PE → punkt rozdziału → PEN → punkt neutralny transformatora'
        : (u.pePrzewod ? 'PE → punkt neutralny transformatora' : 'PEN → punkt neutralny transformatora');
      const dodatek = (u.pen && !u.pePrzewod)
        ? `<br><strong>Cena rozwiązania TN-C:</strong> tym samym przewodem wraca prąd roboczy, więc
           obudowa nigdy nie jest na czystym potencjale ziemi, a wyłącznika różnicowoprądowego
           <strong>nie da się zastosować</strong> — jego przekładnik zsumowałby prąd roboczy
           przepływający przez PEN i wyzwalał bez powodu.`
        : u.rozdzial
          ? `<br>Za punktem rozdziału N i PE <strong>nie wolno ich ponownie połączyć</strong> —
             każde takie połączenie wpuszcza prąd roboczy w przewód ochronny i psuje działanie
             wyłączników różnicowoprądowych.`
          : `<br>Przewodem PE normalnie <strong>nie płynie żaden prąd</strong>, więc obudowa siedzi
             na potencjale ziemi, a wyłącznik różnicowoprądowy pracuje poprawnie.`;
      komunikat(kom, wylaczy ? 'ok' : 'alarm',
        `<strong>Pętla domyka się metalicznie: L1 → zwarcie → obudowa → ${trasa} → uzwojenie.</strong>
         Grunt nie bierze w niej udziału, dlatego Z_s to tylko ${lz(Zs, 2)} Ω i prąd sięga
         ${lz(Ik, 0)} A — ${lz(Ik / 16, 0)} razy prąd znamionowy B16.
         ${wylaczy
           ? 'Wyzwalanie magnetyczne działa w czasie poniżej 0,1 s, czyli z ogromnym zapasem wobec wymaganych 0,4 s.'
           : `Przy tej długości i przekroju prąd jest już za mały — B16 wyzwoli tylko członem
              termicznym, w czasie liczonym w sekundach. Skróć obwód, zwiększ przekrój albo
              zastosuj charakterystykę B o mniejszym I_n.`}
         ${dodatek} ${wspolne}`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* --------------------------------------------------- galeria wszystkich układów */

const GALERIA_OPIS = {
  'TN-C': 'Jeden przewód <b>PEN</b> pełni obie funkcje. Pętla: faza → obudowa → PEN → punkt neutralny. Prąd zwarciowy duży, ale obudowa stale obciążona prądem roboczym; wyłącznika różnicowoprądowego zastosować nie można.',
  'TN-S': 'Osobne <b>N</b> i <b>PE</b> od źródła. Pętla: faza → obudowa → PE → punkt neutralny. PE nie prowadzi prądu roboczego, obudowa na potencjale ziemi, ochrona nadprądowa i różnicowoprądowa działają poprawnie.',
  'TN-C-S': 'Najczęstszy układ w Polsce: <b>PEN</b> do rozdzielnicy głównej, dalej <b>N</b> + <b>PE</b>. Pętla wraca PE do punktu rozdziału, potem wspólnym PEN. Za punktem rozdziału nie wolno ponownie łączyć N z PE.',
  'TT': 'Odbiorca ma <b>własny uziom R<sub>A</sub></b>, niezależny od stacji. Pętla domyka się przez grunt: R<sub>A</sub> + ziemia + R<sub>B</sub>. Impedancja rzędu dziesiątek omów, prąd kilka amperów — ochronę daje wyłącznik różnicowoprądowy, nie bezpiecznik.',
  'IT': 'Punkt neutralny <b>izolowany</b> albo przez dużą impedancję. Pierwsze zwarcie nie domyka pętli — wraca tylko prąd pojemnościowy. Wyłączenie nie jest wymagane, wymagana jest <b>kontrola stanu izolacji</b>; groźne jest drugie zwarcie.'
};

function widgetUkladyGaleria(miejsce) {
  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Rysunki</span>
      <strong>Pięć układów sieci obok siebie — droga prądu zwarciowego zaznaczona na każdym</strong>
    </div>
    <div class="dg-galeria">
      ${Object.keys(UKLADY).map(k => `
        <figure class="dg-galeria-poz">
          <div class="dg-galeria-rysunek">
            <svg viewBox="0 0 760 372" class="dg-mini-svg" role="img"
                 aria-label="Schemat układu ${ucieczka(UKLADY[k].pelna)} z drogą prądu zwarciowego">
              ${rysujUklad(k, { uszkodzenie: 'zwarcie', opisy: false })}
            </svg>
          </div>
          <figcaption><strong>${k}.</strong> ${GALERIA_OPIS[k]}</figcaption>
        </figure>`).join('')}
    </div>
    <div class="dg-legenda">
      <span class="dg-lg dg-lg-petla">droga prądu zwarciowego</span>
      <span class="dg-lg dg-lg-slaba">prąd znikomy (pojemnościowy)</span>
      <span class="dg-lg dg-lg-przewod">przewód pod napięciem</span>
    </div>
    <p class="dg-kom info">Rysunki są uproszczone do jednego odbiornika klasy I i zwarcia
      „faza → obudowa”. Symbol <b>R_B</b> to uziemienie roboczo-ochronne punktu neutralnego stacji,
      <b>R_A</b> — uziom ochronny odbiorcy. Wersję, w której można przełączać rodzaj uszkodzenia
      i liczyć prąd zwarciowy, masz w symulatorze wyżej.</p>`;
}


/* ========================================================================
   2. KALKULATOR IMPEDANCJI PĘTLI ZWARCIA                     (rozdział 25)
   ======================================================================== */

/** Prąd wyłączający I_a zabezpieczenia w zadanym czasie. */
function pradWylaczajacy(typ, In, czas) {
  if (typ === 'gG') {
    const w = wkladkaGG(In);
    return {
      Ia: czas === '5' ? w.t5 : w.t04,
      opis: `wkładka gG ${w.In} A, odczyt z pasma charakterystyki dla ${czas === '5' ? '5 s' : '0,4 s'}`,
      krotnosc: (czas === '5' ? w.t5 : w.t04) / w.In,
      normalizowany: w.In !== In ? w.In : null
    };
  }
  const k = KROTNOSC[typ] || 5;
  return {
    Ia: k * In,
    opis: `wyłącznik ${typ}${In} — górna granica wyzwalania magnetycznego ${k}·I_n`,
    krotnosc: k,
    normalizowany: null
  };
}

function widgetKalkulatorPetli(miejsce) {
  const specZrodlo = [
    { typ: 'wybor', id: 'rodzaj', etykieta: 'Rodzaj zwarcia', wartosc: 'lpe',
      opcje: [
        { w: 'lpe', t: 'L–PE (pętla ochronna)' },
        { w: 'ln', t: 'L–N' },
        { w: '3f', t: 'trójfazowe' }
      ] },
    { typ: 'wybor', id: 'trafo', etykieta: 'Transformator SN/nn', wartosc: '250',
      opcje: [...Object.keys(TRAFO).map(k => ({ w: k, t: `${k} kVA` })), { w: '0', t: 'pomiń' }] },
    { typ: 'pole', id: 'zzew', etykieta: 'Dodatkowa impedancja zasilania', wartosc: 0,
      min: 0, max: 2000, krok: 1, jednostka: 'mΩ' },
    { typ: 'wybor', id: 'material', etykieta: 'Materiał żył', wartosc: 'cu',
      opcje: [{ w: 'cu', t: 'Cu (miedź)' }, { w: 'al', t: 'Al (aluminium)' }] },
    { typ: 'wybor', id: 'temp', etykieta: 'Temperatura żył', wartosc: '70',
      opcje: [{ w: '20', t: '20 °C (zimne)' }, { w: '70', t: '70 °C (praca)' }] },
    { typ: 'wybor', id: 'c', etykieta: 'Współczynnik napięciowy <i>c</i>', wartosc: '0.95',
      opcje: [{ w: '1', t: '1,00' }, { w: '0.95', t: '0,95 (zwarcie min.)' }] }
  ];

  const specTrasa = [
    { typ: 'pole', id: 'l1', etykieta: 'Odcinek 1 (WLZ) — długość', wartosc: 25, min: 0, max: 2000, krok: 1, jednostka: 'm' },
    { typ: 'pole', id: 's1', etykieta: 'Odcinek 1 — przekrój fazowy', wartosc: 16, min: 1, max: 400, krok: 0.5, jednostka: 'mm²' },
    { typ: 'pole', id: 'p1', etykieta: 'Odcinek 1 — przekrój PE / N', wartosc: 16, min: 1, max: 400, krok: 0.5, jednostka: 'mm²' },
    { typ: 'pole', id: 'l2', etykieta: 'Odcinek 2 (obwód) — długość', wartosc: 30, min: 0, max: 2000, krok: 1, jednostka: 'm' },
    { typ: 'pole', id: 's2', etykieta: 'Odcinek 2 — przekrój fazowy', wartosc: 2.5, min: 1, max: 400, krok: 0.5, jednostka: 'mm²' },
    { typ: 'pole', id: 'p2', etykieta: 'Odcinek 2 — przekrój PE / N', wartosc: 2.5, min: 1, max: 400, krok: 0.5, jednostka: 'mm²' }
  ];

  const specZabezp = [
    { typ: 'wybor', id: 'typ', etykieta: 'Zabezpieczenie', wartosc: 'B',
      opcje: [
        { w: 'B', t: 'wyłącznik B' },
        { w: 'C', t: 'wyłącznik C' },
        { w: 'D', t: 'wyłącznik D' },
        { w: 'gG', t: 'bezpiecznik gG' }
      ] },
    { typ: 'pole', id: 'in', etykieta: 'Prąd znamionowy <i>I<sub>n</sub></i>', wartosc: 16, min: 1, max: 630, krok: 1, jednostka: 'A' },
    { typ: 'wybor', id: 'czas', etykieta: 'Wymagany czas wyłączenia', wartosc: '0.4',
      opcje: [{ w: '0.4', t: '0,4 s (obwód końcowy ≤ 32 A)' }, { w: '5', t: '5 s (rozdzielczy)' }] }
  ];

  const spec = [...specZrodlo, ...specTrasa, ...specZabezp];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Kalkulator</span>
      <strong>Impedancja pętli zwarciowej, prąd zwarciowy i sprawdzenie zabezpieczenia</strong>
    </div>
    <div class="dg-sekcja">
      <span class="dg-sekcja-tytul">1. Źródło i warunki</span>
      ${sterowanie(specZrodlo)}
    </div>
    <div class="dg-sekcja">
      <span class="dg-sekcja-tytul">2. Trasa przewodów</span>
      ${sterowanie(specTrasa)}
    </div>
    <div class="dg-sekcja">
      <span class="dg-sekcja-tytul">3. Zabezpieczenie</span>
      ${sterowanie(specZabezp)}
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki">
      <table class="dg-tab" data-tabela>
        <caption class="dg-tab-podpis">Rozbicie impedancji pętli na składniki</caption>
      </table>
    </div>
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 150" class="dg-svg dg-svg-slupek" role="img" data-svg
           aria-label="Porównanie prądu zwarciowego z prądem wyłączającym zabezpieczenia"></svg>
    </div>
    <p class="dg-wzor" data-wzor></p>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);

  function odswiez() {
    const trzyFazowe = stan.rodzaj === '3f';
    const temp = Number(stan.temp);
    const r = rho(stan.material, temp);
    const c = Number(stan.c);

    /* ---------- składniki impedancji ---------- */
    const skladniki = [];

    let Rz = 0, Xz = 0;
    if (Number(stan.trafo) > 0) {
      const t = impedancjaTrafo(Number(stan.trafo));
      Rz += t.R; Xz += t.X;
      skladniki.push({
        nazwa: `Transformator ${stan.trafo} kVA (u_k = ${lz(t.uk, 1)} %)`,
        R: t.R, X: t.X, Z: t.Z
      });
    }
    if (stan.zzew > 0) {
      const Zd = stan.zzew / 1000;
      Rz += Zd;
      skladniki.push({ nazwa: 'Dodatkowa impedancja zasilania', R: Zd, X: 0, Z: Zd });
    }

    // odcinki: w pętli L–PE / L–N liczy się żyła fazowa i powrotna, w zwarciu 3-fazowym tylko fazowa
    const odcinki = [
      { nazwa: 'Odcinek 1 (WLZ)', L: stan.l1, S: stan.s1, P: stan.p1 },
      { nazwa: 'Odcinek 2 (obwód)', L: stan.l2, S: stan.s2, P: stan.p2 }
    ];
    let Rp = 0, Xp = 0, RfazSuma = 0;
    odcinki.forEach(o => {
      if (!(o.L > 0) || !(o.S > 0)) return;
      const Rfaz = r * o.L / o.S;
      const Rpow = trzyFazowe ? 0 : (o.P > 0 ? r * o.L / o.P : 0);
      const X = X_JEDN * o.L * (trzyFazowe ? 1 : 2);
      Rp += Rfaz + Rpow; Xp += X; RfazSuma += Rfaz;
      skladniki.push({
        nazwa: `${o.nazwa}: ${lz(o.L, 0)} m, ${lz(o.S, 1)}${trzyFazowe ? '' : ' / ' + lz(o.P, 1)} mm²`,
        R: Rfaz + Rpow, X, Z: Math.hypot(Rfaz + Rpow, X)
      });
    });

    const R = Rz + Rp;
    const X = Xz + Xp;
    const Zs = Math.hypot(R, X);

    /* ---------- prądy ---------- */
    const Ik = Zs > 0
      ? (trzyFazowe ? c * UN / (SQRT3 * Zs) : c * U0 / Zs)
      : Infinity;

    const z = pradWylaczajacy(stan.typ, stan.in, stan.czas);
    const Ia = z.Ia;
    const Zmax = trzyFazowe ? c * UN / (SQRT3 * Ia) : c * U0 / Ia;
    const Zmax23 = (2 / 3) * (trzyFazowe ? UN / (SQRT3 * Ia) : U0 / Ia);
    const spelnia = Ik >= Ia;
    const zapas = (Ik / Ia - 1) * 100;

    // spadek napięcia przy prądzie znamionowym zabezpieczenia (cos φ = 1, szacunkowo)
    const dU = trzyFazowe
      ? SQRT3 * stan.in * RfazSuma / UN * 100
      : stan.in * Rp / U0 * 100;

    /* ---------- odczyty ---------- */
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Impedancja pętli Z_s', `${lz(Zs, 3)} Ω`, 'roz',
        `R = ${lz(R, 3)} Ω, X = ${lz(X, 3)} Ω`),
      odczyt(trzyFazowe ? 'Prąd zwarciowy I_k3' : 'Prąd zwarciowy I_k',
        Ik > 100000 ? '—' : `${lz(Ik, Ik < 100 ? 1 : 0)} A`,
        spelnia ? 'ok' : 'alarm',
        trzyFazowe ? `c·U_n / (√3·Z_s), c = ${lz(c, 2)}` : `c·U₀ / Z_s, c = ${lz(c, 2)}`),
      odczyt('Wymagany prąd I_a', `${lz(Ia, 0)} A`, 'roz',
        `${lz(z.krotnosc, 1)}·I_n — ${z.opis}`),
      odczyt('Dopuszczalna Z_s', `${lz(Zmax, 3)} Ω`, spelnia ? 'ok' : 'alarm',
        `pomiar „na gorąco”: reguła 2/3 → ≤ ${lz(Zmax23, 3)} Ω`),
      odczyt('Zapas', `${zapas >= 0 ? '+' : ''}${lz(zapas, 0)} %`,
        spelnia ? (zapas > 25 ? 'ok' : 'uwaga') : 'alarm',
        'o ile I_k przewyższa I_a'),
      odczyt('Spadek napięcia przy I_n', `${lz(dU, 1)} %`,
        dU <= 4 ? 'ok' : 'uwaga', 'orientacyjnie, cos φ = 1, tylko rezystancja')
    ].join('');

    /* ---------- tabela składników ---------- */
    const razem = `<tr class="wyrozniony">
      <td class="lb"><strong>Razem pętla</strong></td>
      <td class="wart roz">${lz(R, 3)}</td>
      <td class="wart roz">${lz(X, 3)}</td>
      <td class="wart roz">${lz(Zs, 3)}</td>
      <td class="lb">${lz(Zs > 0 ? 100 * Zs / Zs : 0, 0)} %</td></tr>`;
    dane(miejsce, 'tabela').innerHTML = `
      <caption class="dg-tab-podpis">Rozbicie impedancji pętli na składniki</caption>
      <tr><th>Składnik</th><th>R [Ω]</th><th>X [Ω]</th><th>Z [Ω]</th><th>udział</th></tr>
      ${skladniki.map(s => `<tr>
        <td class="lb">${s.nazwa}</td>
        <td class="wart">${lz(s.R, 3)}</td>
        <td class="wart">${lz(s.X, 3)}</td>
        <td class="wart">${lz(s.Z, 3)}</td>
        <td class="lb">${Zs > 0 ? lz(100 * s.Z / Zs, 0) : '—'} %</td></tr>`).join('')}
      ${razem}`;

    /* ---------- słupki I_k vs I_a ---------- */
    const svg = dane(miejsce, 'svg');
    const maks = Math.max(Ik, Ia) * 1.15 || 1;
    const dl = v => Math.max(2, Math.min(v / maks, 1) * 560);
    svg.innerHTML = `
      <text class="dg-t-b" x="8" y="18">Prąd zwarciowy a prąd wyłączający</text>
      <text class="dg-t-m" x="8" y="54">I_k</text>
      <rect class="dg-slupek ${spelnia ? 'ok' : 'alarm'}" x="40" y="40" width="${dl(Ik).toFixed(1)}" height="22" rx="3"/>
      <text class="dg-t-num ${spelnia ? 'ok' : 'alarm'}" x="${(46 + dl(Ik)).toFixed(1)}" y="56">${lz(Ik, Ik < 100 ? 1 : 0)} A</text>
      <text class="dg-t-m" x="8" y="98">I_a</text>
      <rect class="dg-slupek roz" x="40" y="84" width="${dl(Ia).toFixed(1)}" height="22" rx="3"/>
      <text class="dg-t-num roz" x="${(46 + dl(Ia)).toFixed(1)}" y="100">${lz(Ia, 0)} A</text>
      <path class="dg-os" style="stroke-dasharray:4 4" d="M${(40 + dl(Ia)).toFixed(1)} 34 V128"/>
      <text class="dg-t-m ${spelnia ? 'ok' : 'alarm'}" x="40" y="140">
        ${spelnia ? 'I_k ≥ I_a — warunek samoczynnego wyłączenia spełniony'
                  : 'I_k < I_a — zabezpieczenie nie wyłączy w wymaganym czasie'}
      </text>`;

    /* ---------- wzór ---------- */
    dane(miejsce, 'wzor').innerHTML = trzyFazowe
      ? `<b>I_k3</b> = c·U_n / (√3 · Z_s) = ${lz(c, 2)} · 400 / (1,732 · ${lz(Zs, 3)}) = <b>${lz(Ik, 0)} A</b><br>
         Z_s = Z_trafo + Σ (ρ·L/S + j·x·L) &nbsp;|&nbsp; ρ<sub>${stan.material === 'cu' ? 'Cu' : 'Al'}, ${temp} °C</sub> =
         ${lz(r * 1000, 3)} mΩ·mm²/m, x = 0,08 mΩ/m`
      : `<b>I_k</b> = c·U₀ / Z_s = ${lz(c, 2)} · 230 / ${lz(Zs, 3)} = <b>${lz(Ik, Ik < 100 ? 1 : 0)} A</b><br>
         Z_s = Z_źr + Σ ρ·L·(1/S<sub>faz</sub> + 1/S<sub>${stan.rodzaj === 'ln' ? 'N' : 'PE'}</sub>) + j·Σ 2·x·L
         &nbsp;|&nbsp; ρ<sub>${stan.material === 'cu' ? 'Cu' : 'Al'}, ${temp} °C</sub> =
         ${lz(r * 1000, 3)} mΩ·mm²/m<br>
         Warunek: <b>Z_s ≤ c·U₀ / I_a</b> = ${lz(Zmax, 3)} Ω &nbsp;|&nbsp;
         pomiar zimnej instalacji z regułą 2/3: <b>≤ ${lz(Zmax23, 3)} Ω</b>`;

    /* ---------- werdykt ---------- */
    const kom = dane(miejsce, 'kom');
    const udzialPrzewodow = Zs > 0 ? 100 * Math.hypot(Rp, Xp) / Zs : 0;
    const rady = [];
    if (!spelnia) {
      const potrzebne = trzyFazowe ? c * UN / (SQRT3 * Ia) : c * U0 / Ia;
      const nadmiar = Zs - potrzebne;
      rady.push(`trzeba obniżyć Z_s o co najmniej <strong>${lz(nadmiar, 3)} Ω</strong>`);
      if (stan.typ !== 'B' && stan.typ !== 'gG') rady.push('zmienić charakterystykę na <strong>B</strong> (I_a = 5·I_n zamiast ' + KROTNOSC[stan.typ] + '·I_n)');
      rady.push('zwiększyć przekrój żyły powrotnej PE (to ona zwykle jest wąskim gardłem)');
      rady.push('skrócić obwód albo dołożyć <strong>wyłącznik różnicowoprądowy</strong> jako środek ochrony przy uszkodzeniu');
    }
    const uwagaNorm = z.normalizowany
      ? `<br><strong>Uwaga:</strong> nie ma wkładki gG ${lz(stan.in, 0)} A — przyjęto najbliższą wyższą
         <strong>${z.normalizowany} A</strong>.`
      : '';
    const uwagaTemp = temp === 20
      ? `<br>Liczysz przy 20 °C, czyli dla instalacji zimnej. Pętla w warunkach zwarcia jest
         <em>gorętsza</em> — dlatego do oceny pomiaru stosuje się regułę 2/3 albo przelicza się
         rezystancję na temperaturę pracy.`
      : '';

    if (spelnia) {
      komunikat(kom, zapas > 25 ? 'ok' : 'uwaga',
        `<strong>Warunek Z_s · I_a ≤ c·U₀ spełniony${zapas > 25 ? '' : ', ale zapas jest mały'}.</strong>
         Prąd zwarciowy ${lz(Ik, Ik < 100 ? 1 : 0)} A przewyższa wymagane ${lz(Ia, 0)} A
         o ${lz(zapas, 0)} %. Przewody odpowiadają za ${lz(udzialPrzewodow, 0)} % impedancji pętli —
         ${udzialPrzewodow > 80
           ? 'czyli o wyniku decyduje długość i przekrój, nie źródło.'
           : 'źródło ma tu jeszcze wyraźny udział, więc każda zmiana transformatora zmieni wynik.'}
         ${zapas > 25 ? '' : `<br>Przy zapasie poniżej ~25 % wynik pomiaru w terenie łatwo wyjdzie
           poniżej progu — rozrzut charakterystyki zabezpieczenia i temperatura żył zjadają resztę.`}
         ${uwagaNorm}${uwagaTemp}
         <br><span class="dg-mikro">To nie koniec sprawdzeń: prąd zwarciowy musi też mieścić się
         w wytrzymałości cieplnej przewodu (I²t ≤ k²S²) i w zdolności zwarciowej aparatu.</span>`);
    } else {
      komunikat(kom, 'alarm',
        `<strong>Warunek samoczynnego wyłączenia NIE jest spełniony.</strong>
         Prąd zwarciowy ${lz(Ik, Ik < 100 ? 1 : 0)} A nie osiąga wymaganych ${lz(Ia, 0)} A, więc
         zabezpieczenie zadziała dopiero członem termicznym — w czasie liczonym w sekundach
         albo minutach, a nie w ${stan.czas === '5' ? '5 s' : '0,4 s'}. Przez ten czas na obudowie
         utrzyma się napięcie dotykowe. Możliwości: ${rady.join('; ')}.
         ${uwagaNorm}${uwagaTemp}`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}


/* ========================================================================
   3. REZYSTANCJA ŻYŁY I CIĄGŁOŚĆ PRZEWODU OCHRONNEGO         (rozdział 26)
   ======================================================================== */

function widgetRezystancjaPrzewodu(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'material', etykieta: 'Materiał', wartosc: 'cu',
      opcje: [{ w: 'cu', t: 'Cu' }, { w: 'al', t: 'Al' }] },
    { typ: 'wybor', id: 'przekroj', etykieta: 'Przekrój żyły', wartosc: '2.5',
      opcje: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50].map(p => ({ w: String(p), t: `${lz(p, 1)}` })) },
    { typ: 'pole', id: 'dlugosc', etykieta: 'Długość przewodu', wartosc: 40, min: 1, max: 2000, krok: 1, jednostka: 'm' },
    { typ: 'suwak', id: 'temp', etykieta: 'Temperatura żyły', min: 5, max: 90, krok: 5, wartosc: 20 },
    { typ: 'wybor', id: 'droga', etykieta: 'Co liczymy', wartosc: 'zyla',
      opcje: [{ w: 'zyla', t: 'jedna żyła (ciągłość PE)' }, { w: 'petla', t: 'żyła + powrót (pętla)' }] }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Kalkulator</span>
      <strong>Rezystancja żyły — czy pomiar ciągłości PE ma sens</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki"><table class="dg-tab" data-tabela></table></div>
    <p class="dg-wzor" data-wzor></p>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);

  function odswiez() {
    const S = Number(stan.przekroj);
    const L = stan.dlugosc;
    const r = rho(stan.material, stan.temp);
    const mnoznik = stan.droga === 'petla' ? 2 : 1;
    const R = r * L * mnoznik / S;
    const jedn = r * 1000 * mnoznik / S;           // mΩ/m
    const Lmax1 = S / (r * mnoznik);               // długość, przy której R = 1 Ω

    pokaz(miejsce, 'temp', `${stan.temp} °C`);
    pokaz(miejsce, 'przekroj', `${lz(S, 1)} mm²`);

    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Rezystancja R', `${lz(R, 3)} Ω`, R <= 1 ? 'ok' : 'uwaga',
        stan.droga === 'petla' ? 'żyła + przewód powrotny' : 'jedna żyła, od zacisku do zacisku'),
      odczyt('Rezystancja jednostkowa', `${lz(jedn, 2)} mΩ/m`, 'roz',
        `ρ = ${lz(r * 1000, 3)} mΩ·mm²/m przy ${stan.temp} °C`),
      odczyt('Długość dla R = 1 Ω', `${lz(Lmax1, 0)} m`, 'roz',
        'praktyczne kryterium oceny ciągłości PE'),
      odczyt('Prąd pomiarowy', '≥ 200 mA', 'ok',
        'PN-EN 61557-4: źródło 4–24 V, prąd co najmniej 200 mA')
    ].join('');

    const wiersze = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95].map(s => {
      const r20 = RHO20[stan.material] * 1000 / s;
      const r70 = RHO20[stan.material] * (1 + ALFA * 50) * 1000 / s;
      return `<tr${s === S ? ' class="wyrozniony"' : ''}>
        <td class="wart">${lz(s, 1)}</td>
        <td class="wart">${lz(r20, 2)}</td>
        <td class="wart">${lz(r70, 2)}</td>
        <td class="wart">${lz(1000 / r20, 0)}</td></tr>`;
    }).join('');
    dane(miejsce, 'tabela').innerHTML = `
      <caption class="dg-tab-podpis">Rezystancja jednostkowa żyły
        ${stan.material === 'cu' ? 'miedzianej' : 'aluminiowej'} (jedna żyła)</caption>
      <tr><th>S [mm²]</th><th>mΩ/m przy 20 °C</th><th>mΩ/m przy 70 °C</th><th>długość dla 1 Ω [m]</th></tr>
      ${wiersze}`;

    dane(miejsce, 'wzor').innerHTML =
      `<b>R</b> = ρ · L / S ${mnoznik === 2 ? '· 2 (żyła + powrót)' : ''} =
       ${lz(r, 5)} · ${lz(L, 0)}${mnoznik === 2 ? ' · 2' : ''} / ${lz(S, 1)} = <b>${lz(R, 3)} Ω</b><br>
       ρ(t) = ρ₂₀ · [1 + 0,004 · (t − 20)] &nbsp;|&nbsp;
       ρ₂₀ = ${lz(RHO20[stan.material], 5)} Ω·mm²/m
       (${stan.material === 'cu' ? '1/56 — miedź' : '1/35 — aluminium'})`;

    const kom = dane(miejsce, 'kom');
    if (R > 1) {
      komunikat(kom, 'uwaga',
        `<strong>R = ${lz(R, 2)} Ω — powyżej praktycznego progu 1 Ω.</strong>
         Sama norma PN-HD 60364-6 <em>nie podaje</em> liczbowego kryterium ciągłości: wymaga
         porównania wyniku z wartością obliczoną dla danego przewodu. I dokładnie to tu zrobiłeś —
         dla ${lz(L, 0)} m przewodu ${lz(S, 1)} mm² wynik ${lz(R, 2)} Ω jest <strong>prawidłowy</strong>,
         jeśli obwód rzeczywiście ma taką długość. Próg 1 Ω to reguła kciuka dla krótkich połączeń
         ochronnych i wyrównawczych, a nie granica normatywna.
         <br>Wniosek praktyczny: rezystancję ciągłości ocenia się <strong>względem obliczenia</strong>,
         nie względem magicznej liczby. Wynik dwa razy większy od obliczonego = złe połączenie.`);
    } else {
      komunikat(kom, 'ok',
        `<strong>R = ${lz(R, 3)} Ω</strong> — mieści się w regule kciuka ≤ 1 Ω dla połączeń ochronnych.
         Zwróć uwagę na temperaturę: ta sama żyła przy 70 °C ma rezystancję o
         <strong>${lz(((1 + ALFA * 50) / (1 + ALFA * (stan.temp - 20)) - 1) * 100, 0)} %</strong>
         wyższą niż przy ${stan.temp} °C. Dlatego pomiar pętli wykonany na zimnej instalacji
         przelicza się na warunki pracy (reguła 2/3 albo przeliczenie rezystancji).
         <br>Kryterium dodatkowych połączeń wyrównawczych jest inne i wynika z fizyki, nie z tabeli:
         <strong>R ≤ U_L / I_a</strong> — napięcie dotykowe nie może przekroczyć 50 V, zanim
         zabezpieczenie zadziała.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   4. UZIEMIENIE W UKŁADZIE TT — R_A, I_Δn I NAPIĘCIE DOTYKOWE (rozdział 26)
   ======================================================================== */

function widgetUziemienieTT(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'srodek', etykieta: 'Środek ochrony', wartosc: 'rcd',
      opcje: [
        { w: 'rcd', t: 'wyłącznik różnicowoprądowy' },
        { w: 'nadpradowe', t: 'zabezpieczenie nadprądowe' }
      ] },
    { typ: 'wybor', id: 'idn', etykieta: 'Prąd różnicowy <i>I<sub>Δn</sub></i>', wartosc: '0.03',
      opcje: [
        { w: '0.01', t: '10 mA' }, { w: '0.03', t: '30 mA' }, { w: '0.1', t: '100 mA' },
        { w: '0.3', t: '300 mA' }, { w: '0.5', t: '500 mA' }
      ] },
    { typ: 'wybor', id: 'ul', etykieta: 'Napięcie dopuszczalne <i>U<sub>L</sub></i>', wartosc: '50',
      opcje: [{ w: '50', t: '50 V (normalne)' }, { w: '25', t: '25 V (zwiększone zagrożenie)' }] },
    { typ: 'suwak', id: 'ra', etykieta: 'Uziom odbiorcy <i>R<sub>A</sub></i>', min: 1, max: 500, krok: 1, wartosc: 30 },
    { typ: 'suwak', id: 'rb', etykieta: 'Uziemienie stacji <i>R<sub>B</sub></i>', min: 1, max: 50, krok: 1, wartosc: 10 },
    { typ: 'pole', id: 'in', etykieta: 'Zabezpieczenie nadprądowe B — <i>I<sub>n</sub></i>', wartosc: 16, min: 1, max: 250, krok: 1, jednostka: 'A' }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Układ TT — jaka rezystancja uziemienia jest wymagana i dlaczego</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 190" class="dg-svg dg-svg-slupek" role="img" data-svg
           aria-label="Podział napięcia fazowego między uziom odbiorcy i uziemienie stacji"></svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <p class="dg-wzor" data-wzor></p>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);

  function odswiez() {
    const RA = stan.ra, RB = stan.rb;
    const UL = Number(stan.ul);
    const IDn = Number(stan.idn);
    const Zprzewody = 0.4;                       // przewody fazowe i ochronne — pomijalne wobec uziomów
    const Zs = Zprzewody + RA + RB;
    const Ik = U0 / Zs;
    const UB = Ik * RA;                          // napięcie obudowy względem ziemi odniesienia
    const RAmaxRCD = UL / IDn;
    const IaB = 5 * stan.in;
    const RAmaxNadpr = U0 / IaB - RB - Zprzewody;

    pokaz(miejsce, 'ra', `${RA} Ω`);
    pokaz(miejsce, 'rb', `${RB} Ω`);

    const rcd = stan.srodek === 'rcd';
    const spelnia = rcd ? (RA <= RAmaxRCD && Ik >= IDn) : (Ik >= IaB);

    /* --- rysunek: podział napięcia na dwóch uziomach --- */
    const svg = dane(miejsce, 'svg');
    const szer = 560;
    const wA = szer * RA / (RA + RB);
    svg.innerHTML = `
      <text class="dg-t-b" x="8" y="18">Napięcie fazowe 230 V dzieli się na dwa uziomy w szeregu</text>
      <rect class="dg-slupek ${UB > UL ? 'alarm' : 'ok'}" x="40" y="40" width="${wA.toFixed(1)}" height="26" rx="3"/>
      <rect class="dg-slupek roz" x="${(40 + wA).toFixed(1)}" y="40" width="${(szer - wA).toFixed(1)}" height="26" rx="3"/>
      <text class="dg-t-num ${UB > UL ? 'alarm' : 'ok'} sr" x="${(40 + wA / 2).toFixed(1)}" y="58">${lz(UB, 0)} V</text>
      <text class="dg-t-num roz sr" x="${(40 + wA + (szer - wA) / 2).toFixed(1)}" y="58">${lz(Ik * RB, 0)} V</text>
      <text class="dg-t-m sr" x="${(40 + wA / 2).toFixed(1)}" y="82">na R_A = ${RA} Ω → to jest napięcie na obudowie</text>
      <text class="dg-t-m sr" x="${(40 + wA + (szer - wA) / 2).toFixed(1)}" y="82">na R_B = ${RB} Ω</text>
      <path class="dg-os" style="stroke:var(--alarm);stroke-dasharray:5 4"
            d="M${(40 + szer * UL / U0).toFixed(1)} 32 V96"/>
      <text class="dg-t-m alarm" x="${(44 + szer * UL / U0).toFixed(1)}" y="30">granica U_L = ${UL} V</text>
      <text class="dg-t-m" x="8" y="124">Prąd zwarciowy w pętli przez grunt: <tspan class="dg-t-num roz">${lz(Ik, 1)} A</tspan>
        — dla porównania prąd wyzwalania B${lz(stan.in, 0)}: <tspan class="dg-t-num alarm">${lz(IaB, 0)} A</tspan>,
        prąd różnicowy: <tspan class="dg-t-num ok">${lz(IDn * 1000, 0)} mA</tspan></text>
      <text class="dg-t-m ${spelnia ? 'ok' : 'alarm'}" x="8" y="150">${spelnia
        ? 'Warunek ochrony spełniony — wyłączenie nastąpi w wymaganym czasie 0,2 s.'
        : 'Warunek ochrony NIE spełniony — napięcie na obudowie utrzyma się.'}</text>
      <text class="dg-t-m" x="8" y="174">Przyjęto pomijalną impedancję przewodów (${lz(Zprzewody, 1)} Ω) — w TT decydują uziomy.</text>`;

    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Prąd zwarciowy I_k', `${lz(Ik, 1)} A`, rcd ? 'ok' : (spelnia ? 'ok' : 'alarm'),
        `U₀ / (R_A + R_B) = 230 / ${lz(Zs, 1)} Ω`),
      odczyt('Napięcie na obudowie', `${lz(UB, 0)} V`, UB > UL ? 'alarm' : 'ok',
        `U_B = I_k · R_A, granica U_L = ${UL} V`),
      odczyt('Dopuszczalne R_A (różnicówka)', `${lz(RAmaxRCD, 0)} Ω`, RA <= RAmaxRCD ? 'ok' : 'alarm',
        `R_A ≤ U_L / I_Δn = ${UL} / ${lz(IDn, 2)}`),
      odczyt('Dopuszczalne R_A (nadprądowe)',
        RAmaxNadpr > 0 ? `${lz(RAmaxNadpr, 2)} Ω` : 'nieosiągalne',
        RAmaxNadpr > 0 ? 'uwaga' : 'alarm',
        `dla B${lz(stan.in, 0)}: I_a = ${lz(IaB, 0)} A`)
    ].join('');

    dane(miejsce, 'wzor').innerHTML =
      `<b>Kryterium TT z różnicówką:</b> R_A ≤ U_L / I_Δn = ${UL} / ${lz(IDn, 3)} A =
       <b>${lz(RAmaxRCD, 0)} Ω</b><br>
       <b>Kryterium z zabezpieczeniem nadprądowym:</b> R_A + R_B ≤ U₀ / I_a =
       230 / ${lz(IaB, 0)} = <b>${lz(U0 / IaB, 2)} Ω</b> — i tu leży cały problem układu TT<br>
       <b>Napięcie na obudowie:</b> U_B = U₀ · R_A / (R_A + R_B) = <b>${lz(UB, 0)} V</b>`;

    const kom = dane(miejsce, 'kom');
    if (!rcd) {
      komunikat(kom, spelnia ? 'uwaga' : 'alarm',
        `<strong>Zabezpieczenie nadprądowe w układzie TT prawie nigdy nie wystarcza.</strong>
         Żeby B${lz(stan.in, 0)} wyzwolił magnetycznie, w pętli musi płynąć ${lz(IaB, 0)} A, co przy
         napięciu 230 V wymaga impedancji pętli poniżej <strong>${lz(U0 / IaB, 2)} Ω</strong> —
         a masz sam uziom odbiorcy ${RA} Ω plus uziemienie stacji ${RB} Ω.
         ${RAmaxNadpr > 0
           ? `Teoretycznie musiałbyś zejść z R_A do ${lz(RAmaxNadpr, 2)} Ω.`
           : `Nawet uziom o rezystancji 0 Ω nie wystarczy, bo samo R_B = ${RB} Ω przekracza limit.`}
         Taki uziom jest w praktyce nieosiągalny i nietrwały. Dlatego norma dopuszcza w TT ochronę
         nadprądową tylko wyjątkowo, a standardem jest <strong>wyłącznik różnicowoprądowy</strong> —
         przełącz środek ochrony i porównaj wymagania. Prąd zwarciowy ${lz(Ik, 1)} A to
         ${lz(Ik / stan.in, 1)}·I_n: człon termiczny zadziała po sekundach albo minutach,
         a napięcie na obudowie wynosi w tym czasie ${lz(UB, 0)} V.`);
    } else if (spelnia) {
      komunikat(kom, 'ok',
        `<strong>Warunek spełniony: R_A = ${RA} Ω ≤ ${lz(RAmaxRCD, 0)} Ω.</strong>
         Prąd zwarciowy ${lz(Ik, 1)} A jest ${lz(Ik / IDn, 0)} razy większy od prądu różnicowego
         ${lz(IDn * 1000, 0)} mA, więc różnicówka wyłączy bezzwłocznie — wymagane 0,2 s jest
         spełnione z ogromnym zapasem.
         <br><strong>Zwróć uwagę na skalę liczb:</strong> kryterium normatywne dla 30 mA daje
         aż ${lz(RAmaxRCD, 0)} Ω. Formalnie wolno więc mieć uziom bardzo słaby. W praktyce robi się
         znacznie lepszy (kilkadziesiąt omów i mniej), z trzech powodów: napięcie na obudowie przed
         wyłączeniem wynosi tu ${lz(UB, 0)} V, rezystancja uziomu <strong>rośnie w mrozie i suszy</strong>,
         a uziom obsługuje też ograniczniki przepięć, dla których 1667 Ω jest bezużyteczne.`);
    } else {
      komunikat(kom, 'alarm',
        `<strong>R_A = ${RA} Ω przekracza dopuszczalne ${lz(RAmaxRCD, 0)} Ω.</strong>
         Napięcie na obudowie przy zwarciu wyniesie ${lz(UB, 0)} V, czyli powyżej granicy
         U_L = ${UL} V. Wyjścia: poprawić uziom (dłuższe albo dodatkowe uziomy pionowe, uziom
         fundamentowy, uziom otokowy) albo zastosować różnicówkę o mniejszym prądzie
         znamionowym — przy 30 mA limit to ${lz(50 / 0.03, 0)} Ω, przy 500 mA już tylko
         ${lz(50 / 0.5, 0)} Ω. Zwróć uwagę: w TT to <strong>uziom, nie zabezpieczenie</strong>,
         jest elementem krytycznym ochrony.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ==================================================== rejestracja w rejestrze diag.js */

Object.assign(window.DIAG_BUDOWNICZY, {
  'uklady-sieci': widgetUkladySieci,
  'uklady-galeria': widgetUkladyGaleria,
  'kalkulator-petli': widgetKalkulatorPetli,
  'rezystancja-przewodu': widgetRezystancjaPrzewodu,
  'uziemienie-tt': widgetUziemienieTT
});

})();

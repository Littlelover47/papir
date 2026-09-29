/* ==========================================================================
   Zabezpieczenie łukowe (łukoochronne) — symulator rozdzielnicy dwusekcyjnej.
   Korzysta z pomocników window.DIAG_NARZEDZIA (assets/diag.js) i rejestruje się
   w window.DIAG_BUDOWNICZY, więc app.js buduje go sam po wyrenderowaniu rozdziału:
       <div class="dg-widget" data-typ="luk-rozdzielnia"></div>

   Logika nie jest „zaszyta” tabelą — wynika z topologii:
   miejsce łuku = zbiór węzłów sieci (szyny sekcji, kabel odpływu, strona SN
   transformatora). Zabezpieczenie wyłącza każdy wyłącznik na granicy tego
   zbioru, za którym może stać źródło. Odpływy promieniowe źródłem nie są,
   więc przy łuku na szynach nie dostają komendy — ale tracą napięcie.
   ========================================================================== */

(function () {
'use strict';

const N = window.DIAG_NARZEDZIA;
if (!N) { console.warn('luk.js: brak diag.js — symulator zabezpieczenia łukowego nie wystartuje'); return; }

const { lz, sterowanie, stanZeSpec, podlacz, dane, komunikat, odczyt } = N;

/* ------------------------------------------------------------------ model */

/* Węzły: WN1/WN2 — sieć 110 kV (źródła), T1/T2 — strona SN transformatora
   aż do wyłącznika pola zasilającego, S1/S2 — szyny sekcji, K1..K3 — kable odpływów. */
const ZRODLA = ['WN1', 'WN2'];

const WYLACZNIKI = {
  O1:   { a: 'S1',  b: 'K1', nazwa: 'wyłącznik odpływu 1' },
  O2:   { a: 'S1',  b: 'K2', nazwa: 'wyłącznik odpływu 2' },
  O3:   { a: 'S2',  b: 'K3', nazwa: 'wyłącznik odpływu 3' },
  Z1:   { a: 'T1',  b: 'S1', nazwa: 'wyłącznik pola zasilającego T1' },
  Z2:   { a: 'T2',  b: 'S2', nazwa: 'wyłącznik pola zasilającego T2' },
  SP:   { a: 'S1',  b: 'S2', nazwa: 'wyłącznik sprzęgła' },
  QWN1: { a: 'WN1', b: 'T1', nazwa: 'wyłącznik 110 kV transformatora T1' },
  QWN2: { a: 'WN2', b: 'T2', nazwa: 'wyłącznik 110 kV transformatora T2' }
};
/* Kolejność = priorytet przy wskazaniu wyłącznika, który „niesie” prąd łuku. */
const KOLEJNOSC = ['O1', 'O2', 'O3', 'Z1', 'Z2', 'SP', 'QWN1', 'QWN2'];

const POLA = [
  { id: 'Z1',  nazwa: 'pole zasilające T1', l1: 'Zasilające', l2: 'T1', sekcja: 1, rodzaj: 'zas', wyl: 'Z1',
    p: { S: ['S1'], W: ['T1', 'S1'], K: ['T1'] } },
  { id: 'O1',  nazwa: 'odpływ 1', l1: 'Odpływ', l2: '1', sekcja: 1, rodzaj: 'odp', wyl: 'O1',
    p: { S: ['S1'], W: ['S1'], K: ['K1'] } },
  { id: 'O2',  nazwa: 'odpływ 2', l1: 'Odpływ', l2: '2', sekcja: 1, rodzaj: 'odp', wyl: 'O2',
    p: { S: ['S1'], W: ['S1'], K: ['K2'] } },
  { id: 'PN1', nazwa: 'pole pomiaru napięcia', l1: 'Pomiar', l2: 'napięcia', sekcja: 1, rodzaj: 'pn', wyl: null,
    p: { S: ['S1'], W: ['S1'], K: ['S1'] } },
  { id: 'SP',  nazwa: 'pole sprzęgła', l1: 'Sprzęgło', l2: 'I–II', sekcja: 1, rodzaj: 'sp', wyl: 'SP',
    p: { S: ['S1'], W: ['S1', 'S2'], K: ['S2'] } },
  { id: 'O3',  nazwa: 'odpływ 3', l1: 'Odpływ', l2: '3', sekcja: 2, rodzaj: 'odp', wyl: 'O3',
    p: { S: ['S2'], W: ['S2'], K: ['K3'] } },
  { id: 'TPW', nazwa: 'pole transformatora potrzeb własnych', l1: 'Potrzeby', l2: 'własne', sekcja: 2, rodzaj: 'tpw', wyl: null,
    p: { S: ['S2'], W: ['S2'], K: ['S2'] } },
  { id: 'Z2',  nazwa: 'pole zasilające T2', l1: 'Zasilające', l2: 'T2', sekcja: 2, rodzaj: 'zas', wyl: 'Z2',
    p: { S: ['S2'], W: ['T2', 'S2'], K: ['T2'] } }
];

function nazwaPrzedzialu(pole, p) {
  if (p === 'S') return 'przedział szyn zbiorczych';
  const inne = {
    pn:  { W: 'przedział bezpieczników i odłącznika', K: 'przedział przekładników napięciowych' },
    tpw: { W: 'przedział rozłącznika z bezpiecznikami', K: 'przedział przyłącza kabla do transformatora' },
    sp:  { W: 'przedział wyłącznika sprzęgła', K: 'przedział mostka do sekcji II' },
    zas: { W: 'przedział wyłącznika (wózka)', K: 'przedział kabla od transformatora' },
    odp: { W: 'przedział wyłącznika (wózka)', K: 'przedział przyłączy kablowych' }
  };
  return inne[pole.rodzaj][p];
}

const drugi = (e, w) => (e.a === w ? e.b : e.b === w ? e.a : null);

/** Czy z węzła da się dojść do źródła, nie wchodząc w region (stan wyłączników bez znaczenia). */
function doZrodla(start, region) {
  const widziane = new Set([start]);
  const kolejka = [start];
  while (kolejka.length) {
    const w = kolejka.shift();
    if (ZRODLA.includes(w)) return true;
    for (const id of KOLEJNOSC) {
      const inny = drugi(WYLACZNIKI[id], w);
      if (inny && !region.has(inny) && !widziane.has(inny)) { widziane.add(inny); kolejka.push(inny); }
    }
  }
  return false;
}

/** Wyłączniki na granicy regionu, za którymi może stać źródło. */
function granica(region) {
  return KOLEJNOSC.filter(id => {
    const e = WYLACZNIKI[id];
    const wA = region.has(e.a), wB = region.has(e.b);
    return wA !== wB && doZrodla(wA ? e.b : e.a, region);
  });
}

/** Węzły pod napięciem: od źródeł przez zamknięte wyłączniki, z pominięciem regionu. */
function podNapieciem(zamkniete, zrodla, pomin) {
  const z = new Set(zrodla);
  const kolejka = [...zrodla];
  while (kolejka.length) {
    const w = kolejka.shift();
    for (const id of zamkniete) {
      const inny = drugi(WYLACZNIKI[id], w);
      if (inny && !z.has(inny) && !(pomin && pomin.has(inny))) { z.add(inny); kolejka.push(inny); }
    }
  }
  return z;
}

const T_SYGNAL = { si: 5, swiatlo: 3 };   // od błysku do komendy wyłączenia [ms]
const T_WYL = 50;                         // własny czas wyłącznika SN [ms]
const T_LRW = 100;                        // zwłoka lokalnej rezerwy wyłącznikowej [ms]

function oblicz(stan, wybor) {
  const normalnieOtwarte = stan.uklad === 'zamkniete' ? ['Z2', 'QWN2'] : ['SP'];
  const zamkniete0 = new Set(KOLEJNOSC.filter(id => !normalnieOtwarte.includes(id)));
  const wynik = {
    zamkniete0, zamkniete: zamkniete0, napiecie: podNapieciem(zamkniete0, ZRODLA),
    etap1: [], etap2: [], odmowa: null, lrw110: false, stan: 'spoczynek'
  };
  wynik.napiecie0 = wynik.napiecie;
  if (!wybor) return wynik;

  const pole = POLA.find(p => p.id === wybor.pole);
  const region = new Set(pole.p[wybor.p]);
  const etap1 = granica(region);
  if (wybor.p === 'W' && pole.wyl && !etap1.includes(pole.wyl)) etap1.push(pole.wyl);
  etap1.sort((a, b) => KOLEJNOSC.indexOf(a) - KOLEJNOSC.indexOf(b));

  Object.assign(wynik, { pole, region, planowane: etap1 });

  const luk = stan.zdarzenie === 'luk';
  const zasilany = [...region].some(w => wynik.napiecie0.has(w));
  if (luk && !zasilany) { wynik.stan = 'martwy'; return wynik; }
  if (!luk && stan.kryterium === 'si') { wynik.stan = 'blysk-bez-wyl'; return wynik; }

  wynik.stan = luk ? 'luk' : 'blysk-wyl';
  wynik.etap1 = etap1;
  let zrodla = ZRODLA;

  // odmowa: nie otwiera się ten wyłącznik z etapu 1, przez który faktycznie płynie prąd łuku
  if (luk && stan.odmowa === 'tak') {
    const bezRegionu = podNapieciem(zamkniete0, ZRODLA, region);
    const niesie = etap1.find(id => {
      const e = WYLACZNIKI[id];
      if (!zamkniete0.has(id)) return false;
      return (bezRegionu.has(e.a) && !region.has(e.a)) || (bezRegionu.has(e.b) && !region.has(e.b));
    });
    if (niesie) {
      wynik.odmowa = niesie;
      if (niesie.startsWith('QWN')) {
        wynik.lrw110 = true;
        zrodla = ZRODLA.filter(z => z !== WYLACZNIKI[niesie].a);
      } else {
        const region2 = new Set([...region, WYLACZNIKI[niesie].a, WYLACZNIKI[niesie].b]);
        wynik.etap2 = granica(region2).filter(id => !etap1.includes(id));
      }
    }
  }

  const otwarte = new Set([...etap1.filter(id => id !== wynik.odmowa), ...wynik.etap2]);
  wynik.zamkniete = new Set([...zamkniete0].filter(id => !otwarte.has(id)));
  wynik.napiecie = podNapieciem(wynik.zamkniete, zrodla);

  const tS = T_SYGNAL[stan.kryterium];
  wynik.tSygnal = tS;
  wynik.tLuk = wynik.odmowa ? tS + T_LRW + T_WYL + (wynik.lrw110 ? 10 : 0) : tS + T_WYL;
  return wynik;
}

/* Czas łuku, gdyby wyłączały tylko zwykłe zabezpieczenia nadprądowe. */
function czasBezZL(region) {
  const w = [...region];
  if (w.some(x => x === 'T1' || x === 'T2')) return null;
  if (w.every(x => x.startsWith('K'))) return 500 + T_WYL;
  return 800 + T_WYL;
}

/* ------------------------------------------------------------------ opisy */

function opisStrefy(pole, p) {
  const sek = pole.sekcja === 1 ? 'I' : 'II';
  if (pole.rodzaj === 'sp' && p === 'W') {
    return `<strong>Przedział wyłącznika sprzęgła.</strong> Po jednej stronie wyłącznika są szyny
      sekcji I, po drugiej sekcji II — łuk może być zasilany z obu stron. Komendę dostają oba pola
      zasilające i sam wyłącznik sprzęgła. Najgorszy przypadek: bez napięcia zostaje cała rozdzielnia.`;
  }
  if (pole.rodzaj === 'sp' && p === 'K') {
    return `<strong>Przedział mostka sprzęgła.</strong> To już połączenie z szynami sekcji II, więc dla
      logiki jest to łuk na szynach sekcji II: wyłącza pole zasilające T2 i sprzęgło.`;
  }
  if (p === 'S') {
    return `<strong>Przedział szyn zbiorczych</strong> (${pole.nazwa}). Szyny są wspólne dla całej
      sekcji ${sek}, więc łuk zasila wszystko, co może podać napięcie na tę sekcję:
      <strong>pole zasilające i sprzęgło</strong>. Własny wyłącznik pola nic tu nie da — łuk jest
      przed nim, od strony szyn. Odpływy nie dostają komendy (nie są źródłami), ale tracą napięcie.`;
  }
  if (pole.rodzaj === 'pn' || pole.rodzaj === 'tpw') {
    const aparat = pole.rodzaj === 'pn' ? 'przekładniki napięciowe z bezpiecznikami' : 'rozłącznik z bezpiecznikami';
    return `<strong>Pole bez wyłącznika</strong> (${aparat}). Rozłącznik ani odłącznik nie przerwą prądu
      zwarciowego, a na bezpieczniki zabezpieczenie łukowe nie czeka. Łuk w <em>każdym</em> przedziale
      takiego pola to dla logiki łuk na szynach sekcji ${sek}: wyłącza pole zasilające i sprzęgło.`;
  }
  if (pole.rodzaj === 'odp' && p === 'W') {
    return `<strong>Przedział wyłącznika odpływu.</strong> Tu są górne gniazda wózka, połączone na stałe
      z szynami. Łuk szybko obejmuje stronę szyn, a tej strony własny wyłącznik nie odetnie — dlatego
      przedział wyłącznika traktuje się jak <strong>strefę szyn</strong>: wyłącza pole zasilające
      i sprzęgło, a dodatkowo własny wyłącznik (na wypadek zasilania zwrotnego od strony kabla).`;
  }
  if (pole.rodzaj === 'odp' && p === 'K') {
    return `<strong>Przedział kablowy odpływu — za wyłącznikiem.</strong> Cały prąd łuku płynie przez
      wyłącznik tego pola, więc wystarczy wyłączyć <strong>tylko ten odpływ</strong>. To jedyny
      przypadek, w którym zabezpieczenie łukowe wyłącza jedno pole, a reszta rozdzielni pracuje dalej
      (o ile ten wyłącznik zadziała).`;
  }
  if (pole.rodzaj === 'zas' && p === 'W') {
    return `<strong>Przedział wyłącznika pola zasilającego.</strong> Obejmuje obie strony wyłącznika:
      od szyn i od transformatora. Własny wyłącznik odcina tylko jedną z nich, więc potrzebna jest
      komenda do <strong>wyłącznika 110 kV transformatora</strong> (sygnał międzypolowy) oraz
      wyłączenie sprzęgła.`;
  }
  return `<strong>Przedział kablowy pola zasilającego</strong> — między transformatorem a wyłącznikiem
    pola. Łuk zasila wprost transformator, a wyłącznik pola jest „za” łukiem: jego otwarcie łuku nie
    zgasi. Musi wyłączyć <strong>strona 110 kV transformatora</strong>. Wyłącznik pola też dostaje
    komendę — żeby odciąć ewentualne zasilanie zwrotne od strony szyn.`;
}

const lista = ids => ids.map(id => WYLACZNIKI[id].nazwa).join(', ');

/* ------------------------------------------------------------------ widget */

const X0 = i => 30 + i * 80;        // lewa krawędź celki
const CX = i => X0(i) + 38;         // oś celki
const PRZ = { S: [48, 50], W: [100, 78], K: [180, 70] };   // [y, wysokość] przedziałów
const BLYSKAWICA = 'M-13 -16 L2 -4 L-6 0 L11 16 L-2 4 L6 0 Z';

function wylacznikSvg(id, x, y) {
  return `<g class="lk-wyl" data-wyl="${id}" transform="translate(${x},${y})">
    <rect x="-11" y="-15" width="22" height="30" rx="3"/>
    <line class="lk-styk" x1="0" y1="-15" x2="0" y2="15"/>
  </g>
  <text class="lk-napis" data-wyl-napis="${id}" x="${x + 13}" y="${y + 26}"></text>`;
}

function rysujPrzedzialy(pole, i) {
  const x0 = X0(i);
  return ['S', 'W', 'K'].map(p => `
    <rect class="lk-przedzial" data-pole="${pole.id}" data-p="${p}" x="${x0}" y="${PRZ[p][0]}"
          width="76" height="${PRZ[p][1]}" rx="4" role="button" tabindex="0"
          aria-label="Łuk: ${pole.nazwa}, ${nazwaPrzedzialu(pole, p)}">
      <title>${pole.nazwa} — ${nazwaPrzedzialu(pole, p)}</title>
    </rect>`).join('');
}

function rysujLuki(pole, i) {
  const x0 = X0(i);
  return ['S', 'W', 'K'].map(p => `
    <g class="lk-luk" data-luk="${pole.id}-${p}" transform="translate(${x0 + 14},${PRZ[p][0] + PRZ[p][1] / 2})">
      <circle class="lk-luk-tlo" r="12"/>
      <path transform="scale(0.72)" d="${BLYSKAWICA}"/>
    </g>`).join('');
}

function rysujPole(pole, i) {
  const cx = CX(i), x0 = X0(i);

  const nagl = `
    <text class="dg-t-m sr" x="${cx}" y="28">${pole.l1}</text>
    <text class="dg-t-m sr" x="${cx}" y="40">${pole.l2}</text>`;

  let tory = '';
  const s = `S${pole.sekcja}`;
  if (pole.rodzaj === 'odp') {
    const k = `K${pole.id.slice(1)}`;
    tory = `
      <path class="dg-przewod" data-w="${s}" d="M${cx} 68 V124"/>
      ${wylacznikSvg(pole.wyl, cx, 139)}
      <path class="dg-przewod" data-w="${k}" d="M${cx} 154 V280"/>
      <path class="lk-grot" data-w="${k}" d="M${cx - 6} 280 H${cx + 6} L${cx} 290 Z"/>
      <text class="lk-stan-pola sr" data-stan-pola="${k}" x="${cx}" y="306"></text>`;
  } else if (pole.rodzaj === 'zas') {
    const t = `T${pole.id.slice(1)}`, wn = `WN${pole.id.slice(1)}`, q = `QWN${pole.id.slice(1)}`;
    tory = `
      <path class="dg-przewod" data-w="${s}" d="M${cx} 68 V124"/>
      ${wylacznikSvg(pole.wyl, cx, 139)}
      <path class="dg-przewod" data-w="${t}" d="M${cx} 154 V282"/>
      <circle class="lk-trafo" data-w="${t}" cx="${cx}" cy="294" r="12"/>
      <circle class="lk-trafo" data-w="${t}" cx="${cx}" cy="310" r="12"/>
      <text class="dg-t-b" x="${cx + 17}" y="306">${pole.l2}</text>
      <path class="dg-przewod" data-w="${t}" d="M${cx} 322 V335"/>
      ${wylacznikSvg(q, cx, 350).replace(`y="${350 + 26}"`, `y="${350 + 4}"`)}
      <path class="dg-przewod" data-w="${wn}" d="M${cx} 365 V380 M${cx - 26} 380 H${cx + 26}"/>
      <text class="dg-t-m" x="${cx + 30}" y="384">110 kV</text>`;
  } else if (pole.rodzaj === 'pn') {
    tory = `
      <path class="dg-przewod" data-w="${s}" d="M${cx} 68 V122 M${cx} 144 V202"/>
      <rect class="lk-bezp" data-w="${s}" x="${cx - 5}" y="122" width="10" height="22" rx="2"/>
      <circle class="lk-trafo" data-w="${s}" cx="${cx}" cy="212" r="9"/>
      <circle class="lk-trafo" data-w="${s}" cx="${cx}" cy="225" r="9"/>`;
  } else if (pole.rodzaj === 'tpw') {
    tory = `
      <path class="dg-przewod" data-w="${s}" d="M${cx} 68 V124 M${cx} 148 V282"/>
      <rect class="lk-bezp" data-w="${s}" x="${cx - 5}" y="124" width="10" height="24" rx="2"/>
      <circle class="lk-trafo" data-w="${s}" cx="${cx}" cy="292" r="9"/>
      <circle class="lk-trafo" data-w="${s}" cx="${cx}" cy="305" r="9"/>
      <text class="lk-stan-pola sr" data-stan-pola="TPW" x="${cx}" y="332"></text>`;
  } else if (pole.rodzaj === 'sp') {
    tory = `
      <path class="dg-przewod" data-w="S1" d="M${cx} 68 V124"/>
      ${wylacznikSvg(pole.wyl, cx, 139).replace(`class="lk-napis" data-wyl-napis="SP" x="${cx + 13}"`, `class="lk-napis" data-wyl-napis="SP" text-anchor="end" x="${cx - 13}"`)}
      <path class="dg-przewod" data-w="S2" d="M${cx} 154 V224 H${x0 + 62} V68"/>`;
  }
  return nagl + tory;
}

const PRZYKLADY = [
  { pole: 'O1', p: 'K', t: 'Kabel odpływu 1' },
  { pole: 'O2', p: 'W', t: 'Wyłącznik odpływu 2' },
  { pole: 'O2', p: 'S', t: 'Szyny sekcji I' },
  { pole: 'TPW', p: 'W', t: 'Pole potrzeb własnych' },
  { pole: 'Z1', p: 'K', t: 'Kabel od transformatora T1' },
  { pole: 'SP', p: 'W', t: 'Wyłącznik sprzęgła' }
];

function widgetLukRozdzielnia(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'zdarzenie', etykieta: 'Co zobaczył czujnik', wartosc: 'luk', opcje: [
      { w: 'luk', t: 'łuk (zwarcie)' },
      { w: 'blysk', t: 'sam błysk (flesz, latarka)' }
    ] },
    { typ: 'wybor', id: 'kryterium', etykieta: 'Kryterium zadziałania', wartosc: 'si', opcje: [
      { w: 'si', t: 'światło + prąd' },
      { w: 'swiatlo', t: 'samo światło' }
    ] },
    { typ: 'wybor', id: 'uklad', etykieta: 'Układ pracy rozdzielni', wartosc: 'otwarte', opcje: [
      { w: 'otwarte', t: 'sprzęgło otwarte' },
      { w: 'zamkniete', t: 'sprzęgło zamknięte, T2 odstawiony' }
    ] },
    { typ: 'wybor', id: 'odmowa', etykieta: 'Wyłącznik przerywający prąd łuku', wartosc: 'nie', opcje: [
      { w: 'nie', t: 'sprawny' },
      { w: 'tak', t: 'odmawia (LRW)' }
    ] }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Gdzie łuk — co wyłącza. Kliknij dowolny przedział dowolnej celki</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-przyciski">
      ${PRZYKLADY.map(p => `<button type="button" class="dg-btn" data-przyklad="${p.pole}-${p.p}">${p.t}</button>`).join('')}
      <button type="button" class="dg-btn" data-akcja="reset">Wyczyść</button>
    </div>
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 400" class="dg-svg lk-svg" role="img"
           aria-label="Rozdzielnica SN dwusekcyjna: osiem celek po trzy przedziały, transformatory T1 i T2 z wyłącznikami 110 kV">
        <text class="dg-t-b sr" x="${(X0(0) + X0(4) + 76) / 2}" y="13">SEKCJA I</text>
        <text class="dg-t-b sr" x="${(X0(5) + X0(7) + 76) / 2}" y="13">SEKCJA II</text>
        ${POLA.map(rysujPrzedzialy).join('')}
        <path class="lk-szyna dg-przewod" data-w="S1" d="M${CX(0) - 18} 68 H${CX(4)}"/>
        <path class="lk-szyna dg-przewod" data-w="S2" d="M${X0(4) + 62} 68 H${CX(7) + 18}"/>
        ${POLA.map(rysujPole).join('')}
        ${POLA.map(rysujLuki).join('')}
        <text class="lk-legenda" x="8" y="${PRZ.S[0] + 29}">S</text>
        <text class="lk-legenda" x="8" y="${PRZ.W[0] + 43}">W</text>
        <text class="lk-legenda" x="8" y="${PRZ.K[0] + 39}">K</text>
      </svg>
    </div>
    <p class="lk-podpis">S — przedział szyn zbiorczych · W — przedział wyłącznika (wózka) ·
      K — przedział przyłączy kablowych. Kolor jasny = pod napięciem, szary = bez napięcia.</p>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki" data-tabela></div>
    <div class="dg-odczyty" data-zasilanie></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');
  let wybor = null;

  function ustawWylacznik(id, otwarty, ton, napis) {
    const g = svg.querySelector(`[data-wyl="${id}"]`);
    if (!g) return;
    g.setAttribute('class', `lk-wyl${otwarty ? ' otwarty' : ''}${ton ? ' ' + ton : ''}`);
    g.querySelector('.lk-styk').setAttribute('transform', otwarty ? 'rotate(-34)' : '');
    const t = svg.querySelector(`[data-wyl-napis="${id}"]`);
    t.textContent = napis || '';
    t.setAttribute('class', `lk-napis${ton ? ' ' + ton : ''}`);
  }

  function odswiez() {
    const r = oblicz(stan, wybor);

    /* ---- rysunek ---- */
    svg.querySelectorAll('[data-w]').forEach(e => e.classList.toggle('zywy', r.napiecie.has(e.dataset.w)));
    svg.querySelectorAll('.lk-przedzial').forEach(e => {
      const ten = wybor && e.dataset.pole === wybor.pole && e.dataset.p === wybor.p;
      e.classList.toggle('wybrany', !!ten);
      e.setAttribute('aria-pressed', String(!!ten));
    });
    svg.querySelectorAll('.lk-luk').forEach(e => {
      const ten = wybor && e.dataset.luk === `${wybor.pole}-${wybor.p}`;
      e.setAttribute('class', `lk-luk${ten ? (r.stan === 'luk' && r.odmowa ? ' widoczny trwa' : ' widoczny') : ''}${ten && stan.zdarzenie === 'blysk' ? ' blysk' : ''}`);
    });

    KOLEJNOSC.forEach(id => {
      const bylZamkniety = r.zamkniete0.has(id);
      if (id === r.odmowa) ustawWylacznik(id, false, 'odmowa', 'odm.');
      else if (r.etap1.includes(id) && bylZamkniety) ustawWylacznik(id, true, 'wyl', 'WYŁ');
      else if (r.etap2.includes(id) && bylZamkniety) ustawWylacznik(id, true, 'lrw', 'LRW');
      else if ((r.etap1.includes(id) || r.etap2.includes(id)) && !bylZamkniety) ustawWylacznik(id, true, 'bylo', 'otw.');
      else ustawWylacznik(id, !bylZamkniety, '', '');
    });

    const stanPola = (klucz, wezel) => {
      const t = svg.querySelector(`[data-stan-pola="${klucz}"]`);
      const jest = r.napiecie.has(wezel);
      t.textContent = jest ? '' : 'bez napięcia';
      t.setAttribute('class', `lk-stan-pola sr${jest ? '' : ' alarm'}`);
    };
    ['K1', 'K2', 'K3'].forEach(k => stanPola(k, k));
    stanPola('TPW', 'S2');

    /* ---- odczyty ---- */
    const odczyty = dane(miejsce, 'odczyty');
    const tabela = dane(miejsce, 'tabela');
    const zasilanie = dane(miejsce, 'zasilanie');
    const kom = dane(miejsce, 'kom');

    const pokazZasilanie = () => {
      const poz = [
        ['Szyny sekcji I', 'S1'], ['Szyny sekcji II', 'S2'], ['Odpływ 1', 'K1'],
        ['Odpływ 2', 'K2'], ['Odpływ 3', 'K3'], ['Potrzeby własne', 'S2']
      ];
      zasilanie.innerHTML = poz.map(([n, w]) => {
        const bylo = r.napiecie0.has(w), jest = r.napiecie.has(w);
        const ton = jest ? 'ok' : bylo ? 'alarm' : '';
        return odczyt(n, jest ? 'zasilany' : 'bez napięcia', ton, jest ? '' : bylo ? 'stracił zasilanie' : 'był wyłączony');
      }).join('');
    };

    if (!wybor) {
      odczyty.innerHTML = '';
      tabela.innerHTML = '';
      zasilanie.innerHTML = '';
      komunikat(kom, 'info',
        `<strong>Kliknij przedział celki</strong> albo wybierz przykład powyżej. Najpierw sprawdź dwa
         przedziały tego samego odpływu: <em>kablowy</em> (K) i <em>wyłącznika</em> (W) — różnią się
         o kilkadziesiąt centymetrów, a skutki są zupełnie inne.`);
      return;
    }

    const opis = opisStrefy(r.pole, wybor.p);
    const miejsceTxt = `${r.pole.nazwa} — ${nazwaPrzedzialu(r.pole, wybor.p)}`;

    if (r.stan === 'martwy') {
      odczyty.innerHTML = '';
      tabela.innerHTML = '';
      pokazZasilanie();
      komunikat(kom, 'info',
        `<strong>${miejsceTxt}: w tym układzie pracy ten przedział jest bez napięcia</strong> — łuk nie
         ma się z czego zasilić. Zmień układ pracy albo wybierz inny przedział.`);
      return;
    }

    if (r.stan === 'blysk-bez-wyl') {
      odczyty.innerHTML = odczyt('Światło', 'TAK', 'uwaga', 'czujnik pobudzony') +
        odczyt('Prąd zwarciowy', 'NIE', '', 'kryterium nadprądowe niespełnione') +
        odczyt('Iloczyn światło · prąd', '0', 'ok', 'brak komendy wyłączenia');
      tabela.innerHTML = '';
      pokazZasilanie();
      komunikat(kom, 'ok',
        `<strong>Brak wyłączenia — i o to chodzi.</strong> Czujnik zobaczył światło, ale przez
         rozdzielnicę nie płynie prąd zwarciowy, więc warunek „światło <em>i</em> prąd” nie jest
         spełniony. Flesz, latarka, słońce przez otwarte drzwi celki czy łuk spawalniczy nie wyłączą
         rozdzielni. Gdyby to był prawdziwy łuk, komendę dostałyby: ${lista(r.planowane)}.`);
      return;
    }

    /* ---- wyłączenie ---- */
    const bez = czasBezZL(r.region);
    odczyty.innerHTML = [
      odczyt('Komenda wyłączenia', `≈ ${r.tSygnal} ms`, 'roz',
        stan.kryterium === 'si' ? 'światło + prąd, szybkie wyjście' : 'tylko światło'),
      r.stan === 'luk'
        ? odczyt('Łuk gaśnie po', `≈ ${lz(r.tLuk, 0)} ms`, r.odmowa ? 'uwaga' : 'ok',
            r.odmowa ? `+ ${T_LRW} ms zwłoki LRW` : `+ ${T_WYL} ms czasu wyłącznika`)
        : odczyt('Łuk', 'nie było', 'alarm', 'wyłączenie zbędne'),
      r.stan === 'luk'
        ? odczyt('Bez zabezpieczenia łukowego', bez ? `≈ ${lz(bez, 0)} ms` : '0,1–1 s', '',
            bez ? (bez > 600 ? 'zwykłe nadprądowe 0,8 s' : 'nadprądowe odpływu 0,5 s')
                : 'zależnie od strefy różnicowej transformatora')
        : '',
      r.stan === 'luk' && bez
        ? odczyt('Energia łuku', `≈ ${lz(100 * r.tLuk / bez, 0)} %`, 'ok', 'tej bez zabezpieczenia łukowego')
        : ''
    ].join('');

    const wiersze = [];
    r.etap1.forEach(id => {
      const byl = r.zamkniete0.has(id);
      const st = id === r.odmowa ? '<span class="uwaga">ODMOWA — pozostał zamknięty</span>'
        : byl ? '<span class="alarm">otwarty</span>' : 'był już otwarty';
      wiersze.push(`<tr><td class="wart">${id}</td><td class="lb">${WYLACZNIKI[id].nazwa}</td>
        <td class="lb">1 — zabezpieczenie łukowe, ≈ ${r.tSygnal} ms</td><td class="lb">${st}</td></tr>`);
    });
    r.etap2.forEach(id => {
      const byl = r.zamkniete0.has(id);
      wiersze.push(`<tr class="wyrozniony"><td class="wart">${id}</td><td class="lb">${WYLACZNIKI[id].nazwa}</td>
        <td class="lb">2 — LRW, ≈ ${r.tSygnal + T_LRW} ms</td><td class="lb">${byl ? '<span class="alarm">otwarty</span>' : 'był już otwarty'}</td></tr>`);
    });
    if (r.lrw110) {
      wiersze.push(`<tr class="wyrozniony"><td class="wart">110 kV</td><td class="lb">pola zasilające szyny 110 kV (poza tą rozdzielnią)</td>
        <td class="lb">2 — LRW stacji 110 kV</td><td class="lb"><span class="alarm">wyłączone</span></td></tr>`);
    }
    tabela.innerHTML = `<table class="dg-tab lk-tab">
      <tr><th>Wyłącznik</th><th>Co to jest</th><th>Etap</th><th>Stan</th></tr>${wiersze.join('')}</table>`;

    pokazZasilanie();

    let tekst = `<span class="lk-miejsce">${miejsceTxt}</span> ${opis}`;
    let ton = r.pole.rodzaj === 'odp' && wybor.p === 'K' ? 'ok' : 'uwaga';

    if (r.stan === 'blysk-wyl') {
      ton = 'alarm';
      tekst = `<strong>Zbędne wyłączenie!</strong> W trybie „samo światło” czujnik nie odróżnia łuku
        od błysku — zadziałał tak, jakby w tym przedziale był łuk, i wyłączył: ${lista(r.etap1.filter(id => r.zamkniete0.has(id)))}.
        Dlatego tryb „samo światło” stosuje się tylko tam, gdzie nie ma sensownego kryterium prądowego,
        a przy pracach w otwartych celkach zabezpieczenie przełącza się na „światło + prąd”.`;
    } else if (r.odmowa && r.lrw110) {
      ton = 'alarm';
      tekst += ` <br><strong>Odmowa: ${WYLACZNIKI[r.odmowa].nazwa}.</strong> Rezerwę musi zapewnić
        LRW po stronie 110 kV — wyłączają pola zasilające szyny 110 kV, poza tą rozdzielnią.`;
    } else if (r.odmowa) {
      ton = 'alarm';
      tekst += ` <br><strong>Odmowa: ${WYLACZNIKI[r.odmowa].nazwa} się nie otworzył.</strong>
        Prąd łuku nadal płynie, więc kryterium prądowe trwa. Po zwłoce ok. ${T_LRW} ms lokalna rezerwa
        wyłącznikowa (LRW) wysyła komendę o stopień wyżej: ${r.etap2.length ? lista(r.etap2) : '—'}.
        Łuk trwa ok. ${lz(r.tLuk, 0)} ms zamiast ${lz(r.tSygnal + T_WYL, 0)} ms, a bez napięcia zostaje więcej pól.`;
    } else if (stan.uklad === 'zamkniete' && r.etap1.some(id => !r.zamkniete0.has(id))) {
      tekst += ` <br><em>Układ ze sprzęgłem zamkniętym:</em> część komend trafia do wyłączników, które
        i tak były otwarte — logika jest stała, nie zależy od bieżącego układu pracy. Prąd łuku
        przerywa ten wyłącznik, przez który akurat płynie.`;
    }
    komunikat(kom, ton, tekst);
  }

  function wybierz(poleId, p) {
    wybor = { pole: poleId, p };
    odswiez();
  }

  svg.querySelectorAll('.lk-przedzial').forEach(e => {
    e.addEventListener('click', () => wybierz(e.dataset.pole, e.dataset.p));
    e.addEventListener('keydown', z => {
      if (z.key === 'Enter' || z.key === ' ') { z.preventDefault(); wybierz(e.dataset.pole, e.dataset.p); }
    });
  });
  miejsce.querySelectorAll('[data-przyklad]').forEach(b => b.addEventListener('click', () => {
    const [poleId, p] = b.dataset.przyklad.split('-');
    wybierz(poleId, p);
  }));
  miejsce.querySelector('[data-akcja="reset"]').addEventListener('click', () => { wybor = null; odswiez(); });

  podlacz(miejsce, stan, odswiez);
}

/* ==================================================== rejestracja w rejestrze diag.js */

if (window.DIAG_BUDOWNICZY) {
  Object.assign(window.DIAG_BUDOWNICZY, { 'luk-rozdzielnia': widgetLukRozdzielnia });
}

// do testów bez przeglądarki (node): ten sam model, który rysuje symulator
window.LUK_MODEL = { oblicz, POLA, WYLACZNIKI };

})();

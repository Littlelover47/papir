/* ==========================================================================
   Kierunkowość zabezpieczenia ziemnozwarciowego (67N) — co widzi przekaźnik.
   Rozdział 19a. Korzysta z window.DIAG_NARZEDZIA (assets/diag.js) i rejestruje
   się w window.DIAG_BUDOWNICZY:
       <div class="dg-widget" data-typ="ct-kierunek"></div>

   Model: zwarcie metaliczne, pełne U₀. Wskazy liczone w amperach pierwotnych,
   w układzie odniesienia, w którym oś +Re to −U₀ (tak liczy większość
   przekaźników). Kierunek dodatni prądu: od szyn do linii (P1 od strony szyn).
   Łańcuch pomiarowy: prąd rzeczywisty → ekran → błąd Holmgreena →
   biegunowość przekładnika → nastawa kierunku → błąd kątowy; U₀ → polaryzacja.
   ========================================================================== */

(function () {
'use strict';

const N = window.DIAG_NARZEDZIA;
if (!N) { console.warn('kierunek.js: brak diag.js — symulator 67N nie wystartuje'); return; }

const { lz, sterowanie, stanZeSpec, podlacz, pokaz, dane, komunikat, odczyt } = N;

/* ------------------------------------------------------------------ model */

const STRATY = 0.03;        // składowa czynna upływu pola względem jego prądu pojemnościowego
const STRATY_DLAWIKA = 0.02;// straty własne dławika względem jego prądu
const RESZTA_EKRANU = 0.02; // ile 3I₀ zostaje, gdy prąd ekranu przechodzi przez okno raz
const EPS_HOLMGREN = 0.02;  // niezrównoważenie przekładni (przekładnik fazy L3)
const KAT_OBC = -25;        // prąd obciążenia opóźnia się za napięciem fazowym [°]

const C = (re, im) => ({ re, im });
const dodaj = (a, b) => C(a.re + b.re, a.im + b.im);
const razy = (a, k) => C(a.re * k, a.im * k);
const obroc = (a, stopnie) => {
  const r = stopnie * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
  return C(a.re * c - a.im * s, a.re * s + a.im * c);
};
const modul = a => Math.hypot(a.re, a.im);
const kat = a => Math.atan2(a.im, a.re) * 180 / Math.PI;
const zKata = (m, stopnie) => obroc(C(m, 0), stopnie);

/** Prąd rzeczywisty 3I₀ pola (kierunek szyny → linia), w układzie osi −U₀. */
function pradRzeczywisty(s, uszkodzone) {
  if (!uszkodzone) {
    // pole zdrowe: I = U₀(G + jB) → względem −U₀ znak minus
    return C(-STRATY * s.icw, -s.icw);
  }
  // pole uszkodzone: I = −U₀[Σ(pozostałe) + Y_N] → względem −U₀ znak plus
  let re = STRATY * s.icr, im = s.icr;
  if (s.siec === 'komp') {
    const IL = (s.icw + s.icr) * (1 + s.v / 100);
    re += STRATY_DLAWIKA * IL + s.irw;
    im -= IL;
  } else if (s.siec === 'rez') {
    re += s.ir;
  }
  return C(re, im);
}

/** Łańcuch pomiarowy: co dostaje przekaźnik. */
function zmierz(s, prawdziwy) {
  let i = prawdziwy;
  if (s.zrodlo === 'ferranti' && s.ekran === 'zle') i = razy(i, RESZTA_EKRANU);
  let blad = C(0, 0);
  if (s.zrodlo === 'holmgren') {
    // −U₀ = E_L1 → oś 0°; E_L3 = +120°; prąd obciążenia L3 opóźniony o 25°
    blad = zKata(EPS_HOLMGREN * s.obc, 120 + KAT_OBC);
    i = dodaj(i, blad);
  }
  if (s.ct === 'odwr') i = razy(i, -1);
  if (s.nastawa === 'odwr') i = razy(i, -1);
  i = obroc(i, s.katb);
  return { i, blad };
}

/** Oś odniesienia przekaźnika (−U₀ zmierzone) w układzie rzeczywistym. */
const osOdniesienia = s => (s.u0 === 'odwr' ? C(-1, 0) : C(1, 0));

function decyzja(s, zmierzony) {
  const ref = osOdniesienia(s);
  // rzut na oś kryterium: cos → wzdłuż odniesienia, sin → 90° przed odniesieniem
  const kierunek = s.alg === 'cos' ? ref : obroc(ref, 90);
  const skladowa = zmierzony.re * kierunek.re + zmierzony.im * kierunek.im;
  const phi = ((kat(zmierzony) - kat(ref) + 540) % 360) - 180;
  let wynik = 'brak';
  if (skladowa >= s.prog) wynik = 'przod';
  else if (skladowa <= -s.prog) wynik = 'tyl';
  return { skladowa, phi, wynik, kierunek, ref };
}

function oblicz(s) {
  const przypadki = {};
  ['uszk', 'zdrowe'].forEach(k => {
    const prawdziwy = pradRzeczywisty(s, k === 'uszk');
    const { i, blad } = zmierz(s, prawdziwy);
    const d = decyzja(s, i);
    const oczekiwane = k === 'uszk' ? 'przod' : 'nie-przod';
    const poprawnie = k === 'uszk' ? d.wynik === 'przod' : d.wynik !== 'przod';
    przypadki[k] = { prawdziwy, zmierzony: i, blad, ...d, oczekiwane, poprawnie };
  });
  return przypadki;
}

/* --------------------------------------------------------------- widżet */

const SCENARIUSZE = [
  { t: 'Poprawny montaż', s: {} },
  { t: 'Odwrócony przekładnik', s: { ct: 'odwr' } },
  { t: 'Dwa błędy się znoszą', s: { ct: 'odwr', nastawa: 'odwr' } },
  { t: 'Odwrócone U₀ (cała sekcja)', s: { u0: 'odwr' } },
  { t: 'Ekran poza oknem', s: { ekran: 'zle' } },
  { t: 'sin φ w sieci kompensowanej', s: { siec: 'komp', alg: 'sin' } },
  { t: 'Błąd kątowy w kompensowanej', s: { siec: 'komp', alg: 'cos', icw: 35, katb: 5, prog: 1.5 } },
  { t: 'Holmgren w sieci izolowanej', s: { zrodlo: 'holmgren', icr: 10, obc: 600 } }
];

function widgetCtKierunek(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'siec', etykieta: 'Punkt neutralny sieci', wartosc: 'izo', opcje: [
      { w: 'izo', t: 'izolowany' }, { w: 'komp', t: 'kompensowany' }, { w: 'rez', t: 'przez rezystor' }
    ] },
    { typ: 'wybor', id: 'alg', etykieta: 'Kryterium przekaźnika', wartosc: 'sin', opcje: [
      { w: 'sin', t: 'biernomocowe I₀·sin φ' }, { w: 'cos', t: 'czynnomocowe I₀·cos φ' }
    ] },
    { typ: 'wybor', id: 'widok', etykieta: 'Na wykresie pokaż', wartosc: 'uszk', opcje: [
      { w: 'uszk', t: 'zwarcie w TYM polu' }, { w: 'zdrowe', t: 'zwarcie w INNYM polu' }
    ] },
    { typ: 'wybor', id: 'zrodlo', etykieta: 'Źródło 3I₀', wartosc: 'ferranti', opcje: [
      { w: 'ferranti', t: 'przekładnik Ferrantiego' }, { w: 'holmgren', t: 'filtr Holmgreena (3 CT)' }
    ] },
    { typ: 'wybor', id: 'ct', etykieta: 'Biegunowość przekładnika (P1/S1)', wartosc: 'ok', opcje: [
      { w: 'ok', t: 'zgodna' }, { w: 'odwr', t: 'odwrócona' }
    ] },
    { typ: 'wybor', id: 'nastawa', etykieta: 'Nastawa kierunku / punktu gwiazdowego', wartosc: 'ok', opcje: [
      { w: 'ok', t: 'zgodna' }, { w: 'odwr', t: 'odwrócona' }
    ] },
    { typ: 'wybor', id: 'u0', etykieta: 'Polaryzacja U₀ (otwarty trójkąt da–dn)', wartosc: 'ok', opcje: [
      { w: 'ok', t: 'zgodna' }, { w: 'odwr', t: 'odwrócona' }
    ] },
    { typ: 'wybor', id: 'ekran', etykieta: 'Przewód uziemiający ekranu', wartosc: 'ok', opcje: [
      { w: 'ok', t: 'wraca przez okno' }, { w: 'zle', t: 'omija okno' }
    ] },
    { typ: 'suwak', id: 'icw', etykieta: 'Prąd pojemnościowy TEGO pola', min: 1, max: 40, krok: 1, wartosc: 8 },
    { typ: 'suwak', id: 'icr', etykieta: 'Prąd pojemnościowy reszty sieci', min: 5, max: 200, krok: 5, wartosc: 60 },
    { typ: 'suwak', id: 'v', etykieta: 'Rozstrojenie dławika <i>v</i>', min: -20, max: 20, krok: 1, wartosc: 10 },
    { typ: 'suwak', id: 'irw', etykieta: 'Prąd rezystora wymuszającego', min: 0, max: 30, krok: 1, wartosc: 5 },
    { typ: 'suwak', id: 'ir', etykieta: 'Prąd rezystora uziemiającego <i>I</i><sub>R</sub>', min: 20, max: 600, krok: 10, wartosc: 300 },
    { typ: 'suwak', id: 'obc', etykieta: 'Prąd obciążenia pola (błąd Holmgreena 2 %)', min: 0, max: 800, krok: 20, wartosc: 300 },
    { typ: 'suwak', id: 'katb', etykieta: 'Błąd kątowy toru prądowego', min: -10, max: 10, krok: 0.5, wartosc: 0 },
    { typ: 'suwak', id: 'prog', etykieta: 'Próg I₀> (pierwotnie)', min: 0.5, max: 20, krok: 0.5, wartosc: 2 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Co widzi przekaźnik 67N — biegunowość, U₀, ekran, kąt i kryterium</strong>
    </div>
    <div class="dg-przyciski">
      ${SCENARIUSZE.map((p, n) => `<button type="button" class="dg-btn" data-scen="${n}">${p.t}</button>`).join('')}
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <p class="kr-tytul" data-tytul></p>
      <svg viewBox="0 0 380 330" class="dg-svg kr-svg" role="img" data-svg
           aria-label="Wykres wskazowy: oś odniesienia minus U0, obszar zadziałania, prąd 3I0 rzeczywisty i zmierzony przez przekaźnik">
        <defs><clipPath id="kr-klip"><circle cx="190" cy="170" r="138"/></clipPath></defs>
        <g clip-path="url(#kr-klip)"><path class="dg-obszar" data-strefa/></g>
        <circle class="dg-siatka" cx="190" cy="170" r="130"/>
        <circle class="dg-siatka" cx="190" cy="170" r="65"/>
        <path class="dg-os" d="M50 170 H330 M190 30 V310"/>
        <path style="fill:none;stroke:var(--roz);stroke-width:1.4;stroke-dasharray:3 3" data-prog/>
        <g data-wskazy></g>
      </svg>
      <div class="kr-legenda" data-legenda></div>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki" data-tabela></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const domyslny = { ...stan };
  const svg = dane(miejsce, 'svg');
  const R = 130, X = 190, Y = 170;

  const widocznosc = (id, czy) => {
    const we = miejsce.querySelector(`[data-we="${id}"]`);
    if (!we) return;
    const blok = we.closest('.dg-suwak, .dg-wybor');
    if (blok) blok.style.display = czy ? '' : 'none';
  };

  const strzalka = (a, skala, styl, etykieta, klasa, bok) => {
    const x = X + a.re * skala, y = Y - a.im * skala;
    const dl = Math.hypot(x - X, y - Y);
    if (dl < 2) {
      return `<circle cx="${X}" cy="${Y}" r="4" style="fill:${styl.kolor}"/>`;
    }
    const ux = (x - X) / dl, uy = (y - Y) / dl;
    const g1 = [x - 10 * ux + 5 * uy, y - 10 * uy - 5 * ux], g2 = [x - 10 * ux - 5 * uy, y - 10 * uy + 5 * ux];
    // bok = ±1 odsuwa podpis w poprzek wskazu, żeby dwa bliskie wskazy nie nachodziły na siebie
    const b = (bok || 0) * 16;
    const tx = x + ux * 12 - uy * b + (ux < -0.3 ? -4 : 0), ty = y + uy * 12 + ux * b + 4;
    return `<path style="fill:none;stroke:${styl.kolor};stroke-width:${styl.gr || 3};${styl.kreski ? 'stroke-dasharray:6 4;' : ''}"
        d="M${X} ${Y} L${x.toFixed(1)} ${y.toFixed(1)} M${g1[0].toFixed(1)} ${g1[1].toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)} L${g2[0].toFixed(1)} ${g2[1].toFixed(1)}"/>
      ${etykieta ? `<text class="dg-t-num ${klasa || ''} ${ux < -0.3 || tx + 7.6 * etykieta.length > 366 ? 'kon' : ''}" x="${Math.min(tx, 374).toFixed(1)}" y="${ty.toFixed(1)}">${etykieta}</text>` : ''}`;
  };

  const nazwaWyniku = w => (w === 'przod' ? 'ZADZIAŁA (do przodu)' : w === 'tyl' ? 'do tyłu — nie działa' : 'poniżej progu');

  function odswiez() {
    const s = stan;
    widocznosc('ekran', s.zrodlo === 'ferranti');
    widocznosc('obc', s.zrodlo === 'holmgren');
    widocznosc('v', s.siec === 'komp');
    widocznosc('irw', s.siec === 'komp');
    widocznosc('ir', s.siec === 'rez');

    pokaz(miejsce, 'icw', `${lz(s.icw, 0)} A`);
    pokaz(miejsce, 'icr', `${lz(s.icr, 0)} A`);
    pokaz(miejsce, 'v', `${s.v > 0 ? '+' : ''}${s.v} %${s.v > 0 ? ' (przekompensowanie)' : s.v < 0 ? ' (niedokompensowanie)' : ''}`);
    pokaz(miejsce, 'irw', `${lz(s.irw, 0)} A`);
    pokaz(miejsce, 'ir', `${lz(s.ir, 0)} A`);
    pokaz(miejsce, 'obc', `${lz(s.obc, 0)} A → błąd ${lz(EPS_HOLMGREN * s.obc, 1)} A`);
    pokaz(miejsce, 'katb', `${s.katb > 0 ? '+' : ''}${lz(s.katb, 1)}°`);
    pokaz(miejsce, 'prog', `${lz(s.prog, 1)} A`);

    const r = oblicz(s);
    const p = r[s.widok];

    /* ---- skala wykresu ---- */
    const najw = Math.max(modul(p.prawdziwy), modul(p.zmierzony), modul(p.blad), s.prog * 1.4, 1);
    const skala = (R - 14) / najw;

    /* ---- strefa zadziałania: półpłaszczyzna rzut·kierunek ≥ próg ---- */
    const d = p.kierunek, prost = C(-d.im, d.re);
    const o = C(d.re * s.prog * skala, d.im * s.prog * skala);
    const D = 400;
    const pkt = (a, b) => `${(X + a).toFixed(1)} ${(Y - b).toFixed(1)}`;
    const strefa = `M${pkt(o.re + prost.re * D, o.im + prost.im * D)}
      L${pkt(o.re - prost.re * D, o.im - prost.im * D)}
      L${pkt(o.re - prost.re * D + d.re * D, o.im - prost.im * D + d.im * D)}
      L${pkt(o.re + prost.re * D + d.re * D, o.im + prost.im * D + d.im * D)} Z`;
    dane(miejsce, 'strefa').setAttribute('d', strefa);
    const Lp = Math.sqrt(Math.max(R * R - (s.prog * skala) ** 2, 0));
    dane(miejsce, 'prog').setAttribute('d',
      `M${pkt(o.re + prost.re * Lp, o.im + prost.im * Lp)} L${pkt(o.re - prost.re * Lp, o.im - prost.im * Lp)}`);

    /* ---- wskazy ---- */
    const refRelay = p.ref;
    const osie = `
      ${strzalka(C(R * 0.98 / skala, 0), skala, { kolor: 'var(--atrament-3)', gr: 1.6, kreski: true }, '−U₀', '')}
      ${strzalka(C(-R * 0.98 / skala, 0), skala, { kolor: 'var(--atrament-3)', gr: 1.6, kreski: true }, 'U₀', '')}
      ${s.u0 === 'odwr' ? strzalka(razy(refRelay, R * 0.72 / skala), skala, { kolor: 'var(--alarm)', gr: 2.4 }, 'odn. przekaźnika', 'alarm', 1) : ''}`;
    const pokazBlad = s.zrodlo === 'holmgren' && s.obc > 0;
    svg.querySelector('[data-wskazy]').innerHTML = osie +
      strzalka(p.prawdziwy, skala, { kolor: 'var(--sukces)', gr: 2.2, kreski: true }, '3I₀ rzecz.', 'ok', 1) +
      (pokazBlad ? strzalka(p.blad, skala, { kolor: 'var(--ostrzezenie)', gr: 1.8 }, 'błąd CT', 'uwaga') : '') +
      strzalka(p.zmierzony, skala, { kolor: 'var(--roz)', gr: 3.4 }, '3I₀ w przekaźniku', 'roz', -1);

    dane(miejsce, 'tytul').textContent = s.widok === 'uszk'
      ? 'Zwarcie doziemne w TYM polu — przekaźnik powinien zadziałać'
      : 'Zwarcie w INNYM polu — przekaźnik NIE powinien zadziałać';

    const leg = [
      ['var(--roz)', 'prąd widziany przez przekaźnik'],
      ['var(--sukces)', 'prąd rzeczywisty (szyny → linia)'],
      ['var(--roz-mgla)', 'obszar zadziałania (' + (s.alg === 'cos' ? 'I₀·cos φ' : 'I₀·sin φ') + ' ≥ próg)']
    ];
    if (pokazBlad) leg.push(['var(--ostrzezenie)', 'fałszywe 3I₀ z niezrównoważenia CT']);
    dane(miejsce, 'legenda').innerHTML = leg.map(l =>
      `<span><i style="background:${l[0]}"></i>${l[1]}</span>`).join('') +
      `<span class="kr-os">oś pozioma: −U₀ w prawo (odniesienie przekaźnika); w górę: prąd wyprzedzający −U₀ o 90°</span>
       <strong class="${p.poprawnie ? 'kr-ok' : 'kr-zle'}">${nazwaWyniku(p.wynik)} — ${p.poprawnie ? 'decyzja poprawna' : 'DECYZJA BŁĘDNA'}</strong>`;

    /* ---- odczyty ---- */
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('3I₀ rzeczywisty', `${lz(modul(p.prawdziwy), 1)} A`, '', `kąt ${lz(kat(p.prawdziwy), 0)}° wzgl. −U₀`),
      odczyt('3I₀ w przekaźniku', `${lz(modul(p.zmierzony), 1)} A`, 'roz', `φ = ${lz(p.phi, 0)}° wzgl. odniesienia`),
      odczyt(s.alg === 'cos' ? 'I₀·cos φ' : 'I₀·sin φ', `${lz(p.skladowa, 2)} A`, p.wynik === 'przod' ? 'ok' : '', `próg ${lz(s.prog, 1)} A`),
      odczyt('Decyzja', p.wynik === 'przod' ? 'WYŁĄCZ' : 'nie działa', p.poprawnie ? 'ok' : 'alarm',
        p.poprawnie ? 'zgodnie z oczekiwaniem' : 'błędnie')
    ].join('');

    /* ---- tabela obu przypadków ---- */
    const wiersz = (k, nazwa) => {
      const q = r[k];
      return `<tr${k === s.widok ? ' class="wyrozniony"' : ''}><td class="lb">${nazwa}</td>
        <td class="wart">${lz(modul(q.prawdziwy), 1)} A</td>
        <td class="wart">${lz(modul(q.zmierzony), 1)} A</td>
        <td class="wart">${lz(q.phi, 0)}°</td>
        <td class="wart">${lz(q.skladowa, 2)} A</td>
        <td class="wart ${q.poprawnie ? 'ok' : 'alarm'}">${nazwaWyniku(q.wynik)}</td></tr>`;
    };
    dane(miejsce, 'tabela').innerHTML = `<table class="dg-tab">
      <tr><th>Gdzie zwarcie</th><th>3I₀ rzecz.</th><th>3I₀ zmierz.</th><th>φ</th><th>${s.alg === 'cos' ? 'I₀·cos φ' : 'I₀·sin φ'}</th><th>Decyzja</th></tr>
      ${wiersz('uszk', 'w tym polu (ma zadziałać)')}
      ${wiersz('zdrowe', 'w innym polu (nie może)')}</table>`;

    /* ---- komunikat ---- */
    const odwrocen = (s.ct === 'odwr') + (s.nastawa === 'odwr') + (s.u0 === 'odwr');
    const U = r.uszk, Z = r.zdrowe;
    const kom = dane(miejsce, 'kom');
    const uwagi = [];
    if (odwrocen === 2) {
      uwagi.push(`Dwa odwrócenia o 180° się znoszą (${[s.ct === 'odwr' && 'przekładnik', s.nastawa === 'odwr' && 'nastawa', s.u0 === 'odwr' && 'U₀'].filter(Boolean).join(' + ')}).
        Układ działa, ale tylko dopóki nikt nie poprawi jednego z błędów. Wymiana przekaźnika albo
        przekładnika odwróci kierunek. Taki stan trzeba opisać w protokole i na schemacie, a najlepiej usunąć oba błędy.`);
    }
    if (s.siec === 'komp' && s.alg === 'sin') {
      uwagi.push(`W sieci kompensowanej składowa bierna pola uszkodzonego zależy od rozstrojenia dławika.
        Przy przekompensowaniu ma ten sam znak co w polu zdrowym, więc kryterium sin φ nie rozróżnia pól.
        Tu potrzebne jest kryterium czynnomocowe (cos φ) albo admitancyjne.`);
    }
    if (s.siec === 'izo' && s.alg === 'cos') {
      uwagi.push(`W sieci izolowanej składowa czynna to tylko straty — kilka procent prądu. Kryterium cos φ
        jest tu zbyt słabe, właściwe jest biernomocowe (sin φ).`);
    }
    if (s.zrodlo === 'ferranti' && s.ekran === 'zle') {
      uwagi.push(`Prąd powrotny ekranu przechodzi przez okno i odejmuje się od prądu żył. Przekaźnik widzi
        ok. ${lz(RESZTA_EKRANU * 100, 0)} % prawdziwego 3I₀. Tej wady nie widać w ruchu normalnym ani przy pomiarach
        izolacji. Wykryją ją tylko oględziny albo wymuszenie prądu przez okno.`);
    }
    if (Math.abs(s.katb) >= 2 && s.alg === 'cos') {
      uwagi.push(`Błąd kątowy ${lz(s.katb, 1)}° przenosi część dużej składowej biernej na oś czynną:
        ≈ ${lz(Math.abs(Math.sin(s.katb * Math.PI / 180)) * modul(Z.prawdziwy), 2)} A w polu zdrowym.
        Przy małych prądach czynnych sieci kompensowanej to wystarcza do zbędnego zadziałania. Pomaga korekcja kąta
        w przekaźniku, ograniczenie sektora albo większy prąd rezystora wymuszającego.`);
    }
    if (s.zrodlo === 'holmgren' && EPS_HOLMGREN * s.obc >= s.prog) {
      uwagi.push(`Filtr Holmgreena: 2 % niezrównoważenia przy ${lz(s.obc, 0)} A obciążenia daje
        ${lz(EPS_HOLMGREN * s.obc, 1)} A fałszywego 3I₀ — więcej niż próg. Ten błąd istnieje w każdym polu
        z obciążeniem, także w zdrowych.`);
    }

    let ton, glowny;
    if (U.poprawnie && Z.poprawnie) {
      ton = uwagi.length ? 'uwaga' : 'ok';
      glowny = `<strong>Obie decyzje poprawne:</strong> przy zwarciu w tym polu przekaźnik działa do przodu,
        przy zwarciu gdzie indziej — nie. ${uwagi.length ? '' : `Prąd pola uszkodzonego i zdrowego leżą po przeciwnych
        stronach granicy strefy, z zapasem ponad próg.`}`;
    } else if (!U.poprawnie && !Z.poprawnie) {
      ton = 'alarm';
      glowny = `<strong>Pola zamieniły się rolami.</strong> Przy zwarciu w tym polu przekaźnik nie działa,
        więc zwarcie trwa i wyłączy je dopiero rezerwa, np. U₀> w polu zasilającym: cała sekcja. Przy zwarciu
        w innym polu to pole wyłącza się zbędnie. ${odwrocen % 2 === 1 ? `Przyczyna: nieparzysta liczba odwróceń o 180°
        (${[s.ct === 'odwr' && 'biegunowość przekładnika', s.nastawa === 'odwr' && 'nastawa kierunku', s.u0 === 'odwr' && 'polaryzacja U₀'].filter(Boolean).join(', ')}).` : ''}
        ${s.u0 === 'odwr' ? ' Odwrócone U₀ pochodzi z jednego przekładnika napięciowego sekcji, więc tak samo działa <em>każde</em> pole tej sekcji.' : ''}`;
    } else if (!U.poprawnie) {
      ton = 'alarm';
      glowny = `<strong>Brak zadziałania przy zwarciu w tym polu.</strong> ${U.wynik === 'tyl'
        ? 'Przekaźnik widzi zwarcie „do tyłu”.'
        : `Składowa ${s.alg === 'cos' ? 'czynna' : 'bierna'} (${lz(U.skladowa, 2)} A) jest poniżej progu ${lz(s.prog, 1)} A.`}
        Zwarcie doziemne trwa dalej. W sieci izolowanej lub kompensowanej sieć może pracować, ale napięcia faz zdrowych
        rosną do wartości międzyfazowych. Grozi to zwarciem podwójnym, a na stanowisku zwarcia — napięciami rażeniowymi.`;
    } else {
      ton = 'alarm';
      glowny = `<strong>Zbędne wyłączenie zdrowego pola</strong> przy zwarciu gdzie indziej:
        ${s.alg === 'cos' ? 'I₀·cos φ' : 'I₀·sin φ'} = ${lz(Z.skladowa, 2)} A ≥ ${lz(s.prog, 1)} A.
        Odbiorcy tego pola tracą zasilanie, a zwarcie w polu uszkodzonym i tak trzeba wyłączyć osobno.`;
    }
    komunikat(kom, ton, glowny + (uwagi.length ? '<br>' + uwagi.map(u => `• ${u}`).join('<br>') : ''));
  }

  /* ---- scenariusze: ustawia stan i odświeża przyciski/suwaki ---- */
  function ustaw(zmiany) {
    Object.assign(stan, domyslny, zmiany);
    Object.keys(stan).forEach(id => {
      const suwak = miejsce.querySelector(`input[type="range"][data-we="${id}"]`);
      if (suwak) suwak.value = stan[id];
      miejsce.querySelectorAll(`.dg-wybor-guziki button[data-we="${id}"]`).forEach(g => {
        const czy = String(g.dataset.wart) === String(stan[id]);
        g.classList.toggle('wybrany', czy);
        g.setAttribute('aria-pressed', String(czy));
      });
    });
    odswiez();
  }

  miejsce.querySelectorAll('[data-scen]').forEach(b => b.addEventListener('click', () => {
    miejsce.querySelectorAll('[data-scen]').forEach(x => x.classList.toggle('wybrany', x === b));
    ustaw(SCENARIUSZE[Number(b.dataset.scen)].s);
  }));

  podlacz(miejsce, stan, odswiez);
}

/* ==================================================== rejestracja w rejestrze diag.js */

if (window.DIAG_BUDOWNICZY) {
  Object.assign(window.DIAG_BUDOWNICZY, { 'ct-kierunek': widgetCtKierunek });
}

// do testów bez przeglądarki (node)
window.KIERUNEK_MODEL = { oblicz };

})();

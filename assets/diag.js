/* ==========================================================================
   Symulatory Części III — diagnostyka i pomiary SN/WN
   Czysty JavaScript, bez budowania. W treści rozdziałów wystawiamy tylko:
       <div class="dg-widget" data-typ="indukcja"></div>
   a cała interakcja powstaje tutaj, żeby markdown pozostał czytelny.

   Awaria jednego symulatora nie może zabrać treści rozdziału — dlatego każdy
   budowany jest w bloku try/catch, a app.js wywołuje nas przez bezpiecznie().
   ========================================================================== */

'use strict';

(function () {

/* ====================================================== wspólne narzędzia */

const TAU = Math.PI * 2;
const OMEGA = TAU * 50;                       // pulsacja sieci 50 Hz [rad/s]
const SQRT3 = Math.sqrt(3);

/** Liczba po polsku: przecinek dziesiętny, spacja jako separator tysięcy. */
function lz(x, cyfry) {
  if (!isFinite(x)) return '—';
  const n = cyfry === undefined ? (Math.abs(x) >= 100 ? 0 : Math.abs(x) >= 10 ? 1 : 2) : cyfry;
  return x.toLocaleString('pl-PL', { minimumFractionDigits: n, maximumFractionDigits: n });
}

/** Napięcie w V lub kV, zależnie od rzędu wielkości. */
function napiecie(volty) {
  if (Math.abs(volty) >= 1000) return `${lz(volty / 1000, 2)} kV`;
  return `${lz(volty, 0)} V`;
}

/** Moc bierna w var / kvar / Mvar. */
function moc(var_) {
  if (Math.abs(var_) >= 1e6) return `${lz(var_ / 1e6, 2)} Mvar`;
  if (Math.abs(var_) >= 1e3) return `${lz(var_ / 1e3, 1)} kvar`;
  return `${lz(var_, 0)} var`;
}

/** Powtarzalny generator liczb pseudolosowych — wykresy nie skaczą przy odświeżeniu. */
function losowacz(nasiono) {
  let s = (nasiono >>> 0) || 1;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
}

const ucieczka = t => String(t).replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[z]));

/* ------------------------------------------------------ budowa sterowania */

/**
 * Zamienia opis sterowania w HTML.
 * Rodzaje pozycji:
 *   { typ:'suwak', id, etykieta, min, max, krok, wartosc }
 *   { typ:'wybor', id, etykieta, wartosc, opcje:[{w, t}] }
 */
function sterowanie(spec) {
  const pozycje = spec.map(s => {
    if (s.typ === 'suwak') {
      return `<label class="dg-suwak">
        <span class="dg-suwak-opis">${s.etykieta}<b data-wyswietl="${s.id}"></b></span>
        <input type="range" data-we="${s.id}" min="${s.min}" max="${s.max}"
               step="${s.krok}" value="${s.wartosc}"
               aria-label="${ucieczka(s.etykieta.replace(/<[^>]*>/g, ''))}">
      </label>`;
    }
    return `<div class="dg-wybor" role="group" aria-label="${ucieczka(s.etykieta)}">
      <span class="dg-wybor-opis">${s.etykieta}</span>
      <div class="dg-wybor-guziki">
        ${s.opcje.map(o => `<button type="button" data-we="${s.id}" data-wart="${o.w}"
            ${String(o.w) === String(s.wartosc) ? 'class="wybrany" aria-pressed="true"' : 'aria-pressed="false"'}
            >${o.t}</button>`).join('')}
      </div>
    </div>`;
  }).join('');
  return `<div class="dg-sterowanie">${pozycje}</div>`;
}

/** Wpisuje wartości początkowe do stanu na podstawie opisu sterowania. */
function stanZeSpec(spec) {
  const stan = {};
  spec.forEach(s => {
    stan[s.id] = s.typ === 'suwak' ? Number(s.wartosc) : s.wartosc;
  });
  return stan;
}

/** Podłącza suwaki i przyciski wyboru do stanu; po każdej zmianie woła odswiez(). */
function podlacz(miejsce, stan, odswiez) {
  miejsce.querySelectorAll('input[type="range"][data-we]').forEach(pole => {
    pole.addEventListener('input', () => {
      stan[pole.dataset.we] = Number(pole.value);
      odswiez();
    });
  });
  miejsce.querySelectorAll('.dg-wybor-guziki button[data-we]').forEach(guzik => {
    guzik.addEventListener('click', () => {
      const id = guzik.dataset.we;
      stan[id] = guzik.dataset.wart;
      miejsce.querySelectorAll(`.dg-wybor-guziki button[data-we="${id}"]`).forEach(inny => {
        const czy = inny === guzik;
        inny.classList.toggle('wybrany', czy);
        inny.setAttribute('aria-pressed', String(czy));
      });
      odswiez();
    });
  });
  odswiez();
}

/** Ustawia tekst przy suwaku (element <b data-wyswietl="id">). */
function pokaz(miejsce, id, tekst) {
  const cel = miejsce.querySelector(`[data-wyswietl="${id}"]`);
  if (cel) cel.textContent = tekst;
}

/** Skrót: element po atrybucie data-. */
const dane = (miejsce, nazwa) => miejsce.querySelector(`[data-${nazwa}]`);

/** Wstawia komunikat o tonie ok / alarm / uwaga / info. */
function komunikat(element, ton, html) {
  element.className = `dg-kom ${ton}`;
  element.innerHTML = html;
}

/** Kafelek odczytu. */
function odczyt(etykieta, wartosc, ton, dopisek) {
  return `<div class="dg-odczyt ${ton || ''}">
    <span>${etykieta}</span>
    <strong>${wartosc}</strong>
    ${dopisek ? `<small>${dopisek}</small>` : ''}
  </div>`;
}

/** Buduje ścieżkę SVG z tablicy punktów [[x,y], ...]. */
function sciezka(punkty) {
  return punkty.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
}

/* ========================================================================
   1. NAPIĘCIA INDUKOWANE W POLU RÓWNOLEGŁYM               (rozdział 16)
   ======================================================================== */

function widgetIndukcja(miejsce) {
  const Z_PETLI = 0.35;    // impedancja pętli żyła–ziemia [Ω/km]

  const spec = [
    { typ: 'wybor', id: 'uziem', etykieta: 'Uziemienie toru odstawionego', wartosc: 'brak', opcje: [
      { w: 'brak',  t: 'brak' },
      { w: 'jedno', t: 'jednostronne (A)' },
      { w: 'obu',   t: 'obustronne' }
    ] },
    { typ: 'suwak', id: 'prad', etykieta: 'Prąd w torze czynnym <i>I</i>₁', min: 0, max: 800, krok: 25, wartosc: 500 },
    { typ: 'suwak', id: 'dlugosc', etykieta: 'Długość zbliżenia <i>L</i>', min: 1, max: 30, krok: 1, wartosc: 20 },
    { typ: 'wybor', id: 'un', etykieta: 'Napięcie sieci', wartosc: '110', opcje: [
      { w: '15',  t: '15 kV' },
      { w: '110', t: '110 kV' },
      { w: '220', t: '220 kV' },
      { w: '400', t: '400 kV' }
    ] },
    { typ: 'suwak', id: 'zm', etykieta: 'Impedancja wzajemna <i>Z</i><sub>m</sub>', min: 0.1, max: 0.7, krok: 0.05, wartosc: 0.3 },
    { typ: 'suwak', id: 'kpoj', etykieta: 'Sprzężenie pojemnościowe <i>k</i>', min: 0.01, max: 0.12, krok: 0.005, wartosc: 0.04 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Napięcie na „wyłączonym” torze — dwa mechanizmy, dwa zachowania</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 300" class="dg-svg" role="img"
           aria-label="Dwa równoległe tory linii: czynny z prądem i odstawiony z zaznaczonymi napięciami w trzech punktach">
        <text class="dg-t-b" x="8" y="18">TOR CZYNNY — pod napięciem</text>
        <path class="dg-przewod zywy" data-tor-czynny d="M60 44 H640"/>
        <text class="dg-t-m sr" x="350" y="34" data-opis-czynny></text>
        <path class="dg-strzalka-prad" data-strzalka fill="none" d="M330 44 l14 0"/>

        <text class="dg-t-m" x="8" y="72">sprzężenie pojemnościowe C₁₂</text>
        <g data-poj-kreski></g>
        <text class="dg-t-m" x="8" y="118">sprzężenie indukcyjne Z_m</text>
        <path class="dg-krzywa-2" data-luk-ind d="M120 100 Q350 128 580 100"/>

        <text class="dg-t-b" x="8" y="166">TOR ODSTAWIONY — miejsce pracy</text>
        <path class="dg-przewod" data-tor-odst d="M60 192 H640"/>

        <g data-punkty></g>
        <g data-uziemienia></g>
        <g data-cyrkulacja></g>

        <text class="dg-t-m sr" x="120" y="288">koniec A</text>
        <text class="dg-t-m sr" x="350" y="288">środek odcinka</text>
        <text class="dg-t-m sr" x="580" y="288">koniec B</text>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki">
      <table class="dg-tab">
        <tr><th>Składowa</th><th>koniec A</th><th>środek</th><th>koniec B</th><th>Zachowanie</th></tr>
        <tr data-w-poj><td class="lb">pojemnościowa</td><td class="wart"></td><td class="wart"></td><td class="wart"></td><td class="lb"></td></tr>
        <tr data-w-ind><td class="lb">indukcyjna</td><td class="wart"></td><td class="wart"></td><td class="wart"></td><td class="lb"></td></tr>
      </table>
    </div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');
  const X = { A: 120, S: 350, B: 580 };

  function odswiez() {
    const Un = Number(stan.un);
    const Uf = Un * 1000 / SQRT3;                       // napięcie fazowe [V]
    const Zm = stan.zm;                                 // impedancja wzajemna torów [Ω/km]
    const E = Zm * stan.prad * stan.dlugosc;            // SEM indukowana wzdłuż zbliżenia [V]
    const uz = stan.uziem;

    pokaz(miejsce, 'prad', `${lz(stan.prad, 0)} A`);
    pokaz(miejsce, 'dlugosc', `${stan.dlugosc} km`);
    pokaz(miejsce, 'zm', `${lz(Zm, 2)} Ω/km`);
    pokaz(miejsce, 'kpoj', lz(stan.kpoj, 3));

    // składowa pojemnościowa: dowolne uziemienie ją likwiduje
    const Upoj = uz === 'brak' ? stan.kpoj * Uf : 0;
    const poj = { A: Upoj, S: Upoj, B: Upoj };

    // składowa indukcyjna: uziemienie jednostronne NIE likwiduje
    let ind, Icyrk = 0;
    if (uz === 'brak')       ind = { A: E / 2, S: 0,     B: E / 2 };
    else if (uz === 'jedno') ind = { A: 0,     S: E / 2, B: E };
    else {
      ind = { A: 0, S: E / 4, B: 0 };
      Icyrk = E / (Z_PETLI * stan.dlugosc);
    }

    const suma = { A: poj.A + ind.A, S: poj.S + ind.S, B: poj.B + ind.B };
    const najwieksze = Math.max(suma.A, suma.S, suma.B);

    /* ---- rysunek ---- */
    svg.querySelector('[data-tor-czynny]').classList.toggle('prad', stan.prad > 0);
    svg.querySelector('[data-opis-czynny]').textContent =
      `I₁ = ${lz(stan.prad, 0)} A · U = ${Un} kV · zbliżenie ${stan.dlugosc} km`;

    // kreski pojemności (rysujemy tylko gdy sprzężenie pojemnościowe działa)
    const kreski = [180, 280, 380, 480];
    svg.querySelector('[data-poj-kreski]').innerHTML = kreski.map(x => `
      <path class="${Upoj > 0 ? 'dg-przewod grozny' : 'dg-krzywa-2'}"
            style="stroke-width:1.6" d="M${x} 50 V64 M${x - 9} 64 H${x + 9} M${x - 9} 70 H${x + 9} M${x} 70 V186"/>`).join('');

    svg.querySelector('[data-luk-ind]').setAttribute('style',
      E > 0 ? 'stroke:var(--ostrzezenie);stroke-dasharray:none;stroke-width:2.2' : '');

    const torOdst = svg.querySelector('[data-tor-odst]');
    torOdst.classList.toggle('grozny', najwieksze >= 50);
    torOdst.classList.toggle('zywy', najwieksze > 0 && najwieksze < 50);

    // punkty pomiarowe z odczytem napięcia
    svg.querySelector('[data-punkty]').innerHTML = ['A', 'S', 'B'].map(p => {
      const u = suma[p];
      const ton = u >= 50 ? 'alarm' : u > 0 ? 'uwaga' : 'ok';
      return `
        <circle class="dg-punkt" cx="${X[p]}" cy="192" r="5"
                style="fill:var(--${u >= 50 ? 'alarm' : u > 0 ? 'ostrzezenie' : 'sukces'})"/>
        <text class="dg-t-num sr ${ton}" x="${X[p]}" y="228">${napiecie(u)}</text>
        <text class="dg-t-m sr" x="${X[p]}" y="246">${u >= 50 ? 'niebezpieczne' : u > 0 ? 'obecne' : 'brak'}</text>`;
    }).join('');

    // symbole uziemienia
    const symbolUziem = x => `
      <path class="dg-ziemia czynna" d="M${x} 192 V262 M${x - 15} 262 H${x + 15} M${x - 10} 268 H${x + 10} M${x - 5} 274 H${x + 5}"/>`;
    svg.querySelector('[data-uziemienia]').innerHTML =
      (uz === 'jedno' ? symbolUziem(X.A) : '') +
      (uz === 'obu' ? symbolUziem(X.A) + symbolUziem(X.B) : '');

    // prąd cyrkulacyjny w pętli
    svg.querySelector('[data-cyrkulacja]').innerHTML = Icyrk > 0 ? `
      <path class="dg-przewod prad" style="stroke-width:2.2"
            d="M${X.A} 205 H${X.B}"/>
      <text class="dg-t-num sr uwaga" x="350" y="200">prąd w pętli ${lz(Icyrk, 0)} A →</text>` : '';

    /* ---- odczyty ---- */
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('SEM indukowana <i>E</i>', napiecie(E),
        E >= 50 ? 'alarm' : 'roz', `Z_m · I₁ · L = ${lz(Zm, 2)} · ${lz(stan.prad, 0)} · ${stan.dlugosc}`),
      odczyt('Składowa pojemnościowa', napiecie(Upoj),
        Upoj >= 50 ? 'alarm' : Upoj > 0 ? 'uwaga' : 'ok', `k = ${lz(stan.kpoj, 3)} · U_f = ${napiecie(Uf)}`),
      odczyt('Najwyższe napięcie na torze', napiecie(najwieksze),
        najwieksze >= 50 ? 'alarm' : najwieksze > 0 ? 'uwaga' : 'ok', 'suma składowych (szacunek skalarny)'),
      odczyt('Prąd cyrkulacyjny', Icyrk > 0 ? `${lz(Icyrk, 0)} A` : 'brak',
        Icyrk > 100 ? 'uwaga' : '', Icyrk > 0 ? `E / (${Z_PETLI} · L)` : 'tylko przy uziemieniu obustronnym')
    ].join('');

    /* ---- tabela ---- */
    const wiersz = (sel, wart, opis) => {
      const tr = dane(miejsce, sel);
      const kom = tr.querySelectorAll('td');
      ['A', 'S', 'B'].forEach((p, i) => {
        kom[i + 1].textContent = napiecie(wart[p]);
        kom[i + 1].className = 'wart ' + (wart[p] >= 50 ? 'alarm' : wart[p] > 0 ? 'uwaga' : 'ok');
      });
      kom[4].innerHTML = opis;
    };
    wiersz('w-poj', poj, uz === 'brak'
      ? 'brak uziemienia → dzielnik pojemnościowy pracuje'
      : '<strong>zlikwidowana</strong> — każde uziemienie zwiera C₂₀');
    wiersz('w-ind', ind, uz === 'brak'
      ? 'pętla otwarta → napięcie rozkłada się symetrycznie'
      : uz === 'jedno'
        ? '<strong>nie zlikwidowana</strong> — na końcu B pełne E'
        : 'końce sprowadzone do zera, ale w pętli płynie prąd');

    /* ---- komunikat ---- */
    const kom = dane(miejsce, 'kom');
    if (uz === 'brak') {
      komunikat(kom, najwieksze >= 50 ? 'alarm' : 'uwaga',
        `<strong>Tor nieuziemiony.</strong> Działają oba mechanizmy naraz. Składowa pojemnościowa
         (${napiecie(Upoj)}) zależy tylko od <em>napięcia</em> linii sąsiedniej, więc jest obecna
         nawet przy zerowym prądzie — sprawdź to, ustawiając <em>I</em>₁ = 0.`);
    } else if (uz === 'jedno') {
      komunikat(kom, ind.B >= 50 ? 'alarm' : 'uwaga',
        `<strong>To jest ta pułapka.</strong> Uziemienie na końcu A pokazuje 0 V — i to uspokaja.
         Ale sprzężenie indukcyjne jest <em>wymuszane prądem</em>, nie napięciem, więc na końcu B
         stoi pełne <em>E</em> = ${napiecie(E)}. Uziemienie jednostronne likwiduje wyłącznie
         składową pojemnościową.`);
    } else {
      komunikat(kom, 'info',
        `<strong>Uziemienie obustronne — i dlatego uziemia się jeszcze raz w miejscu pracy.</strong>
         Na końcach jest 0 V, ale w pętli płynie ${lz(Icyrk, 0)} A, a potencjał wzdłuż toru układa
         się w trójkąt z maksimum <em>w środku odcinka</em> (${napiecie(ind.S)}). Pracując w środku,
         stoisz w punkcie o najwyższym potencjale — stąd wymóg uziemienia roboczego w strefie pracy.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   2. PUNKT NEUTRALNY SIECI SN                             (rozdział 17)
   ======================================================================== */

const NEUTRALNY_OPIS = {
  izo:  { nazwa: 'izolowany',                d: 1.00, ku: 1.73 },
  komp: { nazwa: 'kompensowany dławikiem',   d: 1.00, ku: 1.73 },
  rez:  { nazwa: 'uziemiony przez rezystor', d: 0.95, ku: 1.70 },
  skut: { nazwa: 'uziemiony skutecznie',     d: 0.40, ku: 1.25 }
};

function widgetNeutralny(miejsce) {
  const C_KABEL = 0.30;    // pojemność doziemna kabla [µF/km/fazę]
  const C_LINIA = 0.005;   // pojemność doziemna linii napowietrznej [µF/km/fazę]
  const STRATY = 0.03;     // udział składowej czynnej w prądzie pojemnościowym

  const spec = [
    { typ: 'wybor', id: 'rodzaj', etykieta: 'Punkt neutralny', wartosc: 'izo', opcje: [
      { w: 'izo',  t: 'izolowany' },
      { w: 'komp', t: 'kompensowany' },
      { w: 'rez',  t: 'przez rezystor' },
      { w: 'skut', t: 'skutecznie uziem.' }
    ] },
    { typ: 'wybor', id: 'un', etykieta: 'Napięcie znamionowe', wartosc: '15', opcje: [
      { w: '15', t: '15 kV' }, { w: '20', t: '20 kV' }, { w: '30', t: '30 kV' }, { w: '110', t: '110 kV' }
    ] },
    { typ: 'suwak', id: 'kabel', etykieta: 'Kable w sieci', min: 0, max: 80, krok: 1, wartosc: 12 },
    { typ: 'suwak', id: 'linia', etykieta: 'Linie napowietrzne', min: 0, max: 400, krok: 5, wartosc: 60 },
    { typ: 'suwak', id: 'v', etykieta: 'Rozstrojenie dławika <i>v</i>', min: -25, max: 25, krok: 1, wartosc: 8 },
    { typ: 'suwak', id: 'ir', etykieta: 'Prąd rezystora <i>I</i><sub>R</sub>', min: 50, max: 600, krok: 10, wartosc: 300 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Punkt neutralny — prąd zwarcia doziemnego i napięcia faz zdrowych</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 330" class="dg-svg" role="img"
           aria-label="Wykres wskazowy napięć fazowych z przesunięciem punktu neutralnego oraz element w punkcie neutralnym">
        <text class="dg-t-b" x="8" y="18">Wykres wskazowy — napięcia faz względem ZIEMI</text>

        <circle class="dg-siatka" cx="185" cy="185" r="120"/>
        <circle class="dg-siatka" cx="185" cy="185" r="60"/>
        <path class="dg-os" d="M55 185 H315 M185 55 V315"/>
        <text class="dg-t-m" x="318" y="189">Re</text>

        <g data-wskazy></g>

        <text class="dg-t-b" x="380" y="18">Element w punkcie neutralnym</text>
        <g data-schemat></g>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki">
      <table class="dg-tab" data-tabela></table>
    </div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  function odswiez() {
    const Un = Number(stan.un);
    const Uf = Un * 1000 / SQRT3;
    const rodzaj = stan.rodzaj;
    const o = NEUTRALNY_OPIS[rodzaj];

    // pokazujemy tylko te suwaki, które mają w danym układzie sens
    const pokazSuwak = (id, czy) => {
      const pole = miejsce.querySelector(`input[data-we="${id}"]`);
      if (pole) pole.closest('.dg-suwak').style.display = czy ? '' : 'none';
    };
    pokazSuwak('v', rodzaj === 'komp');
    pokazSuwak('ir', rodzaj === 'rez');

    pokaz(miejsce, 'kabel', `${stan.kabel} km`);
    pokaz(miejsce, 'linia', `${stan.linia} km`);
    pokaz(miejsce, 'v', `${stan.v > 0 ? '+' : ''}${stan.v} %`);
    pokaz(miejsce, 'ir', `${lz(stan.ir, 0)} A`);

    /* ---- prądy ---- */
    const C0 = C_KABEL * stan.kabel + C_LINIA * stan.linia;        // [µF/fazę]
    const Ic = 3 * OMEGA * C0 * 1e-6 * Uf;                         // prąd pojemnościowy [A]
    const Iczynny = STRATY * Ic;

    let Iziemne, Il = 0, opisPradu;
    if (rodzaj === 'izo') {
      Iziemne = Ic;
      opisPradu = 'prąd czysto pojemnościowy, płynie przez pojemności całej sieci';
    } else if (rodzaj === 'komp') {
      Il = Ic * (1 + stan.v / 100);
      Iziemne = Math.hypot(Il - Ic, Iczynny);
      opisPradu = 'prąd resztkowy: niedopasowanie dławika + składowa czynna';
    } else if (rodzaj === 'rez') {
      Iziemne = Math.hypot(stan.ir, Ic);
      opisPradu = 'suma geometryczna prądu rezystora i prądu pojemnościowego';
    } else {
      Iziemne = 8000;
      opisPradu = 'prąd rzędu prądu zwarcia trójfazowego — wartość orientacyjna';
    }

    /* ---- wykres wskazowy ---- */
    const R = 120;
    const katy = { L1: -90, L2: 30, L3: 150 };                     // stopnie, SVG (y w dół)
    const wek = k => [Math.cos(k * Math.PI / 180), Math.sin(k * Math.PI / 180)];
    const E = {};
    Object.keys(katy).forEach(f => { E[f] = wek(katy[f]); });
    const U0 = [-o.d * E.L1[0], -o.d * E.L1[1]];                   // przesunięcie punktu neutralnego

    const kolor = { L1: 'var(--roz)', L2: 'var(--ostrzezenie)', L3: 'var(--sukces)' };
    const N = [185 + U0[0] * R, 185 + U0[1] * R];

    const wskazy = Object.keys(E).map(f => {
      const koniec = [185 + E[f][0] * R, 185 + E[f][1] * R];
      const modul = Math.hypot(E[f][0] + U0[0], E[f][1] + U0[1]);
      return `
        <path class="dg-krzywa-2" style="stroke:${kolor[f]};opacity:.4"
              d="M185 185 L${koniec[0].toFixed(1)} ${koniec[1].toFixed(1)}"/>
        <path style="fill:none;stroke:${kolor[f]};stroke-width:3"
              d="M${N[0].toFixed(1)} ${N[1].toFixed(1)} L${koniec[0].toFixed(1)} ${koniec[1].toFixed(1)}"/>
        <circle r="4" cx="${koniec[0].toFixed(1)}" cy="${koniec[1].toFixed(1)}" style="fill:${kolor[f]}"/>
        <text class="dg-t-num" style="fill:${kolor[f]}"
              x="${(koniec[0] + (E[f][0] > 0 ? 8 : E[f][0] < -0.1 ? -46 : -16)).toFixed(1)}"
              y="${(koniec[1] + (E[f][1] > 0 ? 16 : -8)).toFixed(1)}">${f} ${lz(modul * Uf / 1000, 1)} kV</text>`;
    }).join('');

    svg.querySelector('[data-wskazy]').innerHTML = wskazy + `
      <path class="dg-przewod grozny" style="stroke-width:2.6"
            d="M185 185 L${N[0].toFixed(1)} ${N[1].toFixed(1)}"/>
      <circle r="5" cx="${N[0].toFixed(1)}" cy="${N[1].toFixed(1)}" style="fill:var(--alarm)"/>
      <text class="dg-t-num alarm" x="${(N[0] + 10).toFixed(1)}" y="${(N[1] + 5).toFixed(1)}">N′</text>
      <text class="dg-t-m" x="55" y="325">N′ — przesunięty punkt neutralny · U₀ = ${lz(o.d * Uf / 1000, 1)} kV</text>`;

    /* ---- schemat elementu w punkcie neutralnym ---- */
    const schematy = {
      izo: `<text class="dg-t sr" x="540" y="150">brak połączenia z ziemią</text>
            <text class="dg-t-m sr" x="540" y="168">Z₀ → ∞ (tylko pojemności)</text>`,
      komp: `<rect x="512" y="110" width="56" height="46" rx="4" style="fill:var(--tlo-3);stroke:var(--roz);stroke-width:2.4"/>
             <path style="fill:none;stroke:var(--roz);stroke-width:2.4"
                   d="M524 122 q6 -10 12 0 q6 -10 12 0 M524 144 h32"/>
             <text class="dg-t-m sr" x="540" y="176">dławik gaszący</text>
             <text class="dg-t-num sr roz" x="540" y="194">I_L = ${lz(Il, 1)} A</text>`,
      rez: `<rect x="518" y="110" width="44" height="46" rx="3" style="fill:var(--tlo-3);stroke:var(--roz);stroke-width:2.4"/>
            <text class="dg-t-m sr" x="540" y="176">rezystor uziemiający</text>
            <text class="dg-t-num sr roz" x="540" y="194">I_R = ${lz(stan.ir, 0)} A</text>`,
      skut: `<path style="fill:none;stroke:var(--roz);stroke-width:3" d="M540 110 V156"/>
             <text class="dg-t-m sr" x="540" y="176">połączenie bezpośrednie</text>
             <text class="dg-t-m sr" x="540" y="194">X₀/X₁ ≤ 3</text>`
    };

    svg.querySelector('[data-schemat]').innerHTML = `
      <path class="dg-przewod zywy" d="M420 60 H660 M540 60 V110"/>
      <text class="dg-t-m sr" x="540" y="50">uzwojenie dolne transformatora — punkt gwiazdowy</text>
      ${schematy[rodzaj]}
      <path class="dg-ziemia czynna" d="M540 ${rodzaj === 'izo' ? '110' : '156'} V212 M525 212 H555 M529 218 H551 M534 224 H546"/>
      <text class="dg-t-num sr" x="540" y="250">I_ziemne = ${lz(Iziemne, Iziemne > 999 ? 0 : 1)} A</text>
      <text class="dg-t-m sr" x="540" y="268">${o.nazwa}</text>`;

    /* ---- odczyty ---- */
    const granicaLuku = 20;
    const tonPrad = rodzaj === 'izo'
      ? (Iziemne > granicaLuku ? 'alarm' : 'ok')
      : rodzaj === 'komp' ? 'ok' : 'uwaga';

    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Pojemność doziemna <i>C</i>₀', `${lz(C0, 2)} µF`, 'roz',
        `${C_KABEL} · ${stan.kabel} km + ${C_LINIA} · ${stan.linia} km`),
      odczyt('Prąd pojemnościowy <i>I</i><sub>C</sub>', `${lz(Ic, 1)} A`, 'roz',
        '3 · ω · C₀ · U_f'),
      odczyt('Prąd w miejscu zwarcia', `${lz(Iziemne, Iziemne > 999 ? 0 : 1)} A`, tonPrad, opisPradu),
      odczyt('Napięcie faz zdrowych', `${lz(o.ku, 2)} · U_f`,
        o.ku > 1.5 ? 'uwaga' : 'ok', `${lz(o.ku * Uf / 1000, 1)} kV wobec ziemi`)
    ].join('');

    /* ---- tabela porównawcza ---- */
    dane(miejsce, 'tabela').innerHTML = `
      <tr><th>Układ</th><th>Prąd zwarcia doziemnego</th><th>Fazy zdrowe</th><th>Skutek dla stacji</th></tr>
      ${Object.keys(NEUTRALNY_OPIS).map(k => {
        const n = NEUTRALNY_OPIS[k];
        const prady = {
          izo: `${lz(Ic, 1)} A (pojemnościowy)`,
          komp: `${lz(Math.hypot(Ic * stan.v / 100, Iczynny), 1)} A (resztkowy)`,
          rez: `${lz(Math.hypot(stan.ir, Ic), 0)} A (czynny)`,
          skut: 'kiloampery'
        };
        const skutki = {
          izo: 'izolacja naprężona napięciem międzyfazowym; wolno pracować ze zwarciem',
          komp: 'łuk gaśnie sam; trzeba mierzyć C₀ po każdej zmianie konfiguracji',
          rez: 'szybkie wyłączenie, ale <strong>ostre wymagania dla uziemienia</strong>',
          skut: 'tania izolacja, drogie uziemienia i zabezpieczenia; sieci 110 kV+'
        };
        return `<tr${k === rodzaj ? ' class="wyrozniony"' : ''}>
          <td class="lb">${n.nazwa}</td>
          <td class="wart${k === rodzaj ? ' roz' : ''}">${prady[k]}</td>
          <td class="wart">${lz(n.ku, 2)} · U_f</td>
          <td class="lb">${skutki[k]}</td>
        </tr>`;
      }).join('')}`;

    /* ---- komunikat ---- */
    const kom = dane(miejsce, 'kom');
    if (rodzaj === 'izo' && Iziemne > granicaLuku) {
      komunikat(kom, 'alarm',
        `<strong>Prąd ${lz(Iziemne, 1)} A przekracza granicę samogaszenia łuku (ok. ${granicaLuku} A).</strong>
         Ta sieć nie powinna pracować z izolowanym punktem neutralnym — łuk będzie się odpalał
         ponownie i przechodził w zwarcie międzyfazowe. Potrzebna kompensacja albo rezystor.
         Zauważ, ile prądu dodaje <em>kabel</em> względem linii napowietrznej: 1 km kabla to
         ok. ${lz(3 * OMEGA * C_KABEL * 1e-6 * Uf, 1)} A, a 1 km linii tylko
         ok. ${lz(3 * OMEGA * C_LINIA * 1e-6 * Uf, 2)} A.`);
    } else if (rodzaj === 'komp') {
      const rezonans = Math.abs(stan.v) < 3;
      komunikat(kom, rezonans ? 'uwaga' : 'ok',
        rezonans
          ? `<strong>Dławik nastrojony w rezonans (v ≈ 0) — i to nie jest dobre.</strong>
             Prąd resztkowy jest wtedy najmniejszy, ale każda niesymetria pojemności daje bardzo
             wysokie U₀ w normalnej pracy, a przełączenie w sieci wrzuca układ w rezonans.
             Praktyka: przekompensowanie v = +5…+10 %.`
          : `<strong>Prąd resztkowy ${lz(Iziemne, 1)} A.</strong> Zostaje głównie składowa
             <em>czynna</em> — dlatego zabezpieczenie ziemnozwarciowe w sieci kompensowanej musi
             pracować na moc czynną (kąt ≈ 0°), a nie bierną jak w sieci izolowanej. Wstawienie
             algorytmu z sieci izolowanej daje zabezpieczenie, które nie zadziała.`);
    } else if (rodzaj === 'rez') {
      komunikat(kom, 'uwaga',
        `<strong>${lz(Iziemne, 0)} A przez uziom stacji.</strong> Identyfikacja zwarcia jest pewna
         i szybka, ale ten prąd trafia w siatkę uziemiającą i podnosi napięcie uziomowe.
         Siatka, która spełniała kryteria przy sieci izolowanej (${lz(Ic, 1)} A),
         przy ${lz(Iziemne, 0)} A może już nie spełniać wymagań napięć rażeniowych —
         uziemienie trzeba przeliczyć od nowa.`);
    } else {
      komunikat(kom, 'info',
        `<strong>Uziemienie skuteczne — układ z sieci 110 kV i wyżej.</strong> Punkt neutralny
         przesuwa się tylko częściowo (d ≈ ${o.d}), więc napięcie faz zdrowych rośnie najwyżej
         do ${lz(o.ku, 2)} · U_f. To pozwala potanieć izolację, ale prąd zwarcia doziemnego jest
         rzędu prądu zwarcia trójfazowego — cały ciężar przenosi się na uziemienia i szybkość
         zabezpieczeń.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   3. POMIAR UZIEMIENIA METODĄ SPADKU POTENCJAŁU            (rozdział 18)
   ======================================================================== */

function widgetUziom(miejsce) {
  const spec = [
    { typ: 'suwak', id: 'siatka', etykieta: 'Przekątna siatki uziemiającej', min: 3, max: 90, krok: 1, wartosc: 70 },
    { typ: 'suwak', id: 'sonda', etykieta: 'Odległość sondy prądowej <i>D</i>', min: 20, max: 600, krok: 10, wartosc: 120 },
    { typ: 'suwak', id: 'rho', etykieta: 'Rezystywność gruntu <i>ρ</i>', min: 20, max: 500, krok: 10, wartosc: 100 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Metoda spadku potencjału — kiedy pomiar jest ważny, a kiedy to śmieci</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 380" class="dg-svg" role="img"
           aria-label="Plan rozstawienia sond oraz krzywa rezystancji mierzonej w funkcji położenia sondy napięciowej">
        <text class="dg-t-b" x="8" y="18">Rozstawienie w terenie (skala pozioma zachowana)</text>
        <g data-plan></g>

        <text class="dg-t-b" x="8" y="142">Krzywa R(x) — sonda napięciowa przesuwana od siatki do sondy prądowej</text>
        <path class="dg-os" d="M56 340 H660 M56 158 V340"/>
        <g data-siatka-wykresu></g>
        <path class="dg-obszar" data-plateau d=""/>
        <path class="dg-krzywa" data-krzywa d=""/>
        <path class="dg-krzywa-2" data-prawdziwa d=""/>
        <g data-znaczniki></g>
        <text class="dg-t-m" x="56" y="358">0 %</text>
        <text class="dg-t-m sr" x="358" y="358">50 % D</text>
        <text class="dg-t-m kon" x="660" y="358">100 % D</text>
        <text class="dg-t-m" x="8" y="156">R [Ω]</text>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  function odswiez() {
    const a = stan.siatka / 2;                  // zastępczy promień półkolisty siatki [m]
    const D = stan.sonda;
    const rho = stan.rho;
    const k = rho / TAU;                        // ρ / 2π

    pokaz(miejsce, 'siatka', `${stan.siatka} m`);
    pokaz(miejsce, 'sonda', `${D} m`);
    pokaz(miejsce, 'rho', `${rho} Ω·m`);

    const Rprawdziwe = k / a;

    /* R mierzone przy sondzie napięciowej w odległości x od środka siatki */
    const Rmierzone = x => {
      if (x <= a * 1.02 || x >= D - 1) return NaN;
      return k * (1 / a - 1 / D - 1 / x + 1 / (D - x));
    };

    // próbkowanie krzywej
    const proby = [];
    for (let i = 0; i <= 160; i++) {
      const u = i / 160;
      const x = u * D;
      const R = Rmierzone(x);
      if (isFinite(R) && R > 0) proby.push([u, R]);
    }

    const Rmax = Math.max(Rprawdziwe * 2, ...proby.map(p => p[1]).filter(v => v < Rprawdziwe * 6));
    const skalaY = R => 340 - Math.min(R / Rmax, 1) * 176;
    const skalaX = u => 56 + u * 604;

    svg.querySelector('[data-krzywa]').setAttribute('d',
      sciezka(proby.map(p => [skalaX(p[0]), skalaY(p[1])])));
    svg.querySelector('[data-prawdziwa]').setAttribute('d',
      `M56 ${skalaY(Rprawdziwe).toFixed(1)} H660`);

    // ocena plateau: rozrzut w oknie 55–70 % D.
    // Progu 15 % nie dobrano dowolnie — przy D = 5·D_siatki (czyli D/a = 10) model daje
    // dokładnie ok. 15 %, więc kryterium pokrywa się z regułą odległości sondy.
    const okno = proby.filter(p => p[0] >= 0.55 && p[0] <= 0.70).map(p => p[1]);
    const minO = Math.min(...okno), maxO = Math.max(...okno);
    const rozrzut = okno.length ? (maxO - minO) / Rprawdziwe * 100 : 999;
    const plateau = rozrzut < 15;

    svg.querySelector('[data-plateau]').setAttribute('d',
      `M${skalaX(0.55).toFixed(1)} 158 H${skalaX(0.70).toFixed(1)} V340 H${skalaX(0.55).toFixed(1)} Z`);
    svg.querySelector('[data-plateau]').setAttribute('style',
      plateau ? 'fill:var(--sukces-tlo)' : 'fill:var(--alarm-tlo)');

    const R62 = Rmierzone(0.62 * D);

    /* Czułość na położenie sondy — to jest realna cena braku plateau.
       Przesunięcie sondy o ±5 % D (kilka kroków w terenie) i zmiana wskazania. */
    const Rdol = Rmierzone(0.57 * D);
    const Rgora = Rmierzone(0.67 * D);
    const czulosc = Math.max(
      Math.abs(Rgora - R62) / Rprawdziwe,
      Math.abs(R62 - Rdol) / Rprawdziwe
    ) * 100;

    svg.querySelector('[data-znaczniki]').innerHTML = `
      <path class="dg-os" style="stroke:var(--roz);stroke-dasharray:4 4"
            d="M${skalaX(0.62).toFixed(1)} 158 V340"/>
      <text class="dg-t-m roz sr" x="${skalaX(0.62).toFixed(1)}" y="172">62 %</text>
      <path class="dg-os" style="stroke:var(--${plateau ? 'sukces' : 'alarm'});stroke-width:2"
            d="M${skalaX(0.57).toFixed(1)} ${skalaY(Rdol).toFixed(1)}
               L${skalaX(0.67).toFixed(1)} ${skalaY(Rgora).toFixed(1)}"/>
      <circle r="4" cx="${skalaX(0.57).toFixed(1)}" cy="${skalaY(Rdol).toFixed(1)}"
              style="fill:var(--${plateau ? 'sukces' : 'alarm'})"/>
      <circle r="4" cx="${skalaX(0.67).toFixed(1)}" cy="${skalaY(Rgora).toFixed(1)}"
              style="fill:var(--${plateau ? 'sukces' : 'alarm'})"/>
      <circle class="dg-punkt" r="5" cx="${skalaX(0.62).toFixed(1)}" cy="${skalaY(R62).toFixed(1)}"/>
      <text class="dg-t-num roz sr" x="${skalaX(0.62).toFixed(1)}" y="${(skalaY(R62) - 14).toFixed(1)}">${lz(R62, 2)} Ω</text>
      <text class="dg-t-m ${plateau ? 'ok' : 'alarm'}" x="62" y="176">przesunięcie sondy o ± 5 % D → ± ${lz(czulosc, 0)} % wskazania</text>
      <text class="dg-t-m" x="60" y="${(skalaY(Rprawdziwe) - 6).toFixed(1)}">R rzeczywiste = ${lz(Rprawdziwe, 2)} Ω</text>`;

    // siatka pozioma wykresu
    let linie = '';
    for (let i = 1; i <= 4; i++) {
      const y = 340 - i * 176 / 4;
      linie += `<path class="dg-siatka" d="M56 ${y} H660"/>
                <text class="dg-t-m kon" x="52" y="${y + 4}">${lz(Rmax * i / 4, 1)}</text>`;
    }
    svg.querySelector('[data-siatka-wykresu]').innerHTML = linie;

    /* plan terenu — pokazujemy tylko połowę siatki w stronę sond (przekrój wzdłuż linii pomiaru) */
    const skalaPlanu = 604 / Math.max(D * 1.08, 60);
    const px = m => 56 + m * skalaPlanu;
    const promienSiatki = Math.min(Math.max(a * skalaPlanu, 5), 300);
    const strefa = Math.min(px(5 * a), 656);
    svg.querySelector('[data-plan]').innerHTML = `
      <path class="dg-os" d="M56 86 H660"/>
      <rect x="56" y="72" width="${promienSiatki.toFixed(1)}" height="28"
            rx="3" style="fill:var(--roz-mgla);stroke:var(--roz);stroke-width:2"/>
      <text class="dg-t-m" x="60" y="114">siatka: promień zastępczy a = ${lz(a, 0)} m</text>
      <path class="dg-siatka" style="stroke:var(--alarm);stroke-dasharray:5 4" d="M${strefa.toFixed(1)} 62 V100"/>
      <text class="dg-t-m alarm ${strefa > 470 ? 'kon' : 'sr'}" x="${(strefa > 470 ? 656 : strefa).toFixed(1)}" y="44">granica strefy wpływu: 5a = ${lz(5 * a, 0)} m${px(5 * a) > 656 ? ' — poza skalą rysunku →' : ''}</text>
      <path class="dg-ziemia" d="M${px(D).toFixed(1)} 72 V100 M${(px(D) - 8).toFixed(1)} 100 H${(px(D) + 8).toFixed(1)}"/>
      <text class="dg-t-m kon" x="${Math.min(px(D) + 8, 658).toFixed(1)}" y="114">sonda prądowa ${D} m</text>
      <path class="dg-ziemia" style="stroke:var(--roz)"
            d="M${px(0.62 * D).toFixed(1)} 76 V100 M${(px(0.62 * D) - 6).toFixed(1)} 100 H${(px(0.62 * D) + 6).toFixed(1)}"/>
      <text class="dg-t-m roz sr" x="${px(0.62 * D).toFixed(1)}" y="70">sonda U (62 %)</text>
      <path class="dg-krzywa-2" d="M${(56 + promienSiatki).toFixed(1)} 86 H${(px(D) - 10).toFixed(1)}"/>`;

    /* odczyty */
    const wymagane = 5 * stan.siatka;
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('R rzeczywiste uziomu', `${lz(Rprawdziwe, 2)} Ω`, 'roz', 'ρ / (2π · a), a = przekątna / 2'),
      odczyt('R zmierzone przy 62 %', `${lz(R62, 2)} Ω`, 'roz',
        'w tym modelu reguła 62 % jest dokładna — patrz komentarz'),
      odczyt('Czułość na położenie sondy', `± ${lz(czulosc, 0)} %`,
        czulosc < 5 ? 'ok' : czulosc < 12 ? 'uwaga' : 'alarm',
        'zmiana wskazania przy przesunięciu sondy o ± 5 % D'),
      odczyt('Rozrzut w oknie 55–70 %', `${lz(Math.min(rozrzut, 999), 1)} %`,
        plateau ? 'ok' : 'alarm',
        plateau ? `plateau widoczne (wymagane D ≥ ${lz(wymagane, 0)} m, masz ${D} m)`
                : `brak plateau — wymagane D ≥ ${lz(wymagane, 0)} m, masz ${D} m`)
    ].join('');

    const kom = dane(miejsce, 'kom');
    if (!plateau) {
      komunikat(kom, 'alarm',
        `<strong>Pomiar nieważny — krzywa nie ma plateau.</strong> Sonda prądowa stoi ${D} m
         od siatki o przekątnej ${stan.siatka} m, czyli <em>wewnątrz</em> strefy wpływu uziomu.
         <br><strong>Realna cena braku plateau:</strong> przesunięcie sondy napięciowej o zaledwie
         ± 5 % D — czyli ± ${lz(0.05 * D, 0)} m, kilkanaście kroków w terenie — zmienia wskazanie
         o <strong>± ${lz(czulosc, 0)} %</strong>. Wynik przestaje być pomiarem uziomu,
         a staje się pomiarem tego, gdzie akurat wbiłeś szpilkę. A miernik nie zgłosi żadnego
         błędu — pokaże ładną, stabilną liczbę.
         <br>Odsuń sondę do co najmniej ${lz(wymagane, 0)} m i zmierz krzywą w kilku punktach.`);
    } else {
      komunikat(kom, 'ok',
        `<strong>Plateau widoczne — pomiar wiarygodny.</strong> Rozrzut w oknie 55–70 % D wynosi
         ${lz(rozrzut, 1)} %, a przesunięcie sondy o ± 5 % D zmienia wskazanie tylko
         o ± ${lz(czulosc, 0)} %. Wynik jest odporny na niedokładność rozstawienia — i to jest
         właśnie sens plateau. Zwróć uwagę, ile trasy to wymagało: ${D} m przewodu prądowego
         dla siatki o przekątnej zaledwie ${stan.siatka} m. Dlatego w dużych stacjach stosuje się
         wtrysk wysokoprądowy z pomiarem selektywnym częstotliwościowo, a nie miernik
         z trzema szpilkami.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   4. PRZEKŁADNIK PRĄDOWY — OBCIĄŻENIE I NASYCENIE          (rozdział 19)
   ======================================================================== */

const CT_KLASY = {
  '5P20':   { nazwa: '5P20 (zabezpieczeniowy)', alf: 20, blad: 5,  rola: 'zabezp' },
  '5P10':   { nazwa: '5P10 (zabezpieczeniowy)', alf: 10, blad: 5,  rola: 'zabezp' },
  '10P10':  { nazwa: '10P10 (zabezpieczeniowy)', alf: 10, blad: 10, rola: 'zabezp' },
  '0.5FS5': { nazwa: '0,5 FS5 (pomiarowy)',     alf: 5,  blad: 0.5, rola: 'pomiar' }
};

function widgetPrzekladnik(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'obwod', etykieta: 'Obwód wtórny', wartosc: 'zamkniety', opcje: [
      { w: 'zamkniety', t: 'zamknięty (normalnie)' },
      { w: 'rozwarty',  t: 'ROZWARTY' }
    ] },
    { typ: 'wybor', id: 'klasa', etykieta: 'Rdzeń', wartosc: '5P20', opcje: [
      { w: '5P20', t: '5P20' }, { w: '5P10', t: '5P10' },
      { w: '10P10', t: '10P10' }, { w: '0.5FS5', t: '0,5 FS5' }
    ] },
    { typ: 'wybor', id: 'isn', etykieta: 'Prąd wtórny znamionowy', wartosc: '5', opcje: [
      { w: '1', t: '1 A' }, { w: '5', t: '5 A' }
    ] },
    { typ: 'suwak', id: 'va', etykieta: 'Moc znamionowa rdzenia', min: 5, max: 30, krok: 2.5, wartosc: 15 },
    { typ: 'suwak', id: 'trasa', etykieta: 'Długość trasy przewodów', min: 5, max: 250, krok: 5, wartosc: 100 },
    { typ: 'suwak', id: 'przekroj', etykieta: 'Przekrój przewodów', min: 1.5, max: 10, krok: 0.5, wartosc: 2.5 },
    { typ: 'suwak', id: 'krotnosc', etykieta: 'Prąd pierwotny <i>I</i>/<i>I</i><sub>n</sub>', min: 1, max: 30, krok: 1, wartosc: 15 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Przekładnik prądowy — obciążenie, punkt kolanowy i nasycenie</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 320" class="dg-svg" role="img"
           aria-label="Charakterystyka magnesowania przekładnika z zaznaczonym punktem kolanowym i punktem pracy">
        <text class="dg-t-b" x="8" y="16">Charakterystyka magnesowania i punkt pracy</text>
        <path class="dg-os" d="M62 270 H540 M62 40 V270"/>
        <text class="dg-t-m" x="8" y="36">U₂ [V]</text>
        <text class="dg-t-m kon" x="540" y="292">prąd magnesujący</text>
        <g data-siatka></g>
        <path class="dg-krzywa" data-charakterystyka d=""/>
        <g data-punkty></g>
        <g data-panel-rozwarty></g>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki"><table class="dg-tab" data-tabela></table></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  function odswiez() {
    const Isn = Number(stan.isn);
    const kl = CT_KLASY[stan.klasa];
    const Rct = Isn === 5 ? 0.5 : 4.0;                        // rezystancja uzwojenia wtórnego [Ω]
    const Zbn = stan.va / (Isn * Isn);                        // obciążenie znamionowe [Ω]
    const Vk = kl.alf * Isn * (Rct + Zbn);                    // napięcie punktu kolanowego [V]

    const Rprzewody = 2 * 0.0175 * stan.trasa / stan.przekroj; // pętla tam i z powrotem [Ω]
    const Rprzekaznik = 0.1;
    const Zb = Rprzewody + Rprzekaznik;
    const Uwymagane = stan.krotnosc * Isn * (Rct + Zb);

    pokaz(miejsce, 'va', `${lz(stan.va, 1)} VA`);
    pokaz(miejsce, 'trasa', `${stan.trasa} m`);
    pokaz(miejsce, 'przekroj', `${lz(stan.przekroj, 1)} mm²`);
    pokaz(miejsce, 'krotnosc', `${stan.krotnosc} × I_n`);

    const nasycony = Uwymagane > Vk;
    const Iwtorne = nasycony ? Vk / (Rct + Zb) : stan.krotnosc * Isn;
    const bladNasycenia = nasycony ? (1 - Iwtorne / (stan.krotnosc * Isn)) * 100 : kl.blad;
    const rozwarty = stan.obwod === 'rozwarty';

    /* charakterystyka magnesowania: U = Vk · (i/i_k)^(1/n) z ostrym kolanem */
    const Umax = Math.max(Vk * 1.55, Uwymagane * 1.05);
    const sy = U => 270 - Math.min(U / Umax, 1) * 230;
    const sx = u => 62 + u * 478;

    const pkt = [];
    for (let i = 0; i <= 120; i++) {
      const u = i / 120;
      // krzywa nasycenia: szybki wzrost do kolana, potem prawie pozioma
      const U = Vk * (1.18 * Math.pow(u, 0.42)) / (1 + 0.22 * Math.pow(u, 6));
      pkt.push([sx(u), sy(Math.max(U, 0))]);
    }
    svg.querySelector('[data-charakterystyka]').setAttribute('d', sciezka(pkt));

    let linie = '';
    for (let i = 1; i <= 4; i++) {
      const y = 270 - i * 230 / 4;
      linie += `<path class="dg-siatka" d="M62 ${y} H540"/>
                <text class="dg-t-m kon" x="58" y="${y + 4}">${lz(Umax * i / 4, 0)}</text>`;
    }
    svg.querySelector('[data-siatka]').innerHTML = linie;

    // punkt kolanowy i punkt pracy
    const uPracy = nasycony ? 0.9 : Math.min(Uwymagane / Vk * 0.5, 0.5);
    svg.querySelector('[data-punkty]').innerHTML = `
      <path class="dg-os" style="stroke:var(--sukces);stroke-dasharray:5 4"
            d="M62 ${sy(Vk).toFixed(1)} H540"/>
      <text class="dg-t-num ok" x="546" y="${(sy(Vk) + 4).toFixed(1)}">V_k = ${lz(Vk, 0)} V</text>
      <path class="dg-os" style="stroke:var(--${nasycony ? 'alarm' : 'roz'});stroke-dasharray:5 4"
            d="M62 ${sy(Uwymagane).toFixed(1)} H540"/>
      <text class="dg-t-num ${nasycony ? 'alarm' : 'roz'}" x="546" y="${(sy(Uwymagane) + 4).toFixed(1)}">U₂ potrzebne = ${lz(Uwymagane, 0)} V</text>
      <circle r="6" cx="${sx(uPracy).toFixed(1)}" cy="${sy(Math.min(Uwymagane, Vk)).toFixed(1)}"
              style="fill:var(--${nasycony ? 'alarm' : 'sukces'});stroke:var(--tlo-2);stroke-width:2"/>
      <text class="dg-t-m ${nasycony ? 'alarm' : 'ok'} sr"
            x="${sx(uPracy).toFixed(1)}" y="${(sy(Math.min(Uwymagane, Vk)) - 14).toFixed(1)}">${nasycony ? 'NASYCENIE' : 'praca liniowa'}</text>`;

    svg.querySelector('[data-panel-rozwarty]').innerHTML = rozwarty ? `
      <rect x="66" y="44" width="470" height="222" rx="8"
            style="fill:var(--alarm-tlo);stroke:var(--alarm);stroke-width:2.4"/>
      <text class="dg-t-b alarm sr" x="301" y="120" style="font-size:19px">ROZWARTY OBWÓD WTÓRNY</text>
      <text class="dg-t sr alarm" x="301" y="150">rdzeń w głębokim nasyceniu, na zaciskach szpilki kilku–kilkudziesięciu kV</text>
      <text class="dg-t-m sr" x="301" y="176">cały prąd pierwotny staje się prądem magnesującym —</text>
      <text class="dg-t-m sr" x="301" y="194">nie ma prądu wtórnego, który skompensowałby strumień</text>
      <text class="dg-t sr ok" x="301" y="226">stan bezpieczny dla CT to obwód ZWARTY</text>` : '';

    /* odczyty */
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Obciążenie znamionowe', `${lz(Zbn, 2)} Ω`, 'roz', `${lz(stan.va, 1)} VA / (${Isn} A)²`),
      odczyt('Obciążenie rzeczywiste', `${lz(Zb, 2)} Ω`,
        Zb > Zbn ? 'alarm' : 'ok',
        `przewody ${lz(Rprzewody, 2)} Ω + przekaźnik ${lz(Rprzekaznik, 1)} Ω`),
      odczyt('Napięcie kolanowe <i>V</i><sub>k</sub>', `${lz(Vk, 0)} V`, 'roz',
        `${kl.alf} × ${Isn} × (${lz(Rct, 1)} + ${lz(Zbn, 2)})`),
      odczyt('Błąd przy tym prądzie', `${lz(bladNasycenia, 1)} %`,
        nasycony ? 'alarm' : 'ok',
        nasycony ? 'rdzeń nasycony — prąd wtórny obcięty' : `w granicach klasy (${lz(kl.blad, 1)} %)`)
    ].join('');

    /* tabela obciążenia */
    dane(miejsce, 'tabela').innerHTML = `
      <tr><th>Składnik obciążenia wtórnego</th><th>Wartość</th><th>Uwaga</th></tr>
      <tr><td class="lb">rezystancja uzwojenia wtórnego R_ct</td><td class="wart">${lz(Rct, 2)} Ω</td>
          <td class="lb">wartość typowa dla ${Isn} A; wchodzi do V_k, nie do obciążenia zewnętrznego</td></tr>
      <tr><td class="lb">przewody: 2 × ρ × l / S</td><td class="wart ${Rprzewody > Zbn ? 'alarm' : ''}">${lz(Rprzewody, 2)} Ω</td>
          <td class="lb">2 × 0,0175 × ${stan.trasa} m / ${lz(stan.przekroj, 1)} mm² — <strong>pętla tam i z powrotem</strong></td></tr>
      <tr><td class="lb">przekaźnik i styki</td><td class="wart">${lz(Rprzekaznik, 2)} Ω</td>
          <td class="lb">nowoczesne przekaźniki cyfrowe mają znikome obciążenie</td></tr>
      <tr><td class="lb"><strong>razem obciążenie zewnętrzne</strong></td>
          <td class="wart ${Zb > Zbn ? 'alarm' : 'ok'}">${lz(Zb, 2)} Ω</td>
          <td class="lb">${Zb > Zbn
            ? `<strong>przekroczone ${lz(Zb / Zbn, 1)}×</strong> — klasa dokładności przestaje obowiązywać`
            : `mieści się w ${lz(Zbn, 2)} Ω (${lz(Zb / Zbn * 100, 0)} % zapasu wykorzystane)`}</td></tr>`;

    /* komunikat */
    const kom = dane(miejsce, 'kom');
    if (rozwarty) {
      komunikat(kom, 'alarm',
        `<strong>Nigdy nie rozwieraj obwodu wtórnego przekładnika prądowego pod prądem.</strong>
         Przekładnik prądowy jest zasilany ze <em>źródła prądowego</em> — prąd pierwotny jest
         wymuszony przez sieć i nie zależy od tego, co dzieje się we wtórnym. Po rozwarciu znika
         strumień kompensujący, rdzeń wchodzi w głębokie nasycenie, a z U = N · dΦ/dt powstają
         szpilki napięciowe rzędu kilku do kilkudziesięciu kV. Zapamiętaj symetrię odwrotną:
         <strong>dla CT groźne jest rozwarcie, dla VT — zwarcie.</strong>
         Nieużywany rdzeń CT musi być zwarty, nie otwarty.`);
    } else if (kl.rola === 'pomiar' && stan.krotnosc > kl.alf) {
      komunikat(kom, 'uwaga',
        `<strong>Rdzeń pomiarowy nasyca się celowo — i właśnie dlatego nie wolno wieszać na nim
         zabezpieczenia.</strong> Współczynnik bezpieczeństwa przyrządowego FS = ${kl.alf} oznacza,
         że przy ${kl.alf} × I_n rdzeń już jest nasycony, żeby ochronić licznik i mierniki.
         Przy ${stan.krotnosc} × I_n przekaźnik dostałby ${lz(Iwtorne, 1)} A zamiast
         ${lz(stan.krotnosc * Isn, 1)} A — czyli <strong>nie zobaczyłby zwarcia</strong>.
         Do zabezpieczeń służy rdzeń klasy P, liniowy do wielokrotności ALF.`);
    } else if (nasycony) {
      komunikat(kom, 'alarm',
        `<strong>Rdzeń nasycony przy ${stan.krotnosc} × I_n.</strong> Do prawidłowej pracy
         potrzeba U₂ = ${lz(Uwymagane, 0)} V, a punkt kolanowy leży przy ${lz(Vk, 0)} V.
         Zabezpieczenie dostanie ${lz(Iwtorne, 1)} A zamiast ${lz(stan.krotnosc * Isn, 1)} A —
         błąd ${lz(bladNasycenia, 1)} %. Winowajcą jest zwykle <strong>obciążenie przewodów</strong>:
         przy ${stan.trasa} m i ${lz(stan.przekroj, 1)} mm² sama trasa daje ${lz(Rprzewody, 2)} Ω.
         Zmniejsz trasę, zwiększ przekrój — albo przejdź na obwód 1 A, gdzie straty w przewodach
         są 25× mniejsze (P = I²R).`);
    } else {
      komunikat(kom, 'ok',
        `<strong>Układ pracuje liniowo.</strong> Potrzebne U₂ = ${lz(Uwymagane, 0)} V mieści się
         pod punktem kolanowym ${lz(Vk, 0)} V, więc przy ${stan.krotnosc} × I_n przekaźnik dostaje
         rzeczywisty prąd. Spróbuj teraz wydłużyć trasę albo zmniejszyć przekrój i zobacz,
         jak szybko obciążenie przewodów wysadza klasę — obliczenie obciążenia to obowiązkowy
         element protokołu, nie formalność.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   5. REZYSTANCJA IZOLACJI — TEMPERATURA, DAR I PI           (rozdział 20)
   ======================================================================== */

/* Wykładnik krzywej R(t) = R60 · (t/60)^n dobrany tak, aby dawał realistyczne PI. */
const IZOLACJA_STANY = {
  sucha:    { nazwa: 'sucha, zdrowa',        n:  0.602, opis: 'polaryzacja rozwija się długo — R rośnie przez cały pomiar' },
  dobra:    { nazwa: 'dobra',               n:  0.380, opis: 'wyraźny wzrost, brak oznak zawilgocenia' },
  wilgotna: { nazwa: 'lekko zawilgocona',   n:  0.114, opis: 'krzywa szybko się wypłaszcza — prąd upływu dominuje' },
  mokra:    { nazwa: 'mocno zawilgocona',   n: -0.097, opis: 'R SPADA w czasie — izolacja pochłania wilgoć pod napięciem' }
};

function widgetIzolacja(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'stanIzo', etykieta: 'Stan izolacji', wartosc: 'sucha', opcje: [
      { w: 'sucha', t: 'sucha' }, { w: 'dobra', t: 'dobra' },
      { w: 'wilgotna', t: 'zawilgocona' }, { w: 'mokra', t: 'mocno zawilgocona' }
    ] },
    { typ: 'suwak', id: 'r60', etykieta: 'Odczyt po 60 s <i>R</i><sub>60</sub>', min: 10, max: 2000, krok: 10, wartosc: 500 },
    { typ: 'suwak', id: 'temp', etykieta: 'Temperatura obiektu', min: -5, max: 60, krok: 1, wartosc: 35 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Rezystancja izolacji — kształt krzywej i korekta temperaturowa</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 300" class="dg-svg" role="img"
           aria-label="Krzywa rezystancji izolacji w czasie z zaznaczonymi punktami 30 s, 60 s i 10 minut">
        <text class="dg-t-b" x="8" y="16">R(t) — przebieg wskazania megaomomierza</text>
        <path class="dg-os" d="M62 250 H660 M62 34 V250"/>
        <g data-siatka></g>
        <path class="dg-krzywa" data-krzywa d=""/>
        <g data-znaczniki></g>
        <text class="dg-t-m" x="8" y="30">R [MΩ]</text>
        <text class="dg-t-m" x="62" y="270">0</text>
        <text class="dg-t-m sr" x="361" y="270">5 min</text>
        <text class="dg-t-m kon" x="660" y="270">10 min</text>
        <text class="dg-t-m sr" x="361" y="290">czas od przyłożenia napięcia probierczego</text>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki">
      <div class="dg-wzor" data-wzor></div>
    </div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  function odswiez() {
    const s = IZOLACJA_STANY[stan.stanIzo];
    const R60 = stan.r60;
    const T = stan.temp;

    pokaz(miejsce, 'r60', `${lz(R60, 0)} MΩ`);
    pokaz(miejsce, 'temp', `${T} °C`);

    const R = t => R60 * Math.pow(t / 60, s.n);
    const R30 = R(30), R600 = R(600);
    const DAR = R60 / R30;
    const PI = R600 / R60;

    // korekta temperaturowa: podwojenie na każde 10 °C
    const KT = Math.pow(2, (T - 20) / 10);
    const R20 = R60 * KT;

    /* wykres */
    const Rmax = Math.max(R(600), R(15)) * 1.15;
    const sy = r => 250 - Math.min(r / Rmax, 1) * 216;
    const sx = t => 62 + (t / 600) * 598;

    const pkt = [];
    for (let t = 5; t <= 600; t += 5) pkt.push([sx(t), sy(R(t))]);
    svg.querySelector('[data-krzywa]').setAttribute('d', sciezka(pkt));

    let linie = '';
    for (let i = 1; i <= 4; i++) {
      const y = 250 - i * 216 / 4;
      linie += `<path class="dg-siatka" d="M62 ${y} H660"/>
                <text class="dg-t-m kon" x="58" y="${y + 4}">${lz(Rmax * i / 4, 0)}</text>`;
    }
    svg.querySelector('[data-siatka]').innerHTML = linie;

    const znacznik = (t, etykieta, kolor) => `
      <path class="dg-os" style="stroke:${kolor};stroke-dasharray:4 4"
            d="M${sx(t).toFixed(1)} ${sy(R(t)).toFixed(1)} V250"/>
      <circle r="5" cx="${sx(t).toFixed(1)}" cy="${sy(R(t)).toFixed(1)}"
              style="fill:${kolor};stroke:var(--tlo-2);stroke-width:2"/>
      <text class="dg-t-num sr" style="fill:${kolor}"
            x="${sx(t).toFixed(1)}" y="${(sy(R(t)) - 12).toFixed(1)}">${lz(R(t), 0)}</text>
      <text class="dg-t-m sr" style="fill:${kolor}" x="${sx(t).toFixed(1)}" y="264">${etykieta}</text>`;

    svg.querySelector('[data-znaczniki]').innerHTML =
      znacznik(30, '30 s', 'var(--atrament-3)') +
      znacznik(60, '60 s', 'var(--ostrzezenie)') +
      znacznik(600, '10 min', 'var(--roz)');

    /* ocena */
    const ocenaPI = PI < 1 ? ['alarm', 'alarmujące'] : PI < 2 ? ['uwaga', 'wątpliwe']
      : PI < 4 ? ['ok', 'dobre'] : ['ok', 'bardzo dobre'];
    const piBezSensu = R60 * KT > 5000;

    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('DAR = R₆₀ / R₃₀', lz(DAR, 2), DAR < 1.25 ? 'uwaga' : 'ok',
        `${lz(R60, 0)} / ${lz(R30, 0)} MΩ`),
      odczyt('PI = R₆₀₀ / R₆₀', lz(PI, 2), ocenaPI[0],
        `${ocenaPI[1]}${piBezSensu ? ' — ale patrz niżej' : ''}`),
      odczyt('Współczynnik <i>K</i><sub>T</sub>', lz(KT, 2), 'roz',
        `2^((${T} − 20) / 10)`),
      odczyt('R przeliczone na 20 °C', `${lz(R20, 0)} MΩ`, 'roz',
        `zmierzone ${lz(R60, 0)} MΩ w ${T} °C`)
    ].join('');

    dane(miejsce, 'wzor').innerHTML = `
Krzywa:            R(t) = R₆₀ · (t/60)<b>ⁿ</b>      n = ${lz(s.n, 3)}  (${s.nazwa})
Wskaźnik absorpcji: DAR = R₆₀ / R₃₀       = ${lz(R60, 0)} / ${lz(R30, 0)} = <b>${lz(DAR, 2)}</b>
Wskaźnik polaryzacji: PI = R₆₀₀ / R₆₀     = ${lz(R600, 0)} / ${lz(R60, 0)} = <b>${lz(PI, 2)}</b>
Korekta temperatury: K_T = 2^((T−20)/10)  = 2^((${T}−20)/10) = <b>${lz(KT, 2)}</b>
                     R₂₀ = R_T · K_T      = ${lz(R60, 0)} · ${lz(KT, 2)} = <b>${lz(R20, 0)} MΩ</b>`;

    const kom = dane(miejsce, 'kom');
    if (piBezSensu) {
      komunikat(kom, 'info',
        `<strong>Tu PI traci sens — i to jest pułapka na wynikach nowoczesnej izolacji.</strong>
         R przeliczone na 20 °C to ${lz(R20, 0)} MΩ. Gdy izolacja jest bardzo sucha, R jest wysokie
         już od pierwszej sekundy, więc stosunek R₆₀₀/R₆₀ dąży do 1 — co <em>wygląda</em> na zły
         wynik. IEEE 43 rozstrzyga: jeśli R₁ min przekracza 5000 MΩ, PI nie jest wymagane
         i nie należy go interpretować.`);
    } else if (s.n < 0) {
      komunikat(kom, 'alarm',
        `<strong>R spada w czasie — PI = ${lz(PI, 2)}.</strong> To najgorszy możliwy przebieg:
         izolacja pod napięciem pochłania wilgoć i przewodzi coraz lepiej. Zwróć uwagę, że
         <em>sama wartość</em> ${lz(R60, 0)} MΩ mogłaby wyglądać przyzwoicie — dopiero kształt
         krzywej ujawnia problem. Dlatego wskaźniki DAR i PI są ważniejsze od pojedynczego odczytu.`);
    } else if (Math.abs(T - 20) > 8) {
      komunikat(kom, 'uwaga',
        `<strong>Bez korekty temperaturowej ten wynik jest nieporównywalny.</strong>
         ${lz(R60, 0)} MΩ zmierzone w ${T} °C to ${lz(R20, 0)} MΩ po przeliczeniu na 20 °C —
         różnica ${lz(Math.abs(R20 / R60 - 1) * 100, 0)} %. Rezystancja izolacji zmienia się
         w przybliżeniu dwukrotnie na każde 10 °C, więc ten sam zdrowy obiekt zmierzony
         w mrozie i w upale da wyniki różniące się kilkukrotnie. Porównywanie pomiarów rok do roku
         bez korekty jest bez wartości. Utrzymuj jedną bazę w całej historii obiektu.`);
    } else {
      komunikat(kom, 'ok',
        `<strong>PI = ${lz(PI, 2)} — ${ocenaPI[1]}.</strong> Pomiar w ${T} °C jest blisko bazy 20 °C,
         więc korekta jest niewielka (K_T = ${lz(KT, 2)}). Pamiętaj, że pierwsze dziesiątki sekund
         na obiekcie o dużej pojemności (kabel, uzwojenie WN) to prąd <em>ładowania pojemności</em>,
         a nie prąd upływu — dlatego odczyt po 15 s nie mierzy tego, co chcesz zmierzyć.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   6. WSPÓŁCZYNNIK STRAT DIELEKTRYCZNYCH tg δ               (rozdział 20)
   ======================================================================== */

function widgetTgDelta(miejsce) {
  const spec = [
    { typ: 'suwak', id: 'poziom', etykieta: 'Poziom tg δ przy 0,5 <i>U</i>₀', min: 0.1, max: 2.5, krok: 0.05, wartosc: 0.4 },
    { typ: 'suwak', id: 'tipup', etykieta: 'Przyrost z napięciem (tip-up)', min: 0, max: 1.5, krok: 0.05, wartosc: 0.05 },
    { typ: 'suwak', id: 'rozrzut', etykieta: 'Rozrzut między fazami', min: 0, max: 60, krok: 2, wartosc: 6 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>tg δ — trzy wskaźniki, które trzeba czytać razem</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 290" class="dg-svg" role="img"
           aria-label="Zależność tangensa delta od napięcia probierczego dla trzech faz">
        <text class="dg-t-b" x="8" y="16">tg δ w funkcji napięcia probierczego — trzy fazy osobno</text>
        <path class="dg-os" d="M66 240 H520 M66 34 V240"/>
        <g data-siatka></g>
        <g data-krzywe></g>
        <text class="dg-t-m" x="8" y="30">tg δ [%]</text>
        <text class="dg-t-m sr" x="66" y="260">0,2 U₀</text>
        <text class="dg-t-m sr" x="293" y="260">0,6 U₀</text>
        <text class="dg-t-m sr" x="520" y="260">1,0 U₀</text>
        <g data-legenda></g>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  function odswiez() {
    const p = stan.poziom, tu = stan.tipup, rz = stan.rozrzut;

    pokaz(miejsce, 'poziom', `${lz(p, 2)} %`);
    pokaz(miejsce, 'tipup', `${lz(tu, 2)} pp`);
    pokaz(miejsce, 'rozrzut', `${rz} %`);

    // tg δ rośnie z napięciem dopiero po przekroczeniu napięcia zapłonu WNZ (~0,55 U0)
    const tg = (u, mnoznik) => {
      const jonizacja = u > 0.55 ? tu * Math.pow((u - 0.55) / 0.45, 1.7) : 0;
      return (p + jonizacja) * mnoznik;
    };
    const fazy = [
      { n: 'L1', m: 1, k: 'var(--roz)' },
      { n: 'L2', m: 1 + rz / 100, k: 'var(--ostrzezenie)' },
      { n: 'L3', m: 1 - rz / 200, k: 'var(--sukces)' }
    ];

    const tgMax = Math.max(1.2, ...fazy.map(f => tg(1, f.m))) * 1.2;
    const sy = v => 240 - Math.min(v / tgMax, 1) * 206;
    const sx = u => 66 + ((u - 0.2) / 0.8) * 454;

    svg.querySelector('[data-krzywe]').innerHTML = fazy.map(f => {
      const pkt = [];
      for (let u = 0.2; u <= 1.001; u += 0.02) pkt.push([sx(u), sy(tg(u, f.m))]);
      return `<path style="fill:none;stroke:${f.k};stroke-width:2.6" d="${sciezka(pkt)}"/>
              <circle r="4" cx="${sx(1).toFixed(1)}" cy="${sy(tg(1, f.m)).toFixed(1)}" style="fill:${f.k}"/>
              <text class="dg-t-num" style="fill:${f.k}" x="528" y="${(sy(tg(1, f.m)) + 4).toFixed(1)}">${f.n} ${lz(tg(1, f.m), 2)} %</text>`;
    }).join('');

    let linie = '';
    for (let i = 1; i <= 4; i++) {
      const y = 240 - i * 206 / 4;
      linie += `<path class="dg-siatka" d="M66 ${y} H520"/>
                <text class="dg-t-m kon" x="62" y="${y + 4}">${lz(tgMax * i / 4, 2)}</text>`;
    }
    // linia napięcia zapłonu WNZ
    linie += `<path class="dg-os" style="stroke:var(--alarm);stroke-dasharray:4 4" d="M${sx(0.55).toFixed(1)} 34 V240"/>
              <text class="dg-t-m alarm sr" x="${sx(0.55).toFixed(1)}" y="30">napięcie zapłonu WNZ</text>`;
    svg.querySelector('[data-siatka]').innerHTML = linie;

    svg.querySelector('[data-legenda]').innerHTML = `
      <text class="dg-t-m" x="66" y="280">linia przerywana: powyżej niej zapalają się wyładowania we wtrąceniach gazowych — stąd zakrzywienie</text>`;

    /* ocena trzech wskaźników osobno */
    const ocenaP = p < 0.5 ? ['ok', 'nowa / bardzo dobra'] : p < 0.7 ? ['ok', 'dobra']
      : p <= 1.0 ? ['uwaga', 'wątpliwa'] : ['alarm', 'zła'];
    const ocenaT = tu < 0.1 ? ['ok', 'brak jonizacji'] : tu < 0.3 ? ['uwaga', 'początek jonizacji']
      : ['alarm', 'aktywne WNZ we wtrąceniach'];
    const ocenaR = rz < 15 ? ['ok', 'fazy zgodne'] : rz < 25 ? ['uwaga', 'na granicy']
      : ['alarm', 'jedna faza odstaje'];

    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('1. Poziom tg δ', `${lz(p, 2)} %`, ocenaP[0], `${ocenaP[1]} — ocena <strong>globalna</strong>`),
      odczyt('2. Tip-up Δtg δ', `${lz(tu, 2)} pp`, ocenaT[0], `${ocenaT[1]} — defekt <strong>lokalny</strong>`),
      odczyt('3. Rozrzut faz', `${rz} %`, ocenaR[0], `${ocenaR[1]} — kryterium <strong>porównawcze</strong>`),
      odczyt('Wniosek', ocenaP[0] === 'alarm' || ocenaT[0] === 'alarm' || ocenaR[0] === 'alarm'
        ? 'do wyjaśnienia' : ocenaP[0] === 'uwaga' || ocenaT[0] === 'uwaga' || ocenaR[0] === 'uwaga'
          ? 'obserwować' : 'stan dobry',
        ocenaP[0] === 'alarm' || ocenaT[0] === 'alarm' || ocenaR[0] === 'alarm' ? 'alarm'
          : ocenaP[0] === 'uwaga' || ocenaT[0] === 'uwaga' || ocenaR[0] === 'uwaga' ? 'uwaga' : 'ok',
        'najgorszy z trzech wskaźników decyduje')
    ].join('');

    const kom = dane(miejsce, 'kom');
    if (ocenaT[0] === 'alarm' && ocenaP[0] === 'ok') {
      komunikat(kom, 'alarm',
        `<strong>To jest przypadek, którego jeden pomiar przy 10 kV nie wykryje.</strong>
         Poziom tg δ jest niski (${lz(p, 2)} %) — obiekt wygląda zdrowo. Ale tip-up
         ${lz(tu, 2)} punktu procentowego mówi, że przy napięciu roboczym zapalają się
         wyładowania w wtrąceniach gazowych. Poziom tg δ jest wskaźnikiem <em>globalnym</em>
         (zawilgocenie całej objętości), a tip-up <em>lokalnym</em> (defekt punktowy).
         Zdrowa izolacja ma tg δ niezależne od napięcia, bo straty rosną proporcjonalnie do U².`);
    } else if (ocenaR[0] === 'alarm') {
      komunikat(kom, 'alarm',
        `<strong>Rozrzut ${rz} % między fazami — najprostsze i zaskakująco skuteczne kryterium.</strong>
         Trzy fazy tego samego obiektu przeszły tę samą historię produkcyjną i termiczną, więc
         powinny dawać zbliżone wyniki. Rozrzut powyżej 20–30 % to podejrzenie defektu
         <em>nawet bez pomiaru odbiorczego w historii</em>. To ratunek, gdy nie masz bazy
         odniesienia — a bez niej bezwzględna wartość tg δ to niemal zgadywanie.`);
    } else if (ocenaP[0] === 'alarm') {
      komunikat(kom, 'alarm',
        `<strong>tg δ = ${lz(p, 2)} % — zawilgocenie lub zaawansowane starzenie całej izolacji.</strong>
         Przy takim poziomie sam pomiar przy 50 Hz nie rozdzieli przyczyn: nie wiesz, czy to
         przewodność oleju, czy woda w celulozie. Do tego służy <strong>DFR/FDS</strong> —
         pomiar tg δ w funkcji częstotliwości od ok. 1 mHz do 1 kHz, gdzie niskie częstotliwości
         pokazują olej, średnie zawilgocenie papieru, a wysokie geometrię układu.`);
    } else {
      komunikat(kom, 'ok',
        `<strong>Wszystkie trzy wskaźniki w normie.</strong> Poziom ${lz(p, 2)} %, tip-up
         ${lz(tu, 2)} pp, rozrzut faz ${rz} %. Pamiętaj jednak, że tg δ ma wartość przede wszystkim
         <em>trendową</em>: najlepszym odniesieniem jest pomiar odbiorczy tego obiektu, potem
         historia, a na końcu porównanie faz i obiektu siostrzanego. Dlatego pomiar przy przyjęciu
         do eksploatacji jest krytyczny, nawet gdy „wszystko jest nowe i pewnie dobre”.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   7. WZORCE PRPD — ROZPOZNAWANIE RODZAJU DEFEKTU           (rozdział 21)
   ======================================================================== */

const PRPD_WZORCE = {
  wewnetrzne: {
    nazwa: 'Wtrącenie gazowe wewnętrzne',
    ile: 260,
    opis: 'Dwa <strong>symetryczne</strong> skupiska na zboczach narastających obu połówek, o podobnych amplitudach. Symetria jest kluczem: pustka w objętości izolacji „nie wie”, która polaryzacja jest która.',
    diagnoza: 'Defekt rozwojowy — eroduje ścianki pustki, prowadzi do drzewienia elektrycznego i przebicia. Najpoważniejszy z czterech.',
    ton: 'alarm',
    losuj: r => {
      const galaz = r() < 0.5 ? 0 : 180;
      return { faza: galaz + 20 + r() * 70, ampl: 0.30 + r() * 0.45 };
    }
  },
  powierzchniowe: {
    nazwa: 'Wyładowanie powierzchniowe',
    ile: 220,
    opis: 'Rozkład <strong>asymetryczny</strong> — dodatnia połówka ma większe amplitudy i szerszy rozrzut fazowy niż ujemna. Wyładowanie biegnie po powierzchni, więc geometria elektrod łamie symetrię.',
    diagnoza: 'Zabrudzenie, zawilgocenie powierzchni, wadliwe sterowanie polem w głowicy lub mufie. Częste po złym montażu.',
    ton: 'alarm',
    losuj: r => (r() < 0.68
      ? { faza: 15 + r() * 130, ampl: 0.35 + r() * 0.6 }
      : { faza: 200 + r() * 120, ampl: 0.15 + r() * 0.3 })
  },
  koronacja: {
    nazwa: 'Koronacja (ostrze–płaszczyzna)',
    ile: 420,
    opis: 'Wyładowania <strong>tylko w jednej połówce</strong>, bardzo regularne, o małej amplitudzie i dużej liczbie zdarzeń, skupione blisko szczytu napięcia. Emisja z ostrza silnie zależy od polaryzacji.',
    diagnoza: 'Ostra krawędź, zadzior, luźny drut, nieosłonięty koniec ekranu. Mało groźne dla izolacji stałej — ale generuje ozon i zakłóca pomiary.',
    ton: 'uwaga',
    losuj: r => ({ faza: 240 + r() * 62, ampl: 0.08 + r() * 0.16 })
  },
  iskrzenie: {
    nazwa: 'Iskrzenie stykowe / luźna część',
    ile: 90,
    opis: 'Zdarzenia <strong>rozłożone przypadkowo w fazie</strong>, bez korelacji z przebiegiem napięcia, o dużych i nieregularnych amplitudach.',
    diagnoza: 'Luźne połączenie śrubowe, element o pływającym potencjale, pęknięta spoina. Nie jest to defekt izolacji — to defekt mechaniczny, ale niszczy szybko.',
    ton: 'alarm',
    losuj: r => ({ faza: r() * 360, ampl: 0.45 + r() * 0.5 })
  }
};

function widgetPrpd(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'wzorzec', etykieta: 'Rodzaj defektu', wartosc: 'wewnetrzne', opcje: [
      { w: 'wewnetrzne', t: 'wtrącenie gazowe' },
      { w: 'powierzchniowe', t: 'powierzchniowe' },
      { w: 'koronacja', t: 'koronacja' },
      { w: 'iskrzenie', t: 'iskrzenie stykowe' }
    ] },
    { typ: 'suwak', id: 'tlo', etykieta: 'Poziom tła zakłóceń', min: 0, max: 100, krok: 5, wartosc: 15 },
    { typ: 'suwak', id: 'ladunek', etykieta: 'Ładunek szczytowy', min: 20, max: 3000, krok: 20, wartosc: 400 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>PRPD — wzorzec fazowo-rozdzielczy zdradza rodzaj defektu</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 330" class="dg-svg" role="img"
           aria-label="Wykres fazowo-rozdzielczy wyładowań niezupełnych na tle przebiegu napięcia sieciowego">
        <path class="dg-os" d="M62 300 H660 M62 20 V300"/>
        <path class="dg-os" style="stroke-dasharray:3 3" d="M62 160 H660"/>
        <path class="dg-krzywa-2" data-sinus d=""/>
        <g data-siatka></g>
        <g data-punkty-tlo></g>
        <g data-punkty></g>
        <text class="dg-t-m" x="8" y="16">ładunek [pC]</text>
        <text class="dg-t-m" x="62" y="318">0°</text>
        <text class="dg-t-m sr" x="211" y="318">90°</text>
        <text class="dg-t-m sr" x="361" y="318">180°</text>
        <text class="dg-t-m sr" x="510" y="318">270°</text>
        <text class="dg-t-m kon" x="660" y="318">360°</text>
        <text class="dg-t-m" x="66" y="156">0</text>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  // przebieg napięcia odniesienia 50 Hz
  const sinus = [];
  for (let f = 0; f <= 360; f += 3) {
    sinus.push([62 + f / 360 * 598, 160 - Math.sin(f * Math.PI / 180) * 118]);
  }
  svg.querySelector('[data-sinus]').setAttribute('d', sciezka(sinus));

  function odswiez() {
    const w = PRPD_WZORCE[stan.wzorzec];
    const Q = stan.ladunek;
    const tlo = stan.tlo;

    pokaz(miejsce, 'tlo', `${tlo} %`);
    pokaz(miejsce, 'ladunek', `${lz(Q, 0)} pC`);

    const sx = faza => 62 + (faza % 360) / 360 * 598;
    const sy = (ampl, dodatnia) => 160 - (dodatnia ? 1 : -1) * ampl * 118;

    /* punkty defektu — losowanie powtarzalne, więc wykres nie skacze */
    const r = losowacz(1337);
    let kropki = '';
    for (let i = 0; i < w.ile; i++) {
      const p = w.losuj(r);
      const dodatnia = (p.faza % 360) < 180;
      kropki += `<circle r="2.1" cx="${sx(p.faza).toFixed(1)}" cy="${sy(p.ampl, dodatnia).toFixed(1)}"
                 style="fill:var(--roz);opacity:.72"/>`;
    }
    svg.querySelector('[data-punkty]').innerHTML = kropki;

    /* tło zakłóceń — rozłożone równomiernie po fazie */
    const rt = losowacz(4242);
    let kropkiTla = '';
    const ileTla = Math.round(tlo * 3.2);
    for (let i = 0; i < ileTla; i++) {
      const faza = rt() * 360;
      const ampl = rt() * (tlo / 100) * 0.42;
      kropkiTla += `<circle r="1.7" cx="${sx(faza).toFixed(1)}" cy="${sy(ampl, rt() < 0.5).toFixed(1)}"
                    style="fill:var(--atrament-3);opacity:.5"/>`;
    }
    svg.querySelector('[data-punkty-tlo]').innerHTML = kropkiTla;

    let linie = '';
    [0.5, 1].forEach(u => {
      [1, -1].forEach(zn => {
        const y = 160 - zn * u * 118;
        linie += `<path class="dg-siatka" d="M62 ${y} H660"/>
                  <text class="dg-t-m kon" x="58" y="${y + 4}">${lz(Q * u, 0)}</text>`;
      });
    });
    svg.querySelector('[data-siatka]').innerHTML = linie;

    /* czy defekt jest jeszcze widoczny nad tłem */
    const Qtlo = Q * (tlo / 100) * 0.42;
    const amplMin = stan.wzorzec === 'koronacja' ? 0.08 : stan.wzorzec === 'wewnetrzne' ? 0.30 : 0.15;
    const utoniete = Qtlo > Q * amplMin;

    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Rodzaj wzorca', w.nazwa.split(' ')[0], w.ton, w.nazwa),
      odczyt('Ładunek szczytowy', `${lz(Q, 0)} pC`, 'roz', 'wartość pozorna — zależy od układu pomiarowego'),
      odczyt('Poziom tła', `${lz(Qtlo, 0)} pC`, utoniete ? 'alarm' : 'ok',
        utoniete ? 'defekt utonął w zakłóceniach' : 'defekt czytelny nad tłem'),
      odczyt('Liczba zdarzeń', lz(w.ile, 0), '', 'na okres odniesienia')
    ].join('');

    const kom = dane(miejsce, 'kom');
    if (utoniete) {
      komunikat(kom, 'alarm',
        `<strong>Tło ${lz(Qtlo, 0)} pC zasłoniło defekt — i to jest realna bariera pomiaru
         elektrycznego w czynnej stacji.</strong> Szukasz sygnałów rzędu ${lz(Q * amplMin, 0)} pC,
         a otoczenie daje ${lz(Qtlo, 0)} pC. Stąd wymagania: hala ekranowana, filtry sieciowe,
         transformator probierczy bezwyładowaniowy (własny poziom &lt; 5 pC), bramkowanie czasowe
         i korelacja dwóch czujników. Alternatywa, która obchodzi problem: pomiar
         <strong>UHF</strong> (0,3–3 GHz) — zakłócenia sieciowe i koronacja nie mają składowych
         w tym pasmie.`);
    } else {
      komunikat(kom, w.ton,
        `<strong>${w.nazwa}.</strong> ${w.opis} <br><strong>Znaczenie:</strong> ${w.diagnoza}
         <br><em>Uwaga o jednostkach:</em> pikokulomby <strong>nie są wielkością absolutną</strong> —
         ładunek pozorny zależy od pojemności obiektu, kondensatora sprzęgającego i geometrii
         przewodów. Wynik „${lz(Q, 0)} pC” bez opisu układu i drogi kalibracji nie znaczy nic,
         a każda zmiana konfiguracji wymaga ponownej kalibracji.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   8. LOKALIZACJA WNZ W KABLU — REFLEKTOMETRIA               (rozdział 21)
   ======================================================================== */

function widgetTdr(miejsce) {
  const spec = [
    { typ: 'suwak', id: 'dlugosc', etykieta: 'Długość kabla <i>L</i>', min: 0.5, max: 8, krok: 0.1, wartosc: 3.2 },
    { typ: 'suwak', id: 'defekt', etykieta: 'Rzeczywiste położenie defektu', min: 0.05, max: 7.9, krok: 0.05, wartosc: 1.9 },
    { typ: 'wybor', id: 'izolacja', etykieta: 'Rodzaj izolacji', wartosc: '170', opcje: [
      { w: '170', t: 'XLPE (170 m/µs)' },
      { w: '150', t: 'papier-olej (150 m/µs)' }
    ] },
    { typ: 'wybor', id: 'tlumienie', etykieta: 'Uwzględnij tłumienie', wartosc: 'tak', opcje: [
      { w: 'tak', t: 'tak' }, { w: 'nie', t: 'nie' }
    ] }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Reflektometria — jak z dwóch impulsów wyliczyć położenie defektu</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 320" class="dg-svg" role="img"
           aria-label="Schemat kabla z mufami i defektem oraz oscylogram z impulsem bezpośrednim i odbitym">
        <text class="dg-t-b" x="8" y="16">Kabel — widok wzdłuż trasy</text>
        <g data-kabel></g>

        <text class="dg-t-b" x="8" y="140">Oscylogram na końcu pomiarowym A</text>
        <path class="dg-os" d="M62 250 H660 M62 160 V250"/>
        <g data-impulsy></g>
        <text class="dg-t-m" x="62" y="270">0 µs</text>
        <text class="dg-t-m kon" x="660" y="270" data-skala-czasu></text>
        <text class="dg-t-m sr" x="361" y="292">czas od chwili wyładowania</text>
        <g data-opis-dt></g>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki"><div class="dg-wzor" data-wzor></div></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  function odswiez() {
    const L = stan.dlugosc;
    // defekt nie może wypaść za końcem kabla
    const x = Math.min(stan.defekt, L - 0.05);
    const v = Number(stan.izolacja);              // prędkość fali [m/µs]

    pokaz(miejsce, 'dlugosc', `${lz(L, 2)} km`);
    pokaz(miejsce, 'defekt', `${lz(x, 2)} km`);

    /* czasy przelotu: impuls bezpośredni x, odbity (L−x) + L */
    const t1 = x * 1000 / v;
    const t2 = (2 * L - x) * 1000 / v;
    const dt = t2 - t1;

    // odtworzenie położenia ze wzoru — sprawdzenie spójności
    const xOdtworzone = L - v * dt / 2000;

    /* amplitudy z tłumieniem: 0,12 dB/100 m dla XLPE (uproszczenie) */
    const alfa = stan.tlumienie === 'tak' ? 0.12 : 0;
    const tlum = drogaKm => Math.pow(10, -alfa * drogaKm * 10 / 20);
    const a1 = tlum(x);
    const a2 = tlum(2 * L - x);

    /* rysunek kabla */
    const px = km => 62 + (km / L) * 598;
    let mufy = '';
    for (let m = 0.5; m < L; m += 0.5) {
      mufy += `<path class="dg-ziemia" style="stroke-width:1.6" d="M${px(m).toFixed(1)} 48 V72"/>
               <circle r="3" cx="${px(m).toFixed(1)}" cy="60" style="fill:var(--atrament-3)"/>`;
    }
    svg.querySelector('[data-kabel]').innerHTML = `
      <rect x="62" y="52" width="598" height="16" rx="3"
            style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:1.6"/>
      ${mufy}
      <path class="dg-ziemia czynna" d="M62 40 V80 M54 80 H70"/>
      <text class="dg-t-m sr" x="62" y="100">koniec A</text>
      <text class="dg-t-m sr" x="62" y="114">(pomiar)</text>
      <path class="dg-ziemia" d="M660 40 V80 M652 80 H668"/>
      <text class="dg-t-m kon" x="666" y="100">koniec B</text>
      <circle r="8" cx="${px(x).toFixed(1)}" cy="60"
              style="fill:var(--alarm-tlo);stroke:var(--alarm);stroke-width:2"/>
      <path style="fill:var(--alarm)" transform="translate(${px(x).toFixed(1)},60) scale(0.5)"
            d="M-13 -16 L2 -4 L-6 0 L11 16 L-2 4 L6 0 Z"/>
      <text class="dg-t-num alarm sr" x="${px(x).toFixed(1)}" y="36">WNZ ${lz(x, 2)} km</text>
      <text class="dg-t-m sr" x="361" y="128">kreski pionowe = mufy co 0,5 km — każda daje własne odbicie</text>`;

    /* oscylogram */
    const tMax = t2 * 1.18;
    const sxT = t => 62 + (t / tMax) * 598;
    svg.querySelector('[data-skala-czasu]').textContent = `${lz(tMax, 1)} µs`;

    const impuls = (t, ampl, kolor, etykieta) => {
      const xc = sxT(t);
      const h = ampl * 78;
      return `<path style="fill:none;stroke:${kolor};stroke-width:2.4"
                    d="M${(xc - 5).toFixed(1)} 250 L${xc.toFixed(1)} ${(250 - h).toFixed(1)} L${(xc + 5).toFixed(1)} 250"/>
              <text class="dg-t-num sr" style="fill:${kolor}" x="${xc.toFixed(1)}" y="${(250 - h - 8).toFixed(1)}">${lz(ampl * 100, 0)} %</text>
              <text class="dg-t-m sr" style="fill:${kolor}" x="${xc.toFixed(1)}" y="266">${etykieta}</text>`;
    };

    svg.querySelector('[data-impulsy]').innerHTML =
      impuls(t1, a1, 'var(--roz)', `t₁ = ${lz(t1, 1)} µs`) +
      impuls(t2, a2, 'var(--ostrzezenie)', `t₂ = ${lz(t2, 1)} µs`);

    svg.querySelector('[data-opis-dt]').innerHTML = `
      <path class="dg-os" style="stroke:var(--sukces)"
            d="M${sxT(t1).toFixed(1)} 172 H${sxT(t2).toFixed(1)}
               M${sxT(t1).toFixed(1)} 167 V177 M${sxT(t2).toFixed(1)} 167 V177"/>
      <text class="dg-t-num ok sr" x="${((sxT(t1) + sxT(t2)) / 2).toFixed(1)}" y="164">Δt = ${lz(dt, 1)} µs</text>`;

    /* odczyty */
    const slabyOdbity = a2 < 0.35;
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Impuls bezpośredni t₁', `${lz(t1, 1)} µs`, 'roz', `droga ${lz(x, 2)} km`),
      odczyt('Impuls odbity t₂', `${lz(t2, 1)} µs`, 'uwaga', `droga ${lz(2 * L - x, 2)} km`),
      odczyt('Różnica Δt', `${lz(dt, 1)} µs`, 'ok', 'to jedyna mierzona wielkość'),
      odczyt('Położenie ze wzoru', `${lz(xOdtworzone, 2)} km`,
        Math.abs(xOdtworzone - x) < 0.02 ? 'ok' : 'uwaga',
        `rzeczywiste ${lz(x, 2)} km`)
    ].join('');

    dane(miejsce, 'wzor').innerHTML = `
Droga impulsu bezpośredniego:  x                    = ${lz(x, 2)} km
Droga impulsu odbitego:        (L − x) + L = 2L − x  = ${lz(2 * L - x, 2)} km
Różnica dróg:                  2L − x − x = 2(L − x) = ${lz(2 * (L - x), 2)} km
Zmierzone opóźnienie:          Δt = 2(L − x) / v     = <b>${lz(dt, 1)} µs</b>
Stąd położenie defektu:        <b>x = L − v · Δt / 2</b>
                               x = ${lz(L, 2)} − ${v} · ${lz(dt, 1)} / 2 = <b>${lz(xOdtworzone, 2)} km</b>
Amplituda po tłumieniu:        A = 10^(−α · d / 20),  α = ${lz(alfa * 10, 1)} dB/km`;

    const kom = dane(miejsce, 'kom');
    if (slabyOdbity) {
      komunikat(kom, 'uwaga',
        `<strong>Impuls odbity ma tylko ${lz(a2 * 100, 0)} % amplitudy — tu zaczyna się problem
         praktyczny.</strong> Po przejściu ${lz(2 * L - x, 2)} km tłumienie zjadło sygnał tak,
         że może zniknąć w szumie i wtedy <em>nie masz z czego wyliczyć Δt</em>.
         Drugi, groźniejszy skutek tłumienia: defekt odległy daje na wykresie <strong>mniejszą
         amplitudę</strong>, więc bez korekty tłumieniowej ranking defektów wychodzi
         <em>odwrotny do prawdziwego</em> — poważna usterka na końcu kabla wygląda niewinniej
         niż drobna blisko końca pomiarowego.`);
    } else if (Math.abs(x % 0.5) < 0.06 || Math.abs(0.5 - (x % 0.5)) < 0.06) {
      komunikat(kom, 'alarm',
        `<strong>Defekt wypada w okolicy mufy — i to jest najczęstszy scenariusz w praktyce.</strong>
         Dwie rzeczy naraz: (1) mufa sama daje odbicie od skokowej zmiany impedancji falowej,
         które łatwo pomylić z defektem, więc konieczna jest dokumentacja montażowa z kilometrażem;
         (2) koncentracja WNZ w mufie oznacza <strong>wadliwy montaż</strong> — a to częstsza
         przyczyna awarii kabli SN niż wada fabryczna samego kabla.`);
    } else {
      komunikat(kom, 'ok',
        `<strong>Lokalizacja czysta: ${lz(xOdtworzone, 2)} km od końca A.</strong>
         Zwróć uwagę, co faktycznie mierzysz — <em>tylko Δt</em>. Wszystko inne to obliczenie,
         więc prędkość fali <em>v</em> musi być prawdziwa dla tej konstrukcji. Najlepiej ją zmierzyć
         na tym kablu: impuls TDR z jednego końca i czas odbicia od znanego końca. Pomyłka
         XLPE/papier (170 vs 150 m/µs) to ${lz(Math.abs(170 - 150) / 170 * 100, 0)} % błędu
         położenia — na ${lz(L, 1)} km kabla ${lz(L * 0.12, 2)} km w terenie.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   9. PRÓBY NAPIĘCIOWE KABLI — DC / VLF / AC                 (rozdział 22)
   ======================================================================== */

const PROBY_METODY = {
  dc:   { nazwa: 'DC (napięcie stałe)',      f: 0,    xlpe: false },
  vlf:  { nazwa: 'VLF 0,1 Hz',               f: 0.1,  xlpe: true },
  ac50: { nazwa: 'AC 50 Hz z transformatora', f: 50,   xlpe: true },
  acrt: { nazwa: 'AC rezonansowe (ACRT)',    f: 50,   xlpe: true, dobroc: 60 }
};

function widgetProbaKabla(miejsce) {
  const spec = [
    { typ: 'wybor', id: 'metoda', etykieta: 'Metoda próby', wartosc: 'vlf', opcje: [
      { w: 'dc', t: 'DC' }, { w: 'vlf', t: 'VLF 0,1 Hz' },
      { w: 'ac50', t: 'AC 50 Hz' }, { w: 'acrt', t: 'ACRT' }
    ] },
    { typ: 'wybor', id: 'izolacja', etykieta: 'Izolacja kabla', wartosc: 'xlpe', opcje: [
      { w: 'xlpe', t: 'XLPE' }, { w: 'pilc', t: 'papier-olej' }
    ] },
    { typ: 'suwak', id: 'dlugosc', etykieta: 'Długość kabla', min: 0.2, max: 12, krok: 0.2, wartosc: 5 },
    { typ: 'wybor', id: 'u0', etykieta: 'Napięcie U₀ (faza–ziemia)', wartosc: '8.7', opcje: [
      { w: '8.7', t: '8,7 kV (15 kV)' }, { w: '12', t: '12 kV (20 kV)' }, { w: '18', t: '18 kV (30 kV)' }
    ] },
    { typ: 'suwak', id: 'krotnosc', etykieta: 'Napięcie próby', min: 1, max: 3, krok: 0.1, wartosc: 2 }
  ];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Symulator</span>
      <strong>Moc probiercza i dobór metody — dlaczego 0,1 Hz zmienia wszystko</strong>
    </div>
    ${sterowanie(spec)}
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 250" class="dg-svg" role="img"
           aria-label="Porównanie mocy biernej potrzebnej do próby dla czterech metod oraz ilustracja ładunku przestrzennego">
        <text class="dg-t-b" x="8" y="16">Moc bierna potrzebna do naprężenia kabla (skala logarytmiczna)</text>
        <g data-slupki></g>
        <text class="dg-t-b" x="8" y="196">Rozkład pola w izolacji</text>
        <g data-pole></g>
      </svg>
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki"><table class="dg-tab" data-tabela></table></div>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);
  const svg = miejsce.querySelector('svg');

  function odswiez() {
    const L = stan.dlugosc;
    const U0 = Number(stan.u0) * 1000;
    const U = U0 * stan.krotnosc;                        // napięcie probiercze [V]
    const Ckm = stan.izolacja === 'xlpe' ? 0.30 : 0.40;  // µF/km/fazę
    const C = Ckm * L * 1e-6;                            // [F]

    pokaz(miejsce, 'dlugosc', `${lz(L, 1)} km`);
    pokaz(miejsce, 'krotnosc', `${lz(stan.krotnosc, 1)} · U₀ = ${lz(U / 1000, 1)} kV`);

    const mocBierna = m => {
      const met = PROBY_METODY[m];
      if (met.f === 0) return 0;
      return U * U * TAU * met.f * C;
    };
    const mocZrodla = m => {
      const met = PROBY_METODY[m];
      const Q = mocBierna(m);
      return met.dobroc ? Q / met.dobroc : Q;
    };

    /* słupki — skala logarytmiczna, bo rozpiętość jest ogromna */
    const klucze = Object.keys(PROBY_METODY);
    const maxLog = Math.log10(Math.max(...klucze.map(k => Math.max(mocZrodla(k), 1))) + 1);
    svg.querySelector('[data-slupki]').innerHTML = klucze.map((k, i) => {
      const y = 34 + i * 34;
      const S = mocZrodla(k);
      const dl = S > 0 ? Math.max((Math.log10(S + 1) / maxLog) * 400, 3) : 3;
      const wybrany = k === stan.metoda;
      const kolor = k === 'dc' ? 'var(--alarm)' : wybrany ? 'var(--roz)' : 'var(--kreska-2)';
      return `
        <text class="dg-t${wybrany ? '-b' : ''} kon" x="152" y="${y + 14}">${PROBY_METODY[k].nazwa}</text>
        <rect x="160" y="${y + 2}" width="${dl.toFixed(1)}" height="18" rx="3"
              style="fill:${kolor};opacity:${wybrany ? 1 : 0.55}"/>
        <text class="dg-t-num" style="fill:${kolor}" x="${(168 + dl).toFixed(1)}" y="${y + 16}">${S > 0 ? moc(S) : 'moc bierna = 0'}</text>`;
    }).join('');

    /* rozkład pola: AC wg przenikalności, DC wg rezystywności */
    const dc = stan.metoda === 'dc';
    svg.querySelector('[data-pole]').innerHTML = `
      <rect x="62" y="206" width="270" height="30" rx="3"
            style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:1.6"/>
      <text class="dg-t-m sr" x="197" y="200">${dc ? 'DC — pole wg rezystywności ρ' : 'AC — pole wg przenikalności ε'}</text>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const x = 74 + i * 33;
        const h = dc ? 8 + i * 2.4 : 24 - i * 1.6;
        return `<path style="fill:none;stroke:var(--${dc ? 'alarm' : 'sukces'});stroke-width:2"
                      d="M${x} ${(221 - h / 2).toFixed(1)} V${(221 + h / 2).toFixed(1)}"/>`;
      }).join('')}
      ${dc ? `
        <text class="dg-t-m alarm" x="348" y="214">ładunek przestrzenny gromadzi się w objętości</text>
        <text class="dg-t-m alarm" x="348" y="230">i relaksuje tygodniami → przebicie PO próbie</text>`
        : `
        <text class="dg-t-m ok" x="348" y="214">rozkład jak w pracy ruchowej —</text>
        <text class="dg-t-m ok" x="348" y="230">próba napręża te miejsca, które trzeba</text>`}`;

    /* odczyty */
    const met = PROBY_METODY[stan.metoda];
    const zgodna = stan.izolacja === 'pilc' ? true : met.xlpe;

    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Pojemność kabla <i>C</i>', `${lz(Ckm * L, 2)} µF`, 'roz', `${Ckm} µF/km · ${lz(L, 1)} km`),
      odczyt('Moc bierna <i>Q</i>', mocBierna(stan.metoda) > 0 ? moc(mocBierna(stan.metoda)) : '0',
        'roz', 'Q = U² · 2πf · C'),
      odczyt('Wymagane źródło', mocZrodla(stan.metoda) > 0 ? moc(mocZrodla(stan.metoda)) : 'znikome',
        mocZrodla(stan.metoda) > 5e5 ? 'alarm' : 'ok',
        met.dobroc ? `Q / dobroć układu (${met.dobroc})` : 'źródło pokrywa całą moc bierną'),
      odczyt('Energia zgromadzona', `${lz(0.5 * C * U * U, 0)} J`,
        0.5 * C * U * U > 20 ? 'alarm' : 'uwaga', '½ · C · U² — po próbie trzeba ją rozładować')
    ].join('');

    /* tabela porównawcza */
    dane(miejsce, 'tabela').innerHTML = `
      <tr><th>Metoda</th><th>Moc źródła</th><th>XLPE</th><th>Papier-olej</th><th>Charakter</th></tr>
      ${klucze.map(k => {
        const m = PROBY_METODY[k];
        const opisy = {
          dc: 'wstrzykuje ładunek przestrzenny, inny rozkład pola, przyspiesza drzewienie wodne',
          vlf: 'naprężenie zbliżone do AC bez ładunku przestrzennego; sprzęt przenośny',
          ac50: 'wiarygodne, ale moc bierna czyni to niepraktycznym w terenie',
          acrt: 'najwiarygodniejsze — źródło pokrywa tylko straty; standard dla GIS i kabli WN'
        };
        return `<tr${k === stan.metoda ? ' class="wyrozniony"' : ''}>
          <td class="lb">${m.nazwa}</td>
          <td class="wart${k === stan.metoda ? ' roz' : ''}">${mocZrodla(k) > 0 ? moc(mocZrodla(k)) : 'znikome'}</td>
          <td class="wart ${m.xlpe ? 'ok' : 'alarm'}">${m.xlpe ? 'tak' : 'NIE'}</td>
          <td class="wart ok">tak</td>
          <td class="lb">${opisy[k]}</td>
        </tr>`;
      }).join('')}`;

    /* komunikat */
    const kom = dane(miejsce, 'kom');
    if (stan.metoda === 'dc' && stan.izolacja === 'xlpe') {
      komunikat(kom, 'alarm',
        `<strong>DC na kablu XLPE — to jest błąd, który zabija kabel po próbie, nie w jej trakcie.</strong>
         Trzy mechanizmy naraz: (1) <strong>ładunek przestrzenny</strong> — nośniki wstrzykiwane
         z elektrod gromadzą się w objętości i relaksują tygodniami; gdy kabel wróci pod AC, ich pole
         sumuje się z polem roboczym i może przekroczyć wytrzymałość tam, gdzie nominalnie byłoby
         bezpiecznie; (2) <strong>inny rozkład pola</strong> — pod DC układa się wg rezystywności ρ,
         a pod AC wg przenikalności ε, więc próba napręża <em>inne</em> miejsca niż praca ruchowa;
         (3) DC przyspiesza <strong>drzewienie wodne</strong> i przekształca drzewa wodne
         w elektryczne. Kabel przechodzi próbę i przebija dwa miesiące później — i nikt nie łączy
         tego z pomiarem. Użyj VLF albo AC rezonansowego.`);
    } else if (stan.metoda === 'ac50') {
      komunikat(kom, 'uwaga',
        `<strong>Merytorycznie najlepsze, praktycznie niewykonalne z transformatora.</strong>
         Ten kabel wymaga ${moc(mocBierna('ac50'))} mocy biernej. Dlatego wymyślono dwa obejścia:
         <strong>VLF</strong> — obniżenie częstotliwości 500× obniża Q 500× (${moc(mocBierna('vlf'))}),
         oraz <strong>ACRT</strong> — dławik w rezonansie z pojemnością kabla, gdzie sieć pokrywa
         tylko straty (${moc(mocZrodla('acrt'))}).`);
    } else if (stan.metoda === 'acrt') {
      komunikat(kom, 'ok',
        `<strong>Najwiarygodniejsza metoda.</strong> Obiekt tworzy z dławikiem obwód rezonansowy,
         więc źródło pokrywa wyłącznie straty — ${moc(mocBierna('acrt'))} mocy biernej krąży
         w obwodzie, a zasilanie musi dać tylko ${moc(mocZrodla('acrt'))}. Naprężenie jest
         praktycznie identyczne z warunkami ruchowymi i można jednocześnie mierzyć WNZ, co jest
         ideałem diagnostycznym. Standard dla GIS, transformatorów i kabli WN.`);
    } else {
      komunikat(kom, 'ok',
        `<strong>VLF 0,1 Hz — praktyczny standard dla kabli SN.</strong> Ponieważ Q = U² · 2πf · C,
         obniżenie częstotliwości z 50 Hz do 0,1 Hz zmniejsza moc bierną <strong>500×</strong>:
         z ${moc(mocBierna('ac50'))} do ${moc(mocBierna('vlf'))}. To dlatego urządzenie przenośne
         o mocy kilku kVA napręża ${lz(L, 1)} km kabla do ${lz(U / 1000, 1)} kV.
         Poziomy wg IEEE 400.2: próba odbiorcza 2–3 U₀, po naprawie 1,5–2 U₀, czas 15–60 min.
         Wersja <strong>VLF-TD</strong> mierzy przy tym tg δ, jego przyrost z napięciem (DTD)
         i stabilność w czasie — trzy wskaźniki w jednym podejściu.
         <br><strong>Po próbie:</strong> w kablu zostaje ${lz(0.5 * C * U * U, 0)} J.
         Rozładowanie przez rezystor, potem uziemienie na czas co najmniej równy czasowi próby.`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ========================================================================
   10. POLOWANIE NA ŹRÓDŁA NAPIĘCIA W „WYŁĄCZONYM” POLU     (rozdział 23)
   ======================================================================== */

const ZRODLA = [
  { id: 'odlacznik', x: 108, y: 96, zywy: false,
    nazwa: 'Odłącznik szynowy — otwarty',
    opis: 'Widoczna przerwa izolacyjna, odłącznik zablokowany kłódką. Ten element jest w porządku — i właśnie dlatego uspokaja.' },
  { id: 'uziemnik', x: 108, y: 250, zywy: false,
    nazwa: 'Uziemnik pola — załączony',
    opis: 'Uziemienie stałe załączone i zablokowane. Też w porządku, ale pamiętaj: uziemnik pola nie jest uziemieniem w miejscu pracy.' },
  { id: 'sprzeglo', x: 330, y: 60, zywy: true,
    nazwa: 'Szyny sekcji II przez sprzęgło',
    opis: 'Sprzęgło szynowe jest zamknięte, więc szyny „wyłączonej” sekcji są zasilane z sekcji sąsiedniej. Schemat jednokreskowy pokazuje sprzęgło, ale jego stan trzeba odczytać z rzeczywistości, nie z rysunku.' },
  { id: 'tpw', x: 214, y: 152, zywy: true,
    nazwa: 'Transformator potrzeb własnych',
    opis: 'TPW jest bardzo często wpięty PRZED wyłącznikiem pola, za odłącznikiem szynowym. Wyłączenie pola nie odcina go — a on podaje napięcie z powrotem na odcinek, na którym pracujesz.' },
  { id: 'pierscien', x: 470, y: 250, zywy: true,
    nazwa: 'Kabel odpływowy — zasilanie z drugiej stacji',
    opis: 'Sieć SN pracuje w pierścieniu. Kabel wychodzący z tego pola może być zasilony z przeciwnej strony. Wymaga wiedzy o konfiguracji CAŁEJ sieci, nie tylko tej stacji.' },
  { id: 'kondensatory', x: 574, y: 152, zywy: true,
    nazwa: 'Bateria kondensatorów — ładunek',
    opis: 'Odłączona, ale naładowana. Energia ½CU² rozładowuje się przez rezystory minutami. Wygląda jak element martwy. Rozładowanie i uziemienie to dwie różne czynności — obie konieczne.' },
  { id: 'dc', x: 214, y: 316, zywy: true,
    nazwa: 'Obwody 220 V DC z baterii stacyjnej',
    opis: 'Zawsze obecne i całkowicie niezależne od stanu toru głównego — sterowanie, sygnalizacja, obwody wyzwalające. Nie da się ich wyłączyć bez pozbawienia stacji sterowania.' },
  { id: 'grzalka', x: 330, y: 316, zywy: true,
    nazwa: 'Grzałka 230 V w szafce napędowej',
    opis: 'Osobny obwód z rozdzielnicy potrzeb własnych. Grzałki, oświetlenie celki, napędy, gniazda serwisowe — wszystko poza torem głównym i poza schematem jednokreskowym.' },
  { id: 'ct', x: 470, y: 152, zywy: true,
    nazwa: 'Obwody wtórne przekładników pola sąsiedniego',
    opis: 'Listwa wygląda identycznie jak martwa. Rdzeń CT pola pracującego jest pod prądem — rozwarcie obwodu daje szpilki kilku kV. Obwody VT z innej sekcji podają napięcie na listwę.' }
];

function widgetZwrotne(miejsce) {
  const doZnalezienia = ZRODLA.filter(z => z.zywy).length;

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Zadanie</span>
      <strong>Pole „wyłączone” według schematu — znajdź wszystkie źródła napięcia</strong>
    </div>
    <div class="dg-przyciski">
      <span class="dg-btn" style="cursor:default" data-licznik>Znalezione: 0 / ${doZnalezienia}</span>
      <button type="button" class="dg-btn" data-akcja="odkryj">Pokaż wszystko</button>
      <button type="button" class="dg-btn" data-akcja="reset">Od nowa</button>
    </div>
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 360" class="dg-svg" role="img"
           aria-label="Schemat pola rozdzielnicy z dziewięcioma punktami do sprawdzenia">
        <path class="dg-przewod zywy" d="M40 60 H660"/>
        <text class="dg-t-m" x="40" y="48">SZYNY ZBIORCZE — sekcja I (wyłączona)</text>
        <path class="dg-przewod" d="M108 60 V96 M108 118 V200"/>
        <path class="dg-przewod" d="M108 200 V250 M108 268 V330"/>
        <text class="dg-t-m" x="126" y="188">wyłącznik pola — otwarty</text>
        <rect x="97" y="186" width="22" height="30" rx="3"
              style="fill:var(--tlo-3);stroke:var(--sukces);stroke-width:2"/>
        <path class="dg-przewod" d="M108 330 H470 M470 330 V268"/>
        <text class="dg-t-m sr" x="290" y="350">kabel odpływowy</text>
        <path class="dg-przewod" d="M214 60 V152 M470 60 V152 M574 60 V152"/>
        <path class="dg-przewod" d="M330 60 V80"/>
        <path class="dg-przewod" d="M214 330 V316 M330 330 V316"/>
        <g data-cele></g>
      </svg>
    </div>
    <ul class="dg-lista-zrodel" data-lista></ul>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const svg = miejsce.querySelector('svg');
  const sprawdzone = new Set();

  function rysujCele() {
    svg.querySelector('[data-cele]').innerHTML = ZRODLA.map((z, i) => {
      const stan = sprawdzone.has(z.id)
        ? `sprawdzony ${z.zywy ? 'zywy' : 'martwy'}` : '';
      const znak = sprawdzone.has(z.id) ? (z.zywy ? '⚡' : '✓') : (i + 1);
      return `<g class="dg-cel ${stan}" data-cel="${z.id}" role="button" tabindex="0"
                 aria-label="Sprawdź: ${ucieczka(z.nazwa)}">
        <circle class="dg-cel-plama" cx="${z.x}" cy="${z.y}" r="14"/>
        <text class="dg-cel-znak" x="${z.x}" y="${z.y + 5}">${znak}</text>
      </g>`;
    }).join('');

    svg.querySelectorAll('[data-cel]').forEach(cel => {
      const klik = () => {
        sprawdzone.add(cel.dataset.cel);
        odswiez();
      };
      cel.addEventListener('click', klik);
      cel.addEventListener('keydown', z => {
        if (z.key === 'Enter' || z.key === ' ') { z.preventDefault(); klik(); }
      });
    });
  }

  function odswiez() {
    rysujCele();

    const znalezione = ZRODLA.filter(z => z.zywy && sprawdzone.has(z.id)).length;
    dane(miejsce, 'licznik').textContent = `Znalezione: ${znalezione} / ${doZnalezienia}`;

    dane(miejsce, 'lista').innerHTML = ZRODLA
      .filter(z => sprawdzone.has(z.id))
      .map(z => `<li>
        <span class="znak ${z.zywy ? 'zywy' : 'martwy'}">${z.zywy ? '⚡' : '✓'}</span>
        <span><strong>${z.nazwa}</strong><small>${z.opis}</small></span>
      </li>`).join('');

    const kom = dane(miejsce, 'kom');
    if (!sprawdzone.size) {
      komunikat(kom, 'info',
        `Pole jest wyłączone, odłącznik otwarty, uziemnik załączony. Na schemacie jednokreskowym
         wszystko jest w porządku. <strong>Kliknij kolejne punkty</strong> i sprawdź, gdzie
         faktycznie jest napięcie. Siedem z dziewięciu punktów to źródła, których schemat
         jednokreskowy <em>nie pokazuje</em>.`);
    } else if (znalezione < doZnalezienia) {
      komunikat(kom, 'uwaga',
        `<strong>${znalezione} z ${doZnalezienia} źródeł.</strong> Szukaj dalej. Podpowiedź:
         myśl kategoriami, nie elementami — zasilanie drugostronne, potrzeby własne, magazyny
         energii, obwody pomocnicze AC, obwody DC z baterii stacyjnej, obwody wtórne przekładników.`);
    } else {
      komunikat(kom, 'ok',
        `<strong>Wszystkie ${doZnalezienia} źródeł znalezione.</strong> Wniosek praktyczny:
         schemat jednokreskowy służy do orientacji w topologii, ale <strong>dokumentem pomiarowca
         jest schemat rozwinięty</strong> — tylko on pokazuje obwody pomocnicze, potrzeby własne
         i obwody wtórne. I dlatego sprawdzenie braku napięcia (zasada 2 z pięciu) wykonuje się
         <em>na wszystkich fazach, wskaźnikiem odpowiednim do typu rozdzielnicy, sprawdzonym
         przed i po użyciu</em> — bo uszkodzony wskaźnik pokazuje „brak napięcia” zawsze.`);
    }
  }

  miejsce.querySelector('[data-akcja="odkryj"]').addEventListener('click', () => {
    ZRODLA.forEach(z => sprawdzone.add(z.id));
    odswiez();
  });
  miejsce.querySelector('[data-akcja="reset"]').addEventListener('click', () => {
    sprawdzone.clear();
    odswiez();
  });

  odswiez();
}

/* ==================================================== rejestracja widgetów */

const BUDOWNICZY = {
  indukcja: widgetIndukcja,
  neutralny: widgetNeutralny,
  uziom: widgetUziom,
  przekladnik: widgetPrzekladnik,
  izolacja: widgetIzolacja,
  tgdelta: widgetTgDelta,
  prpd: widgetPrpd,
  tdr: widgetTdr,
  'proba-kabla': widgetProbaKabla,
  zwrotne: widgetZwrotne
};

/** Punkt wejścia wołany przez app.js po wyrenderowaniu treści. */
window.zbudujWidgetyDiag = function (korzen) {
  korzen.querySelectorAll('.dg-widget').forEach(miejsce => {
    if (miejsce.dataset.gotowe) return;
    miejsce.dataset.gotowe = '1';
    const buduj = BUDOWNICZY[miejsce.dataset.typ];
    miejsce.classList.add('dg');
    if (!buduj) {
      miejsce.innerHTML = '<p class="dg-blad">Nieznany symulator.</p>';
      return;
    }
    try {
      buduj(miejsce);
    } catch (blad) {
      console.warn(`Symulator ${miejsce.dataset.typ} nie wystartował`, blad);
      miejsce.innerHTML = '<p class="dg-blad">Nie udało się uruchomić symulatora — treść rozdziału jest kompletna bez niego.</p>';
    }
  });
};

window.DIAG_BUDOWNICZY = BUDOWNICZY;

})();

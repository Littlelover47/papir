/* ==========================================================================
   Kalkulator portfela ETF — dodatek, poza materiałem SEP.
   Korzysta z tych samych pomocników co symulatory (window.DIAG_NARZEDZIA
   z assets/diag.js) i rejestruje się w window.DIAG_BUDOWNICZY, więc app.js
   buduje go sam po wyrenderowaniu rozdziału.

   Zadanie: rozdzielić jedną wpłatę w złotych na kilka ETF-ów notowanych w euro
   tak, żeby udziały w portfelu wypadły jak najbliżej wag docelowych — przy
   założeniu, że kupuje się CAŁE sztuki i że każde zlecenie ma prowizję
   minimalną.
   ========================================================================== */

(function () {
'use strict';

const N = window.DIAG_NARZEDZIA;
if (!N) { console.warn('portfel.js: brak diag.js — kalkulator portfela nie wystartuje'); return; }

const { lz, sterowanie, stanZeSpec, podlacz, dane, komunikat, odczyt } = N;

/* Pozycje startowe. Kursy i wagi nadpisujesz w polach — nazwy są stałe,
   więc traktuj je jak „szufladki”: 1. duży rynek, 2. rynki wschodzące itd. */
const POZYCJE = [
  { id: 'a', nazwa: 'Nasdaq 100',            ticker: 'ANAV',  kurs: 23.37, waga: 70 },
  { id: 'b', nazwa: 'Emerging Markets IMI',  ticker: 'IS3N',  kurs: 49.31, waga: 20 },
  { id: 'c', nazwa: 'US Small Cap Value',    ticker: 'ZPRV',  kurs: 80.00, waga: 10 },
  { id: 'd', nazwa: 'Czwarta pozycja',       ticker: 'ETF 4', kurs: 50.00, waga: 0 }
];

/* Bezpiecznik pętli: przy bardzo dużych kwotach nie liczymy w nieskończoność. */
const LIMIT_KROKOW = 25000;

/* Progi oceny odchyłki od wagi docelowej [punkty procentowe]. */
const PROG_OK = 1.5;
const PROG_UWAGA = 4;

/* --------------------------------------------------------- czysta arytmetyka */

/** Wartość zleceń i prowizje w złotych dla danego planu (liczby sztuk). */
function koszty(szt, poz, w) {
  const prowizjeSzt = poz.map(() => 0);
  let wartosc = 0, prowizja = 0, zlecenia = 0;
  for (let i = 0; i < poz.length; i++) {
    if (szt[i] <= 0) continue;
    const pln = szt[i] * poz[i].kurs * w.kursEfekt;
    const p = Math.max(w.prowMin, pln * w.prowProc / 100);
    wartosc += pln;
    prowizja += p;
    prowizjeSzt[i] = p;
    zlecenia++;
  }
  return { wartosc, prowizja, prowizjeSzt, zlecenia, razem: wartosc + prowizja };
}

/** Udziały w portfelu PO zakupie — razem z tym, co już leży na rachunku. */
function udzialy(szt, poz) {
  const wartosci = poz.map((p, i) => (p.mam + szt[i]) * p.kurs);
  const suma = wartosci.reduce((a, b) => a + b, 0);
  return { wartosci, suma, udzialy: wartosci.map(v => suma > 0 ? 100 * v / suma : 0) };
}

/** Miara dopasowania: suma kwadratów odchyłek udziałów od wag docelowych. */
function sumaKwadratow(szt, poz, wagiCel) {
  const u = udzialy(szt, poz).udzialy;
  return u.reduce((a, v, i) => a + (v - wagiCel[i]) * (v - wagiCel[i]), 0);
}

/**
 * Plan zakupu. Bez DOM i bez formatowania — łatwo to sprawdzić osobno.
 *
 * wejscie = { kwota, kursEfekt, prowProc, prowMin,
 *             pozycje: [{ kurs, waga, mam, kupuj }] }
 *
 * Metoda: dokupujemy po jednej sztuce tego ETF-u, który najbardziej zbliża
 * portfel do wag docelowych, dopóki kolejna sztuka mieści się w budżecie razem
 * z prowizją. Sztuk jest niewiele, więc takie „po jednej” jest i szybkie,
 * i łatwe do wytłumaczenia — w przeciwieństwie do dzielenia kwoty na procenty
 * i zaokrąglania w dół, które zostawia dużo niewykorzystanej gotówki.
 */
function policz(w) {
  const poz = w.pozycje;
  const sumaWag = poz.reduce((a, p) => a + Math.max(0, p.waga), 0);
  const wagiCel = poz.map(p => sumaWag > 0 ? 100 * Math.max(0, p.waga) / sumaWag : 0);

  const szt = poz.map(() => 0);
  let kroki = 0, przerwane = false;

  for (;;) {
    let wybor = -1, najlepsza = Infinity;
    for (let i = 0; i < poz.length; i++) {
      if (!poz[i].kupuj) continue;
      szt[i] += 1;
      const mieszaSie = koszty(szt, poz, w).razem <= w.kwota + 1e-9;
      const miara = mieszaSie ? sumaKwadratow(szt, poz, wagiCel) : Infinity;
      szt[i] -= 1;
      if (miara < najlepsza) { najlepsza = miara; wybor = i; }
    }
    if (wybor < 0) break;
    szt[wybor] += 1;
    if (++kroki >= LIMIT_KROKOW) { przerwane = true; break; }
  }

  const k = koszty(szt, poz, w);
  const stan = udzialy(szt, poz);

  return {
    szt,
    wagiCel,
    udzialy: stan.udzialy,
    wartosci: stan.wartosci,
    sumaPortfela: stan.suma,
    odchylki: stan.udzialy.map((u, i) => u - wagiCel[i]),
    kupnoEur: szt.reduce((a, s, i) => a + s * poz[i].kurs, 0),
    wartoscKupna: k.wartosc,
    prowizja: k.prowizja,
    prowizjeSzt: k.prowizjeSzt,
    zlecenia: k.zlecenia,
    koszt: k.razem,
    reszta: w.kwota - k.razem,
    przerwane
  };
}

/* Wystawione na zewnątrz — czysta arytmetyka bez DOM, do sprawdzenia w konsoli. */
window.PORTFEL_PLAN = { policz, koszty, udzialy, POZYCJE };

/* ------------------------------------------------------------------ widget */

function ton(odchylka) {
  const a = Math.abs(odchylka);
  return a <= PROG_OK ? 'ok' : a <= PROG_UWAGA ? 'uwaga' : 'alarm';
}

function widgetPortfelEtf(miejsce) {
  const specWplata = [
    { typ: 'pole', id: 'kwota', etykieta: 'Wpłata do rozdysponowania',
      wartosc: 8500, min: 0, max: 10000000, krok: 100, jednostka: 'zł' },
    { typ: 'pole', id: 'kursEur', etykieta: 'Kurs EUR/PLN',
      wartosc: 4.35, min: 0.1, max: 30, krok: 0.01, jednostka: 'zł' },
    { typ: 'pole', id: 'narzut', etykieta: 'Narzut brokera na przewalutowanie',
      wartosc: 0.5, min: 0, max: 5, krok: 0.1, jednostka: '%' },
    { typ: 'pole', id: 'prowProc', etykieta: 'Prowizja od zlecenia',
      wartosc: 0.29, min: 0, max: 3, krok: 0.01, jednostka: '%' },
    { typ: 'pole', id: 'prowMin', etykieta: 'Prowizja minimalna za zlecenie',
      wartosc: 19, min: 0, max: 500, krok: 1, jednostka: 'zł' },
    { typ: 'wybor', id: 'pomin', etykieta: 'Pomiń w tej wpłacie', wartosc: 'nic',
      opcje: [{ w: 'nic', t: 'nic' }, ...POZYCJE.map(p => ({ w: p.id, t: p.ticker }))] }
  ];

  const specPozycje = POZYCJE.flatMap(p => ([
    { typ: 'pole', id: `kurs_${p.id}`, etykieta: `<b>${p.ticker}</b> — kurs (oferta sprzedaży)`,
      wartosc: p.kurs, min: 0, max: 100000, krok: 0.01, jednostka: 'EUR' },
    { typ: 'pole', id: `waga_${p.id}`, etykieta: `<b>${p.ticker}</b> — waga docelowa`,
      wartosc: p.waga, min: 0, max: 100, krok: 1, jednostka: '%' },
    { typ: 'pole', id: `mam_${p.id}`, etykieta: `<b>${p.ticker}</b> — już posiadam`,
      wartosc: 0, min: 0, max: 1000000, krok: 1, jednostka: 'szt.' }
  ]));

  const spec = [...specWplata, ...specPozycje];

  miejsce.innerHTML = `
    <div class="dg-pasek">
      <span class="dg-znaczek">Kalkulator</span>
      <strong>Podział wpłaty na ETF-y — ile sztuk kupić przy zadanych wagach</strong>
    </div>
    <div class="dg-sekcja">
      <span class="dg-sekcja-tytul">1. Wpłata, kurs waluty i prowizje</span>
      ${sterowanie(specWplata)}
    </div>
    <div class="dg-sekcja">
      <span class="dg-sekcja-tytul">2. Pozycje — kurs, waga docelowa, stan rachunku</span>
      ${sterowanie(specPozycje)}
    </div>
    <div class="dg-odczyty" data-odczyty></div>
    <div class="dg-wyniki">
      <table class="dg-tab" data-tabela></table>
    </div>
    <div class="dg-rysunek">
      <svg viewBox="0 0 700 240" class="dg-svg dg-svg-slupek" role="img" data-svg
           aria-label="Porównanie wag docelowych z udziałami po zakupie"></svg>
    </div>
    <p class="dg-wzor" data-wzor></p>
    <p class="dg-kom" data-kom aria-live="polite"></p>`;

  const stan = stanZeSpec(spec);

  function odswiez() {
    const kursEfekt = stan.kursEur * (1 + stan.narzut / 100);

    const poz = POZYCJE.map(p => {
      const kurs = Number(stan['kurs_' + p.id]) || 0;
      const waga = Math.max(0, Number(stan['waga_' + p.id]) || 0);
      const mam = Math.max(0, Math.floor(Number(stan['mam_' + p.id]) || 0));
      const pominiety = stan.pomin === p.id;
      return { ...p, kurs, waga, mam, pominiety, kupuj: kurs > 0 && waga > 0 && !pominiety };
    });

    const sumaWag = poz.reduce((a, p) => a + p.waga, 0);
    const kom = dane(miejsce, 'kom');
    const czysto = () => {
      dane(miejsce, 'odczyty').innerHTML = '';
      dane(miejsce, 'tabela').innerHTML = '';
      dane(miejsce, 'svg').innerHTML = '';
      dane(miejsce, 'wzor').innerHTML = '';
    };

    if (!(stan.kwota > 0) || !(kursEfekt > 0) || sumaWag <= 0) {
      czysto();
      komunikat(kom, 'info',
        `<strong>Uzupełnij dane wejściowe.</strong> Potrzebne są: kwota wpłaty, kurs EUR/PLN
         powyżej zera i co najmniej jedna waga docelowa większa od zera.`);
      return;
    }

    const wejscie = {
      kwota: stan.kwota, kursEfekt,
      prowProc: stan.prowProc, prowMin: stan.prowMin,
      pozycje: poz
    };
    const r = policz(wejscie);
    const budzetEur = stan.kwota / kursEfekt;

    /* pozycje pokazywane w tabeli i na wykresie */
    const widoczne = poz
      .map((p, i) => ({ p, i }))
      .filter(({ p, i }) => p.waga > 0 || p.mam > 0 || r.szt[i] > 0);

    /* Odchyłkę oceniamy tylko na pozycjach, które w tej wpłacie kupujemy —
       pozycja świadomie pominięta ma odchyłkę równą całej swojej wadze i zaciemniałaby obraz. */
    const najwiekszaOdchylka = widoczne
      .filter(({ p }) => !p.pominiety)
      .reduce((naj, { i }) => Math.abs(r.odchylki[i]) > Math.abs(naj.v) ? { v: r.odchylki[i], i } : naj,
        { v: 0, i: -1 });

    /* ---------- kafelki odczytów ---------- */
    const prowProcWplaty = 100 * r.prowizja / stan.kwota;
    dane(miejsce, 'odczyty').innerHTML = [
      odczyt('Kurs efektywny', `${lz(kursEfekt, 4)} zł/EUR`, 'roz',
        `kurs ${lz(stan.kursEur, 4)} + narzut ${lz(stan.narzut, 2)} %`),
      odczyt('Budżet po przewalutowaniu', `${lz(budzetEur, 0)} EUR`, 'roz',
        `${lz(stan.kwota, 0)} zł ÷ kurs efektywny`),
      odczyt('Kupujesz za', `${lz(r.wartoscKupna, 0)} zł`, r.zlecenia > 0 ? 'ok' : 'alarm',
        `${lz(r.kupnoEur, 2)} EUR w ${r.zlecenia} ${r.zlecenia === 1 ? 'zleceniu' : 'zleceniach'}`),
      odczyt('Prowizje', `${lz(r.prowizja, 2)} zł`,
        prowProcWplaty < 0.5 ? 'ok' : prowProcWplaty < 1 ? 'uwaga' : 'alarm',
        `${lz(prowProcWplaty, 2)} % wpłaty`),
      odczyt('Reszta na rachunku', `${lz(r.reszta, 2)} zł`,
        r.reszta >= 0 ? 'roz' : 'alarm',
        'za mało na kolejną całą sztukę'),
      odczyt('Największa odchyłka', `${najwiekszaOdchylka.v >= 0 ? '+' : ''}${lz(najwiekszaOdchylka.v, 2)} pp`,
        ton(najwiekszaOdchylka.v),
        najwiekszaOdchylka.i >= 0 ? `pozycja ${poz[najwiekszaOdchylka.i].ticker}` : '—')
    ].join('');

    /* ---------- tabela planu ---------- */
    const wiersze = widoczne.map(({ p, i }) => {
      const wartoscKupnaPln = r.szt[i] * p.kurs * kursEfekt;
      const opisSztuk = p.pominiety
        ? '<span class="lb">pominięte</span>'
        : `<strong>${lz(r.szt[i], 0)}</strong>`;
      return `<tr>
        <td class="lb"><strong>${p.ticker}</strong><br><small>${p.nazwa}</small></td>
        <td class="wart">${lz(p.kurs, 2)}</td>
        <td class="wart">${lz(p.mam, 0)}</td>
        <td class="wart roz">${opisSztuk}</td>
        <td class="wart">${lz(wartoscKupnaPln, 0)}</td>
        <td class="wart">${r.prowizjeSzt[i] > 0 ? lz(r.prowizjeSzt[i], 2) : '—'}</td>
        <td class="wart">${lz(r.wartosci[i] * kursEfekt, 0)}</td>
        <td class="wart ${ton(r.odchylki[i])}">${lz(r.udzialy[i], 1)} %</td>
        <td class="lb">${lz(r.wagiCel[i], 1)} %</td>
        <td class="wart ${ton(r.odchylki[i])}">${r.odchylki[i] >= 0 ? '+' : ''}${lz(r.odchylki[i], 2)}</td>
      </tr>`;
    }).join('');

    dane(miejsce, 'tabela').innerHTML = `
      <caption class="dg-tab-podpis">Plan zleceń i udziały po zakupie
        ${Math.abs(sumaWag - 100) > 0.01
          ? `— wagi sumują się do ${lz(sumaWag, 1)} %, więc zostały przeliczone proporcjonalnie na 100 %`
          : ''}</caption>
      <tr>
        <th>Pozycja</th><th>Kurs [EUR]</th><th>Mam [szt.]</th><th>Kupuję [szt.]</th>
        <th>Zlecenie [zł]</th><th>Prowizja [zł]</th><th>Wartość po [zł]</th>
        <th>Udział po</th><th>Cel</th><th>Odchyłka [pp]</th>
      </tr>
      ${wiersze}
      <tr class="wyrozniony">
        <td class="lb"><strong>Razem</strong></td>
        <td class="wart">—</td>
        <td class="wart">—</td>
        <td class="wart">—</td>
        <td class="wart roz">${lz(r.wartoscKupna, 0)}</td>
        <td class="wart roz">${lz(r.prowizja, 2)}</td>
        <td class="wart roz">${lz(r.sumaPortfela * kursEfekt, 0)}</td>
        <td class="wart roz">100,0 %</td>
        <td class="lb">100,0 %</td>
        <td class="wart">—</td>
      </tr>`;

    /* ---------- wykres: cel a stan po zakupie ---------- */
    const svg = dane(miejsce, 'svg');
    const wysokosc = 46 + widoczne.length * 56;
    const maks = Math.max(1, ...widoczne.map(({ i }) => Math.max(r.wagiCel[i], r.udzialy[i]))) * 1.12;
    const dl = v => Math.max(2, (v / maks) * 420);
    svg.setAttribute('viewBox', `0 0 700 ${wysokosc}`);
    svg.innerHTML = `
      <text class="dg-t-b" x="8" y="18">Waga docelowa a udział po zakupie</text>
      <text class="dg-t-m" x="8" y="34">górny słupek — cel, dolny — portfel po wykonaniu zleceń</text>
      ${widoczne.map(({ p, i }, nr) => {
        const y = 52 + nr * 56;
        const t = ton(r.odchylki[i]);
        return `
        <text class="dg-t-b" x="8" y="${y + 20}">${p.ticker}</text>
        <rect class="dg-slupek roz" x="120" y="${y}" width="${dl(r.wagiCel[i]).toFixed(1)}" height="13" rx="3"/>
        <text class="dg-t-num roz" x="${(126 + dl(r.wagiCel[i])).toFixed(1)}" y="${y + 11}">${lz(r.wagiCel[i], 1)} %</text>
        <rect class="dg-slupek ${t}" x="120" y="${y + 17}" width="${dl(r.udzialy[i]).toFixed(1)}" height="13" rx="3"/>
        <text class="dg-t-num ${t}" x="${(126 + dl(r.udzialy[i])).toFixed(1)}" y="${y + 28}">${lz(r.udzialy[i], 1)} %</text>
        <text class="dg-t-m" x="8" y="${y + 34}">${r.szt[i] > 0 ? lz(r.szt[i], 0) + ' szt.' : p.pominiety ? 'pominięte' : 'bez zakupu'}</text>`;
      }).join('')}`;

    /* ---------- skąd te liczby ---------- */
    dane(miejsce, 'wzor').innerHTML = `
      <b>kurs efektywny</b> = ${lz(stan.kursEur, 4)} · (1 + ${lz(stan.narzut, 2)} %) =
      <b>${lz(kursEfekt, 4)}</b> zł/EUR &nbsp;|&nbsp;
      <b>budżet</b> = ${lz(stan.kwota, 0)} zł ÷ ${lz(kursEfekt, 4)} = <b>${lz(budzetEur, 0)} EUR</b><br>
      <b>prowizja zlecenia</b> = max(${lz(stan.prowMin, 2)} zł; ${lz(stan.prowProc, 2)} % · wartość zlecenia)
      &nbsp;|&nbsp; warunek: Σ wartości + Σ prowizji ≤ wpłata<br>
      Sztuki są niepodzielne, więc plan powstaje przez dokupowanie po jednej sztuce tej pozycji,
      która najbardziej zbliża cały portfel do wag docelowych — aż kolejna sztuka przestanie się
      mieścić w budżecie.`;

    /* ---------- werdykt ---------- */
    if (r.zlecenia === 0) {
      const kupowalne = poz.filter(p => p.kupuj);
      const najtanszy = kupowalne.reduce((a, p) => (!a || p.kurs < a.kurs ? p : a), null);
      const potrzeba = najtanszy
        ? najtanszy.kurs * kursEfekt + Math.max(stan.prowMin, najtanszy.kurs * kursEfekt * stan.prowProc / 100)
        : 0;
      komunikat(kom, 'alarm',
        `<strong>Ta kwota nie wystarcza na ani jedną sztukę.</strong>
         ${najtanszy
           ? `Najtańsza pozycja to ${najtanszy.ticker}: jedna sztuka z prowizją kosztuje
              około <strong>${lz(potrzeba, 2)} zł</strong>, a masz ${lz(stan.kwota, 0)} zł.`
           : 'Żadna pozycja nie jest ustawiona do kupna — sprawdź kursy, wagi i pole „pomiń”.'}
         Zwiększ wpłatę albo odłóż zakup do kolejnej.`);
    } else {
      const zlecenia = widoczne
        .filter(({ i }) => r.szt[i] > 0)
        .map(({ p, i }) => `<strong>${p.ticker} — ${lz(r.szt[i], 0)} szt.</strong> z limitem
          ${lz(p.kurs, 2)} EUR (${lz(r.szt[i] * p.kurs, 2)} EUR ≈ ${lz(r.szt[i] * p.kurs * kursEfekt, 0)} zł)`);

      /* czego dołożyć przy następnej wpłacie */
      const brakujaca = widoczne
        .filter(({ i }) => r.odchylki[i] < 0)
        .sort((x, y) => r.odchylki[x.i] - r.odchylki[y.i])[0];
      const doplata = brakujaca
        ? (r.wagiCel[brakujaca.i] / 100) * r.sumaPortfela - r.wartosci[brakujaca.i]
        : 0;

      /* prowizja minimalna zjadająca małe zlecenia */
      const drogie = widoczne.filter(({ i }) =>
        r.szt[i] > 0 && r.prowizjeSzt[i] > 0.01 * r.szt[i] * poz[i].kurs * kursEfekt);

      const uwagi = [];
      if (Math.abs(sumaWag - 100) > 0.01) {
        uwagi.push(`Wagi sumują się do ${lz(sumaWag, 1)} %, nie do 100 % — przeliczyłem je
          proporcjonalnie, ale sprawdź, czy o to Ci chodziło.`);
      }
      if (drogie.length) {
        uwagi.push(`Prowizja minimalna zjada ponad 1 % wartości zlecenia w:
          ${drogie.map(({ p, i }) => `${p.ticker} (${lz(100 * r.prowizjeSzt[i] / (r.szt[i] * p.kurs * kursEfekt), 2)} %)`).join(', ')}.
          Przy tak małej pozycji taniej wychodzi kupować ją co drugą albo co trzecią wpłatę
          w większej porcji — ustaw „pomiń w tej wpłacie”, żeby zobaczyć, jak zmieni się plan.`);
      }
      if (poz.some(p => p.pominiety && p.waga > 0)) {
        const p = poz.find(x => x.pominiety && x.waga > 0);
        uwagi.push(`${p.ticker} jest pominięty w tej wpłacie, ale jego waga docelowa
          (${lz(p.waga, 1)} %) nadal liczy się do udziałów — dlatego odchyłka na nim jest ujemna.`);
      }
      if (r.przerwane) {
        uwagi.push(`Kwota jest tak duża, że przerwałem dobieranie sztuk po ${LIMIT_KROKOW} krokach —
          wynik jest przybliżony, część budżetu została nierozdysponowana.`);
      }

      const dobrze = Math.abs(najwiekszaOdchylka.v) <= PROG_UWAGA;
      const cosPominiete = poz.some(p => p.pominiety && p.waga > 0);
      komunikat(kom, dobrze ? 'ok' : 'uwaga',
        `<strong>Plan na tę wpłatę:</strong> ${zlecenia.join('; ')}.
         Razem ${lz(r.wartoscKupna, 0)} zł zleceń + ${lz(r.prowizja, 2)} zł prowizji =
         <strong>${lz(r.koszt, 0)} zł</strong>, zostaje ${lz(r.reszta, 2)} zł.
         <br>Największa odchyłka od wag to ${lz(Math.abs(najwiekszaOdchylka.v), 2)} pp
         na ${najwiekszaOdchylka.i >= 0 ? poz[najwiekszaOdchylka.i].ticker : '—'}
         ${dobrze
           ? '— przy całych sztukach i takiej kwocie lepiej się nie da.'
           : cosPominiete
             ? `— tak to wygląda za każdym razem, gdy pomijasz pozycję: jej waga rozkłada się
                na pozostałe. Wyrównaj to przy kolejnej wpłacie, kupując pominiętą pozycję
                w podwójnej porcji.`
             : `— to już widoczne rozjechanie: przy tej kwocie jedna sztuka waży zbyt dużo,
                żeby trafić w wagi. Albo pogódź się z odchyłką i wyrównaj ją kolejną wpłatą,
                albo kupuj mniej pozycji naraz (pole „pomiń w tej wpłacie”) w większych porcjach.`}
         ${brakujaca && doplata > 0
           ? `<br>Przy następnej wpłacie zacznij od <strong>${poz[brakujaca.i].ticker}</strong> —
              do wagi docelowej brakuje tam ${lz(doplata, 2)} EUR, czyli
              ${lz(doplata / poz[brakujaca.i].kurs, 2)} sztuki.`
           : ''}
         ${uwagi.length ? `<br>${uwagi.join(' ')}` : ''}
         <br><span class="dg-mikro">Kalkulator liczy tylko arytmetykę zleceń: kurs waluty,
         prowizje i niepodzielność sztuk. Nie ocenia doboru instrumentów ani wag i nie jest
         rekomendacją inwestycyjną. Kursy wpisuj z arkusza zleceń (oferta sprzedaży), bo plan
         jest wyliczony dokładnie dla tych wartości.</span>`);
    }
  }

  podlacz(miejsce, stan, odswiez);
}

/* ==================================================== rejestracja w rejestrze diag.js */

if (window.DIAG_BUDOWNICZY) {
  Object.assign(window.DIAG_BUDOWNICZY, { 'portfel-etf': widgetPortfelEtf });
}

})();

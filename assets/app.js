/* ==========================================================================
   Egzamin SEP do 30 kV — logika strony
   Czysty JavaScript, bez budowania. Rozdziały to pliki .md w tym samym katalogu.
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------- rozdziały */

const ROZDZIALY = [
  {
    grupa: 'Egzamin SEP — grupa 1 do 30 kV',
    pozycje: [
      { plik: '01-podstawy-prawne-i-organizacja-pracy', numer: '01',
        tytul: 'Podstawy prawne i organizacja pracy',
        opis: 'Prawo energetyczne, kwalifikacje E i D, polecenia na pracę, strefy pracy, 5 zasad.' },
      { plik: '02-do-1kV-i-ochrona-przeciwporazeniowa', numer: '02',
        tytul: 'Do 1 kV i ochrona przeciwporażeniowa',
        opis: 'Układy TN/TT/IT, samoczynne wyłączenie, wyłączniki różnicowoprądowe, wyrównawcze.' },
      { plik: '03-sieci-i-urzadzenia-SN-do-30kV', numer: '03',
        tytul: 'Sieci i urządzenia SN do 30 kV',
        opis: 'Stacje, rozdzielnice, aparaty łączeniowe, transformatory, kable, punkt neutralny.' },
      { plik: '04-pomiary-ochronne', numer: '04',
        tytul: 'Pomiary ochronne',
        opis: 'Rezystancja izolacji, ciągłość PE, pętla zwarciowa, uziemienia, protokoły, terminy.' },
      { plik: '05-test-ABC-baza-pytan', numer: '05',
        tytul: 'Test ABC — baza pytań',
        opis: '146 pytań jednokrotnego wyboru z odpowiedziami i komentarzem.', nauka: true },
      { plik: '06-pytania-otwarte-ustne', numer: '06',
        tytul: 'Pytania otwarte (ustne)',
        opis: '60 pytań, tak jak pyta komisja, z wzorcowymi odpowiedziami.', nauka: true },
      { plik: '07-sciagawka-wzory-i-wartosci', numer: '07',
        tytul: 'Ściągawka — wzory i wartości',
        opis: 'Wzory, wartości liczbowe i tabele do zapamiętania na dzień przed.' },
      { plik: '08-pierwsza-pomoc-i-ppoz', numer: '08',
        tytul: 'Pierwsza pomoc i ochrona ppoż.',
        opis: 'Uwolnienie spod napięcia, resuscytacja, oparzenia, gaszenie urządzeń.' }
    ]
  },
  {
    grupa: 'Część II — ruch rozdzielni SN',
    pozycje: [
      { plik: '10-rozdzielnia-SN-pola-i-obwody-wtorne', numer: '10',
        tytul: 'Rozdzielnia SN — pola i obwody wtórne',
        opis: 'Typy pól, obwody wtórne, instalacja prądu stałego, współpraca pól, blokady.' },
      { plik: '11-zabezpieczenia-nastawy-i-testowanie', numer: '11',
        tytul: 'Zabezpieczenia — nastawy i badania',
        opis: 'Katalog zabezpieczeń z nastawami i metodą badania każdego z nich.' },
      { plik: '12-proby-funkcjonalne-sterowania-i-automatyki', numer: '12',
        tytul: 'Próby funkcjonalne sterowania',
        opis: 'Matryce prób sterowania i wyzwalania, automatyki, wzór protokołu.' },
      { plik: '13-procedura-odstawienia-i-zalaczenia-rozdzielni-SN', numer: '13',
        tytul: 'Odstawienie i podanie napięcia',
        opis: 'Pełna procedura od zera: wyłączanie, prace, próby, podanie napięcia.' },
      { plik: '14-blokada-logiczna-ZS-symulator', numer: '14',
        tytul: 'ZS — zabezpieczenie szyn (symulator)',
        opis: 'Blokada logiczna od podstaw: analogia, bramka AND na żywo, tor blokady, symulacja zwarcia.' }
    ]
  },
  {
    grupa: 'Część III — pomiary i diagnostyka SN/WN',
    pozycje: [
      { plik: '15-trudne-miejsca-przewodnik', numer: '15',
        tytul: 'Trudne miejsca — przewodnik',
        opis: 'Mapa całej części III, ranking trudności, plan nauki i słownik oznaczeń.' },
      { plik: '16-napiecia-indukowane', numer: '16',
        tytul: 'Napięcia indukowane w polu równoległym',
        opis: 'Sprzężenie pojemnościowe i indukcyjne, dlaczego uziemienie jednostronne nie wystarcza.' },
      { plik: '17-punkt-neutralny-sieci-SN', numer: '17',
        tytul: 'Punkt neutralny sieci SN',
        opis: 'Sieć izolowana, kompensowana, rezystorowa; prądy doziemne i zabezpieczenia kierunkowe.' },
      { plik: '18-uziemienia-w-rozdzielni', numer: '18',
        tytul: 'Uziemienia w rozdzielni',
        opis: 'Dlaczego metoda 62 % zawodzi, napięcia rażeniowe, współczynnik redukcyjny.' },
      { plik: '19-przekladniki-pradowe-i-napieciowe', numer: '19',
        tytul: 'Przekładniki prądowe i napięciowe',
        opis: 'Rozwarcie CT, rdzeń pomiarowy a zabezpieczeniowy, punkt kolanowy, biegunowość.' },
      { plik: '20-rezystancja-izolacji-i-tg-delta', numer: '20',
        tytul: 'Rezystancja izolacji i tg δ',
        opis: 'Od pomiaru do diagnozy: DAR, PI, korekta temperaturowa, tip-up, DFR.' },
      { plik: '21-wyladowania-niezupelne', numer: '21',
        tytul: 'Wyładowania niezupełne (WNZ)',
        opis: 'Kalibracja w pC, tło zakłóceń, wzorce PRPD, lokalizacja w kablu.' },
      { plik: '22-proby-napieciowe-kabli', numer: '22',
        tytul: 'Próby napięciowe kabli',
        opis: 'Dlaczego DC niszczy XLPE, VLF, AC rezonansowe, wytrzymałościowa a diagnostyczna.' },
      { plik: '23-topologia-i-zasilanie-zwrotne', numer: '23',
        tytul: 'Topologia i zasilanie zwrotne',
        opis: 'Źródła napięcia, których nie ma na schemacie jednokreskowym; pięć zasad, odległości.' }
    ]
  },
  {
    grupa: 'Część IV — układy sieci, obliczenia i normy',
    pozycje: [
      { plik: '24-uklady-sieci-i-petla-zwarcia', numer: '24',
        tytul: 'Układy sieci i pętla zwarcia',
        opis: 'TN-C, TN-S, TN-C-S, TT, IT na rysunkach: którędy wraca prąd zwarciowy i co go wyłącza.' },
      { plik: '25-kalkulator-petli-zwarcia', numer: '25',
        tytul: 'Kalkulator pętli zwarciowej',
        opis: 'Z_s, I_k, I_a i reguła 2/3 — pełny rachunek z Twoimi przekrojami i długościami.' },
      { plik: '26-normy-rezystancje-uziemienia-i-okablowanie', numer: '26',
        tytul: 'Normy — rezystancje i uziemienia',
        opis: 'Uziemienia, ciągłość PE, izolacja, minimalne przekroje, terminy badań — z podstawą prawną.' }
    ]
  },
  {
    grupa: 'Dodatek — poza egzaminem',
    pozycje: [
      { plik: '30-kalkulator-portfela-etf', numer: '30',
        tytul: 'Kalkulator portfela ETF',
        opis: 'Podział wpłaty na ETF-y w euro: całe sztuki, prowizje minimalne, wagi docelowe i dopłaty.' }
    ]
  }
];

const WSZYSTKIE = ROZDZIALY.flatMap(g => g.pozycje);
const KLUCZ_MOTYW = 'sep.motyw';
const KLUCZ_SKALA = 'sep.skala';
const KLUCZ_PRZECZYTANE = 'sep.przeczytane';
const KLUCZ_NAUKA = 'sep.nauka';
const KLUCZ_POZYCJA = 'sep.pozycja';

/* ------------------------------------------------------------- narzędzia */

const $ = sel => document.querySelector(sel);
const el = $('#artykul');

/** Odczyt z localStorage z zabezpieczeniem (tryb prywatny może rzucać wyjątek). */
function pamiecOdczyt(klucz, domyslne) {
  try {
    const v = localStorage.getItem(klucz);
    return v === null ? domyslne : JSON.parse(v);
  } catch (_) { return domyslne; }
}

function pamiecZapis(klucz, wartosc) {
  try { localStorage.setItem(klucz, JSON.stringify(wartosc)); } catch (_) { /* brak pamięci — ignoruj */ }
}

/** Usuwa polskie ogonki, żeby szukanie „petla” znajdowało „pętla”. */
function bezOgonkow(tekst) {
  return tekst
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Rdzeń słowa — obcina końcówkę, żeby szukanie radziło sobie z polską odmianą:
 * „pętla” znajdzie „pętli” i „pętlę”, „zwarciowa” znajdzie „zwarciowej”.
 */
function rdzen(slowo) {
  if (slowo.length <= 4) return slowo;
  if (slowo.length <= 6) return slowo.slice(0, -1);
  return slowo.slice(0, -2);
}

/** Zamienia nagłówek na identyfikator do adresu (bez ogonków i znaków specjalnych). */
function naIdentyfikator(tekst) {
  return bezOgonkow(tekst)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'sekcja';
}

function ucieczkaHtml(tekst) {
  return tekst.replace(/[&<>"']/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[z]));
}

/**
 * Wykonuje dodatek do treści (spis treści, pasek nauki itp.) tak, aby jego awaria
 * nigdy nie skasowała już wyrenderowanego rozdziału.
 */
function bezpiecznie(zadanie, opis) {
  try { zadanie(); } catch (blad) { console.warn(`Pominięto: ${opis}`, blad); }
}

/* ------------------------------------------------------- motyw i rozmiar */

function ustawMotyw(motyw) {
  document.documentElement.dataset.motyw = motyw;
  const kolor = motyw === 'jasny' ? '#ffffff' : '#07070b';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = kolor;
  pamiecZapis(KLUCZ_MOTYW, motyw);
}

function ustawSkale(skala) {
  const s = Math.min(1.4, Math.max(0.85, skala));
  document.documentElement.style.setProperty('--tekst-skala', s.toFixed(2));
  pamiecZapis(KLUCZ_SKALA, s);
  return s;
}

let skala = ustawSkale(pamiecOdczyt(KLUCZ_SKALA, 1));
ustawMotyw(pamiecOdczyt(KLUCZ_MOTYW, 'czarny'));

/* ------------------------------------------------ wczytywanie i renderowanie */

const pamiecPlikow = new Map();

async function wezPlik(plik) {
  if (pamiecPlikow.has(plik)) return pamiecPlikow.get(plik);
  const odp = await fetch(`${plik}.md`, { cache: 'no-cache' });
  if (!odp.ok) throw new Error(`Nie udało się wczytać pliku ${plik}.md (${odp.status})`);
  const tekst = await odp.text();
  pamiecPlikow.set(plik, tekst);
  return tekst;
}

/* --- wzory matematyczne: wyjmujemy je przed marked, wstawiamy po renderze --- */

let katexGotowy = null;

function wczytajKatex() {
  if (katexGotowy) return katexGotowy;

  katexGotowy = new Promise((zrob, odrzuc) => {
    if (window.katex) return zrob();

    // limit czasu: bez niego rozdział ze wzorami czekałby bez końca,
    // gdyby biblioteki nie dało się pobrać
    const limit = setTimeout(() => odrzuc(new Error('Przekroczono czas wczytywania biblioteki wzorów')), 5000);
    const koniec = (fn, arg) => { clearTimeout(limit); fn(arg); };

    const styl = document.createElement('link');
    styl.rel = 'stylesheet';
    styl.href = 'assets/vendor/katex.min.css';
    document.head.appendChild(styl);

    const skrypt = document.createElement('script');
    skrypt.src = 'assets/vendor/katex.min.js';
    skrypt.onload = () => koniec(zrob);
    skrypt.onerror = () => koniec(odrzuc, new Error('Nie udało się wczytać biblioteki wzorów'));
    document.head.appendChild(skrypt);
  });

  return katexGotowy;
}

/**
 * Zastępuje wzory ($...$ i $$...$$) znacznikami zastępczymi.
 * Fragmenty w blokach kodu (```) są pomijane.
 */
function wyjmijWzory(markdown) {
  const wzory = [];
  const czesci = markdown.split(/(```[\s\S]*?```)/g);

  const przetworz = fragment => fragment
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tresc) => {
      wzory.push({ tresc, blok: true });
      return `@@WZOR${wzory.length - 1}@@`;
    })
    .replace(/\$([^\n$]+?)\$/g, (_, tresc) => {
      wzory.push({ tresc, blok: false });
      return `@@WZOR${wzory.length - 1}@@`;
    });

  const wynik = czesci.map(cz => cz.startsWith('```') ? cz : przetworz(cz)).join('');
  return { tekst: wynik, wzory };
}

/** Wstawia wyrenderowane wzory w miejsce znaczników zastępczych. */
async function wstawWzory(korzen, wzory) {
  if (!wzory.length) return;
  try {
    await wczytajKatex();
  } catch (_) {
    return; // bez biblioteki zostaje surowy zapis — treść nadal czytelna
  }

  const spacer = document.createTreeWalker(korzen, NodeFilter.SHOW_TEXT);
  const doPodmiany = [];
  let wezel;
  while ((wezel = spacer.nextNode())) {
    if (/@@WZOR\d+@@/.test(wezel.nodeValue)) doPodmiany.push(wezel);
  }

  for (const tekstowy of doPodmiany) {
    const czesci = tekstowy.nodeValue.split(/(@@WZOR\d+@@)/g);
    const fragment = document.createDocumentFragment();

    for (const czesc of czesci) {
      const trafienie = czesc.match(/^@@WZOR(\d+)@@$/);
      if (!trafienie) {
        fragment.appendChild(document.createTextNode(czesc));
        continue;
      }
      const wzor = wzory[Number(trafienie[1])];
      const opakowanie = document.createElement(wzor.blok ? 'div' : 'span');
      try {
        window.katex.render(wzor.tresc, opakowanie, {
          displayMode: wzor.blok, throwOnError: false, output: 'html'
        });
      } catch (_) {
        opakowanie.textContent = wzor.tresc;
      }
      fragment.appendChild(opakowanie);
    }
    tekstowy.parentNode.replaceChild(fragment, tekstowy);
  }
}

/** Markdown -> HTML (z obsługą wzorów). */
async function renderujMarkdown(markdown, kontener) {
  const { tekst, wzory } = wyjmijWzory(markdown);
  kontener.innerHTML = window.marked.parse(tekst, { gfm: true, breaks: false });
  await wstawWzory(kontener, wzory);
  upiekszTresc(kontener);
}

/* ------------------------------------------------- upiększanie wyrenderowanej treści */

function upiekszTresc(korzen) {
  // tabele w przewijanej otoczce (żeby na telefonie dały się przesuwać w bok)
  korzen.querySelectorAll('table').forEach(tabela => {
    if (tabela.parentElement.classList.contains('tabela-otoczka')) return;
    const otoczka = document.createElement('div');
    otoczka.className = 'tabela-otoczka';
    otoczka.setAttribute('tabindex', '0');
    otoczka.setAttribute('role', 'group');
    tabela.parentNode.insertBefore(otoczka, tabela);
    otoczka.appendChild(tabela);
  });

  // kolorowanie ramek: uwaga / zagrożenie / odpowiedź
  korzen.querySelectorAll('blockquote').forEach(ramka => {
    const tresc = ramka.textContent.trim();
    if (/^(Uwaga|Ważne|Zastrzeżenie|Pamiętaj)/i.test(tresc)) ramka.classList.add('uwaga');
    else if (/^(Nigdy|Nie wolno|Zagrożenie|Groźn|Śmiertel|STOP)/i.test(tresc)) ramka.classList.add('groza');
    else if (/^[A-C]\.\s/.test(tresc) || /^Odpowied/i.test(tresc)) ramka.classList.add('odpowiedz');
  });

  // identyfikatory nagłówków + odnośnik do skopiowania.
  // Pierwszy nagłówek to tytuł rozdziału — pomijamy go; dalsze H1 (np. FAZA 0
  // w procedurze odstawienia) są pełnoprawnymi sekcjami i muszą mieć adres.
  const uzyte = new Set();
  const naglowki = [...korzen.querySelectorAll('h1, h2, h3')];
  if (naglowki[0] && naglowki[0].tagName === 'H1') naglowki.shift();

  naglowki.forEach(naglowek => {
    let id = naIdentyfikator(naglowek.textContent);
    let n = 2;
    while (uzyte.has(id)) id = `${naIdentyfikator(naglowek.textContent)}-${n++}`;
    uzyte.add(id);
    naglowek.id = id;

    const kotwica = document.createElement('a');
    kotwica.className = 'zakotwiczenie';
    kotwica.href = `#/${trasaTeraz().plik}/${id}`;
    kotwica.textContent = '#';
    kotwica.setAttribute('aria-label', `Odnośnik do: ${naglowek.textContent}`);
    naglowek.insertBefore(kotwica, naglowek.firstChild);
  });

  // interaktywne symulatory ZS (rozdział 14) — awaria nie może zabrać treści
  bezpiecznie(() => zbudujWidgetyZS(korzen), 'symulatory ZS');

  // symulatory części III (rozdziały 16–23) — kod w assets/diag.js
  bezpiecznie(() => {
    if (typeof window.zbudujWidgetyDiag === 'function') window.zbudujWidgetyDiag(korzen);
  }, 'symulatory diagnostyki');

  // odnośniki do plików .md prowadzą wewnątrz strony, zewnętrzne otwierają nową kartę
  korzen.querySelectorAll('a[href]').forEach(odnosnik => {
    const href = odnosnik.getAttribute('href');
    if (/^[\w.-]+\.md(#.*)?$/i.test(href)) {
      const [plik, kotwica] = href.replace(/\.md/i, '').split('#');
      odnosnik.setAttribute('href', `#/${plik}${kotwica ? '/' + kotwica : ''}`);
    } else if (/^https?:/i.test(href)) {
      odnosnik.target = '_blank';
      odnosnik.rel = 'noopener';
    }
  });
}

/* ============================================ symulatory ZS (rozdział 14) ==
   W treści rozdziału wystawiamy tylko puste znaczniki:
     <div class="zs-widget" data-typ="brama"></div>
     <div class="zs-widget" data-typ="rozdzielnia"></div>
   Cała interakcja powstaje tutaj, żeby markdown został czytelny.
   ========================================================================== */

const ZS_WEJSCIA = [
  { id: 'zson',  skrot: 'ZS ON = 1',        adres: 'STATE',
    nazwa: 'Automat ZS ON',         opis: 'funkcja ZS włączona w sterowniku',
    brak: 'Automat ZS jest wyłączony — cała funkcja nie działa. Szyny są chronione tylko zwykłym czasem 0,8 s.' },
  { id: 'prad',  skrot: 'I&gt;t.P',          adres: 'A6',
    nazwa: 'Pobudzenie I&gt;t.P',      opis: 'to pole widzi prąd zwarciowy',
    brak: 'Brak pobudzenia prądowego — przez to pole nie płynie prąd zwarciowy, więc nie ma czego zgłaszać.' },
  { id: 'wyl',   skrot: 'W zamkn.',         adres: 'A10',
    nazwa: 'Wyłącznik zamknięty',   opis: 'W ON.Out — pole pracuje',
    brak: 'Wyłącznik pola jest otwarty — nic przez to pole nie płynie, więc nie może być źródłem zwarcia i nie ma prawa blokować szyn.' },
  { id: 'wozek', skrot: 'Wózek praca',      adres: 'A10',
    nazwa: 'Wózek w pozycji praca', opis: 'nie „próba” — chroni przed fałszywką w czasie testów',
    brak: 'Wózek jest w pozycji próby — to test zabezpieczenia, a nie prawdziwe zwarcie. Blokada celowo nie wychodzi, żeby test nie zdjął ochrony szyn.' }
];

function zbudujWidgetyZS(korzen) {
  korzen.querySelectorAll('.zs-widget').forEach(miejsce => {
    if (miejsce.dataset.gotowe) return;
    miejsce.dataset.gotowe = '1';
    if (miejsce.dataset.typ === 'brama') widgetBramaZS(miejsce);
    else if (miejsce.dataset.typ === 'rozdzielnia') widgetRozdzielniaZS(miejsce);
  });
}

/* --------------------------------------------------- symulator 1: bramka AND */

function widgetBramaZS(miejsce) {
  const stan = { zson: true, prad: false, wyl: true, wozek: true };
  const Y = { zson: 45, prad: 80, wyl: 115, wozek: 150 };

  miejsce.classList.add('zs');
  miejsce.innerHTML = `
    <div class="zs-pasek">
      <span class="zs-znaczek">Symulator 1</span>
      <strong>Bramka AND — kiedy pole odpływowe wysyła blokadę BL_ZS</strong>
    </div>

    <div class="zs-przelaczniki">
      ${ZS_WEJSCIA.map(w => `
        <button type="button" class="zs-przelacznik" data-we="${w.id}" aria-pressed="false">
          <span class="zs-dioda" aria-hidden="true"></span>
          <span class="zs-etykieta">
            <strong>${w.nazwa}</strong>
            <small>${w.opis}</small>
          </span>
          <span class="zs-bit">0</span>
        </button>`).join('')}
    </div>

    <div class="zs-rysunek">
      <svg viewBox="0 0 620 195" class="zs-svg" role="img"
           aria-label="Schemat logiczny: cztery wejścia, bramka iloczynu, wyjście BL_ZS">
        ${ZS_WEJSCIA.map(w => `
          <text class="zs-opis" x="8" y="${Y[w.id] + 4}">${w.skrot}</text>
          <text class="zs-adres" x="8" y="${Y[w.id] + 19}">${w.adres}</text>
          <path class="zs-tor" data-tor="${w.id}" d="M168 ${Y[w.id]} H300"/>
          <circle class="zs-pin" data-tor="${w.id}" cx="300" cy="${Y[w.id]}" r="3.5"/>`).join('')}

        <path class="zs-brama-ksztalt" data-brama d="M300 25 H355 A72.5 72.5 0 0 1 355 170 H300 Z"/>
        <text class="zs-brama-napis" x="342" y="92">AND</text>
        <text class="zs-brama-napis mala" x="342" y="112">iloczyn</text>

        <path class="zs-tor" data-tor="wyjscie" d="M427 97.5 H470"/>
        <rect class="zs-pudlo" data-tor="wyjscie" x="470" y="72" width="142" height="52" rx="8"/>
        <text class="zs-wy-nazwa" x="541" y="93">BL_ZS (Wy04).Stan</text>
        <text class="zs-wy-bit"   x="541" y="115" data-wybit>0</text>
        <text class="zs-adres" x="431" y="90">A11</text>
      </svg>
    </div>

    <p class="zs-komunikat" data-kom aria-live="polite"></p>`;

  const svg = miejsce.querySelector('svg');
  const kom = miejsce.querySelector('[data-kom]');

  function odswiez() {
    const wynik = ZS_WEJSCIA.every(w => stan[w.id]);

    miejsce.querySelectorAll('.zs-przelacznik').forEach(przycisk => {
      const wl = stan[przycisk.dataset.we];
      przycisk.classList.toggle('wlaczony', wl);
      przycisk.setAttribute('aria-pressed', String(wl));
      przycisk.querySelector('.zs-bit').textContent = wl ? '1' : '0';
    });

    ZS_WEJSCIA.forEach(w => {
      svg.querySelectorAll(`[data-tor="${w.id}"]`).forEach(e => e.classList.toggle('aktywny', stan[w.id]));
    });
    svg.querySelectorAll('[data-tor="wyjscie"]').forEach(e => e.classList.toggle('aktywny', wynik));
    svg.querySelector('[data-brama]').classList.toggle('aktywny', wynik);
    svg.querySelector('[data-wybit]').textContent = wynik ? '1' : '0';
    svg.querySelector('[data-wybit]').classList.toggle('aktywny', wynik);

    const braki = ZS_WEJSCIA.filter(w => !stan[w.id]);
    if (!braki.length) {
      kom.className = 'zs-komunikat ok';
      kom.innerHTML = '<strong>BL_ZS = 1 — blokada wychodzi.</strong> Pole odpływowe „podnosi rękę”: ' +
        'to jego zwarcie. Pole zasilające odstawia stopień ZS i czeka swój normalny czas 0,8 s, ' +
        'pełniąc już tylko rolę rezerwy. Selektywność zachowana.';
    } else {
      kom.className = 'zs-komunikat alarm';
      kom.innerHTML = `<strong>BL_ZS = 0 — blokada nie wychodzi.</strong> ${braki[0].brak}` +
        (braki.length > 1 ? ` <em>(Brakuje jeszcze ${braki.length - 1} innych warunków.)</em>` : '') +
        ' Jeśli tak samo milczą wszystkie odpływy, pole zasilające uzna zwarcie za zwarcie na szynach.';
    }
  }

  miejsce.querySelectorAll('.zs-przelacznik').forEach(przycisk => {
    przycisk.addEventListener('click', () => {
      stan[przycisk.dataset.we] = !stan[przycisk.dataset.we];
      odswiez();
    });
  });

  odswiez();
}

/* ------------------------------------------- symulator 2: cała rozdzielnia */

/** Jeden krok scenariusza: czas, opis i stan rysunku do pokazania. */
const ZS_SCENARIUSZE = {
  szyny: {
    nazwa: 'Zwarcie na szynach zbiorczych',
    kroki: [
      { t: '0 ms', ton: 'alarm', tekst: 'Zwarcie na szynach. Prąd płynie z transformatora przez pole zasilające prosto w miejsce zwarcia — i tam się kończy.',
        s: { luk: 'szyny', prad: ['trafo', 'zas', 'szyna'] } },
      { t: '20 ms', ton: 'info', tekst: 'Pole zasilające pobudza I&gt;. Żaden odpływ nie widzi prądu zwarciowego, bo zwarcie jest przed nimi. Nasłuch blokady się rozpoczyna.',
        s: { luk: 'szyny', prad: ['trafo', 'zas', 'szyna'], pobZas: true } },
      { t: '60 ms', ton: 'alarm', tekst: 'Koniec nastawionego okna 40–100 ms. Na szynach okrężnych blokady <strong>cisza</strong>. Dla sterownika to dowód: zwarcie jest w strefie szyn.',
        s: { luk: 'szyny', prad: ['trafo', 'zas', 'szyna'], pobZas: true, decyzja: 'brak-blokady' } },
      { t: '60 ms', ton: 'info', tekst: 'Bezzwłoczna komenda wyłączenia na pole zasilające — stopień ZS pomija zwłokę 0,8 s.',
        s: { luk: 'szyny', prad: ['trafo', 'zas', 'szyna'], pobZas: true, decyzja: 'wylacz' } },
      { t: '≈120 ms', ton: 'ok', tekst: 'Wyłącznik pola zasilającego otwarty (własny czas ok. 60 ms), łuk zgaszony. Sekcja jest bez napięcia — i o to chodziło.',
        s: { luk: null, wylZas: 'otw', bezNapiecia: true } }
    ],
    podsumowanie: '<strong>Zysk ZS: ok. 120 ms zamiast ok. 860 ms.</strong> Bez ZS pole zasilające ' +
      'czekałoby pełne 0,8 s + czas wyłącznika. Energia łuku rośnie z czasem, więc to różnica ' +
      'między przypaloną szyną a rozerwanym przedziałem. Ceny w postaci przekładników i stref ' +
      'jak w różnicówce szyn nie zapłaciliśmy żadnej.'
  },
  odplyw: {
    nazwa: 'Zwarcie w polu odpływowym nr 2',
    kroki: [
      { t: '0 ms', ton: 'alarm', tekst: 'Zwarcie w kablu odpływu 2. Prąd płynie z transformatora przez pole zasilające, <strong>przez szyny</strong> i dalej przez odpływ 2.',
        s: { luk: 'odplyw', prad: ['trafo', 'zas', 'szyna', 'o2'] } },
      { t: '20 ms', ton: 'ok', tekst: 'Odpływ 2 pobudza I&gt; i <strong>natychmiast</strong> wystawia BL_ZS na szyny okrężne blokady. Pole zasilające też widzi prąd — ale nie wie jeszcze, gdzie jest zwarcie.',
        s: { luk: 'odplyw', prad: ['trafo', 'zas', 'szyna', 'o2'], pobZas: true, pobO2: true, blokada: ['o2', 'szyna', 'zas'] } },
      { t: '35 ms', ton: 'ok', tekst: 'Wejście dwustanowe pola zasilającego odebrało blokadę — jeszcze w oknie 40–100 ms. Stopień ZS zostaje zablokowany, zostaje zwykłe I&gt; = 0,8 s jako rezerwa.',
        s: { luk: 'odplyw', prad: ['trafo', 'zas', 'szyna', 'o2'], pobZas: true, pobO2: true, blokada: ['o2', 'szyna', 'zas'], decyzja: 'blokada' } },
      { t: '500 ms', ton: 'info', tekst: 'Odpływ 2 wyłącza własnym czasem 0,5 s. Zwarcie zniknęło razem z nim, więc rezerwa 0,8 s nigdy nie dojdzie do końca.',
        s: { luk: null, wylO2: 'otw', martwe: ['o2'] } },
      { t: 'koniec', ton: 'ok', tekst: 'Szyny pod napięciem, odpływy 1 i 3 pracują dalej. Wyłączono dokładnie to jedno pole, które trzeba było.',
        s: { luk: null, wylO2: 'otw', martwe: ['o2'], normalna: true } }
    ],
    podsumowanie: '<strong>Selektywność zachowana.</strong> Ten scenariusz jest tak samo ważny jak ' +
      'poprzedni: pokazuje, po co w ogóle blokada. Gdyby tor blokady był przerwany, pole zasilające ' +
      'nie usłyszałoby zgłoszenia i po 60 ms zgasiłoby <em>całą sekcję</em> z powodu zwarcia w jednym ' +
      'kablu. Dlatego tor blokady sprawdza się dla <em>każdej</em> pary pól.'
  }
};

function widgetRozdzielniaZS(miejsce) {
  const X = { o1: 200, o2: 370, o3: 540 };
  const stub = { o1: 230, o2: 400, o3: 570 };

  const poleOdplywowe = (id, nr) => `
    <path class="zs-tor-mocny" data-odc="${id}" d="M${X[id]} 160 V190 M${X[id]} 224 V266"/>
    <g class="zs-wyl" data-wyl="${id}" transform="translate(${X[id]},207)">
      <rect x="-11" y="-15" width="22" height="30" rx="3"/>
      <line class="zs-styk" x1="0" y1="-15" x2="0" y2="15"/>
    </g>
    <path class="zs-strzalka" d="M${X[id] - 6} 266 H${X[id] + 6} L${X[id]} 276 Z"/>
    <text class="zs-pole-nazwa koniec" x="${X[id] - 16}" y="184">Odpływ ${nr}</text>
    <g class="zs-pobudzenie" data-pob="${id}" transform="translate(${X[id] + 30},190)">
      <rect x="-17" y="-9" width="34" height="18" rx="9"/>
      <text y="4">I&gt;</text>
    </g>
    <path class="zs-blok-tor" data-blok="${id}" d="M${X[id] + 11} 207 H${stub[id]} V300"/>`;

  miejsce.classList.add('zs');
  miejsce.innerHTML = `
    <div class="zs-pasek">
      <span class="zs-znaczek">Symulator 2</span>
      <strong>Rozdzielnia w akcji — dwa scenariusze, dwa zupełnie różne czasy</strong>
    </div>

    <div class="zs-sterowanie">
      <button type="button" class="zs-btn glowny" data-sc="szyny">Zwarcie na szynach</button>
      <button type="button" class="zs-btn glowny" data-sc="odplyw">Zwarcie w odpływie 2</button>
      <button type="button" class="zs-btn" data-akcja="krok" disabled>Krok →</button>
      <button type="button" class="zs-btn" data-akcja="reset">Reset</button>
    </div>

    <div class="zs-rysunek">
      <svg viewBox="0 0 660 330" class="zs-svg zs-svg-stacja" role="img"
           aria-label="Schemat rozdzielni: transformator, pole zasilające, szyny zbiorcze, trzy odpływy i szyny okrężne blokady">
        <!-- transformator + pole zasilające -->
        <circle class="zs-trafo" cx="80" cy="28" r="15"/>
        <circle class="zs-trafo" cx="80" cy="44" r="15"/>
        <text class="zs-podpis" x="108" y="30">Transformator</text>
        <text class="zs-podpis" x="108" y="45">WN/SN</text>

        <path class="zs-tor-mocny" data-odc="trafo" d="M80 59 V78"/>
        <path class="zs-tor-mocny" data-odc="zas" d="M80 111 V160"/>
        <g class="zs-wyl" data-wyl="zas" transform="translate(80,94)">
          <rect x="-11" y="-15" width="22" height="30" rx="3"/>
          <line class="zs-styk" x1="0" y1="-15" x2="0" y2="15"/>
        </g>
        <text class="zs-pole-nazwa start" x="97" y="137">Pole zasilające</text>
        <g class="zs-pobudzenie" data-pob="zas" transform="translate(126,94)">
          <rect x="-17" y="-9" width="34" height="18" rx="9"/>
          <text y="4">I&gt;</text>
        </g>
        <path class="zs-blok-tor" data-blok="zas" d="M69 94 H44 V300"/>

        <!-- szyny zbiorcze -->
        <path class="zs-szyna" data-odc="szyna" d="M62 160 H626"/>
        <text class="zs-szyna-napis" x="626" y="150">SZYNY ZBIORCZE</text>

        ${poleOdplywowe('o1', 1)}${poleOdplywowe('o2', 2)}${poleOdplywowe('o3', 3)}

        <!-- szyny okrężne blokady -->
        <path class="zs-blok-szyna" data-blok="szyna" d="M44 300 H570"/>
        <text class="zs-blok-napis" x="309" y="320">szyny okrężne blokady — sygnał BL_ZS</text>

        <!-- miejsca zwarcia -->
        <g class="zs-luk" data-luk="szyny" transform="translate(300,160)">
          <circle class="zs-luk-tlo" r="18"/>
          <path transform="scale(1.15)" d="M-13 -16 L2 -4 L-6 0 L11 16 L-2 4 L6 0 Z"/>
        </g>
        <g class="zs-luk" data-luk="odplyw" transform="translate(370,257)">
          <circle class="zs-luk-tlo" r="12"/>
          <path transform="scale(0.85)" d="M-13 -16 L2 -4 L-6 0 L11 16 L-2 4 L6 0 Z"/>
        </g>

        <text class="zs-plakietka" data-plakietka x="648" y="24"></text>
      </svg>
    </div>

    <ol class="zs-kroki" data-kroki aria-live="polite"></ol>
    <p class="zs-komunikat" data-kom hidden></p>`;

  const svg = miejsce.querySelector('svg');
  const listaKrokow = miejsce.querySelector('[data-kroki]');
  const kom = miejsce.querySelector('[data-kom]');
  const btnKrok = miejsce.querySelector('[data-akcja="krok"]');
  const plakietka = svg.querySelector('[data-plakietka]');

  let scenariusz = null;
  let krok = -1;
  let zegar = null;

  function rysuj(s) {
    s = s || {};
    const prad = s.prad || [];
    const martwe = s.martwe || [];
    const blokada = s.blokada || [];
    svg.querySelectorAll('[data-odc]').forEach(e => {
      e.classList.toggle('prad', prad.includes(e.dataset.odc));
      e.classList.toggle('martwy', martwe.includes(e.dataset.odc));
    });
    svg.querySelectorAll('[data-luk]').forEach(e => e.classList.toggle('widoczny', e.dataset.luk === s.luk));
    svg.querySelectorAll('[data-blok]').forEach(e => e.classList.toggle('aktywny', blokada.includes(e.dataset.blok)));
    svg.querySelector('[data-pob="zas"]').classList.toggle('aktywny', !!s.pobZas);
    svg.querySelector('[data-pob="o2"]').classList.toggle('aktywny', !!s.pobO2);

    const ustawWyl = (id, otwarty) => {
      const g = svg.querySelector(`[data-wyl="${id}"]`);
      g.classList.toggle('otwarty', otwarty);
      g.querySelector('.zs-styk').setAttribute('transform', otwarty ? 'rotate(-34)' : '');
    };
    ustawWyl('zas', s.wylZas === 'otw');
    ustawWyl('o2', s.wylO2 === 'otw');
    ustawWyl('o1', false);
    ustawWyl('o3', false);

    svg.classList.toggle('bez-napiecia', !!s.bezNapiecia);

    // SVG nie przyjmuje .className — trzeba przez atrybut
    const opisz = (tekst, ton) => {
      plakietka.textContent = tekst;
      plakietka.setAttribute('class', 'zs-plakietka' + (ton ? ' ' + ton : ''));
    };
    if (s.decyzja === 'brak-blokady') opisz('brak blokady → zwarcie jest na szynach', 'alarm');
    else if (s.decyzja === 'wylacz')  opisz('ZS: wyłącz bezzwłocznie', 'alarm');
    else if (s.decyzja === 'blokada') opisz('blokada odebrana → ZS odstawione, rezerwa 0,8 s', 'ok');
    else if (s.bezNapiecia)           opisz('cała sekcja bez napięcia', '');
    else if (s.normalna)              opisz('praca normalna — wyłączony tylko odpływ 2', 'ok');
    else                              opisz(s.spoczynek || '', '');
  }

  function pokazKrok(i) {
    krok = i;
    const dane = ZS_SCENARIUSZE[scenariusz];
    rysuj(dane.kroki[i].s);
    [...listaKrokow.children].forEach((li, n) => {
      li.classList.toggle('teraz', n === i);
      li.classList.toggle('zrobiony', n < i);
    });
    listaKrokow.children[i].scrollIntoView({ block: 'nearest' });

    const ostatni = i === dane.kroki.length - 1;
    btnKrok.disabled = ostatni;
    if (ostatni) {
      kom.hidden = false;
      kom.className = 'zs-komunikat ok';
      kom.innerHTML = dane.podsumowanie;
    }
  }

  function start(nazwa) {
    clearTimeout(zegar);
    scenariusz = nazwa;
    const dane = ZS_SCENARIUSZE[nazwa];
    kom.hidden = true;
    miejsce.querySelectorAll('[data-sc]').forEach(b => b.classList.toggle('wybrany', b.dataset.sc === nazwa));
    listaKrokow.innerHTML = dane.kroki.map(k => `
      <li><span class="zs-czas ${k.ton}">${k.t}</span><span>${k.tekst}</span></li>`).join('');
    pokazKrok(0);
    graj();
  }

  function graj() {
    clearTimeout(zegar);
    const dane = ZS_SCENARIUSZE[scenariusz];
    if (krok >= dane.kroki.length - 1) return;
    zegar = setTimeout(() => { pokazKrok(krok + 1); graj(); }, 2300);
  }

  function reset() {
    clearTimeout(zegar);
    scenariusz = null; krok = -1;
    listaKrokow.innerHTML = '<li class="zs-zacheta teraz">Wybierz scenariusz powyżej. Przebieg odtworzy się sam — albo klikaj „Krok →” we własnym tempie.</li>';
    kom.hidden = true;
    btnKrok.disabled = true;
    miejsce.querySelectorAll('[data-sc]').forEach(b => b.classList.remove('wybrany'));
    rysuj({ spoczynek: 'praca normalna — wszystko pod napięciem' });
  }

  miejsce.querySelectorAll('[data-sc]').forEach(b => b.addEventListener('click', () => start(b.dataset.sc)));
  btnKrok.addEventListener('click', () => {
    clearTimeout(zegar);
    if (scenariusz && krok < ZS_SCENARIUSZE[scenariusz].kroki.length - 1) pokazKrok(krok + 1);
  });
  miejsce.querySelector('[data-akcja="reset"]').addEventListener('click', reset);

  reset();
}

/* ------------------------------------------------------------------ trasy */

/** Zwraca aktualną trasę: { plik, kotwica }. Pusty plik = strona startowa. */
function trasaTeraz() {
  const surowa = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const [plik = '', kotwica = ''] = surowa.split('/');
  return { plik, kotwica };
}

function nawiguj(plik, kotwica) {
  location.hash = `#/${plik}${kotwica ? '/' + kotwica : ''}`;
}

/* ------------------------------------------------------- panel z rozdziałami */

function przeczytane() { return pamiecOdczyt(KLUCZ_PRZECZYTANE, []); }

function przelaczPrzeczytany(plik) {
  const lista = przeczytane();
  const i = lista.indexOf(plik);
  if (i === -1) lista.push(plik); else lista.splice(i, 1);
  pamiecZapis(KLUCZ_PRZECZYTANE, lista);
  odswiezPostep();
}

function odswiezPostep() {
  const lista = przeczytane().filter(p => WSZYSTKIE.some(r => r.plik === p));
  $('#postep-liczba').textContent = `${lista.length}/${WSZYSTKIE.length}`;
  $('#postep-wypelnienie').style.width = `${(lista.length / WSZYSTKIE.length) * 100}%`;
  document.querySelectorAll('.spis-ptaszek').forEach(przycisk => {
    przycisk.setAttribute('aria-pressed', String(lista.includes(przycisk.dataset.plik)));
  });
}

function zbudujSpis() {
  const spis = $('#spis');
  spis.innerHTML = '';

  for (const grupa of ROZDZIALY) {
    const naglowek = document.createElement('div');
    naglowek.className = 'spis-grupa';
    naglowek.textContent = grupa.grupa;
    spis.appendChild(naglowek);

    for (const poz of grupa.pozycje) {
      const wiersz = document.createElement('div');
      wiersz.className = 'spis-poz';

      const link = document.createElement('a');
      link.className = 'spis-link';
      link.href = `#/${poz.plik}`;
      link.dataset.plik = poz.plik;
      link.innerHTML = `<span class="spis-numer">${poz.numer}</span><span>${ucieczkaHtml(poz.tytul)}</span>`;
      wiersz.appendChild(link);

      const ptaszek = document.createElement('button');
      ptaszek.className = 'spis-ptaszek';
      ptaszek.dataset.plik = poz.plik;
      ptaszek.setAttribute('aria-pressed', 'false');
      ptaszek.setAttribute('aria-label', `Oznacz „${poz.tytul}” jako przeczytany`);
      ptaszek.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.4l2.4 2.4 4.6-5"/></svg>';
      ptaszek.addEventListener('click', () => przelaczPrzeczytany(poz.plik));
      wiersz.appendChild(ptaszek);

      spis.appendChild(wiersz);
    }
  }
  odswiezPostep();
}

function zaznaczAktywny(plik) {
  document.querySelectorAll('.spis-link').forEach(link => {
    const aktywny = link.dataset.plik === plik;
    link.classList.toggle('aktywny', aktywny);
    if (aktywny) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

/* ------------------------------------------------------------- panel mobilny */

function panelOtwarty(otwarty) {
  $('#panel').classList.toggle('otwarty', otwarty);
  $('#zaslona').hidden = !otwarty;
  $('#btn-menu').setAttribute('aria-expanded', String(otwarty));
  document.body.style.overflow = otwarty && window.innerWidth < 1000 ? 'hidden' : '';
}

/* --------------------------------------------------- spis treści rozdziału */

function zbudujSpisTresci() {
  const lista = $('#na-stronie-lista');
  lista.innerHTML = '';

  const naglowki = [...el.querySelectorAll('h1, h2, h3')];
  if (naglowki[0] && naglowki[0].tagName === 'H1') naglowki.shift();   // tytuł rozdziału

  if (naglowki.length < 3) { $('#na-stronie').style.visibility = 'hidden'; return; }
  $('#na-stronie').style.visibility = 'visible';

  for (const naglowek of naglowki) {
    const pozycja = document.createElement('li');
    if (naglowek.tagName === 'H1') pozycja.className = 'glowna';
    else if (naglowek.tagName === 'H3') pozycja.className = 'pod';
    const link = document.createElement('a');
    link.href = `#${naglowek.id}`;
    link.textContent = naglowek.textContent.replace(/^#/, '').trim();
    link.addEventListener('click', zdarzenie => {
      zdarzenie.preventDefault();
      naglowek.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    pozycja.appendChild(link);
    lista.appendChild(pozycja);
  }

  // podświetlanie aktualnie czytanej sekcji (pomijane, gdy przeglądarka tego nie wspiera)
  if (obserwatorSekcji) obserwatorSekcji.disconnect();
  if (typeof IntersectionObserver === 'undefined') return;

  obserwatorSekcji = new IntersectionObserver(wpisy => {
    for (const wpis of wpisy) {
      if (!wpis.isIntersecting) continue;
      const id = wpis.target.id;
      lista.querySelectorAll('a').forEach(a => a.classList.toggle('aktywny', a.getAttribute('href') === `#${id}`));
    }
  }, { rootMargin: '-80px 0px -70% 0px' });
  naglowki.forEach(n => obserwatorSekcji.observe(n));
}

let obserwatorSekcji = null;

/* ------------------------------------------------------------- tryb nauki */

function zastosujTrybNauki(wlaczony) {
  pamiecZapis(KLUCZ_NAUKA, wlaczony);
  const przycisk = $('#btn-nauka');
  if (przycisk) {
    przycisk.classList.toggle('wlaczony', wlaczony);
    przycisk.setAttribute('aria-pressed', String(wlaczony));
    przycisk.querySelector('span').textContent = wlaczony ? 'Tryb nauki włączony' : 'Tryb nauki (ukryj odpowiedzi)';
  }

  el.querySelectorAll('.zakryte').forEach(e => e.classList.remove('zakryte'));
  if (!wlaczony) return;

  // ukrywamy ramki z odpowiedzią oraz pogrubioną poprawną odpowiedź w wariantach A/B/C
  el.querySelectorAll('blockquote').forEach(ramka => ramka.classList.add('zakryte'));
  el.querySelectorAll('p').forEach(akapit => {
    const pogrubienia = [...akapit.querySelectorAll('strong')];
    pogrubienia.forEach((mocne, indeks) => {
      const pierwszyWakapicie = indeks === 0 && akapit.firstChild === mocne;
      if (!pierwszyWakapicie) mocne.classList.add('zakryte');
    });
  });
}

/** Wstawia element bezpośrednio pod pierwszym nagłówkiem rozdziału. */
function wstawPoNaglowku(element) {
  const naglowek = el.querySelector('h1');
  if (naglowek && naglowek.nextSibling) el.insertBefore(element, naglowek.nextSibling);
  else if (naglowek) el.appendChild(element);
  else el.insertBefore(element, el.firstChild);
}

function dodajPasekNauki(poz) {
  if (!poz || !poz.nauka) return;

  const pasek = document.createElement('div');
  pasek.className = 'pasek-narzedzi';
  pasek.innerHTML = `
    <p>Ucz się aktywnie: zasłoń odpowiedzi, odpowiedz w myślach, potem odkryj.</p>
    <button id="btn-nauka" type="button" aria-pressed="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><path d="M4 4l16 16"/></svg>
      <span>Tryb nauki (ukryj odpowiedzi)</span>
    </button>
    <button id="btn-odkryj" type="button">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/></svg>
      Odkryj wszystko
    </button>`;

  wstawPoNaglowku(pasek);

  pasek.querySelector('#btn-nauka').addEventListener('click', () => {
    zastosujTrybNauki(!pasek.querySelector('#btn-nauka').classList.contains('wlaczony'));
  });
  pasek.querySelector('#btn-odkryj').addEventListener('click', () => {
    el.querySelectorAll('.zakryte').forEach(e => e.classList.remove('zakryte'));
  });

  zastosujTrybNauki(pamiecOdczyt(KLUCZ_NAUKA, false));
}

/* --------------------------------------------------- działające listy kontrolne */

/**
 * Kwadraciki „[ ]” z rozdziałów 12 i 13 zamienia w działające pola do odhaczania,
 * a stan zapisuje na urządzeniu — procedurę można prowadzić etapami.
 */
function wlaczListyKontrolne(plik) {
  const pola = [...el.querySelectorAll('input[type="checkbox"]')];
  if (!pola.length) return;

  const klucz = `sep.lista.${plik}`;
  const stan = pamiecOdczyt(klucz, {});

  const odswiezLicznik = () => {
    const licznik = $('#licznik-listy');
    if (licznik) licznik.textContent = `${pola.filter(p => p.checked).length} / ${pola.length}`;
  };

  pola.forEach((pole, indeks) => {
    pole.disabled = false;
    pole.checked = Boolean(stan[indeks]);
    pole.closest('li')?.classList.toggle('odhaczone', pole.checked);

    pole.addEventListener('change', () => {
      stan[indeks] = pole.checked;
      pamiecZapis(klucz, stan);
      pole.closest('li')?.classList.toggle('odhaczone', pole.checked);
      odswiezLicznik();
    });
  });

  const pasek = document.createElement('div');
  pasek.className = 'pasek-narzedzi';
  pasek.innerHTML = `
    <p>Lista kontrolna — możesz odhaczać pozycje, stan zostaje zapisany na tym urządzeniu.</p>
    <span class="znacznik-listy">Odhaczone: <strong id="licznik-listy">0 / 0</strong></span>
    <button type="button" id="btn-wyczysc-liste">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>
      Wyczyść odhaczenia
    </button>`;
  wstawPoNaglowku(pasek);
  odswiezLicznik();

  pasek.querySelector('#btn-wyczysc-liste').addEventListener('click', () => {
    pola.forEach((pole, indeks) => {
      pole.checked = false;
      delete stan[indeks];
      pole.closest('li')?.classList.remove('odhaczone');
    });
    pamiecZapis(klucz, stan);
    odswiezLicznik();
  });
}

// odkrywanie pojedynczej zasłoniętej odpowiedzi dotknięciem
el.addEventListener('click', zdarzenie => {
  const zakryty = zdarzenie.target.closest('.zakryte');
  if (zakryty) { zakryty.classList.remove('zakryte'); zdarzenie.preventDefault(); }
});

/* ------------------------------------------------------ nawigacja prev/next */

function zbudujWedrowke(indeks) {
  const wedrowka = $('#wedrowka');
  wedrowka.innerHTML = '';
  const poprzedni = WSZYSTKIE[indeks - 1];
  const nastepny = WSZYSTKIE[indeks + 1];

  if (poprzedni) {
    wedrowka.insertAdjacentHTML('beforeend',
      `<a href="#/${poprzedni.plik}" class="poprz"><span>← Poprzedni rozdział</span><strong>${ucieczkaHtml(poprzedni.tytul)}</strong></a>`);
  } else {
    wedrowka.insertAdjacentHTML('beforeend',
      '<a href="#/" class="poprz"><span>←</span><strong>Strona główna</strong></a>');
  }
  if (nastepny) {
    wedrowka.insertAdjacentHTML('beforeend',
      `<a href="#/${nastepny.plik}" class="nast"><span>Następny rozdział →</span><strong>${ucieczkaHtml(nastepny.tytul)}</strong></a>`);
  }
}

/* -------------------------------------------------------- widoki (ekrany) */

async function pokazStart() {
  document.title = 'Egzamin SEP do 30 kV — materiały';
  zaznaczAktywny('');

  const karty = ROZDZIALY.map(grupa => `
    <h2>${ucieczkaHtml(grupa.grupa)}</h2>
    <div class="karty">
      ${grupa.pozycje.map(poz => `
        <a class="karta" href="#/${poz.plik}">
          <span class="karta-numer">ROZDZIAŁ ${poz.numer}</span>
          <span class="karta-tytul">${ucieczkaHtml(poz.tytul)}</span>
          <span class="karta-opis">${ucieczkaHtml(poz.opis)}</span>
        </a>`).join('')}
    </div>`).join('');

  el.innerHTML = `
    <div class="start-naglowek">
      <h1>Egzamin SEP — grupa 1 (elektroenergetyczna) do 30 kV</h1>
      <p class="start-wstep">
        Pytania, które realnie padają przed komisją kwalifikacyjną, z rozwiniętymi odpowiedziami.
        Dodatkowo część inżynierska: ruch rozdzielni SN, zabezpieczenia i próby funkcjonalne,
        w części III diagnostyka pomiarowa SN/WN z interaktywnymi symulatorami,
        a w części IV układy sieci, kalkulator pętli zwarciowej i zestawienie wymagań norm.
        Cała terminologia po polsku — pełne nazwy zabezpieczeń, bez numerów funkcji.
      </p>
      <div class="tabliczki">
        <span class="tabliczka"><strong>146</strong> pytań testowych</span>
        <span class="tabliczka"><strong>60</strong> pytań ustnych</span>
        <span class="tabliczka"><strong>139</strong> pytań tematycznych</span>
        <span class="tabliczka"><strong>${WSZYSTKIE.length}</strong> rozdziałów</span>
        <span class="tabliczka"><strong>17</strong> symulatorów</span>
        <span class="tabliczka"><strong>2</strong> kalkulatory</span>
        <span class="tabliczka">działa <strong>offline</strong></span>
      </div>
    </div>
    ${karty}
    <h2>Jak korzystać</h2>
    <ul>
      <li><strong>Szukaj</strong> — przycisk lupy u góry albo klawisz <code>/</code>; szukanie obejmuje wszystkie rozdziały i nie wymaga ogonków.</li>
      <li><strong>Tryb nauki</strong> — w rozdziałach 05 i 06 możesz zasłonić odpowiedzi i odkrywać je dotknięciem.</li>
      <li><strong>Symulatory</strong> — rozdział 14 oraz części III i IV mają interaktywne schematy: przesuwaj suwaki
        i przełączaj warunki, a schemat i liczby przeliczają się na żywo. Działają też bez internetu.</li>
      <li><strong>Kalkulatory</strong> — w rozdziale 25 policzysz impedancję pętli zwarciowej dla własnych
        przekrojów i długości, a w rozdziale 26 sprawdzisz rezystancję żyły i wymagania dla uziemienia w TT.</li>
      <li><strong>Postęp</strong> — kółkiem obok rozdziału oznaczasz go jako przeczytany.</li>
      <li><strong>Na telefonie</strong> — dodaj stronę do ekranu głównego; treść zapisuje się na urządzeniu i działa bez internetu.</li>
      <li><strong>PDF</strong> — „Cała książka na jednej stronie”, a potem drukowanie do pliku PDF.</li>
    </ul>
    <h2>Zastrzeżenie</h2>
    <blockquote>
      <p><strong>Ważne.</strong> Materiał odzwierciedla stan przepisów i norm typowy dla egzaminów SEP.
      Przed egzaminem sprawdź aktualne brzmienie aktów prawnych i wydań norm. Wartości nastaw
      w części II są orientacyjne — obowiązuje dokumentacja obiektu i karta nastaw.</p>
    </blockquote>`;

  upiekszTresc(el);
  bezpiecznie(zbudujSpisTresci, 'spis treści strony startowej');
  $('#wedrowka').innerHTML = '';
  window.scrollTo(0, 0);
}

async function pokazRozdzial(plik, kotwica) {
  const indeks = WSZYSTKIE.findIndex(r => r.plik === plik);
  const poz = WSZYSTKIE[indeks];
  if (!poz) return pokazBlad(plik);

  document.title = `${poz.tytul} — SEP do 30 kV`;
  zaznaczAktywny(plik);

  const markdown = await wezPlik(plik);
  await renderujMarkdown(markdown, el);
  bezpiecznie(() => wlaczListyKontrolne(plik), 'listy kontrolne');
  bezpiecznie(() => dodajPasekNauki(poz), 'pasek trybu nauki');
  bezpiecznie(zbudujSpisTresci, 'spis treści rozdziału');
  bezpiecznie(() => zbudujWedrowke(indeks), 'nawigacja między rozdziałami');

  if (kotwica) {
    const cel = document.getElementById(kotwica);
    if (cel) { cel.scrollIntoView({ block: 'start' }); return; }
  }
  window.scrollTo(0, 0);
}

async function pokazWszystko() {
  document.title = 'Cała książka — SEP do 30 kV';
  zaznaczAktywny('');

  const czesci = await Promise.all(WSZYSTKIE.map(poz => wezPlik(poz.plik)));
  const razem = [
    '# Egzamin SEP do 30 kV — komplet materiałów\n',
    '> **Uwaga.** To zestawienie wszystkich rozdziałów na jednej stronie —',
    'wygodne do wydrukowania albo zapisania jako PDF (menu przeglądarki → Drukuj).\n',
    ...czesci.map((tekst, i) => `\n\n---\n\n${tekst}`)
  ].join('\n');

  await renderujMarkdown(razem, el);
  bezpiecznie(zbudujSpisTresci, 'spis treści całej książki');

  const pasek = document.createElement('div');
  pasek.className = 'pasek-narzedzi';
  pasek.innerHTML = `
    <p>Wszystkie ${WSZYSTKIE.length} rozdziałów w jednym dokumencie.</p>
    <button type="button" id="btn-drukuj">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9V3h10v6M7 19H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 15h10v6H7z"/></svg>
      Drukuj / zapisz PDF
    </button>`;
  wstawPoNaglowku(pasek);
  pasek.querySelector('#btn-drukuj').addEventListener('click', () => window.print());

  $('#wedrowka').innerHTML = '';
  window.scrollTo(0, 0);
}

function pokazBlad(plik) {
  el.innerHTML = `
    <h1>Nie znaleziono rozdziału</h1>
    <p>Adres <code>${ucieczkaHtml(plik)}</code> nie odpowiada żadnemu rozdziałowi.</p>
    <p><a href="#/">← Wróć na stronę główną</a></p>`;
  $('#wedrowka').innerHTML = '';
}

/* ---------------------------------------------------------------- router */

let trwaWczytywanie = false;
let trasaOczekujaca = false;
let plikWidoczny = null;

async function obsluzTrase() {
  const { plik, kotwica } = trasaTeraz();

  // kliknięcie w trakcie wczytywania nie może zginąć — obsłużymy je po zakończeniu
  if (trwaWczytywanie) { trasaOczekujaca = true; return; }

  // ten sam rozdział, zmieniła się tylko kotwica → wystarczy przewinąć do sekcji
  if (plik === plikWidoczny) {
    if (kotwica) {
      const cel = document.getElementById(kotwica);
      if (cel) cel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (window.innerWidth < 1000) panelOtwarty(false);
    return;
  }

  trwaWczytywanie = true;
  const licznikCzasu = setTimeout(() => { $('#wczytywanie').hidden = false; }, 140);

  try {
    if (!plik) await pokazStart();
    else if (plik === 'wszystko') await pokazWszystko();
    else await pokazRozdzial(plik, kotwica);
    plikWidoczny = plik;
  } catch (blad) {
    plikWidoczny = null;
    el.innerHTML = `
      <h1>Nie udało się wczytać treści</h1>
      <p>${ucieczkaHtml(blad.message)}</p>
      <p>Sprawdź połączenie i odśwież stronę.</p>`;
  } finally {
    clearTimeout(licznikCzasu);
    $('#wczytywanie').hidden = true;
    trwaWczytywanie = false;
    if (window.innerWidth < 1000) panelOtwarty(false);

    if (trasaOczekujaca) { trasaOczekujaca = false; obsluzTrase(); }
  }
}

window.addEventListener('hashchange', obsluzTrase);

/* -------------------------------------------------------------- szukanie */

let wskaznik = null;      // indeks: [{ plik, tytul, numer, wiersze: [...] }]
let wybranyWynik = -1;
let numerZapytania = 0;   // chroni przed wyświetleniem wyników starszego zapytania

/**
 * Zamienia zapis wzorów na czytelny tekst — inaczej w wynikach szukania
 * pokazywałby się surowy zapis w rodzaju „$$Z_s \cdot I_a \le U_0$$”.
 */
function uprosciWzory(tekst) {
  return tekst
    .replace(/\$\$?([^$]+)\$\$?/g, (_, wzor) => wzor
      .replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '$1/$2')
      .replace(/\\cdot/g, '·')
      .replace(/\\times/g, '×')
      .replace(/\\le\b/g, '≤')
      .replace(/\\ge\b/g, '≥')
      .replace(/\\rho\b/g, 'ρ')
      .replace(/\\pi\b/g, 'π')
      .replace(/\\Delta\b/g, 'Δ')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/[{}]/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim());
}

/**
 * Buduje indeks wyszukiwania. Pliki są zawijane na ~95 znaków, więc szukamy
 * w całych akapitach (linie łączone), a nie w pojedynczych liniach — inaczej
 * fraza rozbita na dwie linie nigdy by się nie znalazła.
 */
async function zbudujWskaznik() {
  if (wskaznik) return wskaznik;

  const tresci = await Promise.all(WSZYSTKIE.map(poz => wezPlik(poz.plik)));

  wskaznik = WSZYSTKIE.map((poz, i) => {
    const wiersze = [];
    let naglowek = poz.tytul;
    let id = '';
    let wKodzie = false;
    let bufor = [];

    const dodaj = tekst => {
      const czysty = uprosciWzory(tekst)
        .replace(/\|/g, ' · ')
        .replace(/[*`>]/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/^[\s·\-+]+/, '')
        .trim();
      if (czysty.length < 10) return;
      wiersze.push({ tekst: czysty, bez: bezOgonkow(czysty), naglowek, id });
    };

    const zamknijAkapit = () => {
      if (bufor.length) { dodaj(bufor.join(' ')); bufor = []; }
    };

    for (const linia of tresci[i].split('\n')) {
      if (linia.startsWith('```')) { zamknijAkapit(); wKodzie = !wKodzie; continue; }
      if (wKodzie) continue;

      const naglowekTrafienie = linia.match(/^(#{1,4})\s+(.*)$/);
      if (naglowekTrafienie) {
        zamknijAkapit();
        naglowek = naglowekTrafienie[2].replace(/[*`]/g, '').trim();
        id = naglowekTrafienie[1].length >= 2 ? naIdentyfikator(naglowek) : '';
        continue;
      }

      if (!linia.trim() || /^\s*[-=|]{3,}\s*$/.test(linia)) { zamknijAkapit(); continue; }

      // wiersze tabel są samodzielne — nie łączymy ich z akapitem
      if (linia.trim().startsWith('|')) { zamknijAkapit(); dodaj(linia); continue; }

      bufor.push(linia.trim());
    }
    zamknijAkapit();

    return { ...poz, wiersze };
  });

  return wskaznik;
}

/** Wycina fragment wokół pierwszego trafienia i podświetla wszystkie szukane słowa. */
function podswietl(tekst, slowa) {
  const bez = bezOgonkow(tekst);

  let pierwsze = Infinity;
  for (const slowo of slowa) {
    const poz = bez.indexOf(slowo);
    if (poz !== -1 && poz < pierwsze) pierwsze = poz;
  }
  if (pierwsze === Infinity) return ucieczkaHtml(tekst.slice(0, 160));

  const od = Math.max(0, pierwsze - 60);
  const doo = Math.min(tekst.length, pierwsze + 150);
  const wycinek = tekst.slice(od, doo);
  const bezWycinka = bezOgonkow(wycinek);

  // wszystkie zakresy do podświetlenia, posortowane i scalone
  const zakresy = [];
  for (const slowo of slowa) {
    let poz = bezWycinka.indexOf(slowo);
    while (poz !== -1) {
      // podświetlamy całe słowo, nie tylko jego rdzeń
      let koniec = poz + slowo.length;
      while (koniec < bezWycinka.length && /[a-z0-9]/.test(bezWycinka[koniec])) koniec++;
      zakresy.push([poz, koniec]);
      poz = bezWycinka.indexOf(slowo, koniec);
    }
  }
  zakresy.sort((a, b) => a[0] - b[0]);

  const scalone = [];
  for (const zakres of zakresy) {
    const ostatni = scalone[scalone.length - 1];
    if (ostatni && zakres[0] <= ostatni[1]) ostatni[1] = Math.max(ostatni[1], zakres[1]);
    else scalone.push([...zakres]);
  }

  let wynik = '';
  let kursor = 0;
  for (const [poczatek, koniec] of scalone) {
    wynik += ucieczkaHtml(wycinek.slice(kursor, poczatek))
      + '<mark>' + ucieczkaHtml(wycinek.slice(poczatek, koniec)) + '</mark>';
    kursor = koniec;
  }
  wynik += ucieczkaHtml(wycinek.slice(kursor));

  return (od > 0 ? '… ' : '') + wynik + (doo < tekst.length ? ' …' : '');
}

async function szukaj(zapytanie) {
  const moje = ++numerZapytania;
  const pojemnik = $('#szukajka-wyniki');
  const fraza = bezOgonkow(zapytanie.trim());

  if (fraza.length < 2) {
    pojemnik.innerHTML = '<p class="szukajka-podpowiedz">Wpisz co najmniej 2 znaki. Ogonki i odmiana nie mają znaczenia — „petla zwarciowa” znajdzie „pętli zwarciowej”.</p>';
    return;
  }

  // pierwsze szukanie musi wczytać wszystkie rozdziały — pokaż, że coś się dzieje
  if (!wskaznik) {
    pojemnik.innerHTML = '<p class="szukajka-podpowiedz"><span class="kregiel"></span> Przygotowuję wyszukiwanie…</p>';
  }

  const dane = await zbudujWskaznik();
  if (moje !== numerZapytania) return;   // w trakcie pojawiło się nowsze zapytanie
  const wyniki = [];

  // wiele słów = wszystkie muszą wystąpić w akapicie (kolejność nie ma znaczenia);
  // szukamy rdzeni, więc odmiana wyrazów nie przeszkadza
  const slowa = (fraza.split(/\s+/).filter(s => s.length >= 2).map(rdzen)) || [];
  if (!slowa.length) slowa.push(rdzen(fraza));

  for (const rozdzial of dane) {
    for (const wiersz of rozdzial.wiersze) {
      if (!slowa.every(slowo => wiersz.bez.includes(slowo))) continue;
      wyniki.push({ rozdzial, wiersz });
      if (wyniki.length >= 60) break;
    }
    if (wyniki.length >= 60) break;
  }

  if (!wyniki.length) {
    pojemnik.innerHTML = `<p class="szukajka-pusto">Brak wyników dla „${ucieczkaHtml(zapytanie)}”.</p>`;
    return;
  }

  pojemnik.innerHTML =
    `<div class="szukajka-licznik">Znaleziono ${wyniki.length}${wyniki.length >= 60 ? '+' : ''} fragmentów</div>` +
    wyniki.map(({ rozdzial, wiersz }) => `
      <a class="wynik" href="#/${rozdzial.plik}${wiersz.id ? '/' + wiersz.id : ''}">
        <div class="wynik-gdzie">${rozdzial.numer} · ${ucieczkaHtml(rozdzial.tytul)} › ${ucieczkaHtml(wiersz.naglowek)}</div>
        <div class="wynik-tekst">${podswietl(wiersz.tekst, slowa)}</div>
      </a>`).join('');

  wybranyWynik = -1;
}

function szukajkaOtwarta(otwarta) {
  const szukajka = $('#szukajka');
  szukajka.hidden = !otwarta;
  document.body.style.overflow = otwarta ? 'hidden' : '';
  if (otwarta) {
    const pole = $('#szukajka-input');
    pole.value = '';
    szukaj('');
    pole.focus();
    zbudujWskaznik();  // przygotuj indeks w tle
  }
}

/* ------------------------------------------------------- obsługa zdarzeń */

$('#btn-menu').addEventListener('click', () => {
  panelOtwarty(!$('#panel').classList.contains('otwarty'));
});
$('#zaslona').addEventListener('click', () => panelOtwarty(false));

$('#btn-motyw').addEventListener('click', () => {
  ustawMotyw(document.documentElement.dataset.motyw === 'jasny' ? 'czarny' : 'jasny');
});

$('#btn-mniej').addEventListener('click', () => { skala = ustawSkale(skala - 0.08); });
$('#btn-wiecej').addEventListener('click', () => { skala = ustawSkale(skala + 0.08); });

$('#btn-wszystko').addEventListener('click', () => { nawiguj('wszystko'); });

/* ------------------------------------------------------------- kotek „uwu” */

let kontekstDzwieku = null;

/** Odtwarza krótkie, piskliwe „uwu” w stylu anime — syntezą, bez plików audio. */
function zagrajUwu() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!kontekstDzwieku) kontekstDzwieku = new AC();
    const ctx = kontekstDzwieku;
    if (ctx.state === 'suspended') ctx.resume();

    const teraz = ctx.currentTime;

    // wspólne pogłośnienie z miękką obwiednią (żeby nie „strzelało”)
    const glosnosc = ctx.createGain();
    glosnosc.gain.value = 0.0001;
    glosnosc.connect(ctx.destination);

    // lekki wibrat — nadaje „śpiewny”, uroczy charakter
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.value = 12;
    vibratoGain.gain.value = 10;
    vibrato.connect(vibratoGain);

    // dwa tony głosu — dają wrażenie zaokrąglonego „u–wu”
    const podstawa = ctx.createOscillator();
    const alikwot = ctx.createOscillator();
    podstawa.type = 'triangle';
    alikwot.type = 'sine';
    vibratoGain.connect(podstawa.frequency);
    vibratoGain.connect(alikwot.frequency);

    const mieszacz = ctx.createGain();
    mieszacz.gain.value = 0.5;
    podstawa.connect(glosnosc);
    alikwot.connect(mieszacz).connect(glosnosc);

    // filtr „ust” — obniża jasność barwy jak przy głosce „u”
    const filtr = ctx.createBiquadFilter();
    filtr.type = 'lowpass';
    filtr.frequency.value = 900;
    // (filtr pominięty w połączeniu, ale barwę daje już mieszanka tonów)

    // kontur wysokości: „u” (nisko) → wznosi się do „wu” (wyżej), potem lekko opada
    const start = 430;
    podstawa.frequency.setValueAtTime(start, teraz);
    podstawa.frequency.exponentialRampToValueAtTime(660, teraz + 0.14);   // u ↗
    podstawa.frequency.setValueAtTime(560, teraz + 0.19);                 // krótka przerwa „w”
    podstawa.frequency.exponentialRampToValueAtTime(770, teraz + 0.34);   // wu ↗
    podstawa.frequency.exponentialRampToValueAtTime(690, teraz + 0.46);   // opad
    alikwot.frequency.setValueAtTime(start * 2, teraz);
    alikwot.frequency.exponentialRampToValueAtTime(660 * 2, teraz + 0.14);
    alikwot.frequency.setValueAtTime(560 * 2, teraz + 0.19);
    alikwot.frequency.exponentialRampToValueAtTime(770 * 2, teraz + 0.34);
    alikwot.frequency.exponentialRampToValueAtTime(690 * 2, teraz + 0.46);

    // głośność: dwie sylaby (dwa garby) z lekką przerwą między „u” a „wu”
    const g = glosnosc.gain;
    g.exponentialRampToValueAtTime(0.22, teraz + 0.05);
    g.exponentialRampToValueAtTime(0.10, teraz + 0.18);   // przewężenie na „w”
    g.exponentialRampToValueAtTime(0.24, teraz + 0.30);
    g.exponentialRampToValueAtTime(0.0001, teraz + 0.5);  // wyciszenie

    vibrato.start(teraz);
    podstawa.start(teraz);
    alikwot.start(teraz);
    vibrato.stop(teraz + 0.5);
    podstawa.stop(teraz + 0.5);
    alikwot.stop(teraz + 0.5);
  } catch (_) { /* brak Web Audio — trudno, kotek i tak podskoczy */ }
}

/** Pokazuje wyskakujący napis „uwu” nad przyciskiem. */
function pokazDymekUwu(przycisk) {
  const prostokat = przycisk.getBoundingClientRect();
  const dymek = document.createElement('span');
  dymek.className = 'uwu-dymek';
  dymek.textContent = 'uwu';
  dymek.setAttribute('aria-hidden', 'true');
  dymek.style.left = `${prostokat.left + prostokat.width / 2}px`;
  dymek.style.top = `${prostokat.bottom - 6}px`;
  document.body.appendChild(dymek);
  setTimeout(() => dymek.remove(), 1000);
}

$('#btn-kotek').addEventListener('click', () => {
  const przycisk = $('#btn-kotek');
  zagrajUwu();
  pokazDymekUwu(przycisk);
  przycisk.querySelector('img').classList.remove('mrucza');
  void przycisk.offsetWidth;                       // restart animacji przy szybkim klikaniu
  przycisk.querySelector('img').classList.add('mrucza');
});

$('#btn-szukaj').addEventListener('click', () => szukajkaOtwarta(true));
$('#szukajka-zamknij').addEventListener('click', () => szukajkaOtwarta(false));
$('#szukajka').addEventListener('click', zdarzenie => {
  if (zdarzenie.target.id === 'szukajka') szukajkaOtwarta(false);
});
$('#szukajka-wyniki').addEventListener('click', zdarzenie => {
  if (zdarzenie.target.closest('.wynik')) setTimeout(() => szukajkaOtwarta(false), 0);
});

let licznikSzukania = null;
$('#szukajka-input').addEventListener('input', zdarzenie => {
  clearTimeout(licznikSzukania);
  const wartosc = zdarzenie.target.value;
  licznikSzukania = setTimeout(() => szukaj(wartosc), 120);
});

document.addEventListener('keydown', zdarzenie => {
  const wPolu = /^(INPUT|TEXTAREA|SELECT)$/.test(zdarzenie.target.tagName);

  if (zdarzenie.key === '/' && !wPolu) { zdarzenie.preventDefault(); szukajkaOtwarta(true); return; }
  if (zdarzenie.key === 'k' && (zdarzenie.ctrlKey || zdarzenie.metaKey)) { zdarzenie.preventDefault(); szukajkaOtwarta(true); return; }

  if (zdarzenie.key === 'Escape') {
    if (!$('#szukajka').hidden) szukajkaOtwarta(false);
    else if ($('#panel').classList.contains('otwarty') && window.innerWidth < 1000) panelOtwarty(false);
    return;
  }

  // strzałki w wynikach szukania
  if (!$('#szukajka').hidden && ['ArrowDown', 'ArrowUp', 'Enter'].includes(zdarzenie.key)) {
    const wyniki = [...document.querySelectorAll('.wynik')];
    if (!wyniki.length) return;

    if (zdarzenie.key === 'Enter') {
      zdarzenie.preventDefault();
      (wyniki[Math.max(0, wybranyWynik)] || wyniki[0]).click();
      szukajkaOtwarta(false);
      return;
    }
    zdarzenie.preventDefault();
    wyniki.forEach(w => w.classList.remove('wybrany'));
    wybranyWynik += zdarzenie.key === 'ArrowDown' ? 1 : -1;
    if (wybranyWynik < 0) wybranyWynik = wyniki.length - 1;
    if (wybranyWynik >= wyniki.length) wybranyWynik = 0;
    wyniki[wybranyWynik].classList.add('wybrany');
    wyniki[wybranyWynik].scrollIntoView({ block: 'nearest' });
  }
});

// zapamiętanie miejsca czytania
let licznikPozycji = null;
window.addEventListener('scroll', () => {
  clearTimeout(licznikPozycji);
  licznikPozycji = setTimeout(() => {
    const { plik } = trasaTeraz();
    if (plik && plik !== 'wszystko') pamiecZapis(KLUCZ_POZYCJA, { plik, y: window.scrollY });
  }, 400);
}, { passive: true });

/* ------------------------------------------------------------ uruchomienie */

zbudujSpis();

if (!location.hash) {
  const ostatnia = pamiecOdczyt(KLUCZ_POZYCJA, null);
  if (ostatnia && WSZYSTKIE.some(r => r.plik === ostatnia.plik)) {
    // wracamy tam, gdzie użytkownik skończył czytać
    location.replace(`#/${ostatnia.plik}`);
    obsluzTrase().then(() => window.scrollTo(0, ostatnia.y || 0));
  } else {
    location.replace('#/');
    obsluzTrase();
  }
} else {
  obsluzTrase();
}

// tryb offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline nie jest krytyczne */ });
  });
}

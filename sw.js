/* Tryb offline: po pierwszym wejściu cała treść zapisuje się na urządzeniu.
   Po zmianie plików podnieś numer wersji — stary zapas zostanie usunięty. */

const WERSJA = 'sep-30kv-v2';

const ZAPAS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/app.css',
  'assets/app.js',
  'assets/icon.svg',
  'assets/kotek.svg',
  'assets/vendor/marked.js',
  'assets/vendor/katex.min.js',
  'assets/vendor/katex.min.css',
  'assets/vendor/fonts/KaTeX_Main-Regular.woff2',   // awaryjny font dla symboli w treści
  '01-podstawy-prawne-i-organizacja-pracy.md',
  '02-do-1kV-i-ochrona-przeciwporazeniowa.md',
  '03-sieci-i-urzadzenia-SN-do-30kV.md',
  '04-pomiary-ochronne.md',
  '05-test-ABC-baza-pytan.md',
  '06-pytania-otwarte-ustne.md',
  '07-sciagawka-wzory-i-wartosci.md',
  '08-pierwsza-pomoc-i-ppoz.md',
  '10-rozdzielnia-SN-pola-i-obwody-wtorne.md',
  '11-zabezpieczenia-nastawy-i-testowanie.md',
  '12-proby-funkcjonalne-sterowania-i-automatyki.md',
  '13-procedura-odstawienia-i-zalaczenia-rozdzielni-SN.md'
];

self.addEventListener('install', zdarzenie => {
  zdarzenie.waitUntil(
    caches.open(WERSJA)
      // addAll przerwałoby instalację przy jednym błędzie — dodajemy pojedynczo
      .then(zapas => Promise.all(ZAPAS.map(adres => zapas.add(adres).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', zdarzenie => {
  zdarzenie.waitUntil(
    caches.keys()
      .then(klucze => Promise.all(klucze.filter(k => k !== WERSJA).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', zdarzenie => {
  const zapytanie = zdarzenie.request;
  if (zapytanie.method !== 'GET' || new URL(zapytanie.url).origin !== location.origin) return;

  // Treść i pliki statyczne: najpierw sieć (świeża wersja), zapas jako rezerwa offline.
  zdarzenie.respondWith(
    fetch(zapytanie)
      .then(odpowiedz => {
        if (odpowiedz && odpowiedz.ok) {
          const kopia = odpowiedz.clone();
          caches.open(WERSJA).then(zapas => zapas.put(zapytanie, kopia));
        }
        return odpowiedz;
      })
      .catch(() => caches.match(zapytanie, { ignoreSearch: true })
        .then(zapisana => zapisana || caches.match('index.html')))
  );
});

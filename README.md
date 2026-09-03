# Egzamin SEP — grupa 1 (elektroenergetyczna) do 30 kV + pomiary ochronne

Kompletny zestaw materiałów: pytania, jakie realnie padają na egzaminie przed komisją
kwalifikacyjną SEP, wraz z rozwiniętymi odpowiedziami i wyjaśnieniami.

## 📖 Wersja do czytania w przeglądarce

**→ [littlelover47.github.io/papir](https://littlelover47.github.io/papir/)**

Wygodniejsza niż pliki na GitHubie — zwłaszcza na telefonie:

- spis rozdziałów, nawigacja i spis treści każdego rozdziału,
- **wyszukiwanie** w całości materiału (nie wymaga polskich znaków: „petla” znajdzie „pętla”),
- **tryb nauki** w rozdziałach 05 i 06 — zasłania odpowiedzi, odkrywasz je dotknięciem,
- znacznik przeczytanych rozdziałów i pasek postępu,
- **działa bez internetu** — dodaj stronę do ekranu głównego telefonu, treść zapisze się
  na urządzeniu,
- widok „cała książka na jednej stronie” do wydrukowania albo zapisania jako PDF.

Stronę tworzą pliki `index.html`, `assets/` i `sw.js`; treścią są te same pliki `.md`, więc
poprawka w materiale od razu widać na stronie.

## Spis materiałów

| Plik | Zawartość |
|---|---|
| **[podstawy prawne i organizacja pracy](01-podstawy-prawne-i-organizacja-pracy.md)** | Prawo energetyczne, kwalifikacje E/D, rozporządzenie BHP przy urządzeniach energetycznych, polecenia na pracę, osoby funkcyjne, strefy pracy, 5 zasad bezpieczeństwa |
| **[do 1kV i ochrona przeciwporazeniowa](02-do-1kV-i-ochrona-przeciwporazeniowa.md)** | Układy sieci TN/TT/IT, ochrona podstawowa i przy uszkodzeniu, samoczynne wyłączenie, wyłączniki różnicowoprądowe, SELV/PELV, klasy ochronności, połączenia wyrównawcze |
| **[sieci i urzadzenia SN do 30kV](03-sieci-i-urzadzenia-SN-do-30kV.md)** | Stacje i rozdzielnice SN, aparaty łączeniowe, transformatory, kable i linie SN, sposoby pracy punktu neutralnego, zabezpieczenia, kolejność łączeń, uziemienia SN |
| **[pomiary ochronne](04-pomiary-ochronne.md)** | Zakres E5/D5: rezystancja izolacji, ciągłość PE, impedancja pętli zwarcia, wyłączniki różnicowoprądowe, uziemienia, rezystywność gruntu, protokoły, terminy badań, ocena wyników |
| **[test ABC baza pytan](05-test-ABC-baza-pytan.md)** | **146 pytań testowych** jednokrotnego wyboru z odpowiedziami i komentarzem |
| **[pytania otwarte ustne](06-pytania-otwarte-ustne.md)** | **60 pytań otwartych** (tak pyta komisja) z wzorcowymi odpowiedziami + 16 szybkich definicji |
| **[sciagawka wzory i wartosci](07-sciagawka-wzory-i-wartosci.md)** | Wzory, wartości liczbowe, tabele do zapamiętania — powtórka na dzień przed |
| **[pierwsza pomoc i ppoz](08-pierwsza-pomoc-i-ppoz.md)** | Uwolnienie spod napięcia, resuscytacja krążeniowo-oddechowa, defibrylator automatyczny, oparzenia, gaszenie urządzeń elektrycznych |

## Część II — ruch i uruchamianie rozdzielni SN (poziom inżynierski)

Materiał wykraczający poza egzamin SEP: eksploatacja ruchowa, próby funkcjonalne, rozruch
i przekazanie rozdzielni do eksploatacji.

> **Uwaga o nazewnictwie.** W całym materiale stosowane są **polskie nazwy i skróty**
> (np. samoczynne załączanie rezerwy — SZR, samoczynne ponowne załączanie — SPZ, lokalne
> rezerwowanie wyłącznika — LRW, dokumentacja techniczno-ruchowa — DTR). Zabezpieczenia opisane
> są **pełnymi nazwami**, a nie numerami funkcji. Tabela przeliczeniowa na oznaczenia
> spotykane w dokumentacji zagranicznej znajduje się na końcu pliku `11`.

| Plik | Zawartość |
|---|---|
| **[rozdzielnia SN — pola i obwody wtórne](10-rozdzielnia-SN-pola-i-obwody-wtorne.md)** | Układy szyn zbiorczych, wszystkie typy pól (zasilające, odpływowe, sprzęgła, **pomiaru napięcia**, transformatorowe, silnikowe, **baterii kondensatorów**, **transformatora uziemiającego**, potrzeb własnych), obwody wtórne, instalacja prądu stałego, obwód wyłączający i jego nadzór, blokada przeciwpompująca, przekaźnik blokujący i wyłączający, współpraca pól: selektywność, blokada logiczna, samoczynne załączanie rezerwy, zabezpieczenie różnicowe szyn, zabezpieczenie łukoochronne, lokalne rezerwowanie wyłącznika, macierz blokad |
| **[zabezpieczenia — nastawy i testowanie](11-zabezpieczenia-nastawy-i-testowanie.md)** | Katalog zabezpieczeń pod polskimi nazwami (nadprądowe zwarciowe i przeciążeniowe, ziemnozwarciowe zerowoprądowe i kierunkowe, cieplne, od asymetrii prądów, podprądowe, od zablokowania wirnika, od zbyt częstych rozruchów, pod- i nadnapięciowe, od składowej zerowej napięcia, częstotliwościowe, kontrola synchronizmu, nadzór obwodów napięciowych, różnicowe transformatora i szyn, ziemnozwarciowe stabilizowane, lokalne rezerwowanie wyłącznika, łukoochronne) z typowymi nastawami i **metodą testu każdego z nich**; badania przekładników i wyłącznika, wtórne i pierwotne wymuszanie prądu, protokół, 12 najczęstszych błędów. Na końcu tabela przeliczeniowa nazw polskich na oznaczenia spotykane w dokumentacji zagranicznej |
| **[próby funkcjonalne sterowania i automatyki](12-proby-funkcjonalne-sterowania-i-automatyki.md)** | Piramida prób, przygotowanie, kontrola punkt–punkt, **matryca 15 prób sterowania wyłącznikiem**, matryca wyzwalania, próby blokady logicznej, samoczynnego załączania rezerwy scenariuszami, kontroli synchronizmu, zabezpieczenia łukoochronnego, lokalnego rezerwowania wyłącznika, automatycznej regulacji napięcia, komunikacji stacyjnej, próba zintegrowana, **wzór protokołu**, 10 pułapek |
| **[procedura odstawienia i załączenia rozdzielni SN](13-procedura-odstawienia-i-zalaczenia-rozdzielni-SN.md)** | Pełna sekwencja od zera: planowanie i zabezpieczenie przed załączeniem (zamki i tablice) → przeniesienie obciążenia → kolejność wyłączania → 5 zasad → prace i próby → **lista kontrolna przed podaniem napięcia** → sekwencja podawania napięcia krok po kroku → próby pod napięciem → przekazanie do ruchu; załączniki: obiekt nowy (próby fabryczne i odbiorowe), karta „STOP", najgroźniejsze błędy |

## Jak wygląda egzamin (praktycznie)

- Komisja 3-osobowa, egzamin **ustny** (w niektórych komisjach poprzedzony testem pisemnym).
- Zwykle **5–10 pytań**, po ok. 2–3 z każdego bloku tematycznego wymaganego rozporządzeniem.
- Trzeba odpowiedzieć poprawnie na wszystkie / większość — komisja dopytuje, jeśli odpowiedź jest niepełna.
- Zakres zależy od tego, o co wnioskujesz: **E** (eksploatacja) czy **D** (dozór), oraz jakie
  punkty grupy 1 i jaki zakres napięć wpisujesz we wniosku (np. „do 30 kV", „pomiary ochronne").
- Świadectwo D pyta się mocniej o: przepisy, organizację pracy, dokumentację, odpowiedzialność.
  Świadectwo E — o technikę, obsługę, czynności łączeniowe, BHP przy wykonywaniu pracy.

## Bloki tematyczne egzaminu (podstawa pytań komisji)

**Dla eksploatacji (E):**
1. Zasady budowy, działania i warunki techniczne obsługi urządzeń, instalacji i sieci.
2. Zasady eksploatacji oraz instrukcje eksploatacji.
3. Zasady i warunki wykonywania prac kontrolno-pomiarowych i montażowych.
4. Zasady i wymagania bezpieczeństwa pracy i ochrony przeciwpożarowej oraz umiejętność
   udzielania pierwszej pomocy.
5. Instrukcje postępowania w razie awarii, pożaru lub innego zagrożenia.

**Dla dozoru (D)** — dodatkowo:
6. Przepisy dotyczące przyłączania urządzeń i instalacji do sieci, dostarczania paliw i energii
   oraz prowadzenia ruchu i eksploatacji.
7. Przepisy i zasady postępowania przy programowaniu pracy urządzeń, instalacji i sieci,
   z uwzględnieniem zasad racjonalnego użytkowania paliw i energii.
8. Przepisy dotyczące eksploatacji, wymagań w zakresie prowadzenia dokumentacji technicznej
   i eksploatacyjnej oraz stosowania instrukcji eksploatacji.
9. Przepisy dotyczące budowy urządzeń, instalacji i sieci oraz norm i warunków technicznych,
   jakim powinny odpowiadać te urządzenia, instalacje i sieci.
10. Zasady postępowania w razie awarii, pożaru lub innego zagrożenia bezpieczeństwa obsługi
    urządzeń lub zagrożenia życia, zdrowia i środowiska.

## ⚠️ Ważne zastrzeżenie

Materiał odzwierciedla stan przepisów i norm, który jest standardem na egzaminach SEP.
**Przed egzaminem sprawdź aktualne brzmienie** aktów prawnych (isap.sejm.gov.pl) i wydań norm —
szczególnie numery pozycji Dziennika Ustaw i wartości liczbowe w tabelach norm, bo one bywają
aktualizowane. Komisja pyta przede wszystkim o **zasady i uzasadnienie**, a nie o numery pozycji Dz.U.


## Ile pytań łącznie

- **146** pytań testowych ABC z odpowiedziami i komentarzem
- **60** pytań otwartych z wzorcowymi odpowiedziami + 16 definicji
- **139** pytań tematycznych z rozwiniętymi opisami w plikach 01–04
  (26 przepisy/organizacja, 27 nn i ochrona przeciwporażeniowa, 46 SN do 30 kV, 40 pomiary)

Razem ponad **360 pytań** z opisanymi odpowiedziami.

## Plan powtórki (3 dni)

1. **Dzień 1** — pliki `01` + `02` (przepisy, organizacja pracy, ochrona przeciwporażeniowa).
   Naucz się na pamięć **5 zasad bezpiecznej pracy** i **czasów wyłączenia**.
2. **Dzień 2** — pliki `03` + `04` (SN do 30 kV, pomiary). Kluczowe: różnica
   wyłącznik/rozłącznik/odłącznik/uziemnik, kolejność łączeń, wartości pomiarowe.
3. **Dzień 3** — pliki `05` + `06` (przerób testy i pytania otwarte na głos) + `07` (ściągawka)
   + `08` (pierwsza pomoc — komisja pyta prawie zawsze).

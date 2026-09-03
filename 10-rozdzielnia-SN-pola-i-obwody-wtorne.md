# 10. Rozdzielnia SN — pola, ich funkcje i współpraca

Dokument opisuje architekturę rozdzielnicy SN, funkcję każdego typu pola, obwody wtórne
i sposób, w jaki pola współpracują ze sobą logicznie.

> **Zastrzeżenie inżynierskie.** Wszystkie wartości nastaw, czasów i rezystancji podane w tym
> dokumencie są **typowe/orientacyjne**. Obowiązuje zawsze: schemat jednobiegunowy projektu,
> schematy obwodów wtórnych, DTR producenta rozdzielnicy i przekaźników, karta nastaw
> zatwierdzona przez projektanta/OSD oraz instrukcja eksploatacji obiektu.

---

## A. Architektura rozdzielnicy SN

### A.1 Podstawowe układy szyn

| Układ | Opis | Zastosowanie |
|---|---|---|
| **Jednosekcyjny (single bus)** | Jeden system szyn, jedno zasilanie | Małe obiekty, brak wymagań rezerwy |
| **Dwusekcyjny z łącznikiem szyn** | Dwie sekcje A i B + pole sprzęgła; każda sekcja z własnym zasilaniem | **Najczęstszy** w przemyśle i DC; praca z otwartym sprzęgłem |
| **Podwójny system szyn** | Dwa systemy szyn, pola przyłączane odłącznikami szynowymi | Duże stacje, WN |
| **H (mostek)** | Dwa zasilania, dwa odpływy, sprzęgło poprzeczne | Stacje 110/SN, GPZ |
| **Pierścień / ring main** | RMU, kilka pól rozłącznikowych w pętli | Sieć rozdzielcza miejska |

### A.2 Zasada „normalnego układu pracy"
W układzie dwusekcyjnym standardem jest:
- **oba pola zasilające zamknięte**, **sprzęgło otwarte** (praca rozdzielona),
- albo **jedno zasilanie zamknięte, sprzęgło zamknięte** (praca z jednego źródła).

**Nigdy nie zamyka się sprzęgła przy dwóch zamkniętych zasilaniach**, o ile projekt tego nie
przewiduje wraz z układem synchronizacji (25) i sprawdzeniem prądów zwarciowych oraz
skutków równoległej pracy transformatorów. Blokada tego stanu jest zwykle zrealizowana
**sprzętowo i logicznie** (zasada „2 z 3": maksymalnie dwa z trzech wyłączników INC-A, INC-B, BC
mogą być zamknięte).

---

## B. Typy pól — funkcja, wyposażenie, zabezpieczenia

### B.1 Słownik oznaczeń (kody projektowe różnią się!)

| Kod EN | Kod PL | Pole |
|---|---|---|
| **INC** / **BKR** / CB | pole zasilające, pole wyłącznikowe | zasilanie sekcji szyn |
| **FDR** | pole odpływowe / liniowe | odpływ kablowy do odbioru |
| **BC** / **BT** / TIE | pole sprzęgła (łącznika szyn) | łączy sekcje A i B |
| **VT** / **PT** / MU | pole pomiaru napięcia | przekładniki napięciowe na szynach |
| **MET** | pole pomiarowo-rozliczeniowe | CT + VT + licznik energii |
| **TR** / **TRF** | pole transformatorowe | odpływ do transformatora SN/nn |
| **MTR** / M | pole silnikowe | zasilanie silnika SN |
| **CAP** | pole baterii kondensatorów | kompensacja mocy biernej |
| **NER** / **NGR** / **TRU** | pole punktu neutralnego / transformatora uziemiającego | uziemienie punktu neutralnego przez rezystor/dławik |
| **SST** / **AUX** | pole potrzeb własnych | transformator potrzeb własnych stacji |
| **EB** / **ES** | pole uziemiające | uziemnik szyn / pole kablowe z uziemnikiem |
| **RSF** | pole rozłącznikowo-bezpiecznikowe | tanie odpływy małej moc (RMU) |

> **TRU** w polskich projektach to najczęściej **transformator uziemiający** (zwykle zygzak lub
> Yd z rezystorem w punkcie neutralnym) — patrz B.8. W niektórych projektach TRU = *transformer
> unit*, czyli po prostu pole transformatorowe. **Sprawdź w legendzie schematu jednobiegunowego.**

---

### B.2 Pole zasilające (INC / BKR)

**Funkcja:** wprowadza zasilanie z transformatora WN/SN lub z linii SN na sekcję szyn; jest
głównym punktem wyłączania i miejscem zabezpieczeń rezerwowych dla całej sekcji.

**Wyposażenie:**
- **wyłącznik** (próżniowy lub SF₆), zwykle wysuwny (wózek) lub stacjonarny
- **odłącznik trójpozycyjny** (ZAMKNIĘTY / OTWARTY / UZIEMIONY) albo osobny odłącznik + uziemnik
- **3 przekładniki prądowe** (często dwa rdzenie: pomiarowy 0,5 i zabezpieczeniowy 5P20)
- opcjonalnie **przekładnik Ferrantiego / CT sumujący (core-balance CT)** dla 51N czułego
- **wskaźniki obecności napięcia** (LRM), grzałka, ogrzewanie antykondensacyjne
- **przekaźnik zabezpieczeniowy** (IED) z funkcjami 50/51, 50N/51N, 27/59, 81, 87B (jeśli jest)
- **ograniczniki przepięć** (na wejściu kablowym)
- licznik operacji, blokady, napęd zbrojony sprężynowo

**Typowe zabezpieczenia:** 50/51, 50N/51N (lub 67N), 27, 59, 59N, 81U/81O, 46, 49, 60 (VTS),
50BF (breaker failure), 86 (lockout), udział w 87B, arc-flash, blokada logiczna do odpływów.

**Charakterystyczne:** to pole ma **najdłuższe czasy** zabezpieczeń nadprądowych (jest ostatnie
w kaskadzie selektywności) — dlatego uzupełnia się je o **blokadę logiczną / ZSI** i/lub
**zabezpieczenie szyn 87B**, żeby zwarcie na szynach nie było wyłączane po 0,8–1,2 s.

---

### B.3 Pole odpływowe (FDR) i transformatorowe (TR)

**Funkcja:** zasilanie odbioru — kabla do innej rozdzielnicy albo transformatora SN/nn.

**Wyposażenie:** wyłącznik lub rozłącznik z bezpiecznikami, odłącznik trójpozycyjny, 3 CT
(albo 2 CT + CT sumujący), IED, ograniczniki przepięć przy transformatorze, wskaźniki napięcia.

**Typowe zabezpieczenia (odpływ do trafo SN/nn):**
- **50/51** — zwarciowe bezzwłoczne + przeciążeniowe zwłoczne
- **50N/51N** lub **67N** — ziemnozwarciowe
- **49** — obraz cieplny
- **86** — lockout od zabezpieczeń wewnętrznych transformatora
- **wejścia od transformatora**: **63** Buchholz (gaz/przepływ — alarm i wyłączenie),
  **71** poziom oleju, **26/49T** temperatura oleju i uzwojeń, zawór nadciśnieniowy,
  dla transformatorów żywicznych — **PTC/PT100** w uzwojeniach
- dla większych jednostek: **87T** (różnicowe), **64REF** (ziemnozwarciowe stabilizowane)

**Klucz do selektywności:** czas 51 w polu odpływowym musi być **krótszy** od czasu 51 w polu
zasilającym o **stopień czasowy** — typowo **0,2–0,3 s** dla przekaźników cyfrowych
(uwzględnia czas własny wyłącznika ~50–70 ms + czas resetu przekaźnika + margines).

---

### B.4 Pole sprzęgła szyn (BC / BT)

**Funkcja:** łączy sekcje A i B — umożliwia zasilanie całej rozdzielnicy z jednego źródła
(rezerwa) oraz przenoszenie obciążenia bez przerwy (przy synchronizacji).

**Wyposażenie:** wyłącznik, **dwa** odłączniki (po jednym do każdej sekcji) lub odłącznik
trójpozycyjny, CT (dla 87B i dla 50/51 sprzęgła), IED z **25 (synchro-check)**.

**Typowe zabezpieczenia i funkcje:** 50/51 (nastawy zwykle jak w polu zasilającym lub ostrzejsze
na czas przełączenia), 50N/51N, **25** synchro-check, **SZR/ATS** (patrz D.3),
udział w **87B** (CT sprzęgła definiuje granicę strefy), blokada „2 z 3".

**Tryby przełączania:**
- **transfer otwarty (open transfer)** — najpierw otwórz, potem zamknij (przerwa ~kilkaset ms)
- **transfer zamknięty (closed transfer)** — chwilowa praca równoległa, wymaga **25** i
  sprawdzenia prądów zwarciowych; czas równoległości ograniczony timerem (np. 100–500 ms)
- **transfer szybki (fast transfer)** — załączenie rezerwy w ~60–100 ms, zanim silniki wytracą
  wybieg; wymaga kontroli kąta i napięcia resztkowego
- **transfer na napięciu resztkowym (residual voltage transfer)** — czeka, aż U spadnie
  poniżej ~25–30 % U_n (bezpieczne dla silników, ale długa przerwa)

---

### B.5 Pole pomiaru napięcia (VT / PT) — o to pytałeś

**Funkcja:** dostarcza **sygnał napięciowy z szyn** do: zabezpieczeń napięciowych (27/59/59N/81),
synchro-check (25), zabezpieczeń kierunkowych (67/67N — potrzebują napięcia jako odniesienia),
pomiarów, liczników i wskaźników; realizuje też **kontrolę obecności napięcia na szynach**
(dead bus / live bus) dla logiki SZR i blokad.

**Wyposażenie:**
- **3 przekładniki napięciowe** — najczęściej w układzie:
  - **gwiazda/gwiazda z otwartym trójkątem** (5 uzwojeń: 3× fazowe + broken delta dla 59N), albo
  - **3× jednofazowe** z uzwojeniem pierwotnym między fazą a ziemią (Un/√3)
- **odłącznik trójpozycyjny** lub wtyk wysuwny — pozwala odizolować i uziemić VT
- **bezpieczniki WN** po stronie pierwotnej (ochrona szyn przed zwarciem w VT)
- **zabezpieczenie nadprądowe / MCB po stronie wtórnej** (osobne dla obwodu pomiarowego,
  zabezpieczeniowego i broken delta)
- **uziemienie jednego punktu** obwodu wtórnego (zwykle zacisk „n" gwiazdy) — **dokładnie jedno**
- **ograniczniki przepięć** (w niektórych rozwiązaniach), **rezystor tłumiący ferrorezonans**
  w obwodzie broken delta

**Podstawowe wartości:** strona wtórna **100 V** lub **100/√3 ≈ 57,7 V** (fazowe);
broken delta daje przy pełnym doziemieniu **~100 V** (3U₀).

**Krytyczne zasady BHP i eksploatacyjne:**
- **NIE WOLNO zwierać** uzwojenia wtórnego VT — zwarcie = przepalenie/zniszczenie.
- **NIE WOLNO zasilać VT od strony wtórnej** — działa wtedy jako transformator podwyższający
  i na stronie pierwotnej pojawia się **pełne napięcie SN**. To realne zagrożenie przy próbach
  funkcjonalnych: zawsze **odizoluj VT** (odłącznik/wtyk otwarty, bezpieczniki pierwotne wyjęte)
  przed wstrzykiwaniem napięcia w obwody wtórne.
- Przy pracach na szynach VT muszą być **odizolowane i uziemione** — są źródłem napięcia
  zwrotnego.

**Zabezpieczenia/funkcje związane:**
- **59N / 64** — napięcie zerowe (3U₀): wykrywa doziemienie w sieci izolowanej/skompensowanej
- **60 / VTS / 60FL** — nadzór obwodów napięciowych (VT fuse failure): wykrywa przepalony
  bezpiecznik lub wyłączony MCB i **blokuje** zabezpieczenia zależne od napięcia
  (67, 21, 51V, 27), żeby nie zadziałały zbędnie
- **47** — kolejność faz / asymetria napięć
- **kontrola napięcia szyn** — sygnały „Bus live / Bus dead" dla SZR i blokad uziemników

**Układ selekcji napięcia (VT selection):** w rozdzielnicy dwusekcyjnej sprzęgło i pola muszą
„widzieć" napięcie właściwej sekcji. Realizuje się to przekaźnikami pomocniczymi
przełączającymi obwody napięciowe zależnie od pozycji odłączników/wyłączników.
**To jeden z najczęstszych obszarów błędów montażowych** — trzeba go sprawdzić w próbach
funkcjonalnych dla każdej kombinacji stanów łączników.

---

### B.6 Pole silnikowe (MTR)

**Funkcja:** zasilanie silnika SN (pompa, sprężarka, młyn, wentylator).

**Wyposażenie:** wyłącznik próżniowy **lub stycznik próżniowy + bezpieczniki** (dla mniejszych
moc, tańsze i lepsze ograniczanie prądu zwarciowego), CT, CT sumujący (czułe 51N),
przekaźnik silnikowy, opcjonalnie przekładniki do 87M.

**Typowe zabezpieczenia:**
- **49 / 49R** — obraz cieplny silnika (model termiczny, stała czasowa, pamięć cieplna)
- **50/51** — zwarciowe (50 nastawione **powyżej prądu rozruchowego**, typowo 1,3–2 × I_rozruchu)
- **51N / 50N** — ziemnozwarciowe czułe (silniki są wrażliwe na doziemienia w uzwojeniu)
- **46** — asymetria / składowa przeciwna (utrata fazy powoduje przegrzanie)
- **37** — podprądowe (utrata obciążenia, zerwanie sprzęgła, suchobieg pompy)
- **48 / 51LR** — zbyt długi rozruch, **utyk (locked rotor)**
- **66** — liczba rozruchów na godzinę / minimalny czas między rozruchami
- **27** — podnapięciowe (odpad przy zaniku napięcia, blokada samorozruchu)
- **38** — temperatura łożysk, **26/49T** — PT100 w uzwojeniach
- **87M** — różnicowe (duże silniki)

---

### B.7 Pole baterii kondensatorów (CAP)

**Wyposażenie:** wyłącznik przystosowany do łączenia obwodów pojemnościowych (klasa C2),
**dławiki tłumiące (reaktory)** ograniczające prąd załączania, rezystory rozładowcze, CT.

**Typowe zabezpieczenia:** 50/51 (z uwzględnieniem prądu załączania i harmonicznych),
51N, **59** (nadnapięciowe — kondensatory są wrażliwe), **zabezpieczenie od utraty pojemności /
niezrównoważenia** (uszkodzenie sekcji), 46, kontrola harmonicznych (ryzyko rezonansu),
blokada powtórnego załączenia przed rozładowaniem (**czas rozładowania — typowo 5–10 min**).

**BHP:** kondensatory to **magazyn energii** — przed pracą wyłączyć, **odczekać czas
rozładowania z DTR**, sprawdzić brak napięcia i **uziemić każdą sekcję osobno**.

---

### B.8 Pole punktu neutralnego / transformatora uziemiającego (NER / TRU)

**Funkcja:** tworzy **sztuczny punkt neutralny** w sieci SN zasilanej z uzwojenia trójkąt (D)
transformatora WN/SN — bo bez niego sieć jest całkowicie izolowana i nie da się selektywnie
wykryć doziemienia.

**Rozwiązania:**
- **transformator zygzak (ZN)** + **rezystor** w punkcie neutralnym
- **transformator Yd** (uzwojenie wtórne d zamknięte lub obciążone rezystorem)
- **dławik gaszący (reaktor Petersena)** — sieć skompensowana, z układem automatycznego
  dostrajania i często z **AWSC** (automatyka wymuszania składowej czynnej)
- **rezystor uziemiający (NER)** bezpośrednio w punkcie neutralnym transformatora Yn

**Dobór:** rezystor dobiera się tak, by prąd doziemny był **równy lub większy** od prądu
pojemnościowego sieci (typowo I_E = 100–600 A dla sieci kablowych) — to tłumi przepięcia
i zapewnia czułość 51N.

**Zabezpieczenia:** 51N/51G w obwodzie neutralnym (główny sygnał ziemnozwarciowy dla całej
sekcji), **zabezpieczenie cieplne rezystora** (rezystory mają krótką wytrzymałość czasową —
typowo 10 s przy prądzie znamionowym!), 50/51 transformatora uziemiającego, kontrola ciągłości
obwodu neutralnego, nadzór temperatury.

**Bardzo ważne eksploatacyjnie:** **odstawienie pola NER/TRU zmienia charakter całej sieci** —
sekcja staje się izolowana, zabezpieczenia 51N tracą czułość, rosną przepięcia przy doziemieniu.
Odstawienie NER musi być objęte osobnym uzgodnieniem i zmianą nastaw (przejście na
kryterium 59N/kierunkowe).

---

### B.9 Pole potrzeb własnych (SST / AUX)

Zasila transformator potrzeb własnych stacji → rozdzielnica nn AC → **ładowarki baterii**,
ogrzewanie, oświetlenie, napędy, wentylację, klimatyzację.
Zabezpieczenia: 50/51, 51N, wejścia od transformatora.
**Zasada projektowa:** potrzeby własne muszą być zasilane **z dwóch niezależnych źródeł**
(dwie sekcje + SZR nn), a obwody DC muszą przetrwać zanik AC — inaczej awaria AC pozbawia
rozdzielnicę zdolności wyłączania.

---

## C. Obwody wtórne — co jest w każdym polu

### C.1 Podział obwodów

| Obwód | Napięcie / sygnał | Funkcja |
|---|---|---|
| **Prądowe (CT)** | 1 A lub 5 A | pomiar, zabezpieczenia, 87 |
| **Napięciowe (VT)** | 100 V / 57,7 V | zabezpieczenia, pomiar, 25 |
| **Sterownicze** | 24/48/110/220 V DC | cewki załączające i wyłączające, napędy |
| **Wyzwalania (trip)** | DC | osobny, nadzorowany obwód do cewki wyłączającej |
| **Sygnalizacyjne** | DC | pozycje, alarmy, sygnalizacja centralna |
| **Blokad (interlocking)** | DC / logika | blokady elektryczne i logiczne |
| **Pomiarowe / komunikacja** | Ethernet, RS-485 | IEC 61850, Modbus, DNP3, IEC 60870-5-103 |
| **Grzania / oświetlenia** | 230 V AC | ogrzewanie antykondensacyjne, gniazda, oświetlenie |

### C.2 Układ potrzeb własnych DC — serce rozdzielnicy
- **Bateria** (kwasowa VRLA lub NiCd) + **ładowarka/prostownik** + rozdzielnica DC
- Napięcia: **110 V DC** i **220 V DC** (napędy, wyzwalanie), **48 V / 24 V DC** (automatyka, telemechanika)
- **Układ IT** — biegun dodatni i ujemny izolowane od ziemi, z **kontrolą stanu izolacji**
  (pierwsze doziemienie tylko sygnalizowane — żeby nie stracić zdolności wyzwalania)
- **Dublowanie**: dwie ładowarki, dwie baterie, dwa niezależne obwody DC do IED i wyłączników
  (w obiektach o wysokiej dostępności)
- Nadzór: napięcie baterii, prąd ładowania, doziemienie DC, zanik AC ładowarki,
  zadziałanie zabezpieczeń obwodów DC

### C.3 Obwód wyłączający (trip circuit) i jego nadzór
```
+DC ──[MCB]──[styk przekaźnika 94/86]──[styk pomocniczy wyłącznika 52a]──[cewka wył.]── −DC
```
- **52a** (styk normalnie otwarty, zamknięty gdy wyłącznik zamknięty) — przerywa obwód po
  zadziałaniu, chroniąc cewkę
- **TCS — nadzór ciągłości obwodu wyłączającego** (*trip circuit supervision*): układ
  przepuszcza prąd nadzorczy (kilka mA) przez cewkę i sprawdza ciągłość **w pozycji zamkniętej
  i otwartej** wyłącznika. Brak nadzoru = ryzyko, że przerwa w obwodzie ujawni się dopiero przy
  zwarciu (czyli nigdy nie zadziała).
- Wyłączniki krytyczne mają **dwie cewki wyłączające (TC1, TC2)** zasilane z **dwóch
  niezależnych obwodów DC**.

### C.4 Przekaźnik antypompujący i lockout
- **Antypompujący (*anti-pumping*)**: gdy podana jest ciągła komenda ZAMKNIJ, a wyłącznik jest
  wyzwalany zabezpieczeniem, przekaźnik blokuje powtarzanie cyklu Z-W-Z-W (który zniszczyłby
  aparat). Realizowany w napędzie i/lub w IED.
- **86 — lockout (przekaźnik blokujący)**: po zadziałaniu **utrzymuje** stan wyłączony
  i **blokuje załączenie** do momentu **ręcznego resetu**. Stosowany dla zadziałań wymagających
  oględzin: 87T, Buchholz, arc-flash, breaker failure. Reset tylko po ustaleniu przyczyny.
- **94 — przekaźnik wyzwalający (*master trip*)**: szybki przekaźnik pośredniczący, zwielokrotnia
  styk wyzwalający na kilka cewek.

### C.5 Zaciski i bloczki probiercze
- **Zaciski probiercze prądowe** z automatycznym zwieraniem CT przy wyjęciu wtyku
  (np. RTXP/RTXH 18/24) — pozwalają wstrzykiwać prąd bez rozwierania obwodu CT
- **Zaciski rozłączne napięciowe** — izolacja obwodów VT na czas prób
- **Zasada:** przed próbami sekundarnymi **zawsze** izoluj obwody CT i VT bloczkami, nigdy przez
  rozkręcanie zacisków

---

## D. Jak pola współpracują — logika systemowa

### D.1 Selektywność czasowo-prądowa (kaskada)
```
Trafo WN/SN  ──► INC (51: 0,8 s) ──► szyny ──► FDR (51: 0,5 s) ──► trafo SN/nn ──► nn (0,2 s)
```
Każdy stopień w górę o **0,2–0,3 s**. Wada: zwarcie **na szynach** jest widziane tylko przez
INC, czyli wyłączane po najdłuższym czasie — a to najbardziej energetyczne miejsce w obiekcie.
Stąd dwa rozwiązania z D.2.

### D.2 Blokada logiczna (ZSI / blocking scheme)
Każde pole odpływowe, które wykryje zwarcie w swojej strefie, **wysyła sygnał blokujący**
do pola zasilającego (styk DC lub GOOSE). Wtedy:
- **jest blokada** → zwarcie jest za odpływem → INC czeka swój normalny czas (rezerwa)
- **nie ma blokady** → zwarcie jest **na szynach** → INC wyłącza **bezzwłocznie (~50–100 ms)**

Zysk: ochrona szyn bez kosztu 87B. Wymaga niezawodnego toru blokady i **testu każdej pary
pól** (odpływ → zasilanie) w próbach funkcjonalnych.

### D.3 SZR / ATS (samoczynne załączanie rezerwy)
Typowa logika dla dwóch sekcji ze sprzęgłem:

**Warunki startu:** 27 na sekcji (np. U < 70 % U_n przez 0,5–3 s) **ORAZ** brak prądu
w polu zasilającym **ORAZ** wyłącznik zasilania sprawny **ORAZ** brak zadziałania 86/87B
(nie wolno przełączać na zwarcie!).

**Sekwencja:** otwórz INC uszkodzonej sekcji → potwierdź pozycję otwartą → sprawdź 25 lub
warunek „bus dead" → zamknij BC → potwierdź → alarm i blokada powtórzenia.

**Blokady SZR (krytyczne!):** zadziałanie 87B, arc-flash, 86, breaker failure, brak DC,
niesprawność wyłącznika, tryb LOCAL, ręczne wyłączenie przez operatora (SZR nie może
„naprawiać" świadomej decyzji operatora).

### D.4 Zabezpieczenie szyn 87B
- **niskoimpedancyjne** — sumuje prądy wszystkich pól sekcji w IED; wymaga CT o zbliżonych
  przekładniach i klasie; ma **strefę kontrolną (check zone)** jako drugie kryterium
- **wysokoimpedancyjne** — klasyczny układ na rezystorze stabilizującym i warystorze
- **Granice strefy definiują CT** — CT sprzęgła musi być prawidłowo przypisany do strefy A lub B
  w zależności od kierunku; **błąd polaryzacji jednego CT = zbędne wyłączenie całej sekcji**
- **Dynamiczne przełączanie strefy** przy zamkniętym sprzęgle (strefy łączą się w jedną)

### D.5 Zabezpieczenie łukoochronne (arc-flash)
Czujniki światła (punktowe i światłowodowe) w przedziałach szyn, wyłącznika i kablowym,
**w koincydencji z kryterium prądowym**. Czas detekcji **1–7 ms**, całkowity czas wyłączenia
z wyłącznikiem ~50–60 ms. Radykalnie obniża energię incydentu łukowego. Zawsze przez **86**.

### D.6 Breaker failure (50BF)
Po wysłaniu komendy wyłączenia startuje timer (typowo **150–250 ms**). Jeśli po tym czasie
**nadal płynie prąd** i/lub styk pozycji nie zmienił stanu → wyłącz **wyłącznik nadrzędny**
(INC) i/lub **sprzęgło**, oraz zablokuj SZR. To ostatnia linia obrony przy zaklejonym wyłączniku.

### D.7 Automatyki sieciowe (kontekst OSD)
- **SPZ (79)** — samoczynne ponowne załączanie, tylko dla linii **napowietrznych**;
  bezwzględnie **blokowany** przy pracach pod napięciem i przy zadziałaniu 86
- **SCO** — samoczynne częstotliwościowe odciążanie (81U, stopnie częstotliwościowe)
- **ARN** — automatyczna regulacja napięcia przełącznikiem zaczepów (OLTC): wartość zadana,
  strefa nieczułości, opóźnienie, blokady (nadprądowa, podnapięciowa, praca równoległa
  master/follower lub metodą prądu krążącego)
- **AWSC / AZZ** — automatyki ziemnozwarciowe w sieciach skompensowanych

### D.8 Blokady (interlocking) — macierz do przetestowania
Minimalny zestaw, który **musi** być sprawdzony:

| Warunek | Blokowana czynność |
|---|---|
| Uziemnik zamknięty | zamknięcie odłącznika / wyłącznika, wsunięcie wózka |
| Odłącznik/wózek nie w pozycji krańcowej | zamknięcie wyłącznika |
| Wyłącznik zamknięty | operowanie odłącznikiem i wózkiem |
| Napięcie obecne na kablu/szynie | zamknięcie uziemnika |
| Drzwi przedziału otwarte | wsunięcie wózka / zamknięcie wyłącznika |
| INC-A + INC-B zamknięte | zamknięcie BC (zasada „2 z 3") — o ile projekt nie dopuszcza |
| Brak DC / niesprawny napęd | komenda ZAMKNIJ |
| Tryb LOCAL | komendy z SCADA (i odwrotnie) |

Blokady bywają **mechaniczne**, **elektromagnetyczne (zamki, klucze Castell/Fortress)**,
**elektryczne** i **logiczne (w IED / sterowniku pola)**. **Mostkowanie jest zabronione.**

---

## E. Sterowanie i nadzór

### E.1 Poziomy sterowania
1. **Poziom 0 — mechaniczny/ręczny**: dźwignia napędu, korba wózka; działa bez DC
2. **Poziom 1 — lokalny (LOCAL)**: przyciski na drzwiach pola / na IED
3. **Poziom 2 — stacyjny**: pulpit / HMI stacji, sterownik nadrzędny
4. **Poziom 3 — zdalny (REMOTE)**: SCADA, dyspozytor

Przełącznik **L/R (LOCAL/REMOTE)** musi jednoznacznie odbierać uprawnienie pozostałym poziomom.
**Sprawdzenie tego jest obowiązkowym punktem prób funkcjonalnych.**

### E.2 Sygnały, które muszą trafić do SCADA (minimum)
Pozycje (52a/52b — **zawsze oba**, żeby wykryć stan nieokreślony), pozycja odłącznika i
uziemnika, tryb L/R, „wyłącznik gotowy" (sprężyna zbrojona, DC obecne, SF₆ OK),
zadziałania poszczególnych zabezpieczeń (rozróżnione!), 86 zadziałany, TCS alarm,
pomiary (I, U, P, Q, cosφ, f, E), doziemienie DC, zanik AC, arc-flash, alarmy IED.

### E.3 Komunikacja
- **IEC 61850** — stacyjna: MMS (raporty, sterowanie), **GOOSE** (szybkie sygnały:
  blokady logiczne, arc-flash, 87B, SZR), SV (próbki)
- **IEC 60870-5-103 / Modbus / DNP3** — starsze/prostsze integracje
- **Test GOOSE**: sprawdzenie subskrypcji, czasu propagacji, reakcji na utratę publikacji
  (*GOOSE timeout* musi wywołać zdefiniowane działanie — zwykle przejście na nastawy
  bez blokady, tj. bardziej konserwatywne)

---

## F. Szybka mapa: co zrobić, gdy...

| Sytuacja | Reakcja |
|---|---|
| Zadziałało 51N, brak wyłączenia pola | Sprawdź, czy to sygnał czy wyłączenie; szukaj doziemienia; 51N w sieci izolowanej często tylko sygnalizuje |
| Alarm 60/VTS | Sprawdź bezpieczniki/MCB VT; **pamiętaj, że 67, 21, 51V, 27 są zablokowane** — rozdzielnica pracuje z obniżoną ochroną |
| Alarm TCS | Wyłącznik może nie zadziałać na zwarcie — traktuj jako pilne; rozważ odstawienie pola |
| 86 zadziałany | **Nie resetuj** przed ustaleniem przyczyny i oględzinami |
| Zadziałał arc-flash | Nie wchodzić; oględziny, pomiary izolacji, ocena stanu przed załączeniem |
| Zanik AC ładowarki | Ograniczony czas autonomii baterii — priorytet naprawy, ograniczyć operacje łączeniowe |
| Doziemienie DC | Pilne — drugie doziemienie może spowodować zbędne wyzwolenie albo brak wyzwolenia |

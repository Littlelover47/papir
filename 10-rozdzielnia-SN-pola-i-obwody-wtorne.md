# 10. Rozdzielnia SN — pola, ich funkcje i współpraca

Dokument opisuje budowę rozdzielnicy SN, funkcję każdego typu pola, obwody wtórne
i sposób, w jaki pola współpracują ze sobą logicznie.

> **Zastrzeżenie inżynierskie.** Wszystkie wartości nastaw, czasów i rezystancji są
> **typowe/orientacyjne**. Obowiązuje: schemat jednobiegunowy projektu, schematy obwodów
> wtórnych, dokumentacja techniczno-ruchowa (DTR) producenta rozdzielnicy i zabezpieczeń,
> karta nastaw zatwierdzona przez projektanta oraz instrukcja eksploatacji obiektu.

---

## A. Budowa rozdzielnicy SN

### A.1 Układy szyn zbiorczych

| Układ | Opis | Zastosowanie |
|---|---|---|
| **Jednosekcyjny** | Jeden system szyn, jedno zasilanie | Małe obiekty, brak wymagań rezerwy |
| **Dwusekcyjny ze sprzęgłem** | Dwie sekcje A i B + pole sprzęgła; każda sekcja z własnym zasilaniem | **Najczęstszy** w przemyśle; praca z otwartym sprzęgłem |
| **Podwójny system szyn** | Dwa systemy szyn, pola przyłączane odłącznikami szynowymi | Duże stacje, WN |
| **Mostkowy (H)** | Dwa zasilania, dwa odpływy, sprzęgło poprzeczne | Stacje 110/SN, GPZ |
| **Pierścieniowy** | Kilka pól rozłącznikowych w pętli (rozdzielnica pierścieniowa) | Sieć rozdzielcza miejska |

### A.2 Zasada normalnego układu pracy
W układzie dwusekcyjnym standardem jest:
- **oba pola zasilające zamknięte, sprzęgło otwarte** (praca rozdzielona), albo
- **jedno zasilanie zamknięte, sprzęgło zamknięte** (praca z jednego źródła).

**Nie zamyka się sprzęgła przy dwóch zamkniętych zasilaniach**, o ile projekt tego nie przewiduje
wraz z **kontrolą synchronizmu** oraz sprawdzeniem prądów zwarciowych i skutków równoległej pracy
transformatorów. Ten stan jest zwykle zablokowany sprzętowo i logicznie
(**zasada „dwa z trzech"**: najwyżej dwa z trzech wyłączników — zasilanie A, zasilanie B,
sprzęgło — mogą być zamknięte jednocześnie).

---

## B. Typy pól — funkcja, wyposażenie, zabezpieczenia

### B.1 Oznaczenia pól

Kody pól są **zawsze projektowe** — poniżej najczęstsze warianty spotykane w polskiej
dokumentacji. Zawsze sprawdzaj legendę schematu jednobiegunowego.

| Nazwa pola (polska) | Spotykane oznaczenia |
|---|---|
| **Pole zasilające** (dopływowe) | Z, PZ, INC |
| **Pole odpływowe** (liniowe) | O, PO, L, FDR |
| **Pole sprzęgła** (łącznika szyn) | S, PS, SPR, BC |
| **Pole pomiaru napięcia** (przekładników napięciowych) | PN, PPN, VT |
| **Pole pomiarowo-rozliczeniowe** | PP, PR |
| **Pole transformatorowe** | T, PT, TR |
| **Pole silnikowe** | M, PM |
| **Pole baterii kondensatorów** | **BKR**, BK, PBK |
| **Pole transformatora uziemiającego** (punktu neutralnego) | **TRU**, TU, PTU |
| **Pole potrzeb własnych** | PW, PPW |
| **Pole uziemiające** | PU |
| **Pole rozłącznikowo-bezpiecznikowe** | RB, RSB |

---

### B.2 Pole zasilające (dopływowe)

**Funkcja:** wprowadza zasilanie z transformatora WN/SN lub z linii SN na sekcję szyn; jest
głównym punktem wyłączania i miejscem zabezpieczeń rezerwowych dla całej sekcji.

**Wyposażenie:**
- **wyłącznik** (próżniowy lub z izolacją SF₆), zwykle wysuwny na wózku
- **odłącznik trójpozycyjny** (ZAMKNIĘTY / OTWARTY / UZIEMIONY) albo odłącznik + uziemnik
- **trzy przekładniki prądowe**, zwykle o dwóch rdzeniach: pomiarowym (klasa 0,5)
  i zabezpieczeniowym (klasa 5P20)
- opcjonalnie **przekładnik prądowy sumujący** (obejmujący wszystkie żyły) — do czułego
  zabezpieczenia ziemnozwarciowego
- **wskaźniki obecności napięcia**, ogrzewanie przeciwkondensacyjne
- **zabezpieczenie cyfrowe** (sterownik polowy z funkcjami zabezpieczeniowymi)
- **ograniczniki przepięć** na wejściu kablowym
- napęd zbrojony sprężynowo, licznik operacji, blokady

**Typowe zabezpieczenia:**
- **nadprądowe zwarciowe bezzwłoczne** (prąd rozruchowy: „I≫")
- **nadprądowe zwłoczne przeciążeniowe** („I>")
- **ziemnozwarciowe zerowoprądowe** lub **kierunkowe** („I₀>")
- **podnapięciowe** („U<") i **nadnapięciowe** („U>")
- **od składowej zerowej napięcia** („U₀>")
- **podczęstotliwościowe / nadczęstotliwościowe** („f<", „f>")
- **od asymetrii prądów** (od składowej przeciwnej)
- **cieplne (obraz cieplny)**
- **nadzór obwodów napięciowych** (od zaniku napięcia przekładnika)
- **lokalne rezerwowanie wyłącznika (LRW)**
- **przekaźnik blokujący** kasowany ręcznie
- udział w **zabezpieczeniu różnicowym szyn zbiorczych** i w **zabezpieczeniu łukoochronnym**
- **blokada logiczna** współpracująca z polami odpływowymi

**Charakterystyczne:** to pole ma **najdłuższe czasy** zabezpieczeń nadprądowych (jest ostatnie
w kaskadzie selektywności). Dlatego uzupełnia się je o **blokadę logiczną** i/lub
**zabezpieczenie różnicowe szyn**, żeby zwarcie na szynach nie było wyłączane po 0,8–1,2 s.

---

### B.3 Pole odpływowe i pole transformatorowe

**Funkcja:** zasilanie odbioru — kabla do innej rozdzielnicy albo transformatora SN/nn.

**Wyposażenie:** wyłącznik (lub rozłącznik z bezpiecznikami), odłącznik trójpozycyjny,
trzy przekładniki prądowe (ewentualnie dwa + przekładnik sumujący), zabezpieczenie cyfrowe,
ograniczniki przepięć przy transformatorze, wskaźniki napięcia.

**Typowe zabezpieczenia odpływu do transformatora SN/nn:**
- **nadprądowe zwarciowe bezzwłoczne** + **nadprądowe zwłoczne przeciążeniowe**
- **ziemnozwarciowe**
- **cieplne (obraz cieplny)**
- **przekaźnik blokujący** od zabezpieczeń wewnętrznych transformatora
- **sygnały z transformatora**:
  - **zabezpieczenie gazowo-przepływowe (przekaźnik Buchholza)** — dwa stopnie: gaz (sygnał)
    i przepływ (wyłączenie)
  - **kontrola poziomu oleju**
  - **kontrola temperatury oleju i uzwojeń** (czujniki PT100, termistory PTC dla transformatorów
    żywicznych)
  - **zawór nadciśnieniowy**
- dla większych jednostek: **zabezpieczenie różnicowe transformatora**,
  **zabezpieczenie ziemnozwarciowe stabilizowane** (obejmujące uzwojenie w gwiazdę)

**Klucz do selektywności:** czas zabezpieczenia zwłocznego w polu odpływowym musi być
**krótszy** od czasu w polu zasilającym o **stopień czasowy** — typowo **0,2–0,3 s**
dla zabezpieczeń cyfrowych.

---

### B.4 Pole sprzęgła (łącznika szyn)

**Funkcja:** łączy sekcje A i B — umożliwia zasilanie całej rozdzielnicy z jednego źródła
(rezerwa) oraz przenoszenie obciążenia.

**Wyposażenie:** wyłącznik, **dwa** odłączniki (po jednym do każdej sekcji) lub odłącznik
trójpozycyjny, przekładniki prądowe (dla zabezpieczenia różnicowego szyn i zabezpieczeń
nadprądowych sprzęgła), zabezpieczenie cyfrowe z **kontrolą synchronizmu**.

**Typowe zabezpieczenia i funkcje:** nadprądowe zwarciowe i zwłoczne, ziemnozwarciowe,
**kontrola synchronizmu**, udział w **zabezpieczeniu różnicowym szyn** (przekładniki sprzęgła
wyznaczają granicę strefy), **automatyka SZR**, blokada „dwa z trzech".

**Sposoby przenoszenia zasilania:**

| Sposób | Opis | Uwagi |
|---|---|---|
| **Przełączenie z przerwą** (bezprądowe) | Najpierw otwórz, potem zamknij | Przerwa kilkuset ms; najbezpieczniejsze |
| **Przełączenie bez przerwy** (przez pracę równoległą) | Chwilowa praca równoległa | Wymaga **kontroli synchronizmu**; wyższe prądy zwarciowe; czas równoległości ograniczony timerem (0,1–0,5 s) |
| **Przełączenie szybkie** | Załączenie rezerwy w 60–100 ms, zanim silniki wytracą wybieg | Wymaga kontroli kąta i napięcia resztkowego |
| **Przełączenie na napięciu resztkowym** | Czeka, aż napięcie spadnie poniżej ~25–30 % znamionowego | Bezpieczne dla silników, ale długa przerwa |

---

### B.5 Pole pomiaru napięcia (przekładników napięciowych)

**Funkcja:** dostarcza **sygnał napięciowy z szyn** do:
- zabezpieczeń napięciowych (podnapięciowego, nadnapięciowego, od składowej zerowej napięcia,
  częstotliwościowych),
- **kontroli synchronizmu**,
- **zabezpieczeń kierunkowych** (potrzebują napięcia jako odniesienia kierunku),
- pomiarów, liczników energii i wskaźników,
- **kontroli obecności napięcia na szynach** (sygnał „szyny pod napięciem / bez napięcia")
  dla automatyki SZR i blokad.

**Wyposażenie:**
- **trzy przekładniki napięciowe** — najczęściej:
  - w układzie **gwiazda / gwiazda z otwartym trójkątem** (uzwojenie w otwartym trójkącie daje
    składową zerową napięcia), albo
  - trzy jednofazowe z uzwojeniem pierwotnym między fazą a ziemią
- **odłącznik trójpozycyjny** lub wtyk wysuwny — pozwala odizolować i uziemić przekładniki
- **bezpieczniki WN po stronie pierwotnej** (ochrona szyn przed zwarciem w przekładniku)
- **osobne zabezpieczenia po stronie wtórnej** dla obwodu pomiarowego, zabezpieczeniowego
  i obwodu otwartego trójkąta
- **uziemienie w dokładnie jednym punkcie** obwodu wtórnego
- **rezystor tłumiący ferrorezonans** w obwodzie otwartego trójkąta

**Podstawowe wartości:** strona wtórna **100 V** (międzyfazowo) lub **100/√3 ≈ 57,7 V**
(fazowo). Przy pełnym zwarciu doziemnym w obwodzie otwartego trójkąta pojawia się **~100 V**
(potrojona składowa zerowa napięcia).

**Krytyczne zasady eksploatacyjne i BHP:**
- **NIE WOLNO zwierać** uzwojenia wtórnego przekładnika napięciowego — zwarcie go niszczy.
- **NIE WOLNO zasilać przekładnika od strony wtórnej** — działa wtedy jako transformator
  podwyższający i na stronie pierwotnej pojawia się **pełne napięcie SN**. To realne zagrożenie
  przy próbach: **zawsze odizoluj przekładniki** (odłącznik otwarty, bezpieczniki pierwotne
  wyjęte) przed podaniem napięcia w obwody wtórne.
- Przy pracach na szynach przekładniki muszą być **odizolowane i uziemione** — są źródłem
  napięcia zwrotnego.

**Powiązane zabezpieczenia i funkcje:**
- **zabezpieczenie od składowej zerowej napięcia** — wykrywa zwarcie doziemne w sieci izolowanej
  lub skompensowanej
- **nadzór obwodów napięciowych** (od zaniku napięcia przekładnika) — wykrywa przepalony
  bezpiecznik lub wyłączone zabezpieczenie wtórne i **blokuje** zabezpieczenia zależne od
  napięcia (kierunkowe, odległościowe, podnapięciowe), żeby nie zadziałały zbędnie
- **kontrola kolejności faz i asymetrii napięć**
- **sygnały „szyny pod napięciem / bez napięcia"** dla automatyki i blokad uziemników

**Układ wyboru obwodów napięciowych:** w rozdzielnicy dwusekcyjnej sprzęgło i pola muszą
„widzieć" napięcie właściwej sekcji. Realizują to przekaźniki pomocnicze przełączające obwody
napięciowe zależnie od pozycji łączników. **To jeden z najczęstszych obszarów błędów
montażowych** — trzeba go sprawdzić dla każdej kombinacji stanów łączników.

---

### B.6 Pole silnikowe

**Wyposażenie:** wyłącznik próżniowy **lub stycznik próżniowy z bezpiecznikami** (dla mniejszych
moc — taniej i lepiej ogranicza prąd zwarciowy), przekładniki prądowe, przekładnik sumujący,
zabezpieczenie silnikowe cyfrowe.

**Typowe zabezpieczenia:**
- **cieplne (obraz cieplny silnika)** — model termiczny ze stałą czasową i pamięcią cieplną
- **nadprądowe zwarciowe** — nastawione **powyżej prądu rozruchowego** (typowo 1,3–2 × prąd rozruchu)
- **ziemnozwarciowe czułe** — silniki są wrażliwe na zwarcia doziemne w uzwojeniu
- **od asymetrii prądów (od składowej przeciwnej)** — zanik fazy powoduje przegrzanie
- **podprądowe** — utrata obciążenia, zerwanie sprzęgła, suchobieg pompy
- **od zbyt długiego rozruchu** i **od utyku (zablokowania) wirnika**
- **od zbyt częstych rozruchów** — liczba rozruchów na godzinę, minimalna przerwa
- **podnapięciowe** — odpad przy zaniku napięcia, blokada samorozruchu
- **kontrola temperatury łożysk i uzwojeń** (PT100)
- **zabezpieczenie różnicowe** dla dużych silników

---

### B.7 Pole baterii kondensatorów (BKR)

**Wyposażenie:** wyłącznik przystosowany do łączenia obwodów pojemnościowych (klasa łączeniowa
dla prądów pojemnościowych), **dławiki (reaktory) ograniczające prąd załączania**, rezystory
rozładowcze, przekładniki prądowe, regulator mocy biernej ze stopniami.

**Typowe zabezpieczenia:**
- **nadprądowe** — z uwzględnieniem prądu załączania i wyższych harmonicznych
- **ziemnozwarciowe**
- **nadnapięciowe** — kondensatory są szczególnie wrażliwe na przekroczenie napięcia
- **od niezrównoważenia / utraty pojemności** — wykrywa uszkodzenie sekcji lub ogniwa
- **od przeciążenia prądami harmonicznych** — ryzyko rezonansu z indukcyjnością sieci
- **od asymetrii prądów**
- **blokada powtórnego załączenia przed rozładowaniem** — czas rozładowania typowo **5–10 min**

**BHP — kondensatory to magazyn energii:**
1. Wyłącz i odizoluj.
2. **Odczekaj czas rozładowania podany w DTR** (rezystory rozładowcze potrzebują czasu).
3. Sprawdź brak napięcia.
4. **Uziem każdą sekcję baterii osobno** — rozładowanie jednej nie oznacza rozładowania
   pozostałych.

**Uwaga ruchowa:** załączanie i wyłączanie baterii to najbardziej męczące operacje dla
wyłącznika w całej rozdzielnicy (prądy pojemnościowe, przepięcia przy przerywaniu, ryzyko
ponownych zapłonów). Kontroluj **licznik operacji** — bateria zużywa wyłącznik szybciej niż
pole odpływowe.

---

### B.8 Pole transformatora uziemiającego (TRU) / punktu neutralnego

**Funkcja:** tworzy **sztuczny punkt neutralny** w sieci SN zasilanej z uzwojenia w trójkąt —
bez niego sieć jest całkowicie izolowana i nie da się selektywnie wykryć zwarcia doziemnego.

**Rozwiązania:**
- **transformator w układzie zygzak** + **rezystor** w punkcie neutralnym
- **transformator w układzie gwiazda-trójkąt** z uzwojeniem trójkąta zamkniętym lub obciążonym
  rezystorem
- **dławik gaszący (reaktor Petersena)** — sieć skompensowana, z automatycznym dostrajaniem
  i często z **automatyką wymuszania składowej czynnej**
- **rezystor uziemiający** włączony bezpośrednio w punkt neutralny uzwojenia w gwiazdę

**Dobór:** rezystor dobiera się tak, by prąd zwarcia doziemnego był **równy lub większy** od
prądu pojemnościowego sieci (typowo 100–600 A dla sieci kablowych) — to tłumi przepięcia
i zapewnia czułość zabezpieczeń ziemnozwarciowych.

**Zabezpieczenia:**
- **ziemnozwarciowe w obwodzie punktu neutralnego** — główny sygnał zwarcia doziemnego dla
  całej sekcji
- **zabezpieczenie cieplne rezystora** — rezystory uziemiające mają **krótką wytrzymałość
  czasową** (typowo 10 s przy prądzie znamionowym!), więc przeciążenie niszczy je szybko
- **nadprądowe transformatora uziemiającego**
- **kontrola ciągłości obwodu punktu neutralnego**
- **kontrola temperatury**

**Bardzo ważne eksploatacyjnie:** **odstawienie pola TRU zmienia charakter całej sieci** —
sekcja staje się izolowana, zabezpieczenia ziemnozwarciowe prądowe tracą czułość, rosną
przepięcia przy zwarciu doziemnym. Odstawienie musi być objęte osobnym uzgodnieniem
i **zmianą nastaw** (przejście na kryterium napięciowe / kierunkowe).

---

### B.9 Pole potrzeb własnych

Zasila transformator potrzeb własnych stacji → rozdzielnicę nn → **ładowarki baterii**,
ogrzewanie, oświetlenie, napędy, wentylację, klimatyzację.

**Zasada projektowa:** potrzeby własne muszą mieć **dwa niezależne źródła** (dwie sekcje
+ automatyka SZR na nn), a obwody prądu stałego muszą przetrwać zanik zasilania przemiennego.
Inaczej awaria potrzeb własnych pozbawia rozdzielnicę **zdolności wyłączania**.

---

## C. Obwody wtórne

### C.1 Podział obwodów

| Obwód | Napięcie / sygnał | Funkcja |
|---|---|---|
| **Prądowe** (od przekładników prądowych) | 1 A lub 5 A | pomiar, zabezpieczenia |
| **Napięciowe** (od przekładników napięciowych) | 100 V / 57,7 V | zabezpieczenia, pomiar, synchronizm |
| **Sterownicze** | 24/48/110/220 V prądu stałego | cewki załączające i wyłączające, napędy |
| **Wyzwalające (wyłączające)** | prąd stały | osobny, nadzorowany obwód do cewki wyłączającej |
| **Sygnalizacyjne** | prąd stały | pozycje łączników, sygnały, alarmy |
| **Blokad** | prąd stały / logika | blokady elektryczne i logiczne |
| **Komunikacyjne** | Ethernet, RS-485 | przesyłanie danych do systemu nadzoru |
| **Grzania i oświetlenia** | 230 V przemiennego | ogrzewanie przeciwkondensacyjne, gniazda |

### C.2 Układ prądu stałego — serce rozdzielnicy
- **Bateria akumulatorów** + **ładowarka (prostownik)** + rozdzielnica prądu stałego
- Napięcia: **110 V** i **220 V** (napędy, wyzwalanie), **48 V / 24 V** (automatyka, telemechanika)
- **Układ izolowany od ziemi** z **kontrolą stanu izolacji** — pierwsze zwarcie doziemne jest
  tylko sygnalizowane, żeby nie stracić zdolności wyzwalania
- **Dublowanie**: dwie ładowarki, dwie baterie, dwa niezależne obwody do zabezpieczeń
  i wyłączników (obiekty o wysokiej dostępności)
- Nadzorowane: napięcie baterii, prąd ładowania, zwarcie doziemne w obwodach prądu stałego,
  zanik zasilania ładowarki, zadziałanie zabezpieczeń obwodów

### C.3 Obwód wyzwalający i jego nadzór
```
+ ──[zabezpieczenie]──[styk przekaźnika wyzwalającego]──[styk pomocniczy wyłącznika]──[cewka wył.]── −
```
- **Styk pomocniczy** (zamknięty, gdy wyłącznik jest zamknięty) przerywa obwód po zadziałaniu,
  chroniąc cewkę przed przepaleniem.
- **Kontrola ciągłości obwodu wyzwalającego** — układ przepuszcza prąd nadzorczy (kilka mA)
  przez cewkę i sprawdza ciągłość **w pozycji zamkniętej i otwartej** wyłącznika.
  Bez tego nadzoru przerwa w obwodzie ujawni się dopiero przy zwarciu — czyli nigdy nie zadziała.
- Wyłączniki krytyczne mają **dwie cewki wyłączające** zasilane z **dwóch niezależnych obwodów
  prądu stałego**.

### C.4 Przekaźniki pomocnicze o kluczowym znaczeniu
- **Blokada przeciwpompująca** — gdy podana jest ciągła komenda ZAMKNIJ, a wyłącznik jest
  wyzwalany zabezpieczeniem, blokada uniemożliwia powtarzanie cyklu załącz–wyłącz, który
  zniszczyłby aparat.
- **Przekaźnik blokujący kasowany ręcznie** — po zadziałaniu **utrzymuje** stan wyłączony
  i **blokuje załączenie** do ręcznego skasowania. Stosowany przy zadziałaniach wymagających
  oględzin: zabezpieczenie różnicowe, przekaźnik Buchholza, zabezpieczenie łukoochronne,
  lokalne rezerwowanie wyłącznika. Kasowanie **tylko po ustaleniu przyczyny**.
- **Przekaźnik wyzwalający pośredniczący** — szybki przekaźnik zwielokrotniający sygnał
  wyzwalający na kilka cewek lub kilka wyłączników.

### C.5 Zaciski i bloczki probiercze
- **Zaciski probiercze prądowe** — przy wyjęciu wtyku **automatycznie zwierają** obwód
  przekładnika prądowego, więc można podawać prąd probierczy bez ryzyka rozwarcia.
- **Zaciski rozłączne napięciowe** — do izolowania obwodów napięciowych na czas prób.
- **Zasada:** przed próbami **zawsze** izoluj obwody prądowe i napięciowe bloczkami,
  nigdy przez rozkręcanie zacisków.

---

## D. Jak pola współpracują — logika systemowa

### D.1 Selektywność czasowo-prądowa (kaskada)
```
Transformator WN/SN → pole zasilające (0,8 s) → szyny → pole odpływowe (0,5 s)
                    → transformator SN/nn → rozdzielnica nn (0,2 s)
```
Każdy stopień w górę o **0,2–0,3 s**.

**Wada:** zwarcie **na szynach** widzi tylko pole zasilające, czyli wyłączane jest po
najdłuższym czasie — a szyny to najbardziej energetyczne miejsce w obiekcie. Stąd dwa
rozwiązania z punktów D.2 i D.4.

### D.2 Blokada logiczna zabezpieczeń
Każde pole odpływowe, które wykryje zwarcie w swojej strefie, **wysyła sygnał blokujący**
do pola zasilającego:
- **jest blokada** → zwarcie jest za odpływem → pole zasilające czeka swój normalny czas (rezerwa)
- **nie ma blokady** → zwarcie jest **na szynach** → pole zasilające wyłącza **bezzwłocznie
  (50–100 ms)**

Zysk: ochrona szyn bez kosztu zabezpieczenia różnicowego szyn. Wymaga niezawodnego toru blokady
i **przetestowania każdej pary pól** (odpływ → zasilanie).

### D.3 Automatyka SZR (samoczynne załączanie rezerwy)

**Warunki startu:** obniżenie napięcia na sekcji (np. poniżej 70 % przez 0,5–3 s) **oraz**
brak prądu w polu zasilającym **oraz** wyłącznik sprawny **oraz** brak zadziałania przekaźnika
blokującego (nie wolno przełączać na zwarcie!).

**Sekwencja:** otwórz wyłącznik uszkodzonej sekcji → potwierdź pozycję otwartą → sprawdź warunek
synchronizmu albo „szyny bez napięcia" → zamknij sprzęgło → potwierdź → sygnał i blokada
powtórzenia.

**Blokady automatyki SZR (krytyczne!):** zadziałanie zabezpieczenia różnicowego szyn,
zabezpieczenia łukoochronnego, przekaźnika blokującego, lokalnego rezerwowania wyłącznika;
brak zasilania prądem stałym; niesprawność wyłącznika; tryb sterowania miejscowego;
**ręczne wyłączenie przez operatora** (automatyka nie może „naprawiać" świadomej decyzji).

### D.4 Zabezpieczenie różnicowe szyn zbiorczych
- **Niskoimpedancyjne** — sumuje prądy wszystkich pól sekcji w zabezpieczeniu cyfrowym;
  wymaga przekładników o zbliżonych przekładniach i klasie; ma **strefę kontrolną** jako
  drugie, niezależne kryterium.
- **Wysokoimpedancyjne** — klasyczny układ na rezystorze stabilizującym z warystorem.
- **Granice strefy wyznaczają przekładniki prądowe** — przekładnik sprzęgła musi być poprawnie
  przypisany do strefy A lub B zależnie od kierunku. **Błąd biegunowości jednego przekładnika
  = zbędne wyłączenie całej sekcji.**
- **Dynamiczne łączenie stref** przy zamkniętym sprzęgle (obie strefy stają się jedną).

### D.5 Zabezpieczenie łukoochronne
Czujniki światła (punktowe i światłowodowe) w przedziale szyn, wyłącznika i kablowym,
działające **w koincydencji z kryterium prądowym**. Czas wykrycia **1–7 ms**, całkowity czas
wyłączenia z wyłącznikiem ~50–60 ms. Radykalnie obniża energię wyzwalaną przez łuk.
Zawsze przez **przekaźnik blokujący**.

### D.6 Lokalne rezerwowanie wyłącznika (LRW)
Po wysłaniu komendy wyłączenia startuje odliczanie czasu (typowo **150–250 ms**). Jeśli po tym
czasie **nadal płynie prąd** i/lub styk pozycji nie zmienił stanu → wyłącz **wyłącznik
nadrzędny** (pole zasilające) i/lub **sprzęgło**, oraz zablokuj automatykę SZR.
To ostatnia linia obrony przy zaklejonym lub niesprawnym wyłączniku.

### D.7 Automatyki sieciowe
- **SPZ — samoczynne ponowne załączanie**: tylko dla linii **napowietrznych**; likwiduje
  zwarcia przemijające. **Bezwzględnie blokowane** przy pracach pod napięciem i po zadziałaniu
  przekaźnika blokującego.
- **SCO — samoczynne częstotliwościowe odciążanie**: stopniowe odłączanie odbiorów przy
  spadku częstotliwości.
- **ARN — automatyczna regulacja napięcia** przełącznikiem zaczepów pod obciążeniem: wartość
  zadana, strefa nieczułości, opóźnienie, blokady (nadprądowa, podnapięciowa, praca równoległa
  w układzie nadrzędny/podrzędny lub metodą prądu krążącego).
- **Automatyki ziemnozwarciowe** w sieciach skompensowanych, w tym **automatyka wymuszania
  składowej czynnej**.

### D.8 Blokady — macierz do przetestowania

| Warunek | Blokowana czynność |
|---|---|
| Uziemnik zamknięty | zamknięcie odłącznika i wyłącznika, wsunięcie wózka |
| Odłącznik / wózek nie w pozycji krańcowej | zamknięcie wyłącznika |
| Wyłącznik zamknięty | operowanie odłącznikiem i wózkiem |
| Napięcie obecne na kablu lub szynie | zamknięcie uziemnika |
| Drzwi przedziału otwarte | wsunięcie wózka, zamknięcie wyłącznika |
| Oba pola zasilające zamknięte | zamknięcie sprzęgła (zasada „dwa z trzech") |
| Brak zasilania prądem stałym lub niesprawny napęd | komenda ZAMKNIJ |
| Sterowanie miejscowe | komendy zdalne (i odwrotnie) |

Blokady bywają **mechaniczne**, **elektromagnetyczne (zamki na klucze wzajemne)**,
**elektryczne** i **logiczne** (w zabezpieczeniu cyfrowym lub sterowniku).
**Mostkowanie blokad jest zabronione.**

---

## E. Sterowanie i nadzór

### E.1 Poziomy sterowania
1. **Poziom 0 — mechaniczny (ręczny)**: dźwignia napędu, korba wózka; działa bez prądu stałego
2. **Poziom 1 — miejscowy**: przyciski na drzwiach pola lub na zabezpieczeniu cyfrowym
3. **Poziom 2 — stacyjny**: pulpit / panel operatorski stacji, sterownik nadrzędny
4. **Poziom 3 — zdalny**: system nadzoru i sterowania, dyspozytor

**Przełącznik sterowania miejscowego / zdalnego** musi jednoznacznie odbierać uprawnienie
pozostałym poziomom. Sprawdzenie tego jest obowiązkowym punktem prób funkcjonalnych.

### E.2 Sygnały wymagane w systemie nadzoru (minimum)
Pozycje łączników (**zawsze oba styki pomocnicze**, żeby wykryć stan nieokreślony), pozycja
odłącznika i uziemnika, tryb sterowania, sygnał „wyłącznik gotowy" (sprężyna zbrojona, zasilanie
prądem stałym obecne, ciśnienie SF₆ prawidłowe), **rozróżnione zadziałania poszczególnych
zabezpieczeń**, zadziałanie przekaźnika blokującego, alarm kontroli obwodu wyzwalającego,
pomiary (prąd, napięcie, moc czynna i bierna, współczynnik mocy, częstotliwość, energia),
zwarcie doziemne w obwodach prądu stałego, zanik zasilania przemiennego, zadziałanie
zabezpieczenia łukoochronnego.

### E.3 Komunikacja
- **Norma IEC 61850** — komunikacja stacyjna: przesyłanie raportów i sterowanie oraz
  **szybkie komunikaty międzypolowe** (używane do blokady logicznej, zabezpieczenia
  łukoochronnego, zabezpieczenia różnicowego szyn, automatyki SZR)
- **Protokoły starsze / prostsze**: IEC 60870-5-103, Modbus, DNP3
- **Test komunikacji międzypolowej**: sprawdzenie przypisania nadawca–odbiorca, pomiar czasu
  przesłania, reakcja na **utratę komunikatów** — musi wywołać zdefiniowane działanie
  (zwykle przejście na nastawy bez blokady, czyli bardziej zachowawcze) i sygnał alarmu.

---

## F. Szybka mapa: co zrobić, gdy...

| Sytuacja | Reakcja |
|---|---|
| Zadziałało zabezpieczenie ziemnozwarciowe bez wyłączenia pola | Sprawdź, czy to sygnał czy wyłączenie; w sieci izolowanej zwykle tylko sygnalizuje — szukaj zwarcia doziemnego |
| Alarm nadzoru obwodów napięciowych | Sprawdź bezpieczniki i zabezpieczenia obwodów przekładnika; **pamiętaj, że zabezpieczenia kierunkowe, odległościowe i podnapięciowe są zablokowane** — rozdzielnica pracuje z obniżoną ochroną |
| Alarm kontroli obwodu wyzwalającego | Wyłącznik może nie zadziałać na zwarcie — traktuj jako pilne, rozważ odstawienie pola |
| Zadziałał przekaźnik blokujący | **Nie kasuj** przed ustaleniem przyczyny i oględzinami |
| Zadziałało zabezpieczenie łukoochronne | Nie wchodzić; oględziny, pomiary izolacji, ocena stanu przed załączeniem |
| Zanik zasilania ładowarki | Ograniczony czas pracy na baterii — priorytet naprawy, ograniczyć operacje łączeniowe |
| Zwarcie doziemne w obwodach prądu stałego | Pilne — drugie zwarcie może spowodować zbędne wyzwolenie albo brak wyzwolenia |
| Bateria kondensatorów wyłączona zabezpieczeniem od niezrównoważenia | Nie załączać — uszkodzone ogniwo; wymaga pomiaru pojemności sekcji |

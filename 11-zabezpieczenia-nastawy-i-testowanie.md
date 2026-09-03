# 11. Zabezpieczenia SN — funkcje, nastawy i metodyka testowania

> Nastawy podane są jako **typowe punkty wyjścia**. Obowiązuje **karta nastaw** zatwierdzona
> przez projektanta/OSD i uzgodniona z zabezpieczeniami nadrzędnymi.

---

## A. Katalog funkcji (kody ANSI/IEEE) — co robi i jak testować

### A.1 Nadprądowe

| Kod | Funkcja | Typowa nastawa | Jak testować |
|---|---|---|---|
| **50** | Nadprądowe bezzwłoczne (zwarciowe) | 6–10 × I_n odpływu; **poniżej** I_k min, **powyżej** prądów rozruchowych/inrush | Wstrzyk 3-faz.: 0,9× nastawy (brak zadziałania) i 1,1× (zadziałanie); pomiar czasu własnego (typ. 20–40 ms) |
| **51** | Nadprądowe zwłoczne (przeciążeniowe) | 1,2–1,4 × I_obc; charakterystyka DT lub IDMT (IEC NI/VI/EI) | Sprawdź **próg** (1,05–1,3× pickup) + **min. 3 punkty krzywej** (np. 2×, 5×, 10× nastawy) i porównaj z obliczonym czasem |
| **50N/51N** | Ziemnozwarciowe (składowa zerowa) | Sieć z NER: 10–20 % I_E; sieć izolowana: czułe, 1–5 A pierwotnie | Wstrzyk **jednofazowy** (lub w wejście CT sumującego); sprawdź, czy nie ma przeniku od prądu fazowego |
| **67 / 67N** | Kierunkowe nadprądowe / ziemnozwarciowe | kąt charakterystyczny: 67N w sieci z rezystorem ≈ 0° (kryterium czynnomocowe), w izolowanej ≈ −90° (biernomocowe) | Wstrzyk **I + U** z regulacją kąta; sprawdź granice strefy zadziałania (±(85–88)° od kąta charakt.) i brak zadziałania w kierunku przeciwnym |
| **51V** | Nadprądowe z hamowaniem/blokadą napięciową | dla generatorów | Wstrzyk I przy zmiennym U — sprawdź przesunięcie progu |
| **46** | Asymetria / składowa przeciwna | 10–20 % I_n, t = 2–10 s | Wstrzyk asymetrycznego układu 3-faz. (obniżona jedna faza) |
| **49** | Obraz cieplny | I_b = 1,0–1,05 × I_n, τ z DTR | Wstrzyk skokowy prądu i pomiar czasu do zadziałania; porównaj z modelem `t = τ·ln((I²−Ip²)/(I²−k²Ib²))`; sprawdź **pamięć cieplną** i reset |
| **37** | Podprądowe | 30–60 % I_n, z blokadą na czas rozruchu | Wstrzyk prądu i obniżanie poniżej progu |
| **48 / 51LR** | Zbyt długi rozruch / utyk | t_rozruchu × 1,2–1,5 | Wstrzyk prądu rozruchowego dłużej niż nastawa |
| **66** | Liczba rozruchów | 2 gorące / 3 zimne na godzinę | Symulacja kolejnych rozruchów, sprawdzenie blokady i licznika |

### A.2 Napięciowe i częstotliwościowe

| Kod | Funkcja | Typowa nastawa | Jak testować |
|---|---|---|---|
| **27** | Podnapięciowe | 70–85 % U_n, t = 0,5–3 s (dla SZR krócej) | Obniżanie napięcia 3-faz.; sprawdź blokadę przy „bus dead" (żeby nie działało przy wyłączonej sekcji) |
| **59** | Nadnapięciowe | 110–120 % U_n | Podnoszenie napięcia |
| **59N / 64** | Napięcie zerowe (3U₀) | 10–30 % (sieć skompensowana), niżej dla czułych | Wstrzyk w obwód broken delta lub asymetria 3-faz. |
| **47** | Kolejność / asymetria faz | — | Zamiana kolejności faz na teście |
| **81U / 81O** | Podczęstotliwościowe / nadczęstotliwościowe | 47,5–49,5 Hz / 50,5–52 Hz | Rampa częstotliwości z testera |
| **81R** | ROCOF (df/dt) | 0,5–2 Hz/s | Rampa z zadanym nachyleniem |
| **60 / VTS** | Nadzór obwodów napięciowych | logika: 3U₀ bez 3I₀ | Wyjęcie jednego bezpiecznika VT / wstrzyk asymetrii U bez I → musi być alarm + **blokada 67/21/51V/27** |
| **25** | Synchro-check | ΔU ≤ 5–10 %, Δf ≤ 0,1–0,2 Hz, Δφ ≤ 10–20° | Dwa źródła napięcia z testera z regulacją kąta i częstotliwości; sprawdź **każdy warunek osobno** oraz tryby dead-bus/dead-line |

### A.3 Różnicowe i strefowe

| Kod | Funkcja | Jak testować |
|---|---|---|
| **87T** | Różnicowe transformatora | Sprawdź: dopasowanie przekładni i grupy połączeń, próg (I_d>), **nachylenie charakterystyki hamowania** (min. 2 punkty na każdym odcinku), **blokada 2. harmoniczną** (inrush) i **5. harmoniczną** (przewzbudzenie), strefa nieczułości; wstrzyk z obu stron jednocześnie |
| **87B** | Różnicowe szyn | Wstrzyk w każdy zestaw CT osobno (sprawdzenie polaryzacji i przypisania do strefy), potem sumarycznie; sprawdź **check zone** i dynamiczne łączenie strefy przy zamkniętym sprzęgle |
| **64REF** | Ziemnozwarciowe stabilizowane (REF) | Wstrzyk w CT punktu neutralnego i w CT fazowe w przeciwfazie — sprawdzenie stabilności; potem tylko neutralny — zadziałanie |
| **87M / 87L** | Różnicowe silnika / linii | jak 87T, dla 87L dodatkowo test kanału komunikacyjnego i opóźnienia |
| **50BF** | Niezadziałanie wyłącznika | Symuluj trip + utrzymaj prąd → po nastawionym czasie musi wyjść komenda na INC/BC + blokada SZR |
| **Arc-flash** | Łukoochronne | Źródło światła (latarka/testowa dioda na czujnik) + wstrzyk prądu; zmierz czas detekcji i całkowity czas wyłączenia |

### A.4 Wejścia od obiektu (nie wymagają wstrzyku prądu)

| Kod | Sygnał | Test |
|---|---|---|
| **63** | Buchholz — gaz (alarm) / przepływ (wyłączenie) | Zwarcie odpowiednich zacisków w skrzynce transformatora (nie w szafie!) — sprawdza **cały tor** |
| **71** | Poziom oleju | jak wyżej |
| **26 / 49T** | Temperatura oleju / uzwojeń (PT100, PTC) | Symulator rezystancji (dekada) — sprawdzenie progów alarm/trip |
| **Zawór nadciśnieniowy** | — | zwarcie zacisków |
| **SF₆ density** | 2 progi: alarm / blokada | zwarcie zacisków presostatu; sprawdź, że **blokada** faktycznie blokuje operacje |

---

## B. Nastawy — zasady doboru i weryfikacji

### B.1 Warunki, które nastawa musi spełnić jednocześnie
1. **Czułość:** `I_k min / I_nastawy ≥ 1,5` (rezerwowo ≥ 1,2)
2. **Nieczułość na stany normalne:** powyżej prądu obciążenia, prądu rozruchowego silników,
   prądu inrush transformatora (typowo 6–12 × I_n trafo, zanikający w 0,1–0,3 s),
   prądu załączania baterii kondensatorów
3. **Selektywność:** stopień czasowy do zabezpieczenia nadrzędnego i podrzędnego
4. **Wytrzymałość cieplna:** czas wyłączenia < wytrzymałość zwarciowa kabla `I²t ≤ k²S²`
   i uzwojeń transformatora
5. **Ochrona ludzi:** dla stacji — czas wyłączenia zgodny z dopuszczalnym napięciem rażeniowym
   (PN-EN 50522); dla łuku — energia incydentu w granicach ŚOI

### B.2 Stopień czasowy (grading margin)
```
Δt = t_wyłącznika + t_resetu przekaźnika + błąd pomiaru czasu + margines bezpieczeństwa
Δt ≈ 60 ms + 40 ms + 30 ms + 70 ms ≈ 200 ms  (przekaźniki cyfrowe)
```
Dla przekaźników elektromechanicznych przyjmuje się **0,3–0,4 s**.

### B.3 Weryfikacja dokumentacyjna przed testem
- karta nastaw **zatwierdzona** (podpis projektanta), zgodna z aktualnym schematem
- **plik nastaw z IED** wyeksportowany i porównany z kartą **linia po linii**
  (to wykrywa najwięcej błędów — częściej niż testy wstrzykowe)
- weryfikacja **przekładni CT/VT** wprowadzonych w IED względem tabliczek
- sprawdzenie wersji firmware i konfiguracji logiki (PLC/GOOSE)
- **zapis „as-found"** przed zmianami i **„as-left"** po testach

---

## C. Metodyka testowania — od czego zacząć

### C.1 Piramida testów
```
1. Testy elementów (CT, VT, wyłącznik, cewki, przekaźniki)        ← bez napięcia
2. Kontrola połączeń punkt-punkt (point-to-point wiring check)     ← bez napięcia
3. Testy sekundarne zabezpieczeń (secondary injection)             ← bez napięcia SN
4. Testy pierwotne (primary injection) — przekładnie, polaryzacja  ← bez napięcia SN
5. Próby funkcjonalne sterowania i blokad                          ← bez napięcia SN
6. Testy logiki i komunikacji (scheme test, GOOSE, SCADA)          ← bez napięcia SN
7. Test zintegrowany / end-to-end (trip matrix)                    ← bez napięcia SN
8. Próby po podaniu napięcia (stabilność 87, kierunkowość, pomiary)← pod napięciem
```

### C.2 Sprzęt pomiarowy
| Zadanie | Przyrząd |
|---|---|
| Wstrzyk sekundarny (I, U, kąt, f) | Omicron CMC 256/356, Megger SMRT, Doble F6150, ISA DRTS |
| Wstrzyk pierwotny | źródło prądowe 500–2000 A (np. Omicron CPC 100, DV Power, Raytech) |
| Badanie CT (przekładnia, kąt, krzywa magnesowania, ALF) | Omicron CT Analyzer, CPC 100 |
| Rezystancja styków | mikroomomierz 100–600 A (DLRO, MOM2, DV Power) |
| Czasy i droga styków wyłącznika | analizator wyłączników (Megger TM1800/EGIL, Omicron CIBANO 500) |
| Rezystancja izolacji | megomierz 2,5 / 5 kV |
| Próba napięciowa AC | zestaw AC hipot (rezonansowy) |
| Próba kabli SN | VLF 0,1 Hz / DAC (BAUR, Megger, Omicron) |
| Wyładowania niezupełne | Omicron MPD, BAUR, Megger PD |
| Termowizja | kamera IR (po obciążeniu) |

### C.3 Zasada „izoluj, nie rozkręcaj"
- obwody **CT** — izoluj bloczkiem probierczym ze **zwieraniem** (RTXP/RTXH); nigdy nie rozwieraj
- obwody **VT** — izoluj bloczkiem rozłącznym; **wyjmij bezpieczniki pierwotne VT**
- wyjścia **trip** — na czas testów progów wyprowadź na **styki testowe** albo odizoluj cewkę,
  ale **końcowy test zintegrowany musi być wykonany na realnym torze** aż do cewki wyłącznika
- **SCADA w trybie test/blokada alarmów** — żeby nie generować fałszywych zgłoszeń u dyspozytora
- czerwone kreślenie (*red-lining*) schematów w trakcie testu; każda rozbieżność → punch list

---

## D. Testy elementów pierwotnych

### D.1 Przekładniki prądowe (CT)
| Test | Metoda | Kryterium (typowe) |
|---|---|---|
| Rezystancja izolacji | 1 kV DC uzwojenie wtórne–ziemia; 5 kV pierwotne–wtórne | > 100 MΩ (wtórne), > 1 GΩ (pierwotne) |
| Ciągłość i rezystancja uzwojenia | mikroomomierz / DC | zgodna z DTR, symetria między fazami |
| **Przekładnia** | wstrzyk pierwotny lub CT Analyzer | błąd w granicach klasy (0,5 / 5P) |
| **Polaryzacja (biegunowość)** | metoda impulsowa (bateria + mV-metr) lub analizator | zgodna z oznaczeniem P1/P2, S1/S2 |
| Krzywa magnesowania, punkt kolanowy, ALF | CT Analyzer | zgodna z klasą 5P20 / PX |
| Obciążenie wtórne (burden) | pomiar rezystancji pętli | poniżej znamionowego VA |

**Polaryzacja CT to najczęstsza przyczyna błędnego działania 87 i 67.** Sprawdzaj ją zawsze,
także po każdej ingerencji w obwody.

### D.2 Przekładniki napięciowe (VT)
- rezystancja izolacji, przekładnia, polaryzacja, **sprawdzenie jednego punktu uziemienia**
- sprawdzenie bezpieczników pierwotnych i MCB wtórnych (selektywność, oznaczenie)
- **sprawdzenie obwodu broken delta** (3U₀ = 0 przy symetrii)
- test **rezystora tłumiącego ferrorezonans** (obecność i wartość)

### D.3 Wyłącznik
| Test | Kryterium (typowe — sprawdź DTR!) |
|---|---|
| Rezystancja styków głównych (µΩ) | 20–60 µΩ/pole dla próżniowych; odchylenie między fazami < 20 % |
| Czas zamykania | 40–80 ms |
| Czas otwierania (od komendy do rozejścia styków) | 30–60 ms |
| Całkowity czas przerywania | 50–70 ms |
| Niejednoczesność biegunów | < 2–3 ms |
| Rezystancja cewek Z/W | zgodna z DTR |
| Minimalne napięcie zadziałania cewki wył. | zwykle ≤ 70 % U_n DC (test: obniżaj napięcie) |
| Wytrzymałość próżni komory | próba napięciowa na otwartych stykach lub tester magnetronowy |
| Szczelność SF₆ / ciśnienie | wg DTR, z kompensacją temperatury |
| Zbrojenie sprężyny, licznik operacji, blokady napędu | działa poprawnie |
| Cykl O-C-O, próba antypompowania | zgodnie z DTR |

### D.4 Szyny, izolacja, kable
- **rezystancja izolacji szyn**: megomierz **5 kV**, faza–ziemia i faza–faza;
  typowo **> 1 GΩ** (kryterium z DTR)
- **próba napięciowa AC** na miejscu (IEC 62271-200 zaleca **80 % napięcia znamionowego
  probierczego**): dla rozdzielnicy 24 kV → U_d = 50 kV, test na miejscu ≈ **40 kV / 1 min**;
  dla 17,5 kV → 38 kV → ok. 30 kV; dla 36 kV → 70 kV → ok. 56 kV
- **kable SN**: VLF/DAC, tgδ, PD, ciągłość i zgodność faz, rezystancja ekranu
- **rezystancja połączeń śrubowych** i **kontrola momentów dokręcenia** (protokół)
- **ciągłość uziemienia** każdego przedziału i konstrukcji: **≤ 0,1 Ω** do głównej szyny

---

## E. Testy sekundarne — jak to robić poprawnie

### E.1 Procedura dla jednej funkcji (przykład: 51 w polu odpływowym)
1. Nastawa z karty: `I> = 240 A pierwotnie`, CT 300/5 → `I> = 4,0 A wtórnie`,
   charakterystyka IEC Normal Inverse, `TMS = 0,2`
2. **Izoluj CT** bloczkiem probierczym; podłącz tester do zaciskόw wtórnych IED
3. **Próg:** wstrzykuj rampę → odczyt prądu zadziałania.
   Kryterium: w granicach **±5 %** nastawy (lub wg DTR przekaźnika)
4. **Nieczułość:** 0,95 × nastawy przez 2× nastawiony czas → brak zadziałania
5. **Czas:** wstrzyk skokowy 2×, 5×, 10× nastawy; porównaj z obliczonym z formuły
   `t = TMS · 0,14 / ((I/I>)^0,02 − 1)`.
   Kryterium: **±5 % lub ±30 ms**, co większe
6. **Reset:** sprawdź czas i tryb resetu (natychmiastowy / wg krzywej)
7. **Wyjście:** sprawdź, że zadziałanie trafia na właściwy styk/matrycę i sygnał do SCADA
8. Zapisz wyniki w protokole; przywróć bloczek; zapisz „as-left"

### E.2 Zasady, które odróżniają dobry test od pozornego
- testuj **każdą fazę osobno** (L1, L2, L3) — wykrywa błędy w jednym torze CT
- testuj **50 i 51 rozdzielnie** (przez czasowe blokowanie drugiej funkcji), potem razem
- **kierunkowość testuj kątowo**, nie tylko amplitudowo
- weryfikuj **kierunek przepływu** w IED przy pomocy wskazań wektorowych (fazorów) w mierniku
  przekaźnika — nie tylko przez zadziałanie
- sprawdź zachowanie przy **utracie napięcia** (blokada 67) i **utracie GOOSE**
- dla 87: **stabilność** jest ważniejsza od progu — testuj prądy przechodzące (through-fault)

### E.3 Wstrzyk pierwotny — kiedy jest niezbędny
- sprawdzenie **przekładni i polaryzacji CT wraz z całym obwodem** do IED (jedyny test
  potwierdzający kompletny tor, w tym pomyłki w mufie zaciskowej i w szafie)
- sprawdzenie **przypisania stref 87B** i granic
- weryfikacja **CT sumujących** (core-balance) i obwodów 51N
- test **ciągłości pętli** dużym prądem (wykrywa złe zaciski, których omomierz nie pokaże)

Typowo wstrzykuje się **100–1000 A** przez szynę/kabel z jednoczesnym pomiarem prądu wtórnego
i odczytem w IED. Wymaga zwarcia i uziemienia po drugiej stronie obwodu.

---

## F. Testy po podaniu napięcia (nie da się ich zrobić wcześniej)

| Test | Cel | Metoda |
|---|---|---|
| **Sprawdzenie napięć wtórnych VT** | poprawność obwodów, przekładni i faz | pomiar 57,7/100 V, kolejność faz, 3U₀ ≈ 0 |
| **Kontrola fazorów w IED** | zgodność przypisania faz U i I | odczyt wektorów w IED przy obciążeniu |
| **Stabilność 87T / 87B** | brak prądu różnicowego przy obciążeniu | odczyt I_d przy rosnącym obciążeniu — musi być ≪ progu |
| **Kierunkowość 67/67N** | poprawność kierunku przy realnym przepływie | porównanie kierunku mocy z rzeczywistym |
| **Weryfikacja 25** | zgodność faz między sekcjami | pomiar napięcia różnicowego na otwartym sprzęgle ≈ 0 V |
| **Pomiary i rozliczenia** | poprawność P, Q, E | porównanie z niezależnym miernikiem |
| **Termowizja** | jakość połączeń | po min. 40–60 % obciążenia, po 1–2 h |
| **Test SZR „na gorąco"** | działanie w realnych warunkach | wg uzgodnionego scenariusza, z odbiorami przygotowanymi na przerwę |

---

## G. Protokół z testów zabezpieczeń — co musi zawierać

- identyfikacja obiektu, pola, IED (typ, nr fabryczny, **wersja firmware**, suma kontrolna
  konfiguracji)
- **przekładnie CT/VT** rzeczywiste i wprowadzone w IED
- **nastawy „as-found"** i **„as-left"** (pełny wydruk / plik)
- użyte przyrządy z numerami i datami wzorcowania
- dla każdej funkcji: nastawa, wartość zmierzona, odchyłka, kryterium, **wynik OK/NOK**
- tabela **czasów** dla min. 3 punktów krzywej
- wyniki testów blokad, matrycy wyzwalania, sygnalizacji i SCADA
- lista usterek (**punch list**) z klasyfikacją (blokująca / do usunięcia przed odbiorem / drobna)
- wniosek: **czy pole można załączyć**
- podpisy: wykonawca, sprawdzający (dozór), przedstawiciel użytkownika/OSD
- data i **termin następnego badania** (typowo 3–6 lat dla IED, wg instrukcji obiektu)

---

## H. Najczęstsze błędy wykrywane podczas testów

1. **Odwrotna polaryzacja jednego CT** → zbędne zadziałanie 87 lub błędna kierunkowość
2. **Zamienione fazy** między obwodem prądowym i napięciowym → 67 działa w złym kierunku
3. **Podwójne uziemienie obwodu wtórnego VT lub CT** → prądy krążące, błędy pomiaru
4. **Brak lub błędny bloczek zwierający CT** → uszkodzenie CT przy pracach
5. **Nastawy w IED niezgodne z kartą** (najczęściej przekładnia CT lub TMS)
6. **Brak nadzoru obwodu wyłączającego (TCS)** lub nadzór tylko w jednej pozycji
7. **Blokada logiczna podłączona odwrotnie** (odpływ ↔ zasilanie) → szyny bez ochrony
8. **Sprzęgło przypisane do złej strefy 87B**
9. **Sygnał 86 nietrzymający** albo reset zdalny (nie powinien być zdalny bez oględzin)
10. **Trip do niewłaściwego wyłącznika** — wychwytuje tylko test zintegrowany na realnym torze
11. **SZR bez blokady od 87B/arc-flash** → przełączenie na zwarcie
12. **Nieprzetestowana logika GOOSE timeout** → cicha utrata blokady logicznej

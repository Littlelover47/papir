# 13. Odstawienie rozdzielni SN i ponowne podanie napięcia — procedura od zera

Pełna kolejność: od planowania, przez wyłączenie i zabezpieczenie, badania, aż do
kontrolowanego podania napięcia i przekazania do ruchu.

> **To wzorzec metodyczny, nie instrukcja gotowa do wykonania.** Każde odstawienie prowadzi się
> na podstawie **programu łączeń** i **polecenia na pracę** dla konkretnego obiektu, zgodnie
> z instrukcją eksploatacji, DTR i uzgodnieniem z dyspozytorem.

---

# FAZA 0 — PLANOWANIE (dni / tygodnie przed)

## 0.1 Ustalenie zakresu i skutków
- [ ] Co dokładnie jest odstawiane: cała rozdzielnica / jedna sekcja / jedno pole
- [ ] **Wykaz odbiorów, które stracą zasilanie** — z właścicielami procesów
- [ ] Odbiory krytyczne: zasilacze bezprzerwowe (czas pracy na baterii!), pompy pożarowe,
      chłodzenie, oświetlenie awaryjne, systemy bezpieczeństwa
- [ ] Czy **potrzeby własne stacji** będą zasilone z innego źródła?
      **Utrata zasilania przemiennego = odliczanie czasu pracy baterii = utrata zdolności
      wyłączania**
- [ ] Ogrzewanie przeciwkondensacyjne rozdzielnicy — czy pozostanie zasilone (wilgoć!)
- [ ] Czy odstawienie obejmuje **pole transformatora uziemiającego**? Jeśli tak, sekcja stanie
      się sieciowo izolowana → **wymagana zmiana nastaw** zabezpieczeń ziemnozwarciowych
- [ ] Czy odstawienie obejmuje **baterię kondensatorów**? Jeśli tak — wzrost pobieranej mocy
      biernej i możliwe opłaty oraz spadek napięcia

## 0.2 Uzgodnienia i dokumenty
- [ ] **Wniosek o wyłączenie** do dyspozytora / operatora sieci
- [ ] **Program łączeń** — spisana i zaakceptowana kolejność czynności z numeracją
- [ ] **Polecenie na pracę** (pisemne), wyznaczone osoby funkcyjne
- [ ] **Ocena ryzyka** dla zadania oraz analiza zagrożenia łukiem (dobór odzieży ochronnej)
- [ ] **Plan blokad i oznakowania** — wykaz punktów odcięcia, kłódek, zamków, tablic
- [ ] **Plan powrotu** — co robimy, jeśli nie zdążymy; wyznaczony **moment bez odwrotu**
      (po którym nie da się szybko wrócić do ruchu)
- [ ] Powiadomienia: użytkownicy, ochrona, służby utrzymania, straż zakładowa
- [ ] Uzgodnienie **zmiany nastaw**, jeśli zmienia się układ pracy (np. praca z zamkniętym
      sprzęgłem — inne prądy zwarciowe i inna selektywność)

## 0.3 Przygotowanie zasobów
- [ ] Skład zespołu, kwalifikacje (**E powyżej 1 kV**), badania lekarskie, szkolenia
- [ ] Sprzęt ochronny z aktualnymi badaniami: drążki izolacyjne, wskaźnik napięcia SN,
      uziemiacze przenośne **dobrane na prąd zwarciowy**, maty i pomosty, rękawice
      elektroizolacyjne, kaski z osłoną twarzy, **odzież trudnopalna łukoochronna**
- [ ] Kłódki i tablice ostrzegawcze, taśmy, barierki, przegrody izolacyjne
- [ ] Przyrządy pomiarowe z aktualnym wzorcowaniem (wykaz w pliku `11`)
- [ ] Części zamienne: bezpieczniki WN i wtórne, uszczelki, smary wg DTR
- [ ] Sprzęt przeciwpożarowy, apteczka, **defibrylator**, łączność (radiotelefony),
      oświetlenie przenośne
- [ ] Dokumentacja na miejscu: schematy, DTR, karta nastaw, formularze protokołów

---

# FAZA 1 — PRZENIESIENIE OBCIĄŻENIA I WYŁĄCZENIE

## 1.1 Przygotowanie ruchowe
1. Potwierdź z dyspozytorem **gotowość i okno czasowe**.
2. Sprawdź stan układu: pozycje wszystkich łączników, obciążenia, napięcia, brak sygnałów
   awaryjnych, **stan baterii i ładowarki**.
3. Sprawdź, że rezerwa jest **rzeczywiście dostępna** (nie tylko na schemacie): napięcie na
   zasilaniu rezerwowym, sprawność wyłącznika, brak blokad, brak zadziałanego przekaźnika
   blokującego.
4. **Zablokuj automatyki**, które mogłyby zadziałać w trakcie prac: **SZR**, **SPZ**,
   automatyczną regulację napięcia, samoczynne przełączanie potrzeb własnych —
   i **zapisz to w rejestrze ingerencji**.

## 1.2 Przeniesienie obciążenia

**Wariant A — bez przerwy** (przez chwilową pracę równoległą):
1. Sprawdź warunki kontroli synchronizmu i **zgodność faz** (napięcie różnicowe ≈ 0 V).
2. Zamknij sprzęgło → chwilowa praca równoległa.
3. Otwórz wyłącznik odstawianego zasilania.
4. Potwierdź, że obciążenie przeszło (odczyt prądów).
> W tym stanie **prądy zwarciowe są wyższe** — upewnij się, że aparatura i nastawy to dopuszczają.

**Wariant B — z przerwą:**
1. Poinformuj użytkowników o przerwie, potwierdź gotowość.
2. Otwórz wyłącznik zasilania podstawowego.
3. Zamknij sprzęgło lub zasilanie rezerwowe.
4. Sprawdź powrót napięcia i samorozruch odbiorów.

## 1.3 Kolejność wyłączania odstawianego fragmentu
```
 1. Odpływy — od najmniej krytycznych                → wyłączniki pól odpływowych,
                                                       transformatorowych, silnikowych
 2. Bateria kondensatorów                            → wyłącznik (potem czas rozładowania!)
 3. Sprawdź: prąd = 0 w każdym polu
 4. Pole zasilające                                  → wyłącznik
 5. Pole transformatora uziemiającego                → wyłącznik / odłącznik
 6. Pole pomiaru napięcia                            → odłącznik + wyjęcie bezpieczników WN
 7. Odłączniki / wózki wszystkich pól                → pozycja OTWARTA (widoczna przerwa)
 8. Zabezpieczenie przed załączeniem                 → kłódki, tablice, wyjęcie cewek i wkładek
 9. Sprawdzenie braku napięcia                       → wskaźnik SN, wszystkie trzy fazy
10. Uziemienie                                       → uziemniki / uziemiacze przenośne
11. Wyznaczenie i oznakowanie strefy pracy
```

**Uwagi krytyczne:**
- Kolejność „odpływy → zasilanie" ogranicza prąd łączony i skutki błędu.
- **Odłącznikiem nigdy nie przerywaj prądu** — najpierw wyłącznik, potwierdzenie
  bezprądowości, potem odłącznik.
- **Przekładniki napięciowe są źródłem napięcia zwrotnego** — muszą być odizolowane i uziemione.
- **Bateria kondensatorów** — odczekaj czas rozładowania z DTR (typowo 5–10 min), sprawdź brak
  napięcia i **uziem każdą sekcję osobno**.
- **Kable odpływowe mogą być zasilone z drugiej strony** — uzgodnij i potwierdź wyłączenie
  oraz uziemienie po **obu** stronach; w sieci pierścieniowej to obowiązek.
- **Transformatory SN/nn uziem po obu stronach** — zasilanie zwrotne od nn (agregat, instalacja
  fotowoltaiczna, automatyka SZR na nn).

## 1.4 Pięć zasad — realizacja na obiekcie
1. **Odłączenie całkowite** — widoczna przerwa we wszystkich biegunach, ze wszystkich stron
   zasilania (również przekładniki napięciowe, potrzeby własne, agregat, fotowoltaika).
2. **Zabezpieczenie przed załączeniem** — kłódki na napędach i wózkach, wyjęte wkładki
   bezpiecznikowe i cewki, zamki na klucze wzajemne, tablice **„NIE ZAŁĄCZAĆ — PRACA NA
   URZĄDZENIU"**, **zablokowane sterowanie zdalne** (przełącznik w położeniu miejscowym
   + blokada w systemie nadzoru).
3. **Sprawdzenie braku napięcia** — wskaźnikiem właściwym dla danego napięcia, sprawdzonym
   **przed i po** pomiarze, **na wszystkich trzech fazach**, w miejscu pracy.
4. **Uziemienie i zwarcie** — uziemniki stacjonarne, a gdzie ich nie ma, uziemiacze przenośne:
   **najpierw zacisk uziemiający, potem fazy**; zdejmowanie w odwrotnej kolejności.
5. **Zabezpieczenie części czynnych w pobliżu** — przegrody, ekrany, zamknięte przedziały pól
   czynnych, oznakowanie granic strefy pracy.

## 1.5 Dopuszczenie do pracy
Dopuszczający potwierdza spełnienie warunków polecenia, **wskazuje zespołowi granice strefy
pracy**, **udowadnia brak napięcia** (pomiar w obecności zespołu), pokazuje uziemienia
i **części czynne pozostające pod napięciem**, omawia zagrożenia. Kierujący zespołem przyjmuje
strefę pracy.

---

# FAZA 2 — PRACE I BADANIA (bez napięcia)

## 2.1 Czyszczenie, oględziny, mechanika
- [ ] Oględziny wszystkich przedziałów: ślady wyładowań, przegrzania, korozji, zawilgocenia,
      pęknięcia izolatorów, stan przepustów i uszczelnień
- [ ] Czyszczenie izolacji środkami dopuszczonymi przez producenta, osuszenie
- [ ] Kontrola i **dokręcenie połączeń śrubowych** momentem z DTR — **z protokołem**
- [ ] Smarowanie mechanizmów, kontrola napędów, wózków, prowadnic, styków wtykowych
      (stan powłoki, smar stykowy)
- [ ] Kontrola przegród, blokad mechanicznych, zamków, kłódek
- [ ] Kontrola przepustów kablowych, uszczelnień ogniowych, drożności kanałów
- [ ] Kontrola ogrzewania, higrostatów, wentylacji, oświetlenia przedziałów
- [ ] Kontrola oznakowania pól, faz i schematów w rozdzielni

## 2.2 Pomiary i badania elementów
Szczegóły w pliku `11`, rozdział D. Zakres:
- [ ] Rezystancja izolacji szyn i pól — **megomierz 5 kV**, faza–ziemia i faza–faza
- [ ] **Próba napięciowa przemienna** (jeśli przewidziana): ~80 % znamionowego napięcia
      probierczego, 1 min — dla rozdzielnicy 24 kV około **40 kV**; po próbie
      **rozładować i uziemić**
- [ ] Rezystancja styków wyłączników, czasy załączania i wyłączania, niejednoczesność biegunów
- [ ] Wytrzymałość próżni komór / ciśnienie SF₆
- [ ] Rezystancja i najmniejsze napięcie zadziałania cewek
- [ ] Przekładniki prądowe: przekładnia, **biegunowość**, izolacja, charakterystyka magnesowania
- [ ] Przekładniki napięciowe: przekładnia, biegunowość, izolacja, uziemienie w jednym punkcie,
      bezpieczniki
- [ ] **Ciągłość uziemienia** każdego przedziału i konstrukcji: **≤ 0,1 Ω** do szyny głównej
- [ ] **Rezystancja uziemienia stacji** i ocena napięć rażeniowych (PN-EN 50522)
- [ ] Kable SN: izolacja, próba napięciem o bardzo niskiej częstotliwości lub tłumionym,
      współczynnik strat dielektrycznych, wyładowania niezupełne, ciągłość i zgodność faz
- [ ] Transformatory: izolacja i rezystancja uzwojeń, przekładnia, grupa połączeń, współczynnik
      strat, badanie oleju (napięcie przebicia, zawilgocenie, analiza gazów rozpuszczonych),
      sprawdzenie zabezpieczeń wewnętrznych
- [ ] Bateria kondensatorów: pomiar pojemności każdej sekcji, sprawdzenie rezystorów
      rozładowczych i dławików
- [ ] Bateria akumulatorów: napięcie, rezystancja wewnętrzna ogniw, **próba pojemności
      (rozładowania)**, sprawność ładowarki, kontrola izolacji obwodów prądu stałego

## 2.3 Badania obwodów wtórnych i zabezpieczeń
Pełna metodyka w plikach `11` i `12`. Kolejność:
1. [ ] Kontrola **zacisk–zacisk** wszystkich obwodów
2. [ ] Próby **prądem wtórnym** każdej funkcji zabezpieczeniowej (progi, czasy, kierunkowość)
3. [ ] Próby **prądem pierwotnym** (przekładnie i biegunowość w kompletnym torze, strefy
       zabezpieczenia różnicowego szyn)
4. [ ] **Próby funkcjonalne sterowania** — macierz z pliku `12`, rozdział D.1
5. [ ] **Próby funkcjonalne blokad** — pełna macierz, każdy warunek osobno
6. [ ] **Próby automatyki**: blokada logiczna, SZR (scenariuszami!), kontrola synchronizmu,
       łukoochronne, rezerwowanie wyłącznika, regulacja napięcia
7. [ ] **Łączność i system nadzoru**: każdy sygnał, komunikaty międzypolowe, reakcja na ich
       utratę, znaczniki czasu
8. [ ] **Próba zintegrowana** na rzeczywistym torze — do cewki wyłącznika

---

# FAZA 3 — LISTA KONTROLNA PRZED PODANIEM NAPIĘCIA

**Nie podawaj napięcia, dopóki każdy punkt nie jest odhaczony i podpisany.**

## 3.1 Stan techniczny
- [ ] Wszystkie prace **zakończone**, zgłoszone i odebrane
- [ ] Przedziały czyste — **brak narzędzi, szmat, elementów luzem, zwarć montażowych**
- [ ] Wszystkie osłony, przegrody i pokrywy **zamontowane i dokręcone**
- [ ] Drzwi przedziałów zamknięte, blokady sprawne
- [ ] Protokoły pomiarów **kompletne, z wynikami pozytywnymi**
- [ ] Lista usterek: **brak usterek klasy A (blokujących)**; klasa B i C zaakceptowane pisemnie

## 3.2 Obwody wtórne i nastawy
- [ ] **Rejestr ingerencji tymczasowych WYZEROWANY** — mostki usunięte, bezpieczniki wstawione,
      funkcje włączone, bloczki probiercze w położeniu pracy
- [ ] Nastawy **stanu pozostawionego zgodne z zatwierdzoną kartą** (wydruk porównany linia po linii)
- [ ] Wszystkie zabezpieczenia **aktywne** — żadne nie pozostawione „na próbach"
- [ ] **Przekaźniki blokujące skasowane**, brak podtrzymanych sygnałów awaryjnych
- [ ] Zasilanie prądem stałym obecne, napięcie w normie, **brak zwarcia doziemnego**,
      ładowarka pracuje
- [ ] **Kontrola ciągłości obwodu wyzwalającego aktywna i bez alarmu**
- [ ] Wyłączniki: sprężyny zbrojone, sygnał „gotowy", ciśnienie SF₆ w normie
- [ ] Automatyki w wymaganym stanie (SZR świadomie włączona lub wyłączona — **udokumentowane**)
- [ ] System nadzoru: **tryb próbny wyłączony**, alarmy odblokowane, sygnały widoczne u dyspozytora

## 3.3 Bezpieczeństwo
- [ ] Zespół **poza strefą**, narzędzia usunięte, ludzie przeliczeni
- [ ] **Wszystkie uziemienia robocze usunięte** — uziemniki otwarte, uziemiacze przenośne
      **zdjęte i przeliczone** (fizycznie sprawdź komplet — to najczęstsza przyczyna zwarcia
      przy podaniu napięcia)
- [ ] Kłódki zdjęte przez **te same osoby**, które je zakładały; tablice usunięte
- [ ] Strefa pracy **zlikwidowana przez dopuszczającego**, zgłoszenie do koordynującego
- [ ] Zakończenie pracy potwierdzone, polecenie zamknięte
- [ ] Ogrodzenia usunięte, przejścia i drogi ewakuacyjne wolne
- [ ] Sprzęt przeciwpożarowy na miejscu, obsługa poinformowana
- [ ] Uzgodniona łączność z dyspozytorem i osobą kierującą czynnościami łączeniowymi

---

# FAZA 4 — PODANIE NAPIĘCIA

## 4.1 Zasada: małymi krokami, z weryfikacją po każdym
Nigdy nie załączaj całej rozdzielnicy jedną komendą.

```
KROK 1  Zamknij odłącznik / wsuń wózek pola zasilającego  → potwierdź pozycję
KROK 2  Załącz pole pomiaru napięcia (odłącznik +          → przygotowanie pomiaru
        bezpieczniki WN)
KROK 3  Zamknij wyłącznik pola zasilającego                → NAPIĘCIE NA SZYNACH
        ↳ NASŁUCH: brak nietypowych dźwięków, zapachu, brak sygnałów awaryjnych
KROK 4  WERYFIKACJA NAPIĘĆ (punkt 4.2) — zanim cokolwiek dalej
KROK 5  Załącz pole transformatora uziemiającego            → sieć nabiera charakteru
KROK 6  Odczekaj 10–15 min bez obciążenia                   → stabilizacja, obserwacja
KROK 7  Załączaj odpływy POJEDYNCZO, od najmniejszych       → po każdym: prądy, symetria
KROK 8  Załączaj transformatory pojedynczo                  → uwaga na prąd włączania
KROK 9  Załącz baterię kondensatorów                        → na końcu, po ustaleniu obciążenia
KROK 10 Przywracaj obciążenie stopniowo                     → kontrola po każdym stopniu
KROK 11 Przywróć normalny układ pracy i automatyki          → udokumentuj
```

## 4.2 Weryfikacja bezpośrednio po podaniu napięcia na szyny — OBOWIĄZKOWO
- [ ] **Napięcia międzyfazowe** symetryczne i o właściwej wartości
- [ ] **Napięcia wtórne przekładników**: ~100 V lub 57,7 V, symetryczne
- [ ] **Składowa zerowa napięcia ≈ 0 V** — brak zwarcia doziemnego.
      Jeśli występuje, **natychmiast wyłącz** i szukaj przyczyny
- [ ] **Kolejność faz** zgodna z wymaganą (wskaźnik kolejności faz)
- [ ] **Wskazania wektorowe w zabezpieczeniach** — poprawne przypisanie faz napięcia
      (po obciążeniu również prądu)
- [ ] Brak alarmów: nadzór obwodów napięciowych, zwarcie doziemne, łukoochronne,
      przekaźnik blokujący
- [ ] Odczyt w systemie nadzoru zgodny z odczytem miejscowym

## 4.3 Przed pierwszym zamknięciem sprzęgła — badanie krytyczne
Na **otwartym** wyłączniku sprzęgła zmierz **napięcie różnicowe** między sekcjami:
- **≈ 0 V** → fazy zgodne, można zamykać
- **napięcie międzyfazowe** → **fazy niezgodne**; zamknięcie oznaczałoby zwarcie międzyfazowe.
  Zatrzymaj się i wyjaśnij przyczynę (kolejność faz kabla, zamiana żył w mufie).

Dodatkowo sprawdź działanie **kontroli synchronizmu** w warunkach rzeczywistych.

## 4.4 Załączanie transformatorów
- **Prąd włączania (udar magnesujący)** — 6–12 × prąd znamionowy, zanikający w 0,1–0,3 s —
  nie może wyzwolić zabezpieczenia bezzwłocznego. Jeśli wyzwala, to **błąd nastawy**,
  a nie „normalne zjawisko".
- Sprawdź działanie **blokady od drugiej harmonicznej** w zabezpieczeniu różnicowym.
- Po załączeniu: brak nietypowego hałasu, kontrola temperatury i poziomu oleju,
  brak zadziałania przekaźnika Buchholza.
- Załączaj transformatory **pojedynczo**, z odstępem czasowym.

## 4.5 Załączanie baterii kondensatorów
- Załączaj **na końcu**, po ustabilizowaniu obciążenia — inaczej ryzyko przepięć i przewzbudzenia.
- Sprawdź **prąd załączania** (dławiki ograniczające) i brak zadziałania zabezpieczenia
  nadprądowego.
- Sprawdź **symetrię prądów** sekcji i brak sygnału od niezrównoważenia.
- Sprawdź wpływ na napięcie szyn i na poziom harmonicznych (ryzyko rezonansu).
- Przy wyłączeniu — **nie załączaj ponownie przed upływem czasu rozładowania**.

## 4.6 Badania możliwe tylko pod napięciem (patrz `11`, rozdział F)
- [ ] **Stabilność zabezpieczeń różnicowych** — prąd różnicowy przy rosnącym obciążeniu
      znacznie poniżej progu
- [ ] **Kierunkowość** — zgodność z rzeczywistym przepływem mocy
- [ ] Poprawność **pomiarów i układu rozliczeniowego**
- [ ] **Kontrola termowizyjna** po 1–2 h przy obciążeniu min. 40–60 %
- [ ] Symetria obciążenia faz, poziom harmonicznych, prąd w przewodzie neutralnym (strona nn)
- [ ] **Próba automatyki SZR w warunkach rzeczywistych** — wyłącznie wg uzgodnionego scenariusza

---

# FAZA 5 — PRZEKAZANIE DO RUCHU

- [ ] Wpis do **dziennika operacyjnego / książki ruchu**: czynności, czasy, osoby
- [ ] Zgłoszenie dyspozytorowi: **rozdzielnica w ruchu, układ normalny, stan automatyk**
- [ ] Kompletacja dokumentacji: protokoły pomiarów i badań, karty nastaw stanu pozostawionego,
      **schematy z naniesionymi zmianami (powykonawcze)**, protokoły odbioru
- [ ] Aktualizacja **instrukcji eksploatacji**, jeśli zmienił się układ, nastawy lub automatyki
- [ ] Zamknięcie listy usterek klasy B i C — z terminami i osobami odpowiedzialnymi
- [ ] Ustalenie **terminu następnych badań** i wpis do harmonogramu
- [ ] Krótkie omówienie z zespołem: co poszło nie tak, co poprawić następnym razem

---

# ZAŁĄCZNIK A — Kolejność dla obiektu NOWEGO

Dla rozdzielnicy nigdy wcześniej nieuruchamianej przed FAZĄ 2 dochodzą etapy:

1. **Odbiór fabryczny u producenta** — próby napięciowe, mechaniczne i funkcjonalne,
   sprawdzenie zgodności z projektem
2. **Odbiór dostawy na obiekcie** — kontrola uszkodzeń transportowych, kompletności,
   wskaźników udaru i wilgotności, zgodności tabliczek
3. **Montaż mechaniczny** — poziomowanie, kotwienie, łączenie sekcji, kontrola odstępów
   izolacyjnych
4. **Podłączenie szyn i kabli** z kontrolą momentów dokręcenia; montaż głowic kablowych
5. **Wykonanie uziemienia** — przyłączenie do siatki, pomiar ciągłości i rezystancji
6. **Podłączenie obwodów wtórnych** i układu prądu stałego; uruchomienie ładowarki i baterii
7. **Parametryzacja zabezpieczeń** — wgranie konfiguracji i nastaw, synchronizacja czasu
8. → dalej jak **FAZA 2** i **FAZA 3**
9. **Odbiór na obiekcie** z udziałem użytkownika — protokolarnie
10. **Pierwsze podanie napięcia** wg FAZY 4, zwykle z przedstawicielem producenta
11. **Okres obserwacji** (typowo 72 h) przed pełnym przekazaniem
12. Przekazanie: dokumentacja powykonawcza, DTR, wykaz części zamiennych, szkolenie obsługi

---

# ZAŁĄCZNIK B — Karta kontrolna „STOP": pięć pytań przed zamknięciem wyłącznika

Zanim zamkniesz jakikolwiek wyłącznik SN, odpowiedz **na głos**:

1. **Czy wszystkie uziemienia robocze są usunięte i przeliczone?**
2. **Czy ktokolwiek może być w strefie zagrożenia?** (fizyczne sprawdzenie, nie założenie)
3. **Czy zabezpieczenia są aktywne, z prawidłowymi nastawami, a przekaźniki blokujące skasowane?**
4. **Czy stan łączników jest taki, jak zakładam?** (sprawdź pozycje, nie polegaj na pamięci)
5. **Czy mam potwierdzenie od dyspozytora / osoby kierującej czynnościami łączeniowymi?**

Jeśli którakolwiek odpowiedź brzmi „chyba tak" — **nie zamykaj**.

---

# ZAŁĄCZNIK C — Najgroźniejsze błędy przy przywracaniu napięcia

| Błąd | Skutek |
|---|---|
| **Pozostawiony uziemiacz przenośny** | zwarcie trójfazowe przy zamknięciu wyłącznika, zniszczenie rozdzielnicy, łuk |
| **Zamknięcie sprzęgła przy niezgodnych fazach** | zwarcie międzyfazowe |
| **Zabezpieczenia pozostawione „na próbach" lub wyłączone** | zwarcie bez wyłączenia, kaskada uszkodzeń |
| **Zapomniany mostek w obwodzie prądowym lub wyzwalającym** | brak wyzwolenia albo wyzwolenie zbędne |
| **Nastawy pozostawione próbne** | brak selektywności, zbędne wyłączenia |
| **Niezablokowana automatyka SZR podczas prac** | przełączenie zasilania na pracujący zespół |
| **Przekładniki napięciowe nieodizolowane przy próbach wtórnych** | pełne napięcie SN na szynach od strony wtórnej |
| **Brak sprawdzenia składowej zerowej napięcia po podaniu napięcia** | praca z niewykrytym zwarciem doziemnym, przepięcia |
| **Załączenie baterii kondensatorów przed rozładowaniem** | przepięcie, uszkodzenie ogniw i wyłącznika |
| **Załączenie wszystkiego naraz** | brak możliwości zlokalizowania problemu, kumulacja prądów włączania |
| **Skasowanie przekaźnika blokującego bez ustalenia przyczyny** | ponowne załączenie na uszkodzenie |

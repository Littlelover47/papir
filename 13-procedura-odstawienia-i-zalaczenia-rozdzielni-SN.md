# 13. Odstawienie rozdzielni SN i ponowne podanie napięcia — procedura od zera

Pełna sekwencja: od planowania, przez wyłączenie i zabezpieczenie, testy, aż do
kontrolowanego podania napięcia i przekazania do ruchu.

> **To jest wzorzec metodyczny, nie instrukcja gotowa do wykonania.** Każde odstawienie musi być
> prowadzone na podstawie **programu łączeń** i **polecenia na pracę** dla konkretnego obiektu,
> zgodnie z instrukcją eksploatacji, DTR i uzgodnieniem z OSD/dyspozytorem.

---

# FAZA 0 — PLANOWANIE (dni/tygodnie przed)

## 0.1 Ustalenie zakresu i skutków
- [ ] Co dokładnie jest odstawiane: cała rozdzielnica / jedna sekcja / jedno pole
- [ ] **Lista odbiorów, które stracą zasilanie** — z właścicielami procesów
- [ ] Odbiory krytyczne: UPS-y (czas autonomii!), pompy pożarowe, chłodzenie, serwerownie,
      oświetlenie awaryjne, systemy bezpieczeństwa
- [ ] Czy potrzeby własne stacji (AC do ładowarek DC) będą zasilone z innego źródła?
      **Utrata AC = odliczanie autonomii baterii DC = utrata zdolności wyłączania**
- [ ] Ogrzewanie antykondensacyjne rozdzielnicy — czy zostanie zasilone (wilgoć!)

## 0.2 Uzgodnienia i dokumenty
- [ ] **Wniosek o wyłączenie** do OSD / dyspozytora (terminy zgodne z IRiESD)
- [ ] **Program łączeń** — spisana, zaakceptowana kolejność czynności z numeracją
- [ ] **Polecenie na pracę** (pisemne), wyznaczone osoby funkcyjne
- [ ] **Ocena ryzyka** dla zadania + analiza łuku (kategoria ŚOI)
- [ ] **Plan LOTO** (Lock-Out / Tag-Out): lista punktów odcięcia, zamków, kłódek, tablic
- [ ] Plan awaryjny / **plan powrotu** (co robimy, jeśli nie zdążymy — kryterium *point of
      no return*, czyli moment, po którym nie da się szybko wrócić do ruchu)
- [ ] Powiadomienia: użytkownicy, ochrona, służby utrzymania, straż zakładowa
- [ ] Uzgodnienie **zmiany nastaw**, jeśli odstawienie zmienia układ (np. odstawienie NER/TRU
      lub praca z zamkniętym sprzęgłem — inne prądy zwarciowe i inna selektywność!)

## 0.3 Przygotowanie zasobów
- [ ] Skład zespołu, kwalifikacje (**E powyżej 1 kV**), badania lekarskie, szkolenia
- [ ] Sprzęt ochronny z aktualnymi badaniami: drążki, wskaźnik napięcia SN, uziemiacze przenośne
      (dobrane na prąd zwarciowy!), maty, rękawice, kaski z osłoną twarzy, **odzież łukoochronna**
- [ ] Kłódki LOTO, tablice ostrzegawcze, taśmy, barierki, ekrany izolacyjne
- [ ] Przyrządy pomiarowe z wzorcowaniem (lista w pliku `11`)
- [ ] Części zamienne: bezpieczniki WN i wtórne, uszczelki, smary wg DTR
- [ ] Sprzęt ppoż., apteczka, **AED**, łączność (radia), oświetlenie awaryjne/przenośne
- [ ] Dokumentacja na miejscu: schematy, DTR, karta nastaw, formularze protokołów

---

# FAZA 1 — PRZENIESIENIE OBCIĄŻENIA I WYŁĄCZENIE

## 1.1 Przygotowanie ruchowe
1. Potwierdź z dyspozytorem **gotowość i okno czasowe**.
2. Sprawdź stan układu: pozycje wszystkich łączników, obciążenia, napięcia, brak alarmów,
      **stan baterii DC** i ładowarki.
3. Sprawdź, że rezerwa jest **naprawdę dostępna** (nie tylko na schemacie): napięcie na
      rezerwowym zasilaniu, sprawność wyłącznika, brak blokad, brak 86.
4. **Zablokuj automatyki**, które mogłyby zadziałać w trakcie: **SZR/ATS**, **SPZ (79)**,
      automatyka ARN (jeśli wymagana zmiana), automatyczne przełączanie potrzeb własnych —
      i **zapisz to w rejestrze ingerencji**.

## 1.2 Przeniesienie obciążenia (jeśli możliwe)
Wariant A — **transfer zamknięty** (bez przerwy):
1. Sprawdź warunki 25 (ΔU, Δf, Δφ) i **zgodność faz** (napięcie różnicowe ≈ 0 V).
2. Zamknij sprzęgło → chwilowa praca równoległa.
3. Otwórz wyłącznik odstawianego zasilania.
4. Potwierdź, że obciążenie przeszło (odczyt prądów).
> Czas równoległości ograniczony; prądy zwarciowe w tym stanie są **wyższe** — upewnij się,
> że aparatura i nastawy to dopuszczają.

Wariant B — **transfer otwarty** (z przerwą):
1. Poinformuj użytkowników o przerwie, potwierdź gotowość.
2. Otwórz wyłącznik zasilania podstawowego.
3. Zamknij sprzęgło / zasilanie rezerwowe.
4. Sprawdź powrót napięcia i samorozruch odbiorów.

## 1.3 Wyłączanie odstawianego fragmentu — kolejność
```
1. Odpływy (od najmniejszych/najmniej krytycznych)  → wyłączniki pól FDR/TR/MTR
2. Sprawdź: prąd = 0 w każdym polu
3. Pole zasilające (INC)                            → wyłącznik
4. Pole punktu neutralnego (NER/TRU) — jeśli dotyczy → wyłącznik/odłącznik
5. Pole pomiaru napięcia (VT)                       → odłącznik/wtyk + wyjęcie bezpieczników WN
6. Odłączniki / wózki wszystkich pól                → pozycja OTWARTA (widoczna przerwa)
7. Zabezpieczenie przed załączeniem (LOTO)          → kłódki, tablice, wyjęcie cewek/wkładek
8. Sprawdzenie braku napięcia                       → wskaźnik SN, wszystkie fazy
9. Uziemienie                                       → uziemniki / uziemiacze przenośne
10. Wyznaczenie i oznakowanie strefy pracy
```

**Uwagi krytyczne:**
- Kolejność „odpływy → zasilanie" ogranicza prąd łączony i skutki błędu.
- **Odłącznikiem nigdy nie przerywaj prądu** — zawsze najpierw wyłącznik, potwierdzenie
  bezprądowości, potem odłącznik.
- **VT to źródło napięcia zwrotnego** — musi być odizolowane i uziemione.
- **Baterie kondensatorów** — odczekaj czas rozładowania z DTR (typowo 5–10 min), potem
  sprawdź brak napięcia i uziem każdą sekcję.
- **Kable odpływowe mogą być zasilone z drugiej strony** — uzgodnij i potwierdź wyłączenie
  oraz uziemienie po **obu** stronach; przy sieci pierścieniowej to obowiązek.
- **Transformatory SN/nn uziem po obu stronach** (zasilanie zwrotne od nn: agregat, PV, SZR nn).

## 1.4 Pięć zasad — realizacja na obiekcie
1. **Odłączenie całkowite** — widoczna przerwa we wszystkich biegunach, ze wszystkich stron
   (włącznie z VT, potrzebami własnymi, agregatem, PV).
2. **Zabezpieczenie przed załączeniem** — kłódki LOTO na napędach i wózkach, wyjęte wkładki
   i cewki, blokady kluczowe, tablice „NIE ZAŁĄCZAĆ — PRACA NA URZĄDZENIU",
   **zablokowane sterowanie zdalne** (przełącznik L/R w LOCAL + blokada w SCADA).
3. **Sprawdzenie braku napięcia** — wskaźnikiem SN właściwym dla napięcia, sprawdzonym
   **przed i po** pomiarze, **na wszystkich trzech fazach**, w miejscu pracy.
4. **Uziemienie i zwarcie** — uziemniki stacjonarne, a gdzie ich nie ma — uziemiacze przenośne:
   **najpierw zacisk uziemiający, potem fazy** (zdejmowanie odwrotnie).
5. **Zabezpieczenie części czynnych w pobliżu** — przegrody, ekrany, zamknięte przedziały
   pól czynnych, oznakowanie granic strefy pracy.

## 1.5 Dopuszczenie do pracy
Dopuszczający: potwierdza spełnienie warunków polecenia, **pokazuje zespołowi granice strefy**,
**udowadnia brak napięcia** (pomiar w obecności zespołu), wskazuje uziemienia i **części czynne
pozostające pod napięciem**, omawia zagrożenia. Kierujący zespołem przyjmuje strefę pracy.

---

# FAZA 2 — PRACE I TESTY (bez napięcia)

## 2.1 Czyszczenie, oględziny, mechanika
- [ ] Oględziny wszystkich przedziałów: ślady wyładowań, przegrzania, korozji, zawilgocenia,
      pęknięcia izolatorów, stan przepustów i uszczelnień
- [ ] Czyszczenie izolacji (środki dopuszczone przez producenta), osuszenie
- [ ] Kontrola i **dokręcenie połączeń śrubowych** momentem z DTR — **z protokołem**
- [ ] Smarowanie mechanizmów, kontrola napędów, wózków, prowadnic, styków wtykowych
      (stan posrebrzenia, smar stykowy)
- [ ] Kontrola przegród, blokad mechanicznych, zamków, kłódek
- [ ] Kontrola przepustów kablowych, uszczelnień ogniowych, drożności kanałów
- [ ] Kontrola grzałek, higrostatów, wentylacji, oświetlenia przedziałów
- [ ] Kontrola oznakowania pól, faz, schematów w rozdzielni

## 2.2 Pomiary i próby elementów
Szczegóły w pliku `11`, sekcja D. Skrót zakresu:
- [ ] Rezystancja izolacji szyn i pól: **megomierz 5 kV**, faza–ziemia i faza–faza
- [ ] **Próba napięciowa AC** (jeśli przewidziana): ~80 % napięcia znamionowego probierczego,
      1 min (dla 24 kV → ok. **40 kV**) — po próbie **rozładować i uziemić**
- [ ] Rezystancja styków wyłączników (µΩ), czasy Z/W, niejednoczesność biegunów
- [ ] Próżnia komór / ciśnienie SF₆
- [ ] Rezystancja i napięcie zadziałania cewek Z i W (test przy ~70 % U_n DC)
- [ ] CT: przekładnia, **polaryzacja**, izolacja, krzywa magnesowania
- [ ] VT: przekładnia, polaryzacja, izolacja, jeden punkt uziemienia, bezpieczniki
- [ ] **Ciągłość uziemienia** każdego przedziału i konstrukcji: **≤ 0,1 Ω** do szyny głównej
- [ ] **Rezystancja uziemienia stacji** i ocena napięć rażeniowych (PN-EN 50522)
- [ ] Kable SN: izolacja, **VLF/DAC**, tgδ, PD, ciągłość i zgodność faz, rezystancja ekranu
- [ ] Transformatory: izolacja uzwojeń, R uzwojeń, przekładnia, grupa połączeń, tgδ,
      badanie oleju (przebicie, wilgotność, **DGA**), sprawdzenie zabezpieczeń wewnętrznych
- [ ] Bateria DC: napięcie, rezystancja wewnętrzna ogniw, **test rozładowania/pojemności**,
      sprawność ładowarki, kontrola izolacji obwodów DC

## 2.3 Testy obwodów wtórnych i zabezpieczeń
Pełna metodyka w plikach `11` i `12`. Kolejność:
1. [ ] Kontrola **punkt-punkt** wszystkich obwodów
2. [ ] Testy **sekundarne** każdej funkcji zabezpieczeniowej (progi, czasy, kierunkowość)
3. [ ] Testy **pierwotne** (przekładnie i polaryzacja w kompletnym torze, strefy 87B)
4. [ ] **Próby funkcjonalne sterowania** (matryca z pliku `12`, sekcja D.1)
5. [ ] **Próby funkcjonalne blokad** — pełna macierz, każdy warunek osobno
6. [ ] **Próby automatyki**: ZSI, SZR (scenariusze!), 25, arc-flash, 50BF, ARN
7. [ ] **Komunikacja i SCADA**: każdy sygnał, GOOSE, timeouty, znaczniki czasu
8. [ ] **Test zintegrowany** na realnym torze do cewki wyłącznika

---

# FAZA 3 — CHECKLISTA PRZED PODANIEM NAPIĘCIA

**Nie podawaj napięcia, dopóki każdy punkt nie jest odhaczony i podpisany.**

## 3.1 Stan techniczny
- [ ] Wszystkie prace **zakończone**, zgłoszone i odebrane
- [ ] Przedziały czyste, **brak narzędzi, szmat, elementów luzem, zwarć montażowych**
- [ ] Wszystkie osłony, przegrody i pokrywy **zamontowane i dokręcone**
- [ ] Drzwi przedziałów zamknięte, blokady sprawne
- [ ] Protokoły pomiarów **kompletne, z wynikami pozytywnymi**
- [ ] Punch list: **brak usterek klasy A (blokujących)**; klasa B/C zaakceptowane pisemnie

## 3.2 Obwody wtórne i nastawy
- [ ] **Rejestr ingerencji tymczasowych WYZEROWANY** — wszystkie mostki usunięte, bezpieczniki
      wstawione, funkcje włączone, bloczki probiercze w pozycji pracy
- [ ] Nastawy **„as-left" zgodne z zatwierdzoną kartą** (wydruk porównany linia po linii)
- [ ] Wszystkie zabezpieczenia **w stanie aktywnym** (żadne nie „na testach")
- [ ] **86 zresetowane**, brak podtrzymanych alarmów
- [ ] Zasilanie DC obecne, napięcie w normie, **brak doziemienia DC**, ładowarka pracuje
- [ ] **TCS (nadzór obwodu wyłączającego) aktywny i bez alarmu**
- [ ] Wyłączniki: sprężyny zbrojone, sygnał „ready", ciśnienie SF₆ w normie
- [ ] Automatyki w wymaganym stanie (SZR — świadomie włączony lub wyłączony, **udokumentowane**)
- [ ] SCADA: **tryb test wyłączony**, alarmy odblokowane, sygnały widoczne u dyspozytora

## 3.3 Bezpieczeństwo
- [ ] Zespół **poza strefą**, narzędzia usunięte, ludzie przeliczeni
- [ ] **Wszystkie uziemienia robocze usunięte** — uziemniki otwarte, uziemiacze przenośne
      **zdjęte i przeliczone** (fizycznie sprawdź komplet — to najczęstsza przyczyna zwarcia
      przy podaniu napięcia)
- [ ] Kłódki LOTO zdjęte przez **te same osoby**, które je zakładały; tablice usunięte
- [ ] Strefa pracy **zlikwidowana przez dopuszczającego**, zgłoszenie do koordynującego
- [ ] Zakończenie pracy potwierdzone w polecenia; polecenie zamknięte
- [ ] Ogrodzenia usunięte, przejścia i drogi ewakuacyjne wolne
- [ ] Sprzęt ppoż. na miejscu, obsługa poinformowana
- [ ] Uzgodniona **łączność z dyspozytorem** i osoba kierująca czynnościami łączeniowymi

---

# FAZA 4 — PODANIE NAPIĘCIA (energizing)

## 4.1 Zasada: małymi krokami, z weryfikacją po każdym
Nigdy nie załączaj całej rozdzielnicy jedną komendą. Sekwencja:

```
KROK 1  Zamknij odłącznik / wsuń wózek pola zasilającego  → potwierdź pozycję
KROK 2  Załącz VT (odłącznik + bezpieczniki WN)           → przygotowanie pomiaru
KROK 3  Zamknij wyłącznik pola zasilającego (INC)         → NAPIĘCIE NA SZYNACH
        ↳ NASŁUCH: brak nietypowych dźwięków, zapachu, brak alarmów
KROK 4  WERYFIKACJA NAPIĘĆ (patrz 4.2) — zanim cokolwiek dalej
KROK 5  Załącz pole punktu neutralnego (NER/TRU)          → sieć nabiera charakteru
KROK 6  Odczekaj i obserwuj (10–15 min bez obciążenia)    → stabilizacja, kontrola
KROK 7  Załączaj odpływy POJEDYNCZO, od najmniejszych     → po każdym: prądy, symetria
KROK 8  Załączaj transformatory pojedynczo                → uwaga na prąd inrush
KROK 9  Przywracaj obciążenie stopniowo                   → kontrola po każdym stopniu
KROK 10 Przywróć normalny układ pracy i automatyki (SZR)  → udokumentuj
```

## 4.2 Weryfikacja bezpośrednio po podaniu napięcia na szyny — OBOWIĄZKOWO
- [ ] **Napięcia międzyfazowe** z pomiaru: symetryczne, wartość zgodna (np. 3 × ~20 kV)
- [ ] **Napięcia wtórne VT**: ~100 V lub 57,7 V, symetryczne
- [ ] **3U₀ ≈ 0 V** — brak doziemienia (jeśli nie, natychmiast wyłącz i szukaj przyczyny)
- [ ] **Kolejność faz** zgodna z wymaganą (wskaźnik kolejności faz)
- [ ] **Fazory w IED** — poprawne przypisanie faz U (a po obciążeniu również I)
- [ ] Brak alarmów: VTS/60, doziemienie, arc-flash, 86
- [ ] Odczyt w SCADA zgodny z odczytem lokalnym

## 4.3 Przed pierwszym zamknięciem sprzęgła — test krytyczny
Na **otwartym** wyłączniku sprzęgła zmierz **napięcie różnicowe** między sekcjami:
- **≈ 0 V** → fazy zgodne, można zamykać
- **napięcie międzyfazowe** → **fazy niezgodne**; zamknięcie = zwarcie międzyfazowe.
  Zatrzymaj się i wyjaśnij (kolejność faz kabla, przepięcia w mufie, zamiana żył).

Dodatkowo sprawdź działanie **25** (synchro-check) w warunkach rzeczywistych.

## 4.4 Załączanie transformatorów — na co uważać
- **Prąd inrush** (6–12 × I_n, zanikający w 0,1–0,3 s) nie może wyzwolić 50 — jeśli wyzwala,
  to błąd nastawy, nie „normalne zjawisko"
- Sprawdź **blokadę 2. harmoniczną** w 87T (jeśli występuje)
- Po załączeniu: brak nietypowego hałasu, kontrola temperatury, poziomu oleju,
  brak zadziałania Buchholza
- Załączaj transformatory **pojedynczo**, z odstępem

## 4.5 Testy możliwe tylko pod napięciem (patrz `11`, sekcja F)
- [ ] **Stabilność 87T / 87B** — prąd różnicowy przy rosnącym obciążeniu ≪ progu
- [ ] **Kierunkowość 67/67N** — zgodność z rzeczywistym przepływem mocy
- [ ] Poprawność **pomiarów i układu rozliczeniowego** (P, Q, cosφ, E)
- [ ] **Termowizja** po 1–2 h przy obciążeniu min. 40–60 %
- [ ] Symetria obciążenia faz, poziom harmonicznych, prąd w przewodzie N (strona nn)
- [ ] **Test SZR „na gorąco"** — tylko wg uzgodnionego scenariusza i z gotowością odbiorów

---

# FAZA 5 — PRZEKAZANIE DO RUCHU

- [ ] Wpis do **dziennika operacyjnego / książki ruchu**: czynności, czasy, osoby
- [ ] Zgłoszenie dyspozytorowi: **rozdzielnica w ruchu, układ normalny, automatyki w stanie X**
- [ ] Kompletacja dokumentacji: protokoły pomiarów i prób, karty nastaw „as-left",
      **schematy z naniesionymi zmianami (as-built)**, protokoły odbioru
- [ ] Aktualizacja **instrukcji eksploatacji**, jeśli zmienił się układ, nastawy lub automatyki
- [ ] Zamknięcie punch listy klasy B/C z terminami i odpowiedzialnymi
- [ ] Ustalenie **terminu następnych badań** i wpis do harmonogramu
- [ ] Krótki przegląd poawaryjny/powdrożeniowy z zespołem: co poszło nie tak, co poprawić

---

# ZAŁĄCZNIK A — Sekwencja dla obiektu NOWEGO („od zera", greenfield)

Dla rozdzielnicy nigdy wcześniej nieuruchamianej dochodzą etapy przed FAZĄ 2:

1. **FAT** (Factory Acceptance Test) u producenta: próby napięciowe, mechaniczne, funkcjonalne,
   sprawdzenie zgodności z projektem, próba łuku wewnętrznego (typowa dla typu)
2. **Odbiór dostawy na obiekcie**: kontrola uszkodzeń transportowych, kompletności,
   wskaźników udaru i wilgotności, zgodności tabliczek
3. **Montaż mechaniczny**: poziomowanie, kotwienie, łączenie sekcji, kontrola odstępów
4. **Podłączenie szyn i kabli** z kontrolą momentów; montaż głowic kablowych
5. **Instalacja uziemienia**: przyłączenie do siatki, pomiar ciągłości i rezystancji
6. **Podłączenie obwodów wtórnych** i systemu DC; uruchomienie ładowarki i baterii
7. **Parametryzacja IED**: wgranie konfiguracji, nastaw, plików 61850, synchronizacja czasu
8. → dalej jak **FAZA 2** i **FAZA 3**
9. **SAT** (Site Acceptance Test) z udziałem użytkownika — protokolarnie
10. **Pierwsze podanie napięcia** wg FAZY 4, zwykle z przedstawicielem producenta
11. **Okres obserwacji** (typowo 72 h) przed pełnym przekazaniem
12. Przekazanie: dokumentacja as-built, DTR, lista części zamiennych, szkolenie obsługi

---

# ZAŁĄCZNIK B — Karta kontrolna „STOP" (5 pytań przed zamknięciem wyłącznika)

Zanim zamkniesz jakikolwiek wyłącznik SN, odpowiedz na głos:

1. **Czy wszystkie uziemienia robocze są usunięte i przeliczone?**
2. **Czy ktokolwiek może być w strefie zagrożenia?** (fizyczne sprawdzenie, nie założenie)
3. **Czy zabezpieczenia są aktywne, z prawidłowymi nastawami, i czy 86 jest zresetowane?**
4. **Czy stan łączników jest taki, jak zakładam?** (sprawdź pozycje, nie pamięć)
5. **Czy mam potwierdzenie od dyspozytora / kierującego czynnościami łączeniowymi?**

Jeśli którakolwiek odpowiedź brzmi „chyba tak" — **nie zamykaj**.

---

# ZAŁĄCZNIK C — Najgroźniejsze błędy przy przywracaniu napięcia

| Błąd | Skutek |
|---|---|
| **Pozostawiony uziemiacz przenośny** | zwarcie trójfazowe przy zamknięciu wyłącznika, zniszczenie rozdzielnicy, łuk |
| **Zamknięcie sprzęgła przy niezgodnych fazach** | zwarcie międzyfazowe |
| **Zabezpieczenia „na testach" / wyłączone funkcje** | zwarcie bez wyłączenia, kaskada uszkodzeń |
| **Zapomniany mostek w obwodzie CT lub trip** | brak wyzwolenia albo zbędne wyzwolenie |
| **Nastawy pozostawione testowe** | brak selektywności, zbędne wyłączenia |
| **Niezablokowany SZR podczas prac** | przełączenie zasilania na pracujący zespół |
| **VT nieodizolowane przy próbach wtórnych** | napięcie SN na szynach z „bezpiecznej" strony |
| **Brak sprawdzenia 3U₀ po podaniu napięcia** | praca z niewykrytym doziemieniem, przepięcia |
| **Załączenie wszystkiego naraz** | brak możliwości zlokalizowania problemu, kumulacja inrush |
| **Reset 86 bez ustalenia przyczyny** | ponowne załączenie na uszkodzenie |

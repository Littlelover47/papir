# 12. Próby funkcjonalne układów sterowania i automatyki zabezpieczeniowej

Dokument opisuje **jak** wykonać próby funkcjonalne: zakres, kolejność, formularze,
kryteria zaliczenia i typowe pułapki.

---

## A. Czym są próby funkcjonalne i czym nie są

| Rodzaj próby | Co sprawdza | Czego NIE sprawdza |
|---|---|---|
| **Kontrola punkt-punkt** (*point-to-point*) | zgodność fizycznego okablowania ze schematem | czy logika ma sens |
| **Test elementu** | parametry aparatu (czas, rezystancja, próg) | współdziałanie |
| **Test sekundarny zabezpieczenia** | progi i czasy funkcji w IED | czy wyjście trafia do właściwego wyłącznika |
| **Próba funkcjonalna sterowania** | reakcja układu na komendy i stany: Z/W, L/R, blokady, sygnalizacja | dokładność nastaw |
| **Próba funkcjonalna automatyki** | logika SZR, ZSI, arc-flash, 25, ARN, 50BF | parametry pierwotne |
| **Test zintegrowany (*scheme / end-to-end*)** | cały tor: kryterium → logika → wyjście → cewka → wyłącznik → sygnał w SCADA | — |
| **SAT** | działanie w warunkach obiektowych z udziałem użytkownika | — |

**Zasada nadrzędna:** żadna z tych prób nie zastępuje pozostałych. Najwięcej poważnych błędów
(trip do złego wyłącznika, odwrócona blokada logiczna) wykrywa **wyłącznie test zintegrowany
na realnym torze**.

---

## B. Przygotowanie — bez tego nie zaczynaj

### B.1 Dokumenty
- [ ] schemat jednobiegunowy (aktualny, z rewizją)
- [ ] schematy obwodów wtórnych: prądowe, napięciowe, sterownicze, sygnalizacyjne, blokad
- [ ] **matryca wyzwalania (trip matrix)** — co wyłącza co
- [ ] **matryca blokad (interlock matrix)**
- [ ] karta nastaw zatwierdzona + plik konfiguracyjny IED
- [ ] lista sygnałów do SCADA (*I/O list*, *signal list*) z adresami
- [ ] DTR rozdzielnicy, wyłącznika, IED, napędu
- [ ] procedura testowa / *ITP* (Inspection & Test Plan) i formularze protokołów
- [ ] ocena ryzyka + LOTO plan + polecenie na pracę

### B.2 Warunki techniczne
- [ ] rozdzielnica **bez napięcia SN**, odłączona, uziemiona, strefa pracy wyznaczona
- [ ] **VT odizolowane** (wtyk/odłącznik otwarty, bezpieczniki pierwotne wyjęte)
- [ ] kable odpływowe odłączone lub uziemione po drugiej stronie
- [ ] zasilanie **DC** obecne i stabilne (bateria + ładowarka), zmierzone napięcie
- [ ] zasilanie **AC potrzeb własnych** obecne (grzałki, napędy, oświetlenie)
- [ ] SCADA/dyspozytor **poinformowany**, alarmy w **trybie test/blokada** (żeby nie generować
      fałszywych zgłoszeń), uzgodniony kanał łączności
- [ ] bloczki probiercze CT/VT zidentyfikowane i sprawne
- [ ] przyrządy z aktualnym wzorcowaniem
- [ ] zespół min. dwuosobowy, ŚOI, łączność

### B.3 Zasady prowadzenia testu
1. **Jedna zmiana w jednym czasie** — nie testuj przy równoległych pracach w tych samych obwodach.
2. **Czerwone kreślenie** schematów na bieżąco; każda rozbieżność → *punch list* z numerem.
3. **Rejestr tymczasowych ingerencji** (wyjęte bezpieczniki, zmostkowane zaciski, wyłączone
   funkcje, zablokowane wyjścia) — lista musi być **wyzerowana** przed zakończeniem.
   To najczęstsza przyczyna awarii po uruchomieniu: zapomniany mostek albo wyłączona funkcja.
4. **„As-found" / „as-left"** dla każdej nastawy i konfiguracji.
5. Podpis pod każdym punktem protokołu **w momencie wykonania**, nie zbiorczo na końcu.

---

## C. Etap 1 — kontrola punkt-punkt (point-to-point)

**Cel:** potwierdzić, że każdy przewód idzie tam, gdzie pokazuje schemat.

**Metoda:** dwie osoby z łącznością, brzęczyk/omomierz. Sprawdzenie **od zacisku do zacisku**,
z odhaczaniem na schemacie każdej sprawdzonej żyły.

**Zakres:**
- obwody CT: od zaciskόw przekładnika → bloczek probierczy → zaciski IED (z pomiarem rezystancji
  pętli, żeby wykryć luźny zacisk)
- obwody VT: analogicznie, z weryfikacją **jednego punktu uziemienia**
- obwody sterownicze: cewki Z i W, styki pomocnicze 52a/52b, blokady, przełącznik L/R
- obwody sygnalizacyjne: każde wejście binarne IED, każde wyjście przekaźnikowe
- obwody międzypolowe: blokady logiczne, arc-flash, 86, sygnały do sprzęgła
- obwody do obiektu: Buchholz, temperatury, presostat SF₆, uziemniki
- ekrany i uziemienia obwodów wtórnych (jednostronnie, przy IED lub w szafie — wg projektu)

**Kryterium:** 100 % żył sprawdzonych i odhaczonych. Brak „sprawdzone wyrywkowo".

---

## D. Etap 2 — próby funkcjonalne sterowania

### D.1 Sterowanie wyłącznikiem — matryca do przejścia

| Nr | Test | Oczekiwany rezultat |
|---|---|---|
| 1 | L/R = LOCAL, komenda ZAMKNIJ z panelu pola | wyłącznik zamyka się, sygnalizacja Z, 52a/52b zmieniają stan |
| 2 | L/R = LOCAL, komenda WYŁĄCZ z panelu | wyłącznik otwiera się |
| 3 | L/R = LOCAL, komenda z **SCADA** | **komenda odrzucona**, komunikat o braku uprawnienia |
| 4 | L/R = REMOTE, komenda z SCADA | wyłącznik reaguje |
| 5 | L/R = REMOTE, komenda z panelu pola | **odrzucona** (o ile projekt tak zakłada) |
| 6 | Komenda ZAMKNIJ przy zamkniętym uziemniku | **zablokowana** |
| 7 | Komenda ZAMKNIJ przy wózku w pozycji pośredniej | **zablokowana** |
| 8 | Komenda ZAMKNIJ przy braku zbrojenia sprężyny | **zablokowana**, sygnał „not ready" |
| 9 | Komenda ZAMKNIJ przy obniżonym ciśnieniu SF₆ (2. próg) | **zablokowana** |
| 10 | Komenda ZAMKNIJ przy zadziałanym 86 | **zablokowana** do ręcznego resetu |
| 11 | Ciągła komenda ZAMKNIJ + symulowany trip | **antypompowanie**: jedno zamknięcie, bez cyklowania |
| 12 | Wyzwalanie mechaniczne (przycisk awaryjny na napędzie) | wyłącznik otwiera się bez DC |
| 13 | Test przy obniżonym napięciu DC (do ~70 % U_n) | cewka wyłączająca **nadal działa** |
| 14 | Zanik DC podczas pracy | wyłącznik pozostaje w stanie, alarm „brak DC" |
| 15 | Wyzwalanie z TC1 i osobno z TC2 (jeśli dwie cewki) | każda cewka wyłącza samodzielnie |

### D.2 Sterowanie odłącznikiem / uziemnikiem / wózkiem
- ruch w obu kierunkach, potwierdzenie pozycji krańcowych
- **stan pośredni** musi być rozpoznany i zgłoszony jako „nieokreślony" (nie jako Z ani W)
- blokada operowania przy zamkniętym wyłączniku
- blokada uziemnika przy obecności napięcia (test z symulacją sygnału „live")
- blokada drzwi przedziału / kłódki, klucze zamków wzajemnych (Castell/Fortress) —
  sprawdź **fizycznie**, że klucz nie da się wyjąć/wstawić poza dozwoloną sekwencją

### D.3 Sygnalizacja i wskazania
- każda pozycja i alarm sprawdzony **na trzech poziomach**: lampka/HMI pola → sterownik stacji
  → SCADA (opis, priorytet, znacznik czasu)
- **spójność 52a/52b** — sprawdź stan nieokreślony przez odłączenie jednego styku
- sprawdzenie **znaczników czasu** (synchronizacja NTP/PTP) — rozjazd czasu psuje analizę awarii
- test **utraty komunikacji** (odłączenie kabla Ethernet) → alarm w SCADA, IED nadal chroni lokalnie

---

## E. Etap 3 — próby funkcjonalne automatyki

### E.1 Matryca wyzwalania (trip matrix) — najważniejszy test
Dla **każdego** kryterium zadziałania wywołaj je (wstrzykiem lub symulacją wejścia) i sprawdź
**pełną listę** skutków. Przykładowy wiersz:

| Kryterium | Wył. własny | Wył. nadrzędny | 86 | Blokada SZR | Sygnał SCADA | Zapis w rejestratorze |
|---|---|---|---|---|---|---|
| 50 pola FDR-3 | ✔ | — | — | — | ✔ „FDR-3 zwarcie" | ✔ |
| 87T trafo T1 | ✔ (SN i nn) | — | ✔ | ✔ | ✔ | ✔ |
| Buchholz przepływ | ✔ | — | ✔ | ✔ | ✔ | ✔ |
| Arc-flash sekcja A | ✔ INC-A | ✔ BC | ✔ | ✔ | ✔ | ✔ |
| 50BF pola FDR-3 | — | ✔ INC-A + BC | ✔ | ✔ | ✔ | ✔ |

**Kryterium zaliczenia:** każdy zaznaczony skutek **potwierdzony fizycznie**, każdy niezaznaczony
**potwierdzony jako nieaktywny** (brak zbędnych wyłączeń — to równie ważne).

### E.2 Blokada logiczna / ZSI
Dla **każdej pary** (pole odpływowe → pole zasilające):
1. Wstrzyk prądu zwarciowego w odpływie → sprawdź, że **sygnał blokady dociera** do INC
   (odczyt wejścia binarnego / GOOSE w IED zasilania)
2. Sprawdź, że INC **przechodzi na czas zwłoczny** (nie wyłącza bezzwłocznie)
3. Wstrzyk prądu **tylko w INC** (symulacja zwarcia na szynach, brak blokady) →
   INC wyłącza **bezzwłocznie** w zadanym czasie
4. **Przerwij tor blokady** (odłącz kabel / zatrzymaj publikację GOOSE) → sprawdź zachowanie:
   powinno przejść w stan **bezpieczny** (zwykle brak blokady = szybkie wyłączanie) + **alarm**
5. Zmierz **czas propagacji** blokady (dla GOOSE typowo < 5 ms; dla styków DC < 20 ms) —
   musi być krótszy od czasu zadziałania bezzwłocznego INC z marginesem

### E.3 SZR / ATS
Testuj **scenariuszami**, nie pojedynczymi sygnałami:

| Scenariusz | Oczekiwanie |
|---|---|
| Zanik U na sekcji A (symulacja 27 + brak prądu) | otwórz INC-A → potwierdź → zamknij BC → alarm |
| Zanik U + **zadziałane 87B** | **SZR zablokowany** (nie wolno przełączać na zwarcie) |
| Zanik U + **arc-flash** | SZR zablokowany |
| Zanik U + INC-A niesprawny (brak „ready") | SZR zablokowany, alarm |
| Zanik U + brak napięcia także na sekcji B | SZR nie działa (nie ma rezerwy), alarm |
| **Ręczne** wyłączenie INC-A przez operatora | SZR **nie startuje** (rozróżnienie operacji świadomej) |
| Powrót napięcia na sekcji A | powrót automatyczny (jeśli przewidziany) lub tylko sygnał gotowości |
| Powtórzenie zaniku po udanym SZR | **jednorazowość** — blokada powtórzenia do resetu |
| Test warunku 25 przy transferze zamkniętym | zamknięcie tylko przy spełnionych ΔU, Δf, Δφ |

**Zawsze zmierz czas całkowity przerwy** (od zaniku do zamknięcia BC) i porównaj z wymaganiem
procesowym (dla silników i UPS-ów to krytyczne).

### E.4 Synchro-check (25)
- test każdego warunku **osobno**: ΔU poza zakresem → blokada; Δf poza zakresem → blokada;
  Δφ poza zakresem → blokada
- test **dead bus / dead line** permissive (zamknięcie na martwe szyny dozwolone lub nie —
  zgodnie z projektem)
- test **utraty napięcia odniesienia** (VTS) → 25 musi zablokować, a nie zezwolić
- weryfikacja po podaniu napięcia: **napięcie różnicowe na otwartym sprzęgle ≈ 0 V**
  (potwierdza zgodność faz między sekcjami — bez tego zamknięcie sprzęgła to zwarcie międzyfazowe)

### E.5 Arc-flash
- pobudzenie **każdego** czujnika osobno (źródło światła) — potwierdź identyfikację przedziału
- test **koincydencji z kryterium prądowym**: samo światło → brak wyłączenia (lub wyłączenie,
  zależnie od koncepcji); światło + prąd → wyłączenie
- pomiar czasu: **detekcja** (1–7 ms) i **całkowity czas wyłączenia** (~50–60 ms)
- test **przez 86** (blokada załączenia po zadziałaniu)
- sprawdzenie odporności na oświetlenie zewnętrzne (latarka serwisowa, lampy) —
  brak fałszywych pobudzeń przy zamkniętych drzwiach

### E.6 50BF (breaker failure)
1. Wywołaj trip przy jednoczesnym **utrzymaniu prądu** (tester nie przestaje wstrzykiwać)
2. Po nastawionym czasie (150–250 ms) → wyłączenie **INC i/lub BC**
3. Sprawdź kryterium pozycyjne (styk 52a nie zmienił stanu) niezależnie od prądowego
4. Sprawdź **blokadę SZR** i sygnał do SCADA

### E.7 ARN / regulator zaczepów (jeśli występuje)
- ruch zaczepów w górę/dół, wskazanie pozycji, krańcówki
- reakcja na odchyłkę napięcia: strefa nieczułości, opóźnienie, kolejne kroki
- blokady: nadprądowa, podnapięciowa (brak regulacji przy zaniku), skrajne pozycje
- praca równoległa: master/follower lub metoda prądu krążącego — test rozjazdu zaczepów
- tryb ręczny/automatyczny, sterowanie lokalne i zdalne

### E.8 Komunikacja i IEC 61850
- import/eksport SCD, weryfikacja subskrypcji **każdego** GOOSE (publisher → subscriber)
- pomiar czasu propagacji GOOSE
- test **GOOSE timeout**: zatrzymaj publikację → sprawdź zdefiniowaną reakcję + alarm
- test redundancji sieci (PRP/HSR/RSTP): odłącz jeden link → brak utraty funkcji
- test sterowania z SCADA z **select-before-operate**, kontrolą uprawnień i logowaniem operacji
- weryfikacja **kompletności listy sygnałów** — punkt po punkcie z I/O listy

---

## F. Etap 4 — test zintegrowany na realnym torze

**Warunek:** wszystkie tymczasowe ingerencje usunięte, bloczki probiercze wstawione,
funkcje włączone, nastawy „as-left" zgodne z kartą.

**Zakres:** dla wybranego, reprezentatywnego zestawu kryteriów (min. jedno na każdy typ:
nadprądowe, ziemnozwarciowe, różnicowe, wejście od obiektu, arc-flash, 50BF) wywołaj
zadziałanie i potwierdź **fizyczne otwarcie wyłącznika** oraz kompletność sygnalizacji.

**To jedyny test, który potwierdza, że tor `kryterium → logika → styk → cewka → wyłącznik`
jest ciągły.** Testy z odizolowanym wyjściem tego nie dowodzą.

---

## G. Formularz protokołu próby funkcjonalnej (wzór)

```
OBIEKT: ..................  POLE: ..........  IED: typ ......... nr ......... FW .........
SCHEMATY: nr ......... rew. ......   KARTA NASTAW: nr ......... rew. ......
DATA: ..........  ZESPÓŁ: ..........................  NR POLECENIA: ..........

WARUNKI WSTĘPNE                                                     [ ] potwierdzone
  Rozdzielnica bez napięcia, uziemiona, strefa pracy wyznaczona     [ ]
  VT odizolowane, bezpieczniki pierwotne wyjęte                     [ ]
  Napięcie DC zmierzone: ........ V                                 [ ]
  SCADA w trybie test / dyspozytor powiadomiony                     [ ]

PRZYRZĄDY
  ......................  nr ..........  wzorcowanie do ..........

TESTY
 Nr | Opis testu | Kryterium | Wynik zmierzony | OK/NOK | Podpis
 ---+------------+-----------+-----------------+--------+-------
  1 |            |           |                 |        |

REJESTR INGERENCJI TYMCZASOWYCH (musi być wyzerowany!)
 Nr | Co | Kto założył | Kto usunął | Data/godz.
 ---+----+-------------+------------+-----------

USTERKI (PUNCH LIST)
 Nr | Opis | Klasa (A blokująca / B przed odbiorem / C drobna) | Status

NASTAWY: as-found załączone [ ]   as-left załączone [ ]
WNIOSEK:  Pole zdatne do załączenia:  TAK / NIE / z ograniczeniami: ..............

Wykonał: ..............  Sprawdził (dozór): ..............  Użytkownik/OSD: ..............
```

---

## H. Pułapki, które kosztują najwięcej

1. **Zapomniany mostek / wyjęty bezpiecznik / wyłączona funkcja** — dlatego rejestr ingerencji
   jest obowiązkowy i musi być formalnie wyzerowany.
2. **Testowanie z odizolowanym wyjściem i uznanie tego za komplet** — brak dowodu na ciągłość
   toru do cewki.
3. **Brak testu „braku zadziałania"** — sprawdzasz, że coś działa, ale nie że nie działa zbędnie.
4. **Blokada logiczna sprawdzona tylko dla jednego pola** — pozostałe pary nieprzetestowane.
5. **SZR testowany sygnałami, nie scenariuszami** — nie wykrywa braku blokady od 87B.
6. **Brak weryfikacji zgodności faz między sekcjami** przed pierwszym zamknięciem sprzęgła.
7. **Nastawy zmienione „na czas testu" i niepowrócone** — porównanie as-found/as-left to wykrywa.
8. **VT nieodizolowane przy wstrzyku napięcia** → napięcie SN na szynach od strony wtórnej.
9. **Alarmy niezablokowane w SCADA** → lawina fałszywych zgłoszeń, utrata zaufania do sygnalizacji,
   a potem realny alarm zignorowany.
10. **Brak synchronizacji czasu** — analiza kolejności zdarzeń niemożliwa.

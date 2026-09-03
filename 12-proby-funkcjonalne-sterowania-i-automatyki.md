# 12. Próby funkcjonalne układów sterowania i automatyki zabezpieczeniowej

Dokument opisuje **jak** wykonać próby funkcjonalne: zakres, kolejność, formularze,
kryteria zaliczenia i typowe pułapki.

---

## A. Czym są próby funkcjonalne i czym nie są

| Rodzaj próby | Co sprawdza | Czego NIE sprawdza |
|---|---|---|
| **Kontrola zacisk–zacisk** (żyła po żyle) | zgodność fizycznego okablowania ze schematem | czy logika ma sens |
| **Badanie elementu** | parametry aparatu (czas, rezystancja, próg) | współdziałanie elementów |
| **Próba zabezpieczenia prądem wtórnym** | progi i czasy funkcji w zabezpieczeniu | czy wyjście trafia do właściwego wyłącznika |
| **Próba funkcjonalna sterowania** | reakcja układu na komendy i stany: załącz/wyłącz, sterowanie miejscowe/zdalne, blokady, sygnalizacja | dokładność nastaw |
| **Próba funkcjonalna automatyki** | logikę: automatyka SZR, blokada logiczna, łukoochronne, synchronizm, regulacja napięcia, rezerwowanie wyłącznika | parametry pierwotne |
| **Próba zintegrowana** (na rzeczywistym torze) | cały tor: kryterium → logika → wyjście → cewka → wyłącznik → sygnał w systemie nadzoru | — |
| **Odbiór na obiekcie** | działanie w warunkach rzeczywistych, z udziałem użytkownika | — |

**Zasada nadrzędna:** żadna z tych prób nie zastępuje pozostałych. Najpoważniejsze błędy
(wyzwolenie skierowane do złego wyłącznika, odwrócona blokada logiczna) wykrywa **wyłącznie
próba zintegrowana na rzeczywistym torze**.

---

## B. Przygotowanie — bez tego nie zaczynaj

### B.1 Dokumenty
- [ ] schemat jednobiegunowy (aktualny, z numerem rewizji)
- [ ] schematy obwodów wtórnych: prądowych, napięciowych, sterowniczych, sygnalizacyjnych, blokad
- [ ] **macierz wyzwalania** — co wyłącza co
- [ ] **macierz blokad**
- [ ] karta nastaw zatwierdzona + plik konfiguracyjny zabezpieczeń
- [ ] wykaz sygnałów przesyłanych do systemu nadzoru, z adresami
- [ ] DTR: rozdzielnicy, wyłącznika, zabezpieczeń, napędu
- [ ] **plan prób i badań** oraz formularze protokołów
- [ ] ocena ryzyka, plan blokad i oznakowania, polecenie na pracę

### B.2 Warunki techniczne
- [ ] rozdzielnica **bez napięcia SN**, odłączona, uziemiona, strefa pracy wyznaczona
- [ ] **przekładniki napięciowe odizolowane** (odłącznik otwarty, bezpieczniki pierwotne wyjęte)
- [ ] kable odpływowe odłączone albo uziemione po drugiej stronie
- [ ] zasilanie **prądem stałym** obecne i stabilne (bateria + ładowarka), napięcie zmierzone
- [ ] zasilanie **potrzeb własnych** obecne (ogrzewanie, napędy, oświetlenie)
- [ ] dyspozytor **powiadomiony**, alarmy w systemie nadzoru **zablokowane / tryb próbny**,
      uzgodniony kanał łączności
- [ ] bloczki probiercze zidentyfikowane i sprawne
- [ ] przyrządy z aktualnym wzorcowaniem
- [ ] zespół co najmniej dwuosobowy, środki ochrony indywidualnej, łączność

### B.3 Zasady prowadzenia prób
1. **Jedna zmiana w jednym czasie** — nie badaj przy równoległych pracach w tych samych obwodach.
2. **Nanoszenie zmian na schematach** na bieżąco; każda rozbieżność → **lista usterek** z numerem.
3. **Rejestr ingerencji tymczasowych** (wyjęte bezpieczniki, zmostkowane zaciski, wyłączone
   funkcje, odizolowane wyjścia) — lista musi być **wyzerowana** przed zakończeniem.
   To najczęstsza przyczyna awarii po uruchomieniu: zapomniany mostek albo wyłączona funkcja.
4. **Stan zastany / stan pozostawiony** zapisany dla każdej nastawy i konfiguracji.
5. Podpis pod każdym punktem protokołu **w chwili wykonania**, nie zbiorczo na końcu.

---

## C. Etap 1 — kontrola zacisk–zacisk

**Cel:** potwierdzić, że każdy przewód idzie tam, gdzie pokazuje schemat.

**Metoda:** dwie osoby z łącznością, brzęczyk lub omomierz. Sprawdzenie **od zacisku do
zacisku**, z odhaczaniem każdej sprawdzonej żyły na schemacie.

**Zakres:**
- obwody prądowe: od zacisków przekładnika → bloczek probierczy → zaciski zabezpieczenia,
  z pomiarem rezystancji pętli (wykrywa luźny zacisk)
- obwody napięciowe: analogicznie, z weryfikacją **uziemienia w jednym punkcie**
- obwody sterownicze: cewki załączająca i wyłączająca, styki pomocnicze wyłącznika, blokady,
  przełącznik sterowania miejscowego/zdalnego
- obwody sygnalizacyjne: każde wejście dwustanowe i każde wyjście przekaźnikowe
- obwody międzypolowe: blokada logiczna, zabezpieczenie łukoochronne, przekaźnik blokujący,
  sygnały do sprzęgła
- obwody do obiektu: przekaźnik Buchholza, czujniki temperatury, czujnik ciśnienia SF₆, uziemniki
- ekrany i uziemienia obwodów wtórnych (jednostronnie — wg projektu)

**Kryterium:** 100 % żył sprawdzonych i odhaczonych. Nie ma pojęcia „sprawdzone wyrywkowo".

---

## D. Etap 2 — próby funkcjonalne sterowania

### D.1 Sterowanie wyłącznikiem — macierz do przejścia

| Nr | Próba | Oczekiwany wynik |
|---|---|---|
| 1 | Sterowanie **miejscowe**, komenda ZAŁĄCZ z panelu pola | wyłącznik zamyka się, sygnalizacja poprawna, oba styki pomocnicze zmieniają stan |
| 2 | Sterowanie **miejscowe**, komenda WYŁĄCZ z panelu | wyłącznik otwiera się |
| 3 | Sterowanie **miejscowe**, komenda **zdalna** | **komenda odrzucona**, komunikat o braku uprawnienia |
| 4 | Sterowanie **zdalne**, komenda z systemu nadzoru | wyłącznik reaguje |
| 5 | Sterowanie **zdalne**, komenda z panelu pola | **odrzucona** (jeśli tak zakłada projekt) |
| 6 | Komenda ZAŁĄCZ przy **zamkniętym uziemniku** | **zablokowana** |
| 7 | Komenda ZAŁĄCZ przy wózku w **pozycji pośredniej** | **zablokowana** |
| 8 | Komenda ZAŁĄCZ przy **niezbrojonej sprężynie** | **zablokowana**, sygnał „wyłącznik niegotowy" |
| 9 | Komenda ZAŁĄCZ przy obniżonym **ciśnieniu SF₆** (drugi próg) | **zablokowana** |
| 10 | Komenda ZAŁĄCZ przy zadziałanym **przekaźniku blokującym** | **zablokowana** do ręcznego skasowania |
| 11 | Ciągła komenda ZAŁĄCZ + symulowane wyzwolenie | **blokada przeciwpompująca**: jedno zamknięcie, bez powtarzania cyklu |
| 12 | Wyzwolenie **mechaniczne** (przycisk na napędzie) | wyłącznik otwiera się bez zasilania prądem stałym |
| 13 | Próba przy **obniżonym napięciu prądu stałego** (do ~70 %) | cewka wyłączająca **nadal działa** |
| 14 | **Zanik zasilania prądem stałym** podczas pracy | wyłącznik pozostaje w swoim stanie, alarm |
| 15 | Wyzwolenie osobno z **pierwszej i drugiej cewki** (jeśli są dwie) | każda cewka wyłącza samodzielnie |

### D.2 Sterowanie odłącznikiem, uziemnikiem i wózkiem
- ruch w obu kierunkach, potwierdzenie pozycji krańcowych
- **stan pośredni** musi być rozpoznany i zgłoszony jako „nieokreślony" — nie jako załączony
  ani wyłączony
- blokada operowania przy zamkniętym wyłączniku
- blokada uziemnika przy obecności napięcia (próba z symulacją sygnału obecności napięcia)
- blokady drzwi przedziału, kłódki, **zamki na klucze wzajemne** — sprawdź **fizycznie**,
  że klucza nie da się wyjąć ani wstawić poza dozwoloną kolejnością

### D.3 Sygnalizacja i wskazania
- każda pozycja i każdy sygnał sprawdzony **na trzech poziomach**: lampka lub panel pola →
  sterownik stacji → system nadzoru (opis, priorytet, znacznik czasu)
- **spójność obu styków pomocniczych** — sprawdź stan nieokreślony przez odłączenie jednego styku
- sprawdzenie **znaczników czasu** i synchronizacji czasu — rozjazd zegarów uniemożliwia
  późniejszą analizę awarii
- próba **utraty łączności** (odłączenie kabla sieciowego) → alarm w systemie nadzoru,
  a zabezpieczenie **nadal chroni miejscowo**

---

## E. Etap 3 — próby funkcjonalne automatyki

### E.1 Macierz wyzwalania — najważniejsza próba
Dla **każdego** kryterium zadziałania wywołaj je (prądem probierczym lub symulacją wejścia)
i sprawdź **pełną listę skutków**. Przykład:

| Kryterium | Wył. własny | Wył. nadrzędny | Przekaźnik blokujący | Blokada SZR | Sygnał w nadzorze | Zapis w rejestratorze |
|---|---|---|---|---|---|---|
| Nadprądowe bezzwłoczne pola odpływowego nr 3 | ✔ | — | — | — | ✔ | ✔ |
| Różnicowe transformatora T1 | ✔ (SN i nn) | — | ✔ | ✔ | ✔ | ✔ |
| Przekaźnik Buchholza — przepływ | ✔ | — | ✔ | ✔ | ✔ | ✔ |
| Łukoochronne sekcji A | ✔ zasilanie A | ✔ sprzęgło | ✔ | ✔ | ✔ | ✔ |
| Rezerwowanie wyłącznika pola nr 3 | — | ✔ zasilanie + sprzęgło | ✔ | ✔ | ✔ | ✔ |
| Od niezrównoważenia baterii kondensatorów | ✔ | — | ✔ | — | ✔ | ✔ |

**Kryterium zaliczenia:** każdy zaznaczony skutek **potwierdzony fizycznie**, a każdy
niezaznaczony **potwierdzony jako nieaktywny**. Brak zbędnych wyłączeń jest równie ważny
jak obecność właściwych.

### E.2 Blokada logiczna zabezpieczeń
Dla **każdej pary** (pole odpływowe → pole zasilające):
1. Podaj prąd zwarciowy w polu odpływowym → sprawdź, że **sygnał blokady dociera** do pola
   zasilającego (odczyt wejścia w zabezpieczeniu)
2. Sprawdź, że pole zasilające **przechodzi na czas zwłoczny** (nie wyłącza bezzwłocznie)
3. Podaj prąd **tylko w polu zasilającym** (symulacja zwarcia na szynach, brak blokady) →
   pole zasilające wyłącza **bezzwłocznie**
4. **Przerwij tor blokady** (odłącz przewód lub zatrzymaj nadawanie komunikatów) → sprawdź,
   że układ przechodzi w stan **bezpieczny** (zwykle brak blokady = szybkie wyłączanie)
   **i zgłasza alarm**
5. Zmierz **czas przesłania** blokady — musi być krótszy od czasu bezzwłocznego zadziałania
   pola zasilającego, z marginesem (typowo < 5 ms dla komunikatów cyfrowych, < 20 ms dla styków)

### E.3 Automatyka SZR — badaj scenariuszami, nie sygnałami

| Scenariusz | Oczekiwanie |
|---|---|
| Zanik napięcia na sekcji A (symulacja podnapięcia + brak prądu) | otwórz zasilanie A → potwierdź → zamknij sprzęgło → sygnał |
| Zanik napięcia **+ zadziałane różnicowe szyn** | **automatyka zablokowana** — nie wolno przełączać na zwarcie |
| Zanik napięcia **+ zadziałane łukoochronne** | automatyka zablokowana |
| Zanik napięcia + wyłącznik zasilania niesprawny (brak sygnału „gotowy") | automatyka zablokowana, alarm |
| Zanik napięcia także na sekcji B | automatyka nie działa (brak rezerwy), alarm |
| **Ręczne** wyłączenie zasilania A przez operatora | automatyka **nie startuje** — rozróżnienie świadomej operacji |
| Powrót napięcia na sekcji A | powrót samoczynny (jeśli przewidziany) albo tylko sygnał gotowości |
| Powtórny zanik po udanym przełączeniu | **jednorazowość** — blokada powtórzenia do skasowania |
| Przełączenie bez przerwy (przez pracę równoległą) | zamknięcie **tylko** przy spełnionych warunkach kontroli synchronizmu |

**Zawsze zmierz całkowity czas przerwy** (od zaniku do zamknięcia sprzęgła) i porównaj
z wymaganiem procesowym — dla silników i zasilaczy bezprzerwowych jest to krytyczne.

### E.4 Kontrola synchronizmu
- badaj **każdy warunek osobno**: różnica napięć poza zakresem → blokada; różnica częstotliwości
  poza zakresem → blokada; różnica kątów poza zakresem → blokada
- badaj **zezwolenia przy braku napięcia** na jednej ze stron (zgodnie z projektem: dozwolone
  lub nie)
- badaj **utratę napięcia odniesienia** → kontrola synchronizmu musi **zablokować**, nie zezwolić
- weryfikacja po podaniu napięcia: **napięcie różnicowe na otwartym sprzęgle ≈ 0 V** —
  bez tego zamknięcie sprzęgła oznacza zwarcie międzyfazowe

### E.5 Zabezpieczenie łukoochronne
- pobudź **każdy czujnik osobno** źródłem światła — potwierdź identyfikację przedziału
- sprawdź **koincydencję z kryterium prądowym**: samo światło → zgodnie z przyjętą koncepcją;
  światło razem z prądem → wyłączenie
- zmierz **czas wykrycia** (1–7 ms) i **całkowity czas wyłączenia** (~50–60 ms)
- sprawdź działanie **przez przekaźnik blokujący**
- sprawdź odporność na oświetlenie zewnętrzne (latarka serwisowa, lampy) — brak fałszywych
  pobudzeń przy zamkniętych drzwiach

### E.6 Lokalne rezerwowanie wyłącznika
1. Wywołaj wyzwolenie przy **utrzymanym prądzie** (przyrząd nie przerywa podawania)
2. Po nastawionym czasie (150–250 ms) → wyłączenie **pola zasilającego i/lub sprzęgła**
3. Sprawdź **kryterium pozycyjne** (styk pomocniczy nie zmienił stanu) niezależnie od prądowego
4. Sprawdź **blokadę automatyki SZR** i sygnał do systemu nadzoru

### E.7 Automatyczna regulacja napięcia (przełącznik zaczepów)
- ruch zaczepów w górę i w dół, wskazanie pozycji, wyłączniki krańcowe
- reakcja na odchyłkę napięcia: strefa nieczułości, opóźnienie, kolejne kroki
- blokady: nadprądowa, podnapięciowa (brak regulacji przy zaniku), skrajne pozycje
- praca równoległa: układ nadrzędny/podrzędny albo metoda prądu krążącego — próba rozjazdu zaczepów
- tryb ręczny i samoczynny, sterowanie miejscowe i zdalne

### E.8 Łączność i komunikacja międzypolowa
- weryfikacja przypisania **nadawca → odbiorca** dla każdego szybkiego komunikatu
- pomiar **czasu przesłania**
- próba **utraty nadawania**: zatrzymaj publikację → sprawdź zdefiniowaną reakcję i alarm
- próba **redundancji sieci**: odłącz jeden łącze → brak utraty funkcji
- sterowanie z systemu nadzoru z **potwierdzeniem wyboru przed wykonaniem**, kontrolą uprawnień
  i zapisem operacji
- weryfikacja **kompletności wykazu sygnałów** — punkt po punkcie

---

## F. Etap 4 — próba zintegrowana na rzeczywistym torze

**Warunek:** wszystkie ingerencje tymczasowe usunięte, bloczki probiercze wstawione,
funkcje włączone, nastawy stanu pozostawionego zgodne z kartą.

**Zakres:** dla reprezentatywnego zestawu kryteriów (co najmniej po jednym z każdego rodzaju:
nadprądowe, ziemnozwarciowe, różnicowe, sygnał z obiektu, łukoochronne, rezerwowanie wyłącznika)
wywołaj zadziałanie i potwierdź **fizyczne otwarcie wyłącznika** oraz kompletność sygnalizacji.

**To jedyna próba potwierdzająca ciągłość toru:**
`kryterium → logika → styk → cewka → wyłącznik`.
Próby z odizolowanym wyjściem tego nie dowodzą.

---

## G. Formularz protokołu próby funkcjonalnej (wzór)

```
OBIEKT: ..................  POLE: ..........
ZABEZPIECZENIE: typ ......... nr ......... wersja oprogramowania .........
SCHEMATY: nr ......... rew. ......   KARTA NASTAW: nr ......... rew. ......
DATA: ..........  ZESPÓŁ: ..........................  NR POLECENIA: ..........

WARUNKI WSTĘPNE                                                      potwierdzone
  Rozdzielnica bez napięcia, uziemiona, strefa pracy wyznaczona          [ ]
  Przekładniki napięciowe odizolowane, bezpieczniki pierwotne wyjęte     [ ]
  Napięcie prądu stałego zmierzone: ........ V                           [ ]
  Dyspozytor powiadomiony, alarmy zablokowane                            [ ]

PRZYRZĄDY
  ......................  nr ..........  wzorcowanie do ..........

PRÓBY
 Nr | Opis próby | Kryterium | Wartość zmierzona | Wynik | Podpis
 ---+------------+-----------+-------------------+-------+-------
  1 |            |           |                   |       |

REJESTR INGERENCJI TYMCZASOWYCH (musi być wyzerowany!)
 Nr | Co | Kto założył | Kto usunął | Data i godzina
 ---+----+-------------+------------+---------------

LISTA USTEREK
 Nr | Opis | Klasa (A blokująca / B przed odbiorem / C drobna) | Stan

NASTAWY:  stan zastany załączony [ ]    stan pozostawiony załączony [ ]
WNIOSEK:  Pole zdatne do załączenia:  TAK / NIE / z ograniczeniami: ..............

Wykonał: ..............  Sprawdził (dozór): ..............  Użytkownik: ..............
```

---

## H. Pułapki, które kosztują najwięcej

1. **Zapomniany mostek, wyjęty bezpiecznik albo wyłączona funkcja** — dlatego rejestr ingerencji
   jest obowiązkowy i musi być formalnie wyzerowany.
2. **Badanie z odizolowanym wyjściem uznane za komplet** — brak dowodu ciągłości toru do cewki.
3. **Brak próby „nie powinno zadziałać"** — sprawdzasz, że coś działa, ale nie że nie działa zbędnie.
4. **Blokada logiczna sprawdzona tylko dla jednego pola** — pozostałe pary niesprawdzone.
5. **Automatyka SZR badana sygnałami, nie scenariuszami** — nie wykrywa braku blokady od
   zabezpieczenia różnicowego szyn.
6. **Brak weryfikacji zgodności faz między sekcjami** przed pierwszym zamknięciem sprzęgła.
7. **Nastawy zmienione „na czas próby" i niepowrócone** — porównanie stanu zastanego
   z pozostawionym to wykrywa.
8. **Przekładniki napięciowe nieodizolowane przy podawaniu napięcia** → pełne napięcie SN
   na szynach od strony wtórnej.
9. **Alarmy niezablokowane w systemie nadzoru** → lawina fałszywych zgłoszeń, utrata zaufania
   do sygnalizacji, a potem zignorowany alarm rzeczywisty.
10. **Brak synchronizacji czasu** — analiza kolejności zdarzeń po awarii staje się niemożliwa.

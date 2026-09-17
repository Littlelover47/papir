# 14. ZS — zabezpieczenie szyn. Jak to zrozumieć w 10 minut

Rozdział jest po to, żeby „schemat logiczny automatyki ZS” przestał być zbiorem prostokątów.
Najpierw **jedno zdanie**, potem **analogia**, potem **bramka AND i pełny opis blokady ZS**
(czym jest sygnał, jakim torem idzie, co blokuje), potem **symulacja całej rozdzielni**,
na końcu **liczby na egzamin**.

> **Pamiętaj.** Całe ZS streszcza się w jednym zdaniu:
> **żaden odpływ się nie zgłosił → zwarcie jest na szynach → pole zasilające wyłącza natychmiast.**
> Jeśli zapamiętasz tylko to, zrozumiesz każdy schemat ZS, jaki zobaczysz.

---

## A. Skąd w ogóle problem — paradoks kaskady czasowej

W klasycznej rozdzielni czasy dobiera się stopniami, żeby wyłączało tylko to pole, w którym
jest zwarcie (selektywność):

```
  Transformator WN/SN
        │
   [pole zasilające]   I> = 0,8 s        ← najdłuższy czas
        │
   ═════╪═════════════ SZYNY ZBIORCZE ═════════════
        │              │              │
   [odpływ 1]     [odpływ 2]     [odpływ 3]   I> = 0,5 s
        │
   trafo SN/nn → rozdzielnica nn        I> = 0,2 s
```

Zauważ, co z tego wychodzi. Zwarcie **na szynach** widzi tylko jedno zabezpieczenie —
w polu zasilającym. A ono ma **najdłuższy** czas. Czyli:

| Miejsce zwarcia | Kto wyłącza | Po jakim czasie |
|---|---|---|
| Rozdzielnica nn | zabezpieczenie nn | 0,2 s |
| Kabel odpływowy | pole odpływowe | 0,5 s |
| **Szyny zbiorcze** | **pole zasilające** | **0,8 s** ← najgorzej |

**Paradoks:** najbardziej energetyczne miejsce w całej stacji (goła szyna, pełny prąd zwarciowy,
ryzyko łuku i rozerwania przedziału) jest wyłączane **najpóźniej**. Energia łuku rośnie liniowo
z czasem, więc 0,8 s zamiast 0,05 s to różnica między „przepaloną szyną” a „rozwaloną celką”.

Są dwa sposoby, żeby to naprawić:

1. **Zabezpieczenie różnicowe szyn** — pewne, szybkie, ale **drogie** (przekładniki we wszystkich
   polach, dobrane przekładnie i klasy, przypisanie stref).
2. **ZS / blokada logiczna** — prawie darmowe, bo używa zabezpieczeń, które **już są** w polach.
   To jest temat tego rozdziału.

---

## B. Analogia, po której już tego nie zapomnisz

Wyobraź sobie nauczyciela w pokoju nauczycielskim (**pole zasilające**) i trzy klasy na
korytarzu (**pola odpływowe**). Rozlega się brzdęk tłuczonego szkła.

Nauczyciel **nie wie**, gdzie pękła szyba — słyszy tylko hałas (widzi prąd zwarciowy, ale nie wie,
czy płynie do odpływu, czy leje się na szyny). Więc czeka **chwilę** na zgłoszenia:

- **Któraś klasa podnosi rękę:** „to u nas!” → nauczyciel **nic nie robi**, klasa sama sobie
  poradzi (odpływ wyłączy swoim wyłącznikiem po 0,5 s). Nauczyciel zostaje tylko **rezerwą** —
  jeśli klasa nie da rady, wejdzie po swoim normalnym czasie 0,8 s.
- **Nikt nie podnosi ręki:** → skoro żadna klasa nie ma problemu, **szyba pękła na korytarzu**
  (zwarcie na szynach). Nauczyciel działa **sam i natychmiast** — 40–100 ms.

To „podniesienie ręki” to właśnie sygnał **BL_ZS** — *blokada zabezpieczenia szyn*.
I tu jest pułapka nazwy, na której wszyscy się wywracają:

> **Uwaga na nazwę.** „Blokada” nie blokuje zwarcia. **Blokada blokuje zabezpieczenie ZS
> w polu zasilającym.** Odpływ mówi: „spokojnie, to moje zwarcie, nie wal w szyny”.
> Sygnał blokady = **dobra wiadomość**. Cisza = **alarm**.

Dlatego logika jest odwrócona w stosunku do intuicji: **brak sygnału jest sygnałem.**

---

## C. Symulator 1 — bramka „AND” i sygnał BL_ZS

To dokładnie ten prostokąt ze schematu logicznego pola odpływowego. Cztery wejścia, jedna bramka
**AND** (iloczyn), jedno wyjście. Bramka AND = **wszystkie** warunki muszą być spełnione
jednocześnie, inaczej na wyjściu jest zero.

Poklikaj przełącznikami. Przewody i bramka zmieniają kolor na żywo.

<div class="zs-widget" data-typ="brama"></div>

### Co znaczy każde wejście i po co ono jest

| Sygnał na schemacie | Po polsku | Dlaczego musi być w iloczynie |
|---|---|---|
| `ZS ON — STATE = "1"` | automat ZS jest **włączony** (nastawa/klucz funkcji) | żeby dało się całą automatykę wyłączyć jednym miejscem, np. na czas prac w rozdzielni |
| `I>t.P` (wejście A6) | **pobudzenie** stopnia nadprądowego I> — „widzę prąd zwarciowy” | to jest **kryterium prądowe**: bez prądu w tym polu nie ma prawa się zgłaszać. Uwaga: `.P` = *pobudzenie* (pickup), a nie wyłączenie — zgłasza się **od razu**, nie po odliczeniu 0,5 s |
| `W ON.Out` (A10) | **wyłącznik pola jest zamknięty** | jak wyłącznik jest otwarty, to przez to pole nic nie płynie — nie może być źródłem tego zwarcia, więc nie ma prawa blokować szyn |
| `Wózek praca.Out` (A10) | **człon wysuwny w pozycji PRACA** (nie „próba”/„test”) | żeby **testy zabezpieczenia nie kłamały**. Gdy wtykasz prąd probierczy przy wózku w pozycji próby, pole „widzi” I> — bez tego warunku wysyłałoby fałszywą blokadę i zablokowałoby ochronę szyn na żywej rozdzielni |
| `A11 → BL_ZS (Wy04).Stan` | wyjście: **wyślij blokadę** na szyny okrężne | jedna wspólna para przewodów przez całą rozdzielnię — każde pole „podnosi rękę” na tę samą linię |

> **Ważne.** Kryterium prądowe nie musi być akurat `I>t.P`. Równie dobrze może to być
> **osobna funkcja nadprądowa** `I>ZS` (własna nastawa, tylko do blokady) albo **suma pobudzeń**
> kilku stopni `I>> lub I>`. Zasada się nie zmienia — potrzebny jest dowód, że **prąd zwarciowy
> płynie właśnie tym polem**.

### Tabela prawdy (dla trenujących na pamięć)

| ZS ON | I>t.P | W zamknięty | Wózek praca | BL_ZS | Co się stanie w polu zasilającym |
|:-:|:-:|:-:|:-:|:-:|---|
| 1 | 1 | 1 | 1 | **1** | blokada → czeka 0,8 s (rezerwa). Poprawnie: zwarcie jest za odpływem |
| 1 | 0 | 1 | 1 | 0 | brak prądu w tym polu — to nie jego sprawa |
| 1 | 1 | 0 | 1 | 0 | wyłącznik otwarty — pole odcięte, nie może blokować |
| 1 | 1 | 1 | 0 | 0 | wózek w próbie — to test, nie prawdziwe zwarcie |
| 0 | 1 | 1 | 1 | 0 | automat ZS wyłączony — cała funkcja nieaktywna |

---

## D. Blokada ZS — sam sygnał i tor blokady

Punkt C pokazał, **kiedy** pole odpływowe wysyła blokadę. Ten punkt jest o tym, **czym ta blokada
właściwie jest**: jakim obwodem idzie przez rozdzielnię, co dokładnie wstrzymuje, jak długo trwa
i co się dzieje, kiedy tor blokady jest uszkodzony.

### D.1 Definicja i zakres działania

**Blokada ZS** (na schematach `BL_ZS`, w dokumentacji także „blokada logiczna”, „sygnał blokujący”;
w literaturze angielskiej *blocking scheme*, *reverse interlocking*, *logic selectivity*) to
**sygnał dwustanowy wysyłany z pola odpływowego do pola zasilającego**, o treści:
*„prąd zwarciowy płynie moim polem”*. Jego jedyne zadanie to **wstrzymać przyspieszony stopień ZS**
w polu zasilającym na czas, w którym odpływ ma szansę zadziałać sam.

| Blokada ZS **wstrzymuje** | Blokada ZS **nie rusza** |
|---|---|
| **wyłącznie przyspieszony stopień ZS** (40–100 ms) w polu zasilającym | zabezpieczeń pola odpływowego — odpływ wyłącza normalnie po 0,5 s |
| i tylko na czas, w którym sygnał jest obecny na wejściu | normalnego stopnia I> = 0,8 s w polu zasilającym — **rezerwa działa dalej** |
| | zabezpieczenia różnicowego szyn i łukoochronnego, jeśli są — mają własne, niezależne kryteria |
| | wyłącznika, sterowania, uziemnika — to **nie jest blokada łączeniowa (ruchowa)** |

> **Pamiętaj.** Blokada nie odbiera szynom ochrony, tylko **przekłada** wyłączenie z pola
> zasilającego na pole odpływowe, które lepiej wie, co się dzieje. Najgorsze, co robi
> **fałszywa** blokada, to zabranie szynom przyspieszenia — wracają wtedy do 0,8 s.
> Najgorsze, co robi **brak** blokady, to zgaszenie całej sekcji przy zwarciu w jednym odpływie.

Dwa różne słowa „blokada”, których komisja lubi nie odróżniać:

| | Blokada ZS (logiczna) | Blokada łączeniowa (ruchowa) |
|---|---|---|
| Co blokuje | stopień zabezpieczenia w innym polu | ruch aparatu (wyłącznik, uziemnik, drzwi, wózek) |
| Nośnik | sygnał dwustanowy w obwodach wtórnych | mechanizm, zamek, styk pomocniczy, elektromagnes |
| Cel | selektywność i skrócenie czasu wyłączenia szyn | bezpieczeństwo ludzi i kolejność czynności |
| Trwa | kilkadziesiąt–kilkaset milisekund | tak długo, jak trwa stan aparatu |

### D.2 Tor blokady — co to fizycznie jest

W wykonaniu klasycznym (miedź) blokada to jeden obwód prądu stałego przechodzący przez całą
rozdzielnię — tak zwane **szyny okrężne blokady**. Każde pole odpływowe wpina do niego **styk
zwierny** swojego przekaźnika wyjściowego (na schemacie z punktu C: `Wy04`):

```
   + 220 V DC  (obwód blokad — własny bezpiecznik w rozdzielnicy potrzeb własnych)
   ───┬───────────────┬───────────────┬──────────────────────────────
      │ odpływ 1      │ odpływ 2      │ odpływ 3
   [ Wy04 ]        [ Wy04 ]        [ Wy04 ]   ← styki zwierne,
      │               │               │         połączone RÓWNOLEGLE
      └───────────────┴───────────────┴──────►  szyny okrężne blokady
                                                  (wspólna para przewodów
                                                   przez wszystkie celki)
                                                          │
                                     pole zasilające: wejście We01 = BL_ZS
                                     + filtr antydrganiowy 10–20 ms
                                                          │
   ───────────────────────────────────────────────────────┴──────────
   − 220 V DC
```

Zwróć uwagę na dwie różne bramki w tej samej automatyce — to najczęstsze pytanie dodatkowe:

- **W każdym polu odpływowym: iloczyn (AND)** — cztery warunki z punktu C muszą wystąpić razem,
  żeby styk się zamknął.
- **Na wspólnych szynach blokady: suma (OR)** — styki są **równolegle**, więc wystarczy, że
  **jedno** pole podniesie rękę i pole zasilające widzi blokadę. Nie trzeba wiedzieć które —
  do decyzji „to nie szyny” wystarczy sam fakt, że ktoś się zgłosił.

| Element toru | Typowe wykonanie | Na co uważać |
|---|---|---|
| Przekaźnik wyjściowy w odpływie | styk zwierny, czas zamykania 5–15 ms | styk „szybki”, nie sygnalizacyjny; nie obciążać go dodatkowymi funkcjami |
| Obwód blokad | 220 / 110 / 48 / 24 V DC z baterii stacyjnej, osobny bezpiecznik | zanik tego jednego bezpiecznika = brak blokad w całej rozdzielni; obwód **nadzorowany**, nie „ślepy” |
| Szyny okrężne | para przewodów przez wszystkie przedziały wtórne, zaciski przelotowe w każdym polu | każde rozkręcenie celki to ryzyko przerwania toru — po pracach **ponowna próba** |
| Wejście dwustanowe pola zasilającego | We01, próg pobudzenia + filtr antydrganiowy 10–20 ms | filtr wchodzi do budżetu czasu z punktu F — nie wolno o nim zapomnieć przy nastawie |
| Sygnalizacja | „blokada ZS obecna”, licznik/rejestrator zdarzeń | bez rejestracji nie udowodnisz po awarii, czy blokada przyszła |

### D.3 Jak długo blokada musi trwać

Pobudzenie `I>` w odpływie potrafi zniknąć szybciej, niż pole zasilające odliczy swoje 40–100 ms
(np. zwarcie przemijające, samoczynne zgaśnięcie łuku, otwarcie wyłącznika odpływu). Gdyby blokada
odpadła w połowie odliczania, pole zasilające dokończyłoby liczenie i **zgasiłoby sekcję już po
zlikwidowanym zwarciu**. Dlatego sygnał blokady się **przedłuża**:

```
   t =   0 ms   zwarcie w odpływie → pobudzenie I> → BL_ZS = 1
                pole zasilające startuje odliczanie stopnia ZS (nastawa 80 ms)
   t =  30 ms   łuk gaśnie sam, pobudzenie I> = 0
                ale BL_ZS = 1 NADAL — trzyma je przedłużenie 150 ms
   t =  80 ms   stopień ZS kończy odliczanie → widzi blokadę → nie wyłącza
   t = 180 ms   BL_ZS = 0, automatyka gotowa na kolejne zwarcie
```

Zasada: **czas przedłużenia blokady > nastawa stopnia ZS**, z zapasem. Typowo 100–200 ms.
Po zaniku pobudzenia blokada odpada sama — nie ma podtrzymania na stałe (bo to byłaby cicha
utrata ochrony szyn, patrz D.5).

### D.4 Miedź czy światłowód (GOOSE)

| | Styk + szyny okrężne (miedź) | Komunikat GOOSE (IEC 61850, światłowód) |
|---|---|---|
| Czas przesłania | ~0 ms w kablu, ale 5–15 ms styk + 10–20 ms filtr wejścia | 3–5 ms, bez styków i przekaźników |
| Odporność | prosta, nie zależy od oprogramowania | zależy od przełącznika i konfiguracji zbiorów danych |
| Nadzór | trzeba dodać (kontrola ciągłości obwodu) | **wbudowany** — brak cyklicznego komunikatu = natychmiastowy alarm |
| Zachowanie przy awarii łącza | brak blokady → zbędne wyłączenie sekcji | konfigurowalne: alarm + zwykle **przejście na nastawy bez blokady** (zachowawczo, 0,8 s) |
| Rozbudowa o kolejne pole | nowe przewody w celce | zmiana konfiguracji, bez przekładania kabli |

> **Uwaga.** Przy blokadzie po GOOSE nie testuje się „przewodu”, ale **całą ścieżkę** —
> od podania prądu w odpływie do pobudzenia wejścia logicznego w polu zasilającym, z odczytem
> znacznika czasu w rejestratorze. Sama zielona dioda łącza nie jest dowodem.

### D.5 Dwa kierunki uszkodzenia — i dlaczego jeden jest groźniejszy

| Awaria | Objaw w ruchu | Skutek | Czy widać od razu |
|---|---|---|---|
| **Przerwa w torze** (luźny zacisk, przepalony bezpiecznik, wyjęty przewód po pracach) | zwarcie w odpływie gasi **całą sekcję** po 40–100 ms | zbędne wyłączenie, utrata selektywności | tak — boleśnie, ale od razu |
| **Blokada trwała** (zawieszony styk, zwarcie w obwodzie blokad, zapomniany mostek po próbach) | wszystko wygląda normalnie | **szyny bez przyspieszenia** — wracają do 0,8 s, o niczym nie wiedząc | **nie** — dopóki nie wystąpi zwarcie na szynach |

Dlatego w nastawach robi się **nadzór trwałej blokady**: jeśli sygnał `BL_ZS` na wejściu pola
zasilającego trwa dłużej niż kilka sekund, zabezpieczenie podaje **alarm**. Blokada z natury żyje
milisekundy — sygnał obecny przez minutę oznacza usterkę, nie zwarcie.

### D.6 „Zablokować ZS” w znaczeniu ruchowym

Osobna sprawa, tak samo nazywana: **odstawienie funkcji ZS**, czyli `ZS ON = 0` (nastawa albo
klucz funkcyjny w polu zasilającym). Robi się to świadomie, na przykład na czas badań zabezpieczeń
w polach odpływowych, gdy prąd probierczy fałszowałby obraz.

- Odstawia się **automat ZS**, nigdy nie mostkuje toru blokady ani nie wyjmuje przewodów.
- Wpis do **książki ruchu** i wiedza dyspozytora są obowiązkowe — na ten czas szyny są chronione
  dopiero po 0,8 s i ktoś musi o tym wiedzieć.
- Przywrócenie potwierdza się **próbą**, nie samym przełączeniem nastawy z powrotem.

### D.7 Minimum, które musi znaleźć się w protokole

| Co sprawdzić | Jak | Kryterium |
|---|---|---|
| Każda para pól odpływ → zasilanie | prąd probierczy > nastawy `I>` w odpływie, wózek w pozycji praca | blokada obecna na wejściu pola zasilającego, ZS nie wyłącza |
| Czas dojścia blokady | rejestrator zdarzeń albo dwa kanały testera | czas z zapasem mniejszy od nastawy ZS (patrz punkt F) |
| Warunek wózka | prąd probierczy przy wózku w pozycji próby | blokada **nie** wychodzi |
| Warunek wyłącznika | wyłącznik pola otwarty, podany prąd | blokada **nie** wychodzi |
| Brak blokady = zwarcie na szynach | prąd tylko w polu zasilającym | wyłączenie bezzwłoczne, 40–100 ms |
| Ciągłość toru i zasilania DC | oględziny, kontrola bezpiecznika, sygnalizacja nadzoru | brak alarmów, tor zamknięty |

Pełną listę ryzyk i pytań kontrolnych masz w punkcie H, a wzór protokołu w rozdziale
[Próby funkcjonalne sterowania](12-proby-funkcjonalne-sterowania-i-automatyki.md).

---

## E. Symulator 2 — cała rozdzielnia i dwa scenariusze

Teraz to samo, ale z góry: transformator, pole zasilające, szyny, trzy odpływy i wspólna linia
blokady. Wybierz miejsce zwarcia i puść przebieg. Zwróć uwagę na **czas na dole** — to jest
cała pointa ZS.

<div class="zs-widget" data-typ="rozdzielnia"></div>

Porównanie, do którego warto wrócić po symulacji:

| | Zwarcie **na szynach** | Zwarcie **w odpływie** |
|---|---|---|
| Który odpływ widzi prąd | żaden | ten jeden |
| Sygnał BL_ZS na szynach okrężnych | **brak** | **jest** |
| Reakcja pola zasilającego | wyłącza **bezzwłocznie, 40–100 ms** | **blokada** — czeka swój czas 0,8 s |
| Kto ostatecznie wyłącza | pole zasilające (cała sekcja ciemna) | pole odpływowe po 0,5 s (reszta świeci) |
| Selektywność | nieistotna — i tak trzeba zgasić sekcję | **zachowana** |

---

## F. Skąd te 40–100 ms — budżet czasu

Opóźnienie stopnia ZS w polu zasilającym **nie jest przypadkowe** i nie może być zerowe.
Pole zasilające musi dać odpływom fizyczny czas na to, żeby zdążyły „podnieść rękę”:

```
  ┌ czas wykrycia prądu zwarciowego w polu odpływowym      ~15–25 ms
  ├ zamknięcie styków przekaźnika wykonawczego              ~5–15 ms
  ├ przejście sygnału po szynach okrężnych blokady           ~0 ms (miedź)
  ├ pobudzenie wejścia dwustanowego w polu zasilającym      ~5–20 ms
  │  (plus filtr antydrganiowy wejścia — bywa 10–20 ms)
  └ margines bezpieczeństwa                                 ~20 ms
  ─────────────────────────────────────────────────────────────────
    razem → nastawa ZS w polu zasilającym:               40–100 ms
```

> **Uwaga.** To jest najczęstszy błąd nastawczy w ZS. **Za krótko** (np. 20 ms) → blokada
> nie dojdzie na czas i pole zasilające wyłączy sekcję przy każdym zwarciu w odpływie
> (zbędne wyłączenie, utrata selektywności). **Za długo** (np. 300 ms) → ZS traci sens,
> bo niczego już nie ratuje. Nastawę **weryfikuje się pomiarem** czasu przyjścia blokady,
> a nie przepisuje z katalogu.

---

## G. Rozdzielnia sekcjonowana — dlaczego dwa stopnie

Gdy rozdzielnia ma dwie sekcje spięte **łącznikiem szyn (sprzęgłem)**, ZS robi się
**dwustopniowe** — inny czas w polu łącznika, inny w polu zasilającym:

```
   zasilanie A                                    zasilanie B
        │                                              │
   ═════╪══ SEKCJA A ══╗   [łącznik szyn]   ╔══ SEKCJA B ══╪═════
        │              ╚═══════[ W ]════════╝             │
     odpływy A            ZS stopień 1              odpływy B
                            ~50 ms
     ZS w polu zasilającym A: stopień 2  ~150–200 ms
```

Logika jest sprytna: przy zwarciu na szynach sekcji A najpierw otwiera się **łącznik szyn**
(stopień 1). To odcina zwarcie od sekcji B — **sekcja B zostaje pod napięciem i pracuje dalej**.
Dopiero jeśli zwarcie nadal trwa (bo faktycznie jest w sekcji A), po stopniu 2 wyłącza pole
zasilające A. Zamiast gasić całą rozdzielnię, gasisz **połowę**.

---

## H. Ryzyka, o które pyta komisja i inspektor

- **Tor blokady jest krytyczny.** Przerwany przewód szyn okrężnych, przepalony bezpiecznik
  obwodu blokady, luźny zacisk → blokada nie dojdzie → **pole zasilające zgasi całą sekcję
  przy pierwszym zwarciu w dowolnym odpływie**. Dlatego tor blokady bywa **nadzorowany**
  (kontrola ciągłości) albo realizowany łączem światłowodowym z nadzorem komunikacji.
- **Testować trzeba każdą parę pól** odpływ → zasilanie, osobno. Nie „jeden odpływ i zakładamy,
  że reszta tak samo”. Protokół zawiera wiersz na każde pole.
- **Sprawdź warunek wózka.** Podaj prąd probierczy przy wózku w pozycji **próby** i potwierdź,
  że BL_ZS **nie** wychodzi. To jest dowód, że przyszłe testy nie zdejmą ochrony szyn.
- **Sprawdź warunek wyłącznika.** Otwórz wyłącznik pola, podaj prąd — BL_ZS nie ma prawa wyjść.
- **Zmierz czas.** Od pobudzenia I> w odpływie do pojawienia się blokady na wejściu pola
  zasilającego. Ten czas musi mieć zapas do nastawy ZS.
- **Mostkowanie blokad jest zabronione.** Także „na chwilę, do testu”. Jeśli musisz odstawić ZS,
  odstawia się **automat ZS ON**, z zapisem w książce ruchu i wiedzą dyspozytora — bo na czas
  odstawienia szyny wracają do ochrony po 0,8 s.
- **ZS ≠ zabezpieczenie różnicowe szyn.** ZS to **logika czasowa oparta na nadprądówkach**;
  różnicówka to **pomiar bilansu prądów** z granicami strefy w przekładnikach. ZS jest tańsze
  i wolniejsze, różnicówka pewniejsza i szybsza. Na SN ZS zwykle wystarcza.

---

## I. Odpowiedzi na egzamin — po trzy zdania

**Co to jest zabezpieczenie szyn ZS?**
> To automatyka, która skraca czas wyłączenia zwarcia na szynach zbiorczych, wykorzystując
> współpracę zabezpieczeń pól odpływowych z polem zasilającym. Pole odpływowe, które widzi prąd
> zwarciowy, wysyła bezzwłocznie sygnał blokujący do pola zasilającego. Brak tego sygnału jest
> dowodem, że zwarcie jest na szynach, więc pole zasilające wyłącza po 40–100 ms zamiast 0,8 s.

**Jakie warunki muszą zaistnieć, żeby pole odpływowe wysłało blokadę?**
> Jednocześnie: automat ZS musi być włączony, musi wystąpić pobudzenie prądowe I>, wyłącznik pola
> musi być zamknięty i wózek musi być w pozycji praca. To iloczyn logiczny — brak któregokolwiek
> warunku oznacza brak blokady. Warunki wyłącznika i wózka zabezpieczają przed fałszywą blokadą
> podczas testów i przy polu odstawionym.

**Co konkretnie blokuje blokada ZS?**
> Tylko przyspieszony stopień ZS w polu zasilającym i tylko na czas obecności sygnału.
> Zabezpieczenia pola odpływowego działają normalnie, a stopień I> = 0,8 s w polu zasilającym
> zostaje jako rezerwa. To nie jest blokada łączeniowa — nie blokuje żadnego aparatu, tylko
> jedną funkcję zabezpieczenia w innym polu.

**Jak zbudowany jest tor blokady i co się dzieje, gdy zawiedzie?**
> Klasycznie: styk zwierny przekaźnika wyjściowego w każdym odpływie, wpięty równolegle w wspólne
> szyny okrężne blokady zasilane z baterii stacyjnej, i wejście dwustanowe w polu zasilającym;
> nowocześniej komunikat GOOSE po światłowodzie. Przerwa w torze powoduje zbędne wyłączenie całej
> sekcji przy zwarciu w odpływie, a blokada trwała (zawieszony styk, zapomniany mostek) po cichu
> odbiera szynom przyspieszenie — dlatego tor jest nadzorowany, a zbyt długo trwająca blokada
> daje alarm.

**Dlaczego opóźnienie ZS nie może być zerowe?**
> Bo sygnał blokady potrzebuje czasu na dojście: wykrycie prądu w odpływie, zamknięcie styków
> przekaźnika, pobudzenie wejścia dwustanowego z filtrem antydrganiowym. Łącznie 40–100 ms
> z marginesem. Za krótka nastawa powoduje zbędne wyłączenia całej sekcji przy zwarciach
> w odpływach.

**Czym ZS różni się od zabezpieczenia różnicowego szyn?**
> ZS opiera się na kryteriach nadprądowych i na braku sygnału blokady, więc jest logiką czasową
> na istniejących zabezpieczeniach — tanią, ale wolniejszą i zależną od sprawności toru blokady.
> Różnicowe szyn mierzy bilans prądów wszystkich pól, granice strefy wyznaczają przekładniki,
> działa bezzwłocznie i jest pewniejsze, ale znacznie droższe.

---

## J. Powiązane rozdziały

- [Rozdzielnia SN — pola i obwody wtórne](10-rozdzielnia-SN-pola-i-obwody-wtorne.md) —
  punkt D.2 (blokada logiczna) i D.4 (różnicowe szyn) w szerszym kontekście współpracy pól
- [Zabezpieczenia — nastawy i badania](11-zabezpieczenia-nastawy-i-testowanie.md) —
  jak mierzyć czasy i co wpisać do protokołu
- [Próby funkcjonalne sterowania](12-proby-funkcjonalne-sterowania-i-automatyki.md) —
  matryca prób każdej pary pól

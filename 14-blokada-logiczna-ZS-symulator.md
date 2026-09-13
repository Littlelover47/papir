# 14. ZS — zabezpieczenie szyn. Jak to zrozumieć w 10 minut

Rozdział jest po to, żeby „schemat logiczny automatyki ZS” przestał być zbiorem prostokątów.
Najpierw **jedno zdanie**, potem **analogia**, potem **dwa symulatory**, na końcu **liczby na egzamin**.

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

## D. Symulator 2 — cała rozdzielnia i dwa scenariusze

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

## E. Skąd te 40–100 ms — budżet czasu

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

## F. Rozdzielnia sekcjonowana — dlaczego dwa stopnie

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

## G. Ryzyka, o które pyta komisja i inspektor

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

## H. Odpowiedzi na egzamin — po trzy zdania

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

## I. Powiązane rozdziały

- [Rozdzielnia SN — pola i obwody wtórne](10-rozdzielnia-SN-pola-i-obwody-wtorne.md) —
  punkt D.2 (blokada logiczna) i D.4 (różnicowe szyn) w szerszym kontekście współpracy pól
- [Zabezpieczenia — nastawy i badania](11-zabezpieczenia-nastawy-i-testowanie.md) —
  jak mierzyć czasy i co wpisać do protokołu
- [Próby funkcjonalne sterowania](12-proby-funkcjonalne-sterowania-i-automatyki.md) —
  matryca prób każdej pary pól

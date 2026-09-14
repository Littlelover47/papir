# 19. Przekładniki prądowe i napięciowe

Przekładniki nie są trudne intelektualnie. Są trudne, bo **ich wymagania są odwrotne do intuicji**,
a błędy montażowe i doborowe **nie dają objawów w ruchu normalnym** — ujawniają się dokładnie
wtedy, gdy zabezpieczenie jest potrzebne.

> **Nigdy** nie rozwieraj obwodu wtórnego przekładnika prądowego pod prądem.
> Zapamiętaj symetrię odwrotną: **dla przekładnika prądowego groźne jest ROZWARCIE,
> dla napięciowego — ZWARCIE.** Nieużywany rdzeń przekładnika prądowego musi być **zwarty**.

---

## A. Dlaczego rozwarcie CT zabija

### Mechanizm

Przekładnik prądowy jest zasilany ze **źródła prądowego**: prąd pierwotny jest wymuszony przez
sieć i **nie zależy** od tego, co dzieje się w obwodzie wtórnym.

W normalnej pracy prąd wtórny tworzy strumień przeciwny, który niemal całkowicie kompensuje
strumień pierwotny. Rdzeń pracuje przy bardzo małej indukcji — i to jest cały sekret dokładności.

Po rozwarciu wtórnego kompensacja znika i **cały prąd pierwotny staje się prądem magnesującym**.
Rdzeń wchodzi w głębokie nasycenie, przebieg strumienia jest silnie spłaszczony, a z prawa indukcji

$$u = N \cdot \frac{d\Phi}{dt}$$

powstają **szpilki napięciowe rzędu kilku do kilkudziesięciu kV** w momentach przejścia strumienia
przez zero (gdzie $d\Phi/dt$ jest największe).

| Oznaczenie | Znaczenie |
|---|---|
| $u$ | napięcie chwilowe na uzwojeniu wtórnym |
| $N$ | liczba zwojów uzwojenia wtórnego |
| $d\Phi/dt$ | szybkość zmiany strumienia magnetycznego |

### Symetria do zapamiętania

| Przekładnik | Rodzaj źródła | Stan bezpieczny | Stan groźny |
|---|---|---|---|
| **prądowy (CT)** | źródło prądowe | zwarcie wtórne | **rozwarcie wtórne** |
| **napięciowy (VT)** | źródło napięciowe | rozwarcie wtórne | **zwarcie wtórne** |

---

## B. Rdzeń pomiarowy a zabezpieczeniowy — dwa przeciwne wymagania

To dlatego są to fizycznie **osobne rdzenie** w tym samym przekładniku.

<div class="dg-rysunek"><svg viewBox="0 0 660 230" class="dg-svg" role="img" aria-label="Porównanie charakterystyk rdzenia pomiarowego i zabezpieczeniowego"><text class="dg-t-b" x="10" y="16">Prąd wtórny w funkcji prądu pierwotnego</text><path class="dg-os" d="M56 190 H630 M56 30 V190"/><text class="dg-t-m" x="10" y="28">I₂</text><text class="dg-t-m kon" x="630" y="212">I₁ / I_n</text><path class="dg-krzywa-2" style="stroke:var(--atrament-3);stroke-dasharray:3 3" d="M56 190 L620 34"/><text class="dg-t-m" x="520" y="30">ideał (liniowy)</text><path class="dg-krzywa" style="stroke:var(--ostrzezenie)" d="M56 190 L162 161 C186 155 196 152 200 150 L620 146"/><text class="dg-t-num uwaga" x="360" y="140">rdzeń POMIAROWY — 0,5 FS5</text><text class="dg-t-m" x="360" y="156">nasyca się przy 5 × I_n, żeby chronić licznik</text><path class="dg-krzywa" style="stroke:var(--sukces)" d="M56 190 L480 72 C540 60 570 56 620 54"/><text class="dg-t-num ok" x="150" y="76">rdzeń ZABEZPIECZENIOWY — 5P20</text><text class="dg-t-m" x="150" y="92">liniowy do 20 × I_n</text><path class="dg-os" style="stroke:var(--ostrzezenie);stroke-dasharray:4 4" d="M162 30 V190"/><text class="dg-t-m uwaga sr" x="162" y="205">FS = 5</text><path class="dg-os" style="stroke:var(--sukces);stroke-dasharray:4 4" d="M480 30 V190"/><text class="dg-t-m ok sr" x="480" y="205">ALF = 20</text><text class="dg-t-m sr" x="56" y="205">0</text></svg></div>

| | Rdzeń **pomiarowy** | Rdzeń **zabezpieczeniowy** |
|---|---|---|
| Ma być dokładny | w okolicy $I_n$ | w całym zakresie do ALF·$I_n$ |
| Klasy | 0,1 / 0,2 / 0,5 / 1; wersje 0,2S / 0,5S z zakresem od 1 % $I_n$ | 5P / 10P + ALF; klasy przejściowe TPX / TPY / TPZ |
| Przy zwarciu | **ma się nasycić** — chroni licznik i mierniki | **musi pozostać liniowy** |
| Parametr graniczny | FS — współczynnik bezpieczeństwa przyrządowego (5 lub 10) | ALF — współczynnik graniczny dokładności (10, 20, 30) |

### Jak czytać oznaczenia klas

| Oznaczenie | Znaczenie |
|---|---|
| **5P20** | błąd całkowity ≤ **5 %** przy prądzie do **20**-krotności $I_n$; P = *protection* |
| **10P10** | błąd ≤ 10 % do 10-krotności $I_n$ |
| **0,5 FS10** | klasa dokładności 0,5 % przy $I_n$; powyżej **10**-krotności rdzeń celowo nasycony |
| **0,5S** | jak 0,5, ale z rozszerzonym zakresem dokładności od 1 % $I_n$ — do rozliczeń |
| **TPX / TPY / TPZ** | klasy przejściowe dla zabezpieczeń szybkich, z określonym zachowaniem przy składowej nieokresowej DC; TPY ma szczelinę ograniczającą remanencję, TPZ bardzo małą stałą czasową |

> **Ważne.** Podłączenie zabezpieczenia do rdzenia **pomiarowego** daje układ, który pokazuje
> poprawne prądy w ruchu normalnym i **nasyca się dokładnie wtedy, gdy pojawia się zwarcie**.
> Zabezpieczenie nie zobaczy awarii albo zobaczy ją zaniżoną. Rdzenie trzeba weryfikować
> z tabliczki i ze schematu rozwiniętego, nie z podpisu na listwie.

---

## C. Punkt kolanowy i charakterystyka magnesowania

### Definicja

**Napięcie punktu kolanowego** $V_k$ (knee point) to napięcie wtórne, przy którym **10 % wzrostu
napięcia powoduje 50 % wzrostu prądu magnesującego**. Definiuje granicę zakresu liniowego rdzenia.

Wartość szacunkowa dla rdzenia klasy P:

$$V_k \approx \text{ALF} \cdot I_{2n} \cdot (R_{ct} + Z_{bn})$$

| Oznaczenie | Jednostka | Znaczenie |
|---|---|---|
| $V_k$ | V | napięcie punktu kolanowego |
| ALF | — | współczynnik graniczny dokładności (z klasy, np. 20 dla 5P20) |
| $I_{2n}$ | A | prąd wtórny znamionowy (1 A lub 5 A) |
| $R_{ct}$ | Ω | rezystancja uzwojenia wtórnego przekładnika |
| $Z_{bn}$ | Ω | obciążenie **znamionowe**: $Z_{bn} = S_n / I_{2n}^2$ |

### Pomiar

Zasilanie **od strony wtórnej** napięciem przemiennym regulowanym, przy **rozwartym uzwojeniu
pierwotnym**; rejestracja prądu magnesującego w funkcji napięcia.

> **Ważne.** Po pomiarze charakterystyki magnesowania **demagnetyzacja jest obowiązkowa** —
> powolne, monotoniczne zmniejszanie napięcia do zera. Pominięcie tego kroku zostawia rdzeń
> z magnetyzmem szczątkowym, czyli **w gorszym stanie niż przed twoim pomiarem**.
> To przykład pomiaru, który może pogorszyć obiekt.

### Remanencja

Po zwarciu z dużą składową nieokresową (DC) w rdzeniu pozostaje indukcja szczątkowa
do **około 80 %** indukcji nasycenia. Kolejne zwarcie nasyca rdzeń znacznie szybciej, więc
zabezpieczenie może zawieść przy drugim zwarciu, mimo że przy pierwszym działało poprawnie.
Temu przeciwdziałają klasy TPY (szczelina) i TPZ.

---

## D. Obciążenie wtórne — pułapka długiej trasy

### Skład obciążenia

Przekładnik ma znamionową moc wtórną (np. 15 VA przy 5 A). W obciążenie wchodzi **wszystko,
co jest w pętli** — a nie tylko przekaźnik:

$$Z_b = R_{\text{przewody}} + R_{\text{przekaźnik}} + R_{\text{styki}}$$

### Rezystancja przewodów

$$R_{\text{przewody}} = \frac{2 \cdot \rho \cdot l}{S}$$

| Oznaczenie | Jednostka | Znaczenie |
|---|---|---|
| $2$ | — | **pętla tam i z powrotem** — pominięcie dwójki to błąd o 100 % |
| $\rho$ | Ω·mm²/m | rezystywność miedzi ≈ 0,0175 |
| $l$ | m | długość trasy **w jedną stronę** |
| $S$ | mm² | przekrój żyły |

### Przykład, który wysadza klasę

Trasa 100 m przewodem 2,5 mm²:

$$R = \frac{2 \cdot 0{,}0175 \cdot 100}{2{,}5} = 1{,}4\ \Omega$$

Obciążenie znamionowe dla 15 VA przy 5 A wynosi $Z_{bn} = 15/5^2 = 0{,}6\ \Omega$.
Sama trasa daje **ponad dwukrotność** dopuszczalnego obciążenia — klasa dokładności przestaje
obowiązywać, a rdzeń zabezpieczeniowy nasyci się poniżej deklarowanego ALF.

### Dlaczego długie trasy projektuje się na 1 A

Straty w przewodach to $P = I^2 R$. Przy prądzie 1 A zamiast 5 A ten sam przewód daje
**25-krotnie mniejszy** problem. Dlatego w rozdzielniach z długimi trasami stosuje się obwody 1 A,
a przy 5 A przekroje 4–6 mm².

---

## E. Symulator — obciążenie i nasycenie

Ustaw rdzeń 5P20, trasę 100 m i przekrój 2,5 mm², a potem przesuń krotność prądu do 15 × $I_n$.
Zobacz, w którym momencie punkt pracy przekracza punkt kolanowy. Potem zmień przekrój na 6 mm².

<div class="dg-widget" data-typ="przekladnik"></div>

### Ćwiczenia do symulatora

1. Przełącz obwód wtórny na **rozwarty**. Przeczytaj komunikat.
2. Rdzeń 5P20, trasa 200 m, przekrój 1,5 mm². Przy jakiej krotności prądu następuje nasycenie?
3. Przejdź na prąd wtórny **1 A** przy tej samej trasie. Co się zmieniło i dlaczego?
4. Wybierz rdzeń **0,5 FS5** i ustaw 20 × $I_n$. Jaki prąd dostanie przekaźnik? Wyjaśnij,
   dlaczego to nie jest wada przekładnika, a błąd projektowy.
5. Znajdź najmniejszy przekrój, przy którym 5P20 na trasie 150 m działa liniowo do 20 × $I_n$.

---

## F. Zakres badań przekładnika prądowego

1. **Rezystancja izolacji** — uzwojenia względem siebie i względem ziemi.
2. **Przekładnia** — metodą porównawczą albo wtryskiem pierwotnym.
3. **Biegunowość** — impuls prądu stałego na zaciski P1/P2 i obserwacja kierunku wychylenia
   miernika na S1/S2, albo tester automatyczny.
4. **Charakterystyka magnesowania** i wyznaczenie $V_k$ — **z demagnetyzacją po pomiarze**.
5. **Rezystancja uzwojenia wtórnego prądem stałym** — potrzebna do obliczenia błędu i weryfikacji ALF.
6. **Obciążenie rzeczywiste obwodu** — pomiar impedancji pętli wtórnej.
7. **Ciągłość i poprawność połączeń do przekaźnika** — na listwach, faza po fazie.

> **Ważne.** Punkt 6 jest tym, który najczęściej pomija się „bo przecież przekładnik ma tabliczkę".
> Obliczenie obciążenia to **obowiązkowy element protokołu**. Tabliczka mówi, ile przekładnik
> uniesie; protokół musi wykazać, ile faktycznie na nim wisi.

---

## G. Przekładnik napięciowy — specyfika

### Zwarcie i rozwarcie

- **Zwarcie wtórne** = przepalenie uzwojenia. Przekładnik napięciowy jest źródłem napięciowym,
  więc prąd ogranicza tylko jego własna impedancja. **Bezpieczniki wtórne na każdej fazie
  są obowiązkowe.**
- **Rozwarcie wtórne** jest bezpieczne dla samego przekładnika, ale **groźne dla zabezpieczeń**:
  zanik napięcia jednej fazy **pozoruje zwarcie** dla zabezpieczenia odległościowego
  i podimpedancyjnego.

Dlatego obowiązkowy jest **nadzór obwodów napięciowych** (VT supervision / Fuse Failure),
który wykrywa asymetrię napięciową **bez** odpowiadającej jej asymetrii prądowej i blokuje
funkcje zależne od napięcia.

### Ferrorezonans

W sieciach izolowanych nasycająca się indukcyjność przekładnika napięciowego w połączeniu
z pojemnością doziemną sieci może wpaść w **oscylacje podharmoniczne**. Skutki: przegrzanie
i przepalenie przekładnika, fałszywe wskazania $U_0$.

Środki zaradcze: rezystor tłumiący w obwodzie otwartego trójkąta, przekładnik o odpowiedniej
charakterystyce, albo dzielniki pojemnościowe zamiast przekładników indukcyjnych.

### Otwarty trójkąt

Trzy uzwojenia wtórne 100/3 V połączone w **otwarty trójkąt** (broken delta) dają składową zerową
$U_0$. Warunek: **uziemiony punkt neutralny strony pierwotnej** — patrz
[rozdział 17](17-punkt-neutralny-sieci-SN.md).

---

## H. Biegunowość — najgroźniejszy błąd w całej części III

Rozważ tę samą usterkę (odwrócone zaciski S1/S2 jednego przekładnika) w dwóch zastosowaniach:

| Zastosowanie | Objaw w ruchu normalnym | Kiedy się ujawni |
|---|---|---|
| **zabezpieczenie różnicowe** | prąd różnicowy = $2 \cdot I_{\text{rob}}$ → zadziała natychmiast po załączeniu | **od razu** — usterka zostanie naprawiona |
| **zabezpieczenie kierunkowe ziemnozwarciowe** | żaden — bo $3I_0 \approx 0$, więc kierunek nie jest sprawdzany | **tylko przy zwarciu** — i wtedy wyłączy pole **zdrowe**, a uszkodzone zostanie pod napięciem |

> **Nigdy** nie zakładaj, że poprawny pomiar przekładni, rezystancji i ciągłości dowodzi
> poprawnej biegunowości. **Te pomiary nie wykryją odwróconej biegunowości nigdy.**

### Co ją wykrywa

- **Pomiar wektorowy w warunkach ruchowych** — sprawdzenie kątów prądów względem napięć
  faza po fazie, przy realnym obciążeniu.
- **Pełna injekcja wtórna z symulacją kątów** — podanie $U_0$ i $3I_0$ z zadanym przesunięciem
  fazowym i sprawdzenie, że przekaźnik rozpoznaje kierunek „do przodu" i „do tyłu" zgodnie
  z założeniem projektowym.

---

## I. Pytania kontrolne

1. Dlaczego rozwarcie obwodu wtórnego przekładnika prądowego daje napięcie kilku kV,
   a rozwarcie przekładnika napięciowego jest bezpieczne?
2. Co oznacza zapis 5P20, a co 0,5 FS10?
3. Zabezpieczenie podłączono do rdzenia pomiarowego. Kiedy to się ujawni?
4. Trasa 150 m, przewód 2,5 mm², obwód 5 A, przekładnik 10 VA. Czy klasa dokładności obowiązuje?
5. Po pomiarze charakterystyki magnesowania nie wykonano demagnetyzacji. Co zostawiłeś w rdzeniu
   i jaki to ma skutek?
6. Dlaczego odwrócona biegunowość w zabezpieczeniu różnicowym jest mniej groźna niż
   w zabezpieczeniu kierunkowym?

> **Odpowiedź do pytania 4.** Obciążenie znamionowe: $Z_{bn} = 10/5^2 = 0{,}4\ \Omega$.
> Przewody: $R = 2 \cdot 0{,}0175 \cdot 150 / 2{,}5 = 2{,}1\ \Omega$. Sama trasa przekracza
> obciążenie znamionowe **ponad pięciokrotnie** — klasa nie obowiązuje, a rdzeń nasyci się
> daleko poniżej ALF. Rozwiązania: przekrój 10 mm² (0,53 Ω — jeszcze za dużo), przejście
> na obwód 1 A, albo przekładnik o wyższej mocy znamionowej.

---

**Poprzedni:** [18. Uziemienia w rozdzielni](18-uziemienia-w-rozdzielni.md) ·
**Następny:** [20. Rezystancja izolacji i tg δ](20-rezystancja-izolacji-i-tg-delta.md)

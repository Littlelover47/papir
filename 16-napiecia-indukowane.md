# 16. Napięcia indukowane w polu równoległym

Sytuacja: tor wyłączony, uziemiony, polecenie na pracę wystawione. Przykładasz miernik i widzisz
kilkaset volt. Albo kilka kV. Nic się nie zepsuło — tak działa fizyka i trzeba to rozumieć,
bo od tego zależy zarówno bezpieczeństwo, jak i sens wyników pomiarów.

> **Nigdy** nie zakładaj, że tor odstawiony i uziemiony jest torem o zerowym potencjale.
> **Uziemienie nie jest zerem potencjału — jest tylko punktem wymuszonym.**
> Zanim przystąpisz do pomiaru izolacji, zmierz napięcie przemienne na obiekcie. To 30 sekund.

---

## A. Dwa mechanizmy, które trzeba rozdzielić

To jest sedno rozdziału. Istnieją **dwa fizycznie różne** sposoby, którymi tor czynny „wkłada"
napięcie w tor odstawiony, i one **zachowują się przeciwnie wobec uziemienia**. Pomylenie ich
to najczęstsza przyczyna błędnego poczucia bezpieczeństwa.

| | Sprzężenie **pojemnościowe** | Sprzężenie **indukcyjne** |
|---|---|---|
| Wymuszane przez | **napięcie** toru czynnego | **prąd** toru czynnego |
| Występuje gdy linia czynna nieobciążona | **tak** | nie |
| Model zastępczy | dzielnik pojemnościowy | transformator powietrzny |
| Uziemienie jednostronne | **likwiduje całkowicie** | **nie likwiduje** |
| Uziemienie obustronne | likwiduje | sprowadza końce do zera, ale wzbudza prąd w pętli |
| Prąd przez uziemienie | mały (mA–A) | duży (dziesiątki–setki A) |

---

## B. Sprzężenie pojemnościowe

### Model

Tor odstawiony „wisi" pomiędzy dwoma pojemnościami: pojemnością wzajemną do toru czynnego
$C_{12}$ oraz pojemnością własną do ziemi $C_{20}$. Razem tworzą **dzielnik pojemnościowy**.

<div class="dg-rysunek"><svg viewBox="0 0 620 220" class="dg-svg" role="img" aria-label="Schemat dzielnika pojemnościowego: tor czynny, pojemność wzajemna, tor odstawiony, pojemność do ziemi"><text class="dg-t-b" x="10" y="20">Dzielnik pojemnościowy</text><circle cx="90" cy="56" r="13" style="fill:none;stroke:var(--ostrzezenie);stroke-width:2.2"/><text class="dg-t-m sr" x="90" y="61" style="fill:var(--ostrzezenie)">~</text><text class="dg-t-m" x="112" y="60">tor czynny, potencjał U_f</text><path class="dg-przewod" style="stroke:var(--ostrzezenie)" d="M170 56 H520"/><path class="dg-przewod" style="stroke:var(--ostrzezenie)" d="M330 56 V84"/><path class="dg-przewod" style="stroke:var(--ostrzezenie)" d="M312 84 H348 M312 94 H348"/><text class="dg-t-num" x="360" y="94" style="fill:var(--ostrzezenie)">C₁₂</text><text class="dg-t-m" x="360" y="110">pojemność wzajemna</text><path class="dg-przewod grozny" d="M330 94 V132"/><path class="dg-przewod grozny" d="M170 132 H520"/><text class="dg-t-b alarm" x="10" y="137">tor odstawiony</text><path class="dg-przewod grozny" d="M420 132 V158"/><path class="dg-przewod grozny" d="M402 158 H438 M402 168 H438"/><text class="dg-t-num" x="450" y="168" style="fill:var(--alarm)">C₂₀</text><text class="dg-t-m" x="450" y="184">pojemność do ziemi</text><path class="dg-ziemia" d="M420 168 V196 M400 196 H440 M406 202 H434 M412 208 H428"/><text class="dg-t-num alarm" x="180" y="122">U_ind = U_f · C₁₂ / (C₁₂ + C₂₀)</text></svg></div>

### Wzór i objaśnienie oznaczeń

$$U_{\text{ind}} = U_f \cdot \frac{C_{12}}{C_{12} + C_{20}}$$

| Oznaczenie | Jednostka | Co to jest |
|---|---|---|
| $U_{\text{ind}}$ | V | napięcie indukowane na torze odstawionym względem ziemi |
| $U_f$ | V | **napięcie fazowe** toru czynnego, czyli $U_n/\sqrt{3}$ |
| $C_{12}$ | F | pojemność **wzajemna** między torem czynnym a odstawionym — zależy od odstępu przewodów |
| $C_{20}$ | F | pojemność **własna** toru odstawionego względem ziemi — zależy od wysokości zawieszenia |

Iloraz $C_{12}/(C_{12}+C_{20})$ nazywa się **współczynnikiem sprzężenia pojemnościowego** $k$.
Dla typowej linii dwutorowej wynosi **kilka procent** — orientacyjnie 0,02–0,08, zależnie
od odstępu torów i wysokości zawieszenia. W symulatorze jest suwakiem, żebyś mógł sprawdzić wpływ
geometrii; wartość domyślna to 0,04.

### Trzy wnioski

1. **Zależy od napięcia, nie od prądu.** Linia czynna pracująca na biegu jałowym (zerowy prąd)
   daje dokładnie takie samo napięcie pojemnościowe jak obciążona. To zaskakuje.
2. **Uziemienie likwiduje całkowicie.** Zwarcie toru do ziemi to postawienie $C_{20} \to \infty$,
   więc dzielnik daje zero. Prąd przez uziemienie jest niewielki:
   $I = U_f \cdot \omega \cdot C_{12}$, rzędu miliamperów do amperów.
3. **Napięcie wraca po zdjęciu uziemienia.** Sekwencja „zdjąłem uziemienie, żeby zmierzyć izolację,
   i przyrząd zwariował" to dokładnie ten mechanizm.

### Rzędy wielkości

Wartości dla $k = 0{,}04$ — czyli domyślnej nastawy symulatora:

| Linia | $U_f$ | Napięcie na torze odstawionym (nieuziemionym) |
|---|---|---|
| 15 kV dwutorowa | 8,7 kV | ok. 350 V |
| 110 kV dwutorowa | 63,5 kV | ok. 2,5 kV |
| 220 kV dwutorowa | 127 kV | ok. 5 kV |
| 400 kV dwutorowa | 231 kV | ok. 9 kV |

Przy ciasnej geometrii ($k$ bliżej 0,08) wartości są dwukrotnie wyższe. **W każdym przypadku
są to napięcia wielokrotnie przekraczające granicę bezpieczeństwa 50 V.**

---

## C. Sprzężenie indukcyjne

### Model

Tu układ zachowuje się jak **transformator powietrzny**. Prąd płynący w torze czynnym tworzy
strumień magnetyczny, który obejmuje pętlę utworzoną przez tor odstawiony i ziemię — i indukuje
w niej siłę elektromotoryczną.

### Wzór i objaśnienie oznaczeń

$$E = Z_m \cdot I_1 \cdot L$$

| Oznaczenie | Jednostka | Co to jest |
|---|---|---|
| $E$ | V | **siła elektromotoryczna** indukowana wzdłuż całego odcinka zbliżenia |
| $Z_m$ | Ω/km | **impedancja wzajemna** torów — typowo 0,1–0,7 Ω/km; zależy od odstępu torów i rezystywności gruntu |
| $I_1$ | A | prąd płynący w torze czynnym |
| $L$ | km | długość zbliżenia (odcinek, na którym tory biegną równolegle) |

> **Uwaga na zapis.** W literaturze spotyka się też postać $E = \omega \cdot M \cdot I_1 \cdot L$,
> gdzie $M$ jest **indukcyjnością wzajemną** w H/km. Oba zapisy są równoważne, bo
> $Z_m = \omega M$ — impedancja wzajemna ma już w sobie pulsację $\omega$.
> Nie mnóż impedancji wzajemnej przez $\omega$ po raz drugi, bo wyjdzie wynik 314 razy za duży.

### Przykład liczbowy

Dwa tory 110 kV biegnące równolegle na odcinku 20 km, prąd w torze czynnym 500 A,
impedancja wzajemna 0,3 Ω/km:

$$E = 0{,}3 \cdot 500 \cdot 20 = 3000\ \text{V} = 3\ \text{kV}$$

**Trzy kilowolty na „wyłączonym" torze.** To nie jest przypadek skrajny — to typowa linia
dwutorowa w normalnym ruchu.

### Dlaczego uziemienie jednostronne nie wystarcza

| Uziemienie | Napięcie na końcu A | W środku odcinka | Napięcie na końcu B | Prąd w pętli |
|---|---|---|---|---|
| **brak** | ≈ $E/2$ | ≈ 0 | ≈ $E/2$ | brak (pętla otwarta) |
| **jednostronne (A)** | 0 | ≈ $E/2$ | **pełne $E$** | brak |
| **obustronne** | 0 | ≈ $E/4$ | 0 | $I_2 = E / Z_{\text{pętli}}$ |

To jest **najważniejsza tabela w tym rozdziale**. Uziemienie na jednym końcu daje odczyt 0 V
w miejscu, gdzie stoisz z miernikiem — i to uspokaja. Na drugim końcu stoi pełne $E$.

### Prąd cyrkulacyjny przy uziemieniu obustronnym

$$I_2 = \frac{E}{Z_{\text{pętli}}} = \frac{Z_m \cdot I_1 \cdot L}{z_p \cdot L} = \frac{Z_m \cdot I_1}{z_p}$$

gdzie $z_p$ to jednostkowa impedancja pętli żyła–ziemia w Ω/km (typowo 0,25–0,45 Ω/km).
Zwróć uwagę na skrócenie $L$: **prąd cyrkulacyjny nie zależy od długości zbliżenia.**
Dla powyższego przykładu i $z_p = 0{,}35$:

$$I_2 = \frac{0{,}3 \cdot 500}{0{,}35} \approx 430\ \text{A}$$

W uziemieniu roboczym płynie ponad 400 A. Przewody uziemiające muszą to wytrzymać, a rozłączanie
uziemienia pod tym prądem jest niebezpieczne.

---

## D. Symulator — sprawdź to sam

Ustaw uziemienie na **jednostronne** i porównaj koniec A z końcem B. Potem ustaw prąd
$I_1 = 0$ przy uziemieniu **brak** i zobacz, że napięcie pojemnościowe nie znika.

<div class="dg-widget" data-typ="indukcja"></div>

### Ćwiczenia do symulatora

1. **Prąd zerowy, brak uziemienia.** Co zostaje? (Odpowiedź: tylko składowa pojemnościowa —
   dowód, że nie zależy od prądu.)
2. **Uziemienie jednostronne, 400 A, 25 km.** Ile jest na końcu B? Czy podejdziesz tam
   bez sprawdzenia napięcia?
3. **Uziemienie obustronne.** Gdzie jest maksimum potencjału? Dlaczego to uzasadnia zasadę
   uziemiania w miejscu pracy?
4. **Zmniejsz długość zbliżenia do 2 km przy uziemieniu obustronnym.** Prąd cyrkulacyjny
   prawie się nie zmienia — sprawdź, czy rozumiesz dlaczego (patrz wzór wyżej).
5. **Zwiększ $Z_m$ z 0,10 do 0,70 Ω/km** przy stałym prądzie i długości. To modeluje przejście
   od torów odległych do torów na jednym słupie — zobacz, jak bardzo geometria decyduje o wyniku.

---

## E. Dlaczego uziemienie robocze zakłada się w miejscu pracy

Ten rozdział wyjaśnia zasadę, którą wszyscy znają, a mało kto potrafi uzasadnić.

Przy uziemieniu obustronnym rozkład potencjału wzdłuż toru jest w przybliżeniu **trójkątny**:
zero na obu końcach, maksimum w środku odcinka. Jeśli pracujesz w środku, **stoisz w punkcie
o najwyższym potencjale w całym układzie.**

<div class="dg-rysunek"><svg viewBox="0 0 620 190" class="dg-svg" role="img" aria-label="Rozkład potencjału wzdłuż toru uziemionego obustronnie ma kształt trójkąta z maksimum w środku"><text class="dg-t-b" x="10" y="18">Rozkład potencjału przy uziemieniu obustronnym</text><path class="dg-os" d="M60 150 H580 M60 40 V150"/><path class="dg-obszar" d="M60 150 L320 78 L580 150 Z"/><path class="dg-krzywa" d="M60 150 L320 78 L580 150"/><circle class="dg-punkt" cx="320" cy="78" r="5"/><text class="dg-t-num roz sr" x="320" y="68">E/4 — maksimum</text><path class="dg-ziemia czynna" d="M60 150 V172 M48 172 H72"/><path class="dg-ziemia czynna" d="M580 150 V172 M568 172 H592"/><text class="dg-t-m sr" x="60" y="186">uziemienie A</text><text class="dg-t-m sr" x="580" y="186">uziemienie B</text><text class="dg-t-m sr" x="320" y="164">miejsce pracy — tu potrzebne uziemienie robocze</text><text class="dg-t-m" x="14" y="46">potencjał</text></svg></div>

Dlatego procedura wymaga uziemienia **dodatkowo, bezpośrednio w strefie pracy**, po obu stronach
stanowiska — a nie tylko na końcach odcinka.

---

## F. Wpływ na pomiary

### Megaomomierz

Napięcie indukowane 50 Hz nakłada się na napięcie stałe pomiarowe. Objawy:

- wskazanie **niestabilne**, skaczące, czasem ujemne, czasem „przepełnienie",
- wynik **zmienia się w czasie** w sposób nieskorelowany z twoimi działaniami — bo zmienia się
  obciążenie linii sąsiedniej, na co nie masz wpływu,
- **zmiana polaryzacji** napięcia probierczego zmienia wynik, co dowodzi obecności składowej AC.

Lepsze mierniki mają filtr i **wskaźnik poziomu zakłóceń** — używaj go, to nie ozdoba.

### Pomiar tg δ

Tu problem jest poważniejszy: pomiar klasyczny wykonuje się przy **50 Hz**, czyli dokładnie
na częstotliwości zakłócenia. Filtrowanie nie pomoże, bo nie da się odfiltrować sygnału
od zakłócenia o tej samej częstotliwości.

**Rozwiązanie:** mostek z **przesuwem częstotliwości** — pomiar przy 45 Hz i 55 Hz
(pomiar dwuczęstotliwościowy). Zakłócenie sieciowe wypada wtedy poza pasmo detekcji.

### Pomiar rezystancji uzwojeń prądem stałym

Napięcie indukowane uniemożliwia stabilizację odczytu. Mostek nie może się wyzerować.

---

## G. Procedura postępowania

1. **Zawsze zmierz napięcie AC na obiekcie przed pomiarem izolacji** — multimetrem,
   na wszystkich żyłach względem ziemi, przy zdjętym uziemieniu i pod nadzorem.
2. **Rozpoznaj mechanizm.** Napięcie obecne przy zerowym prądzie linii sąsiedniej → pojemnościowe.
   Napięcie rosnące z obciążeniem linii sąsiedniej → indukcyjne.
3. **Uziemiaj obustronnie**, a dodatkowo w miejscu pracy.
4. **Dobierz przewody uziemiające** do prądu cyrkulacyjnego, nie tylko do prądu zwarciowego.
5. **Nie rozłączaj uziemienia pod prądem cyrkulacyjnym.** Kolejność: najpierw wyłącz albo odciąż
   tor czynny, jeśli to możliwe.
6. **Do pomiarów wymagających zdjęcia uziemienia** używaj przyrządów z filtracją zakłóceń
   i dokumentuj poziom zakłóceń w protokole.

---

## H. Pytania kontrolne

1. Linia czynna pracuje na biegu jałowym — prąd bliski zeru. Czy na torze odstawionym,
   nieuziemionym, jest napięcie? Uzasadnij.
2. Tor odstawiony uziemiono na końcu A. Miernik na końcu A pokazuje 0 V. Czy tor jest bezpieczny?
3. Dlaczego prąd cyrkulacyjny przy uziemieniu obustronnym nie zależy od długości zbliżenia?
4. Dlaczego nie da się odfiltrować zakłócenia 50 Hz przy klasycznym pomiarze tg δ i co się
   w zamian robi?
5. Który mechanizm sprzężenia znika po uziemieniu jednostronnym, a który nie — i dlaczego?

> **Odpowiedź do pytania 1.** Tak. Sprzężenie pojemnościowe jest wymuszane **napięciem** toru
> czynnego, a nie prądem. Dzielnik $C_{12}/(C_{12}+C_{20})$ działa niezależnie od obciążenia.
> Zniknie tylko sprzężenie indukcyjne, które jest proporcjonalne do prądu.

---

**Poprzedni:** [15. Trudne miejsca — przewodnik](15-trudne-miejsca-przewodnik.md) ·
**Następny:** [17. Punkt neutralny sieci SN](17-punkt-neutralny-sieci-SN.md)

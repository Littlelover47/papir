# 25. Kalkulator pętli zwarciowej

Rozdział 24 pokazał **którędy** płynie prąd zwarciowy. Ten rozdział odpowiada na pytanie
**ile go płynie** — i czy to wystarczy, żeby zabezpieczenie zadziałało w wymaganym czasie.

Kalkulator liczy dokładnie to, co potem porównujesz z wynikiem miernika: impedancję pętli
rozbitą na składniki, prąd zwarciowy, wymagany prąd wyłączający i dopuszczalną wartość $Z_s$.

> **Ważne.** Obliczenie i pomiar odpowiadają na różne pytania. **Obliczenie** mówi, jaka pętla
> powinna wyjść — służy do projektu i do oceny, czy pomiar jest sensowny. **Pomiar** mówi, jaka
> jest naprawdę, razem z każdym poluzowanym zaciskiem, którego nie ma w projekcie.
> Jedno bez drugiego nie ma wartości dowodowej.

---

## A. Kalkulator

<div class="dg-widget" data-typ="kalkulator-petli"></div>

### Jak korzystać

1. **Źródło** — wybierz moc transformatora stacji. Jeśli nie znasz jej albo liczysz od rozdzielnicy,
   wybierz „pomiń” i wpisz zmierzoną impedancję zasilania w polu dodatkowym (miernik pętli
   w rozdzielnicy podaje ją bezpośrednio).
2. **Trasa** — dwa odcinki: WLZ (zasilanie rozdzielnicy) i obwód końcowy. Osobno przekrój żyły
   fazowej i osobno powrotnej, bo **w pętli liczą się oba** i PE jest zwykle wąskim gardłem.
3. **Zabezpieczenie** — typ i prąd znamionowy oraz wymagany czas: 0,4 s dla obwodów końcowych
   ≤ 32 A, 5 s dla rozdzielczych i dla obwodów > 32 A (TN, U₀ = 230 V).
4. Porównaj **I_k z I_a** oraz **Z_s z dopuszczalną Z_s** — kalkulator podaje też wartość
   z **regułą 2/3** do porównania z pomiarem wykonanym na zimnej instalacji.

---

## B. Skąd biorą się liczby

### Impedancja transformatora

$$Z_T = \frac{u_k}{100} \cdot \frac{U_n^2}{S_T}$$

Dla transformatora 250 kVA, $u_k = 4\ \%$, po stronie nn 400 V:
$Z_T = 0{,}04 \cdot 400^2 / 250\,000 = 0{,}0256\ \Omega$. Rezystancja to około 30 % tej wartości,
reszta jest reaktancją. Wniosek praktyczny: **w obwodach końcowych transformator jest prawie
nieistotny** — na 0,9 Ω pętli wnosi 3 %. Zaczyna liczyć się dopiero w rozdzielnicy głównej
i przy zwarciach trójfazowych.

### Rezystancja przewodów

$$R = \rho \cdot L \cdot \left( \frac{1}{S_L} + \frac{1}{S_{PE}} \right), \qquad
\rho_{Cu} = \frac{1}{56}, \qquad \rho_{Al} = \frac{1}{35} \ \frac{\Omega \cdot mm^2}{m}$$

Wpływ temperatury:

$$\rho(t) = \rho_{20} \cdot \left[ 1 + 0{,}004 \cdot (t - 20) \right]$$

Przy 70 °C rezystancja jest **o 20 % większa** niż przy 20 °C. To jest cały sens reguły 2/3.

Reaktancję kabli nn przyjmuje się orientacyjnie **0,08 Ω/km** na żyłę. Dla obwodów o małym
przekroju jest pomijalna, dla przekrojów ≥ 70 mm² zaczyna dominować nad rezystancją.

### Prąd zwarciowy

| Rodzaj zwarcia | Wzór | Do czego służy |
|---|---|---|
| L–PE | $I_k = c U_0 / Z_s$ | **ochrona przeciwporażeniowa** — samoczynne wyłączenie |
| L–N | $I_k = c U_0 / Z_{obwodu}$ | dobór zabezpieczenia przed zwarciem jednofazowym |
| trójfazowe | $I_{k3} = c U_n / (\sqrt{3} \cdot Z)$ | zdolność zwarciowa aparatów, wytrzymałość cieplna |

Współczynnik $c$: **0,95** dla zwarcia minimalnego (sprawdzanie, czy zabezpieczenie zadziała),
**1,05–1,10** dla maksymalnego (sprawdzanie, czy aparat wytrzyma). W ochronie przeciwporażeniowej
liczy się zawsze wariant minimalny.

### Prąd wyłączający I_a

**Wyłączniki nadprądowe** — górna granica wyzwalania magnetycznego (gwarantuje czas < 0,1 s):

| Charakterystyka | I_a | Zastosowanie |
|---|---|---|
| **B** | **5·I_n** | obwody odbiorcze, długie obwody, instalacje mieszkaniowe |
| **C** | **10·I_n** | odbiorniki z prądem rozruchowym (silniki, transformatory, LED) |
| **D** | **20·I_n** | duże prądy rozruchowe (spawarki, napędy) |

Im „twardsza” charakterystyka, tym **trudniej spełnić warunek pętli** — D16 wymaga 320 A tam,
gdzie B16 wystarczy 80 A. Dlatego zamiana B na C „żeby nie wybijało” bywa cichym wyłączeniem
ochrony przeciwporażeniowej.

**Bezpieczniki gG** — I_a odczytuje się z charakterystyki czasowo-prądowej dla wymaganego czasu.
Wartości orientacyjne (pasmo ma rozrzut rzędu ± 10–20 %, zawsze sprawdź krzywą producenta):

| I_n wkładki | I_a dla 0,4 s | I_a dla 5 s | krotność dla 5 s |
|---|---|---|---|
| 6 A | ~47 A | ~27 A | 4,5 × |
| 10 A | ~82 A | ~47 A | 4,7 × |
| 16 A | ~107 A | ~65 A | 4,1 × |
| 20 A | ~145 A | ~85 A | 4,3 × |
| 25 A | ~180 A | ~110 A | 4,4 × |
| 32 A | ~270 A | ~150 A | 4,7 × |
| 40 A | ~310 A | ~190 A | 4,8 × |
| 50 A | ~460 A | ~250 A | 5,0 × |
| 63 A | ~550 A | ~320 A | 5,1 × |
| 80 A | ~840 A | ~425 A | 5,3 × |
| 100 A | ~1020 A | ~580 A | 5,8 × |
| 125 A | ~1450 A | ~715 A | 5,7 × |
| 160 A | ~1740 A | ~950 A | 5,9 × |

Reguła kciuka dla bezpieczników gG: potrzebny prąd zwarciowy to **około 5·I_n dla 5 s**
i **8–10·I_n dla 0,4 s**.

---

## C. Reguła 2/3 — dlaczego pomiar ocenia się ostrzej niż obliczenie

Pomiar pętli wykonujesz na instalacji **zimnej**, a zwarcie zdarzy się na instalacji **gorącej**,
przy przewodach obciążonych i nagrzanych. Rezystancja żył będzie wtedy większa, więc prąd
zwarciowy — mniejszy niż wynika z pomiaru.

Dwie równoważne metody uwzględnienia tego:

$$Z_{s,zmierzona} \le \frac{2}{3} \cdot \frac{U_0}{I_a}
\qquad \text{albo} \qquad
Z_{s,przeliczona} = Z_{tr} + 1{,}2 \cdot (R_L + R_{PE}) + jX$$

Przykłady (TN, 230 V):

| Zabezpieczenie | I_a | Z_s max | Z_s zmierzona z regułą 2/3 |
|---|---|---|---|
| B10 | 50 A | 4,60 Ω | **3,07 Ω** |
| **B16** | 80 A | 2,88 Ω | **1,92 Ω** |
| B20 | 100 A | 2,30 Ω | **1,53 Ω** |
| **C16** | 160 A | 1,44 Ω | **0,96 Ω** |
| C25 | 250 A | 0,92 Ω | **0,61 Ω** |
| D16 | 320 A | 0,72 Ω | **0,48 Ω** |
| gG 25 A (5 s) | 110 A | 2,09 Ω | **1,39 Ω** |
| gG 63 A (5 s) | 320 A | 0,72 Ω | **0,48 Ω** |

Tabela jest policzona **bez współczynnika napięciowego** ($c = 1{,}00$) — tak podaje ją większość
ściągawek i tak jest w [rozdziale 07](07-sciagawka-wzory-i-wartosci.md). Z $c = 0{,}95$ wszystkie
wartości są o 5 % mniejsze; kalkulator pozwala przełączać oba warianty, więc nie zdziw się
różnicą 2,88 Ω wobec 2,73 Ω dla B16. Metodyka pomiaru — [rozdział 04](04-pomiary-ochronne.md).

---

## D. Typowe przykłady rachunkowe

### Przykład 1 — obwód gniazd, B16, 2,5 mm² Cu

WLZ 25 m / 16 mm², obwód 30 m / 2,5 mm², transformator 250 kVA, przewody 70 °C:

- transformator: 0,026 Ω,
- WLZ: $0{,}0214 \cdot 25 \cdot (1/16 + 1/16) = 0{,}067$ Ω,
- obwód: $0{,}0214 \cdot 30 \cdot (1/2{,}5 + 1/2{,}5) = 0{,}514$ Ω,
- razem (z reaktancjami) $Z_s \approx 0{,}59$ Ω → $I_k = 0{,}95 \cdot 230 / 0{,}59 \approx 370$ A.

B16 wymaga 80 A → **zapas ponad czterokrotny**, warunek spełniony. Zauważ, gdzie leży
90 % impedancji: w ostatnich 30 metrach cienkiego przewodu.

### Przykład 2 — ten sam obwód, ale 90 m

$Z_s \approx 1{,}62$ Ω → $I_k \approx 135$ A. Warunek dla B16 wciąż spełniony (80 A), ale
**pomiar z regułą 2/3 wymaga ≤ 1,92 Ω** — jesteś już blisko granicy. Dla C16 (160 A) warunek
**nie byłby spełniony**.

### Przykład 3 — dlaczego cienki PE psuje wszystko

Obwód 40 m, żyła fazowa 6 mm², ale PE tylko 2,5 mm²:

- $R = 0{,}0214 \cdot 40 \cdot (1/6 + 1/2{,}5) = 0{,}485$ Ω,
- gdyby PE też miał 6 mm²: $0{,}285$ Ω.

Cienki przewód ochronny **podniósł impedancję pętli o 70 %**, choć żyła fazowa jest gruba.
To najczęstsza przyczyna niespełnienia warunku przy poprawnie dobranym przewodzie fazowym.

---

## E. Czego kalkulator nie sprawdza

Warunek pętli to jeden z **czterech** warunków, jakie musi spełnić obwód:

| Warunek | Kryterium | Gdzie szukać |
|---|---|---|
| Samoczynne wyłączenie | $Z_s \cdot I_a \le c U_0$ | ten rozdział |
| Obciążalność prądowa | $I_B \le I_n \le I_z$ oraz $I_2 \le 1{,}45 I_z$ | [rozdział 07](07-sciagawka-wzory-i-wartosci.md) |
| Wytrzymałość cieplna przy zwarciu | $I^2 t \le k^2 S^2$ | [rozdział 07](07-sciagawka-wzory-i-wartosci.md) |
| Spadek napięcia | zwykle ≤ 4 % (oświetlenie ≤ 3 %) | kalkulator liczy orientacyjnie |

Dodatkowo kalkulator przyjmuje **zerową rezystancję łuku i przejścia** w miejscu zwarcia
(zwarcie metaliczne) oraz upraszcza impedancję źródła dla pętli L–PE do impedancji
transformatora — dokładniej byłoby $(2Z_1 + Z_0)/3$, co dla typowego transformatora Dyn
daje wynik bliski przyjętemu.

> **Ważne.** Wynik obliczenia nie zastępuje pomiaru, a wynik pomiaru nie zastępuje protokołu.
> Do protokołu trafia wartość zmierzona, warunek normatywny i **ocena**: spełnia / nie spełnia.

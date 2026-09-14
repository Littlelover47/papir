# 15. Trudne miejsca pomiarów SN/WN — przewodnik po części III

Ta część odpowiada na jedno pytanie: **co jest najtrudniejsze do zrozumienia jako pomiarowiec
przy pracy na rozdzielniach SN i WN?** Odpowiedź nie brzmi „obsługa mierników" ani „procedury".
Najtrudniejsze są rzeczy, których **nie widać na schemacie** i których **nie da się odczytać
z wyświetlacza przyrządu**.

> **Ważne.** Sedno całej części III da się streścić w jednym zdaniu:
> **najtrudniejsze jest przejście od „wykonałem pomiar zgodnie z procedurą" do „rozumiem, jakie
> zjawisko fizyczne właśnie zmierzyłem, jakie inne zjawiska mogły ten wynik zafałszować
> i co on znaczy dla tego konkretnego obiektu w tej konkretnej sieci".**
> Procedury opanowuje się w miesiącach. To — w latach.

---

## A. Dlaczego to jest trudne — trzy powtarzające się mechanizmy

Zanim przejdziemy do konkretów, warto zobaczyć **wzorce**. Prawie każda trudność z tej części
należy do jednego z trzech typów. Jeśli je rozpoznasz, przestaną cię zaskakiwać nowe przypadki.

### Mechanizm 1: przyrząd nie zgłasza błędu, tylko podaje złą liczbę

To najgroźniejszy z trzech. Miernik nie ma pojęcia, czy pomiar był sensowny — pokazuje wynik
obliczenia na tym, co dostał na zaciskach.

| Sytuacja | Co pokazuje przyrząd | Co jest naprawdę |
|---|---|---|
| Sonda prądowa za blisko siatki uziemiającej | ładną, stabilną wartość w omach | wynik zaniżony o kilkadziesiąt procent, pomiar nieważny (→ rozdz. 18) |
| Rezystancja izolacji mierzona w +35 °C | np. 500 MΩ | ok. 1400 MΩ po przeliczeniu na 20 °C (→ rozdz. 20) |
| Wskaźnik napięcia w rozdzielnicy ekranowanej | „brak napięcia" | pełne napięcie — brak drogi powrotnej dla prądu pojemnościowego (→ rozdz. 23) |
| Przekładnik nasycony przy zwarciu | prąd mniejszy od rzeczywistego | zabezpieczenie nie widzi awarii (→ rozdz. 19) |

**Obrona:** znać kryterium poprawności *pomiaru*, nie tylko kryterium oceny *wyniku*.
Dla uziemień to kształt krzywej, dla izolacji temperatura i czas, dla przekładników obliczenie
obciążenia.

### Mechanizm 2: usterka ujawnia się dopiero wtedy, gdy jest potrzebna

Cała klasa wad, które w ruchu normalnym nie dają żadnego objawu — i to właśnie czyni je groźnymi.

- **Odwrócona biegunowość przekładnika w zabezpieczeniu kierunkowym** — w ruchu normalnym
  $3I_0 \approx 0$, więc kierunek nie jest w ogóle sprawdzany. Przy zwarciu zabezpieczenie
  wyłącza pole zdrowe (→ rozdz. 19).
- **Ekran kabla nieprzeprowadzony przez przekładnik Ferrantiego** — prąd w ekranie kompensuje
  sygnał zwarcia, więc zabezpieczenie ziemnozwarciowe milczy (→ rozdz. 17).
- **Zły algorytm kierunkowy dla danego punktu neutralnego** — nastawy wyglądają poprawnie,
  zabezpieczenie nie działa (→ rozdz. 17).
- **Zabezpieczenie na rdzeniu pomiarowym** — prądy w ruchu normalnym poprawne, przy zwarciu
  rdzeń nasycony (→ rozdz. 19).

**Obrona:** testy, które celowo odtwarzają warunki awaryjne — injekcja wtórna z symulacją kątów,
pomiar wektorowy, sprawdzenie biegunowości. Pomiar rezystancji i ciągłości tego nie wykryje.

### Mechanizm 3: pomiar może zniszczyć obiekt

Sytuacja, w której samo badanie jest ingerencją.

- **Próba DC na kablu XLPE** — wstrzykuje ładunek przestrzenny, kabel przebija tygodnie później
  (→ rozdz. 22).
- **Charakterystyka magnesowania bez demagnetyzacji** — zostawiasz rdzeń z magnetyzmem
  szczątkowym, czyli w gorszym stanie niż był (→ rozdz. 19).
- **Zbyt wysokie napięcie probiercze na starej izolacji** — inicjacja przebicia w trakcie pomiaru
  (→ rozdz. 20).
- **Próba wytrzymałościowa** — świadomie akceptowane ryzyko przebicia, wymagające planu naprawy
  *przed* rozpoczęciem (→ rozdz. 22).

**Obrona:** rozróżnianie próby **wytrzymałościowej** (pass/fail, z ryzykiem) od pomiaru
**diagnostycznego** (nieniszczącego, trendowego) — i świadoma decyzja, którą wykonujesz.

---

## B. Ranking trudności i mapa rozdziałów

Kolejność odzwierciedla trudność *koncepcyjną*, nie ilość materiału.

| # | Temat | Rozdział | Na czym polega trudność |
|:-:|---|:-:|---|
| 1 | Napięcia indukowane w polu równoległym | [16](16-napiecia-indukowane.md) | dwa mechanizmy zachowujące się **przeciwnie** wobec uziemienia; uziemienie nie jest zerem potencjału |
| 2 | Punkt neutralny sieci SN | [17](17-punkt-neutralny-sieci-SN.md) | fizyka **sieci**, nie obiektu; z niej wynika połowa pozostałych tematów |
| 3 | Uziemienia w rozdzielni | [18](18-uziemienia-w-rozdzielni.md) | metoda podręcznikowa nie działa; liczy się napięcie rażeniowe, nie omy |
| 4 | Przekładniki | [19](19-przekladniki-pradowe-i-napieciowe.md) | wymagania odwrotne do intuicji; błędy niewidoczne w ruchu normalnym |
| 5 | Rezystancja izolacji i tg δ | [20](20-rezystancja-izolacji-i-tg-delta.md) | przejście od liczby do diagnozy; trzy wskaźniki czytane **razem** |
| 6 | Wyładowania niezupełne | [21](21-wyladowania-niezupelne.md) | pikokulomby w środowisku zakłóceń o rzędy wielkości większych |
| 7 | Próby napięciowe kabli | [22](22-proby-napieciowe-kabli.md) | pomiar, który może zniszczyć obiekt; DC szkodzi XLPE |
| 8 | Topologia i zasilanie zwrotne | [23](23-topologia-i-zasilanie-zwrotne.md) | najprostsze koncepcyjnie, a odpowiada za realne wypadki |

### Zalecana kolejność nauki

Trudność koncepcyjna to nie to samo co kolejność, w jakiej warto się uczyć. Rekomendacja:

1. **[Punkt neutralny sieci SN](17-punkt-neutralny-sieci-SN.md)** — fundament. Wynikają z niego
   naprężenia izolacji, prądy zwarciowe, logika zabezpieczeń ziemnozwarciowych i wymagania
   dla uziemień. Bez tego pozostałe rozdziały wiszą w powietrzu.
2. **[Topologia i zasilanie zwrotne](23-topologia-i-zasilanie-zwrotne.md)** — bo to bezpieczeństwo
   i bo jest najprostsze do opanowania.
3. **[Przekładniki](19-przekladniki-pradowe-i-napieciowe.md)** — brama do wszystkiego, co dotyczy
   obwodów wtórnych i zabezpieczeń.
4. **[Napięcia indukowane](16-napiecia-indukowane.md)** — wyjaśnia, dlaczego pomiary czasem
   „nie wychodzą" i dlaczego uziemienie robocze jest tam, gdzie jest.
5. **[Rezystancja izolacji i tg δ](20-rezystancja-izolacji-i-tg-delta.md)** — przejście od pomiaru
   do diagnozy.
6. **[Uziemienia](18-uziemienia-w-rozdzielni.md)** — trudne, ale policzalne i dobrze udokumentowane.
7. **[Próby napięciowe kabli](22-proby-napieciowe-kabli.md)** — wymaga już rozumienia rozdziału 20.
8. **[Wyładowania niezupełne](21-wyladowania-niezupelne.md)** — najbardziej specjalistyczne,
   ma sens po opanowaniu reszty.

---

## C. Symulatory — jak z nich korzystać

Każdy rozdział tej części ma co najmniej jeden interaktywny symulator. Nie są ozdobą — służą
do **wyrobienia intuicji liczbowej**, której nie da się dostać z tabelki.

| Rozdział | Symulator | Czego uczy |
|---|---|---|
| 16 | napięcia na torze odstawionym | że uziemienie jednostronne nie likwiduje sprzężenia indukcyjnego |
| 17 | punkt neutralny i wykres wskazowy | ile prądu doziemnego dodaje 1 km kabla, a ile 1 km linii |
| 18 | metoda spadku potencjału | jak wygląda pomiar bez plateau — i że miernik tego nie zgłosi |
| 19 | obciążenie i nasycenie przekładnika | jak długość trasy przewodów wysadza klasę dokładności |
| 20 | krzywa R(t) oraz tg δ | dlaczego kształt krzywej mówi więcej niż wartość |
| 21 | wzorce PRPD i reflektometria | jak rozpoznać rodzaj defektu i wyliczyć jego położenie |
| 22 | moc probiercza DC / VLF / AC | dlaczego obniżenie częstotliwości 500× zmienia wszystko |
| 23 | polowanie na źródła napięcia | ile źródeł ukrywa „wyłączone" pole |

**Sposób pracy:** najpierw zgadnij wynik, potem przesuń suwak. Wartość ćwiczenia leży
w momencie, w którym twoje oczekiwanie się nie zgadza.

---

## D. Słownik oznaczeń używanych w części III

Wszystkie symbole zebrane w jednym miejscu, żeby wzory w kolejnych rozdziałach nie wymagały
zgadywania. Kolumna „jednostka" podaje jednostkę stosowaną w praktyce pomiarowej.

### Napięcia i prądy

| Symbol | Jednostka | Znaczenie |
|---|---|---|
| $U_n$ | V, kV | **napięcie znamionowe** sieci — międzyfazowe (np. 15 kV, 110 kV) |
| $U_f$ | V, kV | **napięcie fazowe** (faza–ziemia): $U_f = U_n / \sqrt{3}$ |
| $U_0$ | V, kV | **składowa zerowa napięcia** — miara przesunięcia punktu neutralnego; w normalnej pracy ≈ 0, przy zwarciu doziemnym w sieci nieskutecznie uziemionej ≈ $U_f$ |
| $3I_0$ | A | **suma prądów trzech faz** — równa zeru w pracy normalnej, przy zwarciu doziemnym równa prądowi doziemnemu |
| $I_C$ | A | **prąd pojemnościowy** zwarcia doziemnego, pochodzący z pojemności doziemnej sieci |
| $I_L$ | A | prąd indukcyjny **dławika gaszącego** |
| $I_E$ | A | **prąd płynący do ziemi przez uziom** — mniejszy od prądu zwarcia o współczynnik redukcyjny |
| $I_F$ | A | pełny **prąd zwarcia** w miejscu uszkodzenia |
| $E$ | V | **siła elektromotoryczna** indukowana (np. w torze odstawionym) |

### Impedancje, rezystancje, pojemności

| Symbol | Jednostka | Znaczenie |
|---|---|---|
| $C_0$ | µF/fazę | **pojemność doziemna** jednej fazy sieci względem ziemi (sumarycznie dla całej sieci) |
| $C_{12}$ | pF, nF | **pojemność wzajemna** między torem czynnym a odstawionym |
| $C_{20}$ | pF, nF | pojemność **własna** toru odstawionego względem ziemi |
| $Z_m$ | Ω/km | **impedancja wzajemna** dwóch równoległych torów — decyduje o sprzężeniu indukcyjnym |
| $Z_E$ | Ω | **impedancja uziemienia** (dla siatek jest impedancją, nie czystą rezystancją) |
| $R_E$ | Ω | rezystancja uziomu |
| $\rho$ | Ω·m | **rezystywność gruntu** — parametr ziemi, nie uziomu |
| $\rho_s$ | Ω·m | rezystywność **warstwy powierzchniowej** (tłuczeń, typowo 2000–5000 Ω·m) |
| $R_{ct}$ | Ω | rezystancja uzwojenia wtórnego przekładnika prądowego |
| $Z_b$ | Ω | **obciążenie wtórne** przekładnika (przewody + przekaźnik + styki) |

### Wielkości diagnostyczne

| Symbol | Jednostka | Znaczenie |
|---|---|---|
| $\tan\delta$ | %, — | **współczynnik strat dielektrycznych**: stosunek prądu czynnego do biernego w izolacji |
| $\Delta\tan\delta$ | punkt proc. | **tip-up** — przyrost $\tan\delta$ przy wzroście napięcia; wskaźnik jonizacji we wtrąceniach |
| DAR | — | **wskaźnik absorpcji** ($R_{60\text{s}} / R_{30\text{s}}$) |
| PI | — | **wskaźnik polaryzacji** ($R_{10\text{min}} / R_{1\text{min}}$) |
| $K_T$ | — | **współczynnik korekty temperaturowej** rezystancji izolacji |
| $q$ | pC, nC | **ładunek pozorny** wyładowania niezupełnego — wielkość względna, zależna od układu pomiarowego |
| PDIV / PDEV | kV | napięcie **zapłonu** / **gaśnięcia** wyładowań niezupełnych |
| $v$ | m/µs | **prędkość fali** w kablu (XLPE ≈ 170, papier-olej ≈ 150) |

### Współczynniki i parametry klas

| Symbol | Znaczenie |
|---|---|
| ALF | **współczynnik graniczny dokładności** przekładnika zabezpieczeniowego — np. w klasie 5P20 ALF = 20, czyli błąd ≤ 5 % do 20-krotności prądu znamionowego |
| FS | **współczynnik bezpieczeństwa przyrządowego** rdzenia pomiarowego — powyżej FS·$I_n$ rdzeń celowo się nasyca, żeby chronić mierniki |
| $V_k$ | **napięcie punktu kolanowego** (knee point) — napięcie wtórne, przy którym 10 % wzrostu napięcia daje 50 % wzrostu prądu magnesującego |
| $r$ | **współczynnik redukcyjny** — jaka część prądu zwarcia wraca metalicznie (ekrany, przewody odgromowe) zamiast przez grunt |
| $k_u$ | **współczynnik uziemienia** — o ile rośnie napięcie faz zdrowych przy zwarciu doziemnym (1,73 w sieci izolowanej, ≤ 1,4 przy uziemieniu skutecznym) |
| $v$ (dławik) | **stopień rozstrojenia** dławika gaszącego: $v = (I_L - I_C)/I_C$ |

### Napięcia rażeniowe i odległości

| Symbol | Znaczenie |
|---|---|
| $U_E$ | **napięcie uziomowe** — potencjał całej siatki względem ziemi odległej |
| $U_T$ | **napięcie dotykowe** — między ręką na konstrukcji a stopami 1 m od niej |
| $U_S$ | **napięcie krokowe** — na dystansie 1 m |
| $U_{Tp}$ | **dopuszczalne** napięcie dotykowe, zależne od czasu trwania zwarcia |
| $D_L$ | granica **strefy prac pod napięciem** |
| $D_V$ | granica **strefy zbliżenia** |

---

## E. Trzy wzory, które warto znać na pamięć

Resztę można wyprowadzić lub odszukać. Te trzy wracają w każdym rozdziale.

**1. Prąd pojemnościowy zwarcia doziemnego** — decyduje o wyborze punktu neutralnego:

$$I_C = 3 \cdot \omega \cdot C_0 \cdot U_f$$

gdzie $\omega = 2\pi f \approx 314\ \text{rad/s}$ dla 50 Hz, $C_0$ — pojemność doziemna jednej fazy
całej sieci, $U_f$ — napięcie fazowe. **Trójka** bierze się z tego, że przy zwarciu jednej fazy
prąd zbiera się z pojemności wszystkich trzech faz sieci.

**2. Korekta temperaturowa rezystancji izolacji** — bez niej pomiary są nieporównywalne:

$$K_T = 2^{\frac{T - 20}{10}} \qquad R_{20} = R_T \cdot K_T$$

Reguła praktyczna: **rezystancja izolacji zmienia się dwukrotnie na każde 10 °C.**

**3. Obciążenie wtórne przewodów przekładnika** — najczęstsza przyczyna nasycenia:

$$R_{\text{przewody}} = \frac{2 \cdot \rho \cdot l}{S}$$

gdzie $\rho \approx 0{,}0175\ \Omega\cdot\text{mm}^2/\text{m}$ dla miedzi, $l$ — długość trasy
w jedną stronę, $S$ — przekrój. **Dwójka** to pętla tam i z powrotem — jej pominięcie to błąd
o 100 %.

---

## F. Zastrzeżenie

> **Ważne.** Wartości liczbowe w części III są **orientacyjne** i służą wyrobieniu intuicji.
> Symulatory posługują się uproszczonymi modelami, dobranymi tak, aby poprawnie oddawały
> *tendencje i rzędy wielkości*, a nie żeby zastępowały obliczenia projektowe.
> Obowiązuje dokumentacja obiektu, aktualne wydania norm (m.in. PN-EN 50522, PN-EN 50110,
> PN-HD 60364, IEC 60270, IEEE 400.2, IEEE 43) oraz instrukcje producenta aparatury pomiarowej.
> Modele i założenia są jawnie opisane w każdym rozdziale — sprawdź je przed użyciem wyniku
> do czegokolwiek poza nauką.

---

**Następny rozdział:** [16. Napięcia indukowane w polu równoległym](16-napiecia-indukowane.md) —
zaczynamy od tematu numer jeden na liście trudności.

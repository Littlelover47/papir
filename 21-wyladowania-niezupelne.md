# 21. Wyładowania niezupełne (WNZ)

Najbardziej specjalistyczny temat w całej części III. Zadanie brzmi: **zmierzyć pikokulomby
w środowisku, gdzie zakłócenia są o rzędy wielkości większe od sygnału**, a potem z kształtu
rozkładu wywnioskować, jaki to defekt i gdzie się znajduje.

> **Ważne.** Wyładowania niezupełne to **główny mechanizm starzenia izolacji stałej**.
> Dlatego mierzy się je prewencyjnie — nie po awarii, a żeby jej uniknąć.

---

## A. Zjawisko

### Mechanizm

Lokalne przebicie w mikroskopijnej pustce gazowej wewnątrz izolacji stałej, gdy natężenie pola
w pustce przekroczy wytrzymałość gazu. Przebicie **nie obejmuje całej izolacji** — stąd nazwa
„niezupełne".

Dlaczego pustka przebija się pierwsza, choć jest maleńka? Dwa powody działają razem:

1. **Pole w pustce jest wyższe** niż w otaczającej izolacji o czynnik $\varepsilon_r$, bo
   $\varepsilon_r$ gazu ≈ 1, a XLPE ≈ 2,3. Pole „skupia się" w pustce.
2. **Wytrzymałość gazu jest niższa** od wytrzymałości izolacji stałej (prawo Paschena).

### Parametry

| Wielkość | Rząd | Znaczenie |
|---|---|---|
| ładunek jednego zdarzenia | pC – nC | to, co mierzysz |
| czas trwania impulsu | nanosekundy | dlatego widmo sięga setek MHz |
| **PDIV** | kV | *Partial Discharge Inception Voltage* — napięcie **zapłonu** |
| **PDEV** | kV | *Partial Discharge Extinction Voltage* — napięcie **gaśnięcia** |

> **Uwaga.** PDEV < PDIV — występuje **histereza**. Raz zapalone wyładowanie utrzymuje się przy
> napięciu niższym od tego, które było potrzebne do zapłonu. Praktyczna konsekwencja: przepięcie
> łączeniowe może zainicjować proces, który potem trwa przy napięciu roboczym.

### Skutki

Erozja ścianek pustki → rozwój **drzewienia elektrycznego** → przebicie. Proces liczony
w miesiącach do lat, ale nieodwracalny.

---

## B. Pomiar elektryczny wg IEC 60270 i pułapka kalibracji

### Układ

Kondensator sprzęgający $C_k$ równolegle do obiektu, impedancja pomiarowa w gałęzi uziemiającej,
wzmacniacz o pasmie **30 kHz – 1 MHz** (wąskopasmowy) lub szerszym.

### Kalibracja

Wstrzyknięcie znanego ładunku (kalibrator, np. 100 pC) do obiektu i przypisanie odpowiedzi
przyrządu tej wartości.

> **Ważne.** Pikokulomby **nie są wielkością absolutną**. Zmierzony ładunek **pozorny** zależy od:
> pojemności obiektu, pojemności kondensatora sprzęgającego, długości i geometrii przewodów.
> Wynik „500 pC" bez opisu układu i drogi kalibracji **nie znaczy nic**, a każda zmiana
> konfiguracji — inny obiekt, inne przewody, inna pozycja kondensatora — **wymaga ponownej
> kalibracji**.

---

## C. Poziom tła — realna bariera pomiaru

Szukasz sygnałów rzędu **10–100 pC**. W czynnej stacji tło (koronacja aparatury, energoelektronika,
radio, przełączenia) daje **100–1000 pC**. Stąd wymagania, które wyglądają na przesadne, a nie są:

- hala ekranowana albo ekranowanie lokalne,
- filtry sieciowe na zasilaniu układu probierczego,
- **transformator probierczy bezwyładowaniowy** — własny poziom WNZ poniżej 5 pC; bez tego
  mierzysz swoje własne źródło,
- bramkowanie czasowe,
- **korelacja dwóch czujników** — sygnał rzeczywisty dotrze do obu z określonym opóźnieniem,
  zakłócenie zewnętrzne praktycznie jednocześnie.

---

## D. Metody bezelektryczne

Bo pomiar elektryczny wg IEC 60270 często nie da się zastosować w czynnym obiekcie.

| Metoda | Pasmo | Zaleta | Wada |
|---|---|---|---|
| **akustyczna (AE)** | 20–300 kHz | świetna **lokalizacja** przez triangulację czujników; obiekt może pracować | mała czułość, silne tłumienie w oleju i przez stal |
| **UHF** | 0,3–3 GHz | **doskonała odporność na zakłócenia** — zakłócenia sieciowe i koronacja nie mają składowych UHF; standard dla GIS | wymaga wbudowanych czujników lub okien dielektrycznych; ładunek trudno skwantyfikować |
| **TEV** | 3–100 MHz | szybki przegląd rozdzielnic SN **bez wyłączania**, czujnik przykładany do obudowy | tylko orientacyjnie, nie mierzy pC |
| **optyczna / UV** | 240–280 nm (*solar-blind*) | wykrywa koronację i wyładowania powierzchniowe z odległości | tylko wyładowania widoczne, nie wewnętrzne |
| **ultradźwiękowa powietrzna** | ok. 40 kHz | tanie, szybkie skanowanie napowietrznych | tylko wyładowania w powietrzu |

> **Ważne.** Metoda **UHF** obchodzi problem tła nie przez tłumienie zakłóceń, a przez wybór
> pasma, w którym zakłóceń po prostu nie ma. To najelegantsze rozwiązanie — i dlatego stała się
> standardem dla rozdzielnic gazowych.

---

## E. Symulator — wzorce PRPD

**PRPD** (*Phase-Resolved Partial Discharge pattern*) to wykres amplitudy zdarzeń w funkcji fazy
napięcia 50 Hz, z gęstością zdarzeń jako trzecim wymiarem. To narzędzie **rozpoznawania rodzaju
defektu**, a nie tylko pomiaru poziomu.

Przełączaj rodzaje defektów i zwróć uwagę na **symetrię między połówkami**. Potem podnieś tło
i zobacz, kiedy defekt przestaje być czytelny.

<div class="dg-widget" data-typ="prpd"></div>

### Klucz do czytania PRPD

| Wzorzec | Charakterystyka | Diagnoza |
|---|---|---|
| **wtrącenie gazowe wewnętrzne** | dwa **symetryczne** skupiska na zboczach narastających obu połówek, podobne amplitudy | defekt rozwojowy, najpoważniejszy |
| **wyładowanie powierzchniowe** | **asymetryczne** między połówkami, szerszy rozrzut fazowy | zabrudzenie, wilgoć, wadliwe sterowanie polem w głowicy |
| **koronacja (ostrze–płaszczyzna)** | **tylko jedna połówka**, bardzo regularne, mała amplituda, dużo zdarzeń | ostra krawędź, zadzior, luźny drut — mało groźne dla izolacji stałej |
| **iskrzenie stykowe / luźna część** | **przypadkowe fazowo**, brak korelacji z napięciem, duże amplitudy | defekt mechaniczny: luźne połączenie, pływający potencjał |

> **Ważne.** Reguła, która porządkuje całe czytanie PRPD: **symetria między połówkami wskazuje
> defekt wewnętrzny, asymetria — defekt na elektrodzie.** Pustka w objętości izolacji „nie wie",
> która polaryzacja jest która, więc zachowuje się symetrycznie. Emisja z ostrza zależy
> od polaryzacji, więc jest asymetryczna.

---

## F. Symulator — lokalizacja WNZ w kablu

Impuls WNZ powstały w defekcie biegnie w **oba kierunki** wzdłuż kabla. Na końcu pomiarowym
rejestrujesz impuls bezpośredni, a po odbiciu od dalszego końca — impuls odbity.

<div class="dg-widget" data-typ="tdr"></div>

### Wzór i objaśnienie oznaczeń

$$x = L - \frac{v \cdot \Delta t}{2}$$

| Oznaczenie | Jednostka | Znaczenie |
|---|---|---|
| $x$ | m, km | odległość defektu od końca pomiarowego |
| $L$ | m, km | całkowita długość kabla |
| $v$ | m/µs | **prędkość fali** w kablu |
| $\Delta t$ | µs | zmierzone opóźnienie impulsu odbitego względem bezpośredniego |

Prędkości fali:

| Izolacja | $v$ |
|---|---|
| XLPE | 160–170 m/µs |
| papier-olej | ok. 150 m/µs |

### Skąd bierze się ten wzór

- impuls bezpośredni przebywa drogę $x$,
- impuls odbity przebywa $(L - x)$ do końca dalszego, a potem $L$ z powrotem, czyli $2L - x$,
- różnica dróg to $2(L - x)$, a więc $\Delta t = 2(L-x)/v$,
- po przekształceniu otrzymujesz wzór powyżej.

> **Ważne.** Jedyną wielkością, którą faktycznie **mierzysz**, jest $\Delta t$. Wszystko inne
> to obliczenie — więc prędkość fali $v$ musi być prawdziwa dla tej konstrukcji.
> Najlepiej ją **zmierzyć na tym kablu**: impuls TDR z jednego końca i czas odbicia od znanego
> końca. Pomyłka XLPE/papier to około 12 % błędu położenia.

### Trudności praktyczne

1. **Mufy dają odbicia** od skokowej zmiany impedancji falowej — łatwo pomylić z defektem.
   Konieczna dokumentacja montażowa z kilometrażem muf.
2. **Tłumienie rośnie z odległością.** Defekt oddalony daje mniejszą amplitudę, choć fizycznie
   może być poważniejszy. Bez korekty tłumieniowej **ranking defektów wychodzi odwrotny
   do prawdziwego**.
3. **Dyspersja** — impuls się rozmywa i wydłuża, więc rozdzielczość lokalizacji spada z odległością.

---

## G. OWTS / DAC — praktyczny standard dla kabli SN

**OWTS** (*Oscillating Wave Test System*) / **DAC** (*Damped AC*): kabel ładowany napięciem stałym
do zadanego poziomu, następnie zwierany przez indukcyjność, co daje **tłumiony przebieg
oscylacyjny** o częstotliwości setek Hz. Podczas tych kilku–kilkunastu okresów rejestrowane są
wyładowania z jednoczesną lokalizacją.

Zalety:

- urządzenie przenośne,
- naprężenie zbliżone do AC,
- **brak długotrwałego DC**, więc brak problemu ładunku przestrzennego
  (→ [rozdział 22](22-proby-napieciowe-kabli.md)),
- jednoczesna diagnostyka i mapowanie.

### Wynik końcowy: mapa WNZ kabla

Wykres ładunku pozornego w funkcji pozycji, nałożony na schemat muf i głowic.

> **Ważne.** **Koncentracja wyładowań w mufie oznacza wadliwy montaż** — a to jest
> **najczęstsza przyczyna awarii kabli SN**, częstsza niż wada fabryczna samego kabla.
> Dlatego mapa WNZ jest tak wartościowa: wskazuje nie tylko „kabel jest zły", ale konkretną
> mufę do wymiany.

---

## H. Lista kontrolna badania WNZ

- [ ] Zmierzony i udokumentowany **poziom tła** przed badaniem obiektu.
- [ ] Kalibracja wykonana **w tym samym układzie**, w jakim będzie pomiar.
- [ ] Sprawdzony własny poziom WNZ układu probierczego (transformator, przewody, głowice).
- [ ] Znany typ izolacji i prędkość fali — najlepiej zmierzona, nie z tabeli.
- [ ] Dostępna dokumentacja montażowa z kilometrażem muf i głowic.
- [ ] Zastosowana korekta tłumieniowa przy ocenie amplitud.
- [ ] Zarejestrowany wzorzec PRPD, nie tylko wartość szczytowa w pC.
- [ ] W protokole opisana metoda, pasmo, droga kalibracji i poziom tła.

---

## I. Pytania kontrolne

1. Dlaczego pole elektryczne w mikroskopijnej pustce gazowej jest **wyższe** niż w otaczającej
   izolacji stałej?
2. Co znaczy, że PDEV < PDIV, i jaki to ma skutek praktyczny?
3. Dlaczego wynik „500 pC" bez opisu układu pomiarowego nie ma wartości?
4. Wzorzec PRPD pokazuje zdarzenia tylko w jednej połówce, regularne, o małej amplitudzie.
   Jaki to defekt i czy jest groźny dla izolacji stałej?
5. Kabel 4 km, XLPE, $\Delta t$ = 30 µs. Gdzie jest defekt?
6. Dlaczego bez korekty tłumieniowej ranking defektów może wyjść odwrotny do prawdziwego?
7. Co oznacza koncentracja WNZ w mufie?

> **Odpowiedź do pytania 5.** $x = L - v\Delta t/2 = 4000 - 170 \cdot 30/2 = 4000 - 2550 = 1450$ m,
> czyli **1,45 km** od końca pomiarowego. Sprawdzenie sensowności: impuls bezpośredni przebył
> 1450 m (8,5 µs), odbity $2 \cdot 4000 - 1450 = 6550$ m (38,5 µs), różnica 30 µs — zgadza się.
> Zawsze wykonuj to sprawdzenie, bo pomyłka o czynnik 2 w tym wzorze jest bardzo łatwa.

---

**Poprzedni:** [20. Rezystancja izolacji i tg δ](20-rezystancja-izolacji-i-tg-delta.md) ·
**Następny:** [22. Próby napięciowe kabli](22-proby-napieciowe-kabli.md)

# 19a. Przekładniki prądowe — podłączenie, biegunowość i kierunkowość zabezpieczeń ziemnozwarciowych

Rozdział 19 opisuje, **jak przekładnik działa** i jak go dobrać. Ten rozdział opisuje,
**jak go podłączyć**, żeby zabezpieczenie widziało prąd z właściwym znakiem, oraz **wszystko,
co decyduje o kierunkowości** zabezpieczenia ziemnozwarciowego (I₀> ⟶, kod ANSI 67N).

> **Najważniejsze zdanie rozdziału.** Zabezpieczenie kierunkowe podejmuje decyzję na podstawie
> **znaku** jednej liczby: rzutu wskazu $3I_0$ na oś odniesienia wyznaczoną przez $U_0$.
> Każdy błąd, który odwraca jeden z tych wskazów o 180° — biegunowość przekładnika, punkt
> gwiazdowy, nastawa w przekaźniku, polaryzacja otwartego trójkąta — **odwraca decyzję**.
> Żaden z tych błędów nie daje objawu w ruchu normalnym, bo wtedy $3I_0 \approx 0$ i $U_0 \approx 0$.

---

## A. Oznaczenia zacisków i reguła biegunowości

| Zacisk | Znaczenie | Dawne oznaczenie |
|---|---|---|
| **P1, P2** | uzwojenie (tor) pierwotne | K, L |
| **S1, S2** | uzwojenie wtórne | k, l |
| **1S1–1S2, 2S1–2S2, …** | kolejne rdzenie tego samego przekładnika (pomiarowy, zabezpieczeniowy, …) | 1k–1l, 2k–2l |
| **S1–S2–S3** | rdzeń z odczepem — dwie przekładnie wtórne (np. 200/1 na S1–S2, 400/1 na S1–S3) | — |
| **C1, C2** | przełączanie przekładni po stronie pierwotnej (sekcje uzwojenia pierwotnego) | — |

Oznaczenia wg PN-EN 61869-2. **Reguła biegunowości:** zaciski P1 i S1 są jednoimienne.
Gdy prąd pierwotny **wpływa do P1**, prąd wtórny w tej samej chwili **wypływa z S1** do obwodu
zewnętrznego (przekaźnika). Prąd wtórny jest wtedy w fazie z pierwotnym — z dokładnością do
błędu kątowego przekładnika.

<div class="dg-rysunek"><svg viewBox="0 0 660 215" class="dg-svg" role="img" aria-label="Przekładnik prądowy: prąd wpływa do zacisku P1 od strony szyn, prąd wtórny wypływa z zacisku S1 do przekaźnika, zacisk S2 uziemiony w jednym punkcie">
<text class="dg-t-b" x="10" y="18">Kierunek odniesienia: od szyn do linii</text>
<path class="dg-przewod zywy" style="stroke-width:6" d="M40 34 V96"/><text class="dg-t-m sr" x="40" y="112">szyny</text>
<path class="dg-przewod zywy" d="M40 62 H620"/><text class="dg-t-m kon" x="620" y="52">linia / odpływ →</text>
<path style="fill:none;stroke:var(--ostrzezenie);stroke-width:2.4" d="M120 50 H170 M162 44 L170 50 L162 56"/><text class="dg-t-num uwaga" x="120" y="42">I₁</text>
<circle cx="300" cy="62" r="22" style="fill:none;stroke:var(--roz);stroke-width:3"/>
<text class="dg-t-num roz" x="250" y="46">P1</text><text class="dg-t-num roz" x="330" y="46">P2</text>
<path class="dg-przewod zywy" d="M288 82 V150 M312 82 V150"/>
<text class="dg-t-num roz kon" x="282" y="104">S1</text><text class="dg-t-num roz" x="318" y="104">S2</text>
<path style="fill:none;stroke:var(--ostrzezenie);stroke-width:2.4" d="M272 116 V138 M266 130 L272 138 L278 130"/><text class="dg-t-num uwaga kon" x="264" y="134">I₂</text>
<rect x="250" y="150" width="100" height="36" rx="5" style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:2"/><text class="dg-t sr" x="300" y="173">przekaźnik</text>
<path class="dg-przewod zywy" d="M312 122 H380 V140"/><path class="dg-ziemia" d="M368 140 H392 M372 146 H388 M377 152 H383"/>
<text class="dg-t-m" x="396" y="126">S2 uziemione — w jednym punkcie</text>
<text class="dg-t-m" x="400" y="90">prąd wpływa do P1 → wypływa z S1</text>
<text class="dg-t-m" x="400" y="106">P1 typowo od strony szyn — potwierdź w projekcie</text>
<text class="dg-t-m" x="10" y="208">Wskaz I₂ w przekaźniku „patrzy” wtedy w kierunku linii: dodatni prąd = przepływ od szyn do linii = „do przodu”.</text>
</svg></div>

### Konwencja „do przodu"

W polach odpływowych przyjmuje się zwykle, że **P1 jest od strony szyn**, więc dodatni prąd
wtórny oznacza przepływ **od szyn do linii**, czyli w stronę chronionego obiektu. Przekaźnik
nie wie jednak, jak przekładnik zamontowano — **dowiaduje się tego z nastawy** (punkt D).
Obowiązuje zawsze schemat projektu, a nie zwyczaj.

---

## B. Prawidłowe podłączenie obwodu wtórnego — dziesięć zasad

1. **Obwodu wtórnego pod prądem nie wolno rozewrzeć.** Nie ma w nim bezpieczników ani
   łączników. Stosuje się wyłącznie **zaciski probiercze** (rozłączalne) z mostkami zwierającymi.
2. **Kolejność przy odłączaniu przekaźnika:** najpierw zewrzyj obwód **od strony przekładnika**
   (mostek lub wtyk zwierający), dopiero potem rozłącz przekaźnik. Przy przywracaniu — w odwrotnej
   kolejności: najpierw połącz przekaźnik, potem zdejmij zwarcie. Po próbach sprawdź, czy
   **żaden mostek nie został** — zwarty obwód przed przekaźnikiem to zabezpieczenie „ślepe".
3. **Uziemienie w jednym punkcie.** Uziemienie chroni przed pojawieniem się wysokiego napięcia
   przy przebiciu izolacji między uzwojeniem pierwotnym a wtórnym. **Drugi punkt uziemienia**
   tworzy pętlę przez sieć uziemień. Przy zwarciu doziemnym różnica potencjałów w stacji wymusza
   w niej prąd, który przekaźnik uzna za prąd zwarcia. Punkt uziemienia to zwykle
   **zaciski przekładnika lub najbliższa listwa**. Gdy kilka zestawów przekładników pracuje na
   wspólny obwód (różnicowe), obwód ma jeden punkt uziemienia — zwykle przy przekaźniku.
4. **Nieużywany rdzeń:** zewrzyj S1–S2 **na zaciskach przekładnika** i uziem.
5. **Rdzeń z odczepem:** podłączasz wybraną parę (S1–S2 albo S1–S3). **Niewykorzystany odczep
   zostaje wolny — nie zwieraj go.** Zwarcie części uzwojenia zmienia przekładnię i przegrzewa
   rdzeń. Zwiera się wyłącznie **cały** nieużywany rdzeń.
6. **Przekładnię po stronie pierwotnej** (C1–C2) przełącza się tylko zgodnie z tabliczką
   i dokumentacją producenta, a po przełączeniu sprawdza przekładnię pomiarem.
7. **Przekrój i obciążenie:** co najmniej 2,5 mm² Cu. Przy obwodach 5 A i długich trasach
   stosuje się 4–6 mm², a obciążenie sprawdza rachunkiem — patrz [rozdział 19, punkt D](19-przekladniki-pradowe-i-napieciowe.md).
8. **Trzy fazy i przewód powrotny w jednym kablu.** Rozdzielenie ich na osobne trasy tworzy
   pętlę, w której indukuje się napięcie z prądów pierwotnych.
9. **Przydział faz:** przekładnik L1 → wejście I<sub>L1</sub> itd. Przydział musi być **ten sam**
   co w obwodach napięciowych. Zamiana faz między torem prądowym a napięciowym psuje kierunkowe
   zabezpieczenia fazowe (67) i pomiar mocy.
10. **Wszystkie trzy przekładniki jednakowo:** ten sam kierunek montażu (P1 w tę samą stronę)
    i punkt gwiazdowy po tej samej stronie (S2 albo S1) we wszystkich fazach.

<div class="dg-rysunek"><svg viewBox="0 0 660 250" class="dg-svg" role="img" aria-label="Trzy przekładniki w układzie gwiazdy: zaciski S1 do wejść fazowych przekaźnika, zaciski S2 połączone w punkt gwiazdowy, powrót przez wejście IN tworzy filtr Holmgreena, punkt gwiazdowy uziemiony">
<text class="dg-t-b" x="10" y="16">Gwiazda z przewodem powrotnym — filtr Holmgreena (3I₀ w wejściu I_N)</text>
<path class="dg-przewod zywy" d="M20 40 H640 M20 72 H640 M20 104 H640"/>
<text class="dg-t-m" x="22" y="34">L1</text><text class="dg-t-m" x="22" y="66">L2</text><text class="dg-t-m" x="22" y="98">L3</text>
<text class="dg-t-m kon" x="640" y="34">→ linia</text><text class="dg-t-m" x="44" y="34">szyny →</text>
<circle cx="130" cy="40" r="12" style="fill:none;stroke:var(--roz);stroke-width:2.6"/>
<circle cx="210" cy="72" r="12" style="fill:none;stroke:var(--roz);stroke-width:2.6"/>
<circle cx="290" cy="104" r="12" style="fill:none;stroke:var(--roz);stroke-width:2.6"/>
<text class="dg-t-m roz kon" x="116" y="30">P1</text><text class="dg-t-m roz kon" x="196" y="62">P1</text><text class="dg-t-m roz kon" x="276" y="94">P1</text>
<path class="dg-przewod zywy" style="stroke-width:1.8" d="M124 51 V184 M204 83 V184 M284 115 V184"/>
<path class="dg-przewod zywy" style="stroke-width:1.8" d="M136 51 V150 M216 83 V150 M296 115 V150 M136 150 H380 M340 150 V184 M380 150 V162"/>
<path class="dg-ziemia" d="M368 162 H392 M372 168 H388 M377 174 H383"/>
<text class="dg-t-m kon" x="120" y="140">S1</text><text class="dg-t-m" x="140" y="140">S2</text>
<rect x="100" y="184" width="270" height="40" rx="5" style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:2"/>
<text class="dg-t-m sr" x="124" y="208">I_L1</text><text class="dg-t-m sr" x="204" y="208">I_L2</text><text class="dg-t-m sr" x="284" y="208">I_L3</text><text class="dg-t-m sr roz" x="340" y="208">I_N</text>
<text class="dg-t-m" x="410" y="140">S1 → wejścia fazowe przekaźnika</text>
<text class="dg-t-m" x="410" y="156">S2 → punkt gwiazdowy (tu: od strony S2)</text>
<text class="dg-t-m" x="410" y="172">powrót gwiazdy przez I_N = suma = 3I₀</text>
<text class="dg-t-m" x="410" y="188">gwiazda uziemiona w jednym punkcie</text>
<text class="dg-t-m roz" x="410" y="208">nastawa przekaźnika musi wiedzieć,</text>
<text class="dg-t-m roz" x="410" y="222">po której stronie jest punkt gwiazdowy</text>
</svg></div>

---

## C. Układy połączeń i do czego się nadają

| Układ | Co mierzy | Do ziemnozwarciowego? | Uwagi |
|---|---|---|---|
| **Gwiazda pełna** (3 przekładniki + powrót) | $I_{L1}, I_{L2}, I_{L3}$ i sumę w przewodzie powrotnym | tak, jako **filtr Holmgreena** — tylko przy dużych prądach doziemnych | sieci z rezystorem; próg zwykle > 10–20 % $I_n$ przekładnika |
| **Gwiazda, 3I₀ liczone w przekaźniku** | jak wyżej, sumę liczy program | jak wyżej — to ten sam filtr, te same błędy | przekaźniki cyfrowe; wejście I_N może wtedy obsługiwać Ferrantiego |
| **Niepełna gwiazda (układ V)** — przekładniki w L1 i L3 | $I_{L1}, I_{L3}$; $I_{L2}$ wyliczone przy założeniu $\Sigma I = 0$ | **nie** — z założenia nie widzi składowej zerowej | stare pola odpływowe w sieciach izolowanych |
| **Ferrantiego** (przekładnik kablowy, obejmujący) | $3I_0$ bezpośrednio — strumień sumy prądów trzech żył | **tak — podstawowe rozwiązanie w sieciach izolowanych i kompensowanych** | czułość rzędu 0,5–1 A pierwotnie; krytyczny montaż ekranu (punkt E) |
| **Trójkąt po stronie wtórnej** | różnice prądów fazowych | nie | dawniej w różnicowych transformatorów; dziś kompensację grupy połączeń robi program |

Dlaczego filtr Holmgreena zawodzi przy małych prądach doziemnych — rachunek jest
w [rozdziale 17, punkt F.1](17-punkt-neutralny-sieci-SN.md).

---

## D. Punkt gwiazdowy i nastawa kierunku w przekaźniku

Punkt gwiazdowy można utworzyć na zaciskach S2 (wtedy do przekaźnika idą S1) albo na S1
(do przekaźnika idą S2). Druga wersja **odwraca wszystkie prądy o 180°**. Obie są poprawne,
jeśli przekaźnik wie, którą zastosowano. Służy do tego nastawa, różnie nazywana u różnych
producentów, np. *punkt gwiazdowy przekładnika w stronę linii / w stronę szyn* albo
*w stronę obiektu / od obiektu*. Znaczenie nastawy sprawdź w instrukcji konkretnego przekaźnika.

Tak samo działa osobna nastawa dla wejścia I_N (przekładnik Ferrantiego) oraz, w wielu
przekaźnikach, nastawa **odwrócenia polaryzacji U₀**.

> **Pułapka dwóch błędów.** Przekładnik odwrócony fizycznie **i** odwrócona nastawa dają układ,
> który działa poprawnie. Po wymianie przekaźnika na nowy z domyślnymi nastawami albo po
> przełożeniu przekładnika podczas remontu zostaje już tylko jeden z błędów. Pole nagle zaczyna
> działać odwrotnie, a „przecież nikt nic nie zmieniał w obwodach". Każdą „kompensację nastawą"
> **wpisuj do protokołu i do schematu**.

---

## E. Przekładnik Ferrantiego — montaż, który decyduje o wszystkim

### Zasada ekranu

Ekran (żyła powrotna, pancerz) kabla jest połączony z ziemią na głowicy. Przy zwarciu doziemnym
i przy przepływie prądów pojemnościowych **prąd wraca ekranem**. Jeśli ten prąd przejdzie przez
okno przekładnika tylko raz, odejmie się od prądu żył i zabezpieczenie zobaczy
**prawie zero albo przypadkowy wskaz o dowolnym kierunku**.

**Reguła:** prąd ekranu musi przez okno przejść **per saldo zero razy**:

- połączenie ekranu z ziemią (głowica) jest **po stronie szyn** od przekładnika → przewód uziemiający
  ekranu **wraca przez okno** i dopiero za nim łączy się z szyną uziemiającą,
- ekran uziemiony **przed** przekładnikiem (od strony kabla, poniżej okna) → przewód uziemiający
  **nie może** przechodzić przez okno.

<div class="dg-rysunek"><svg viewBox="0 0 660 325" class="dg-svg" role="img" aria-label="Przekładnik Ferrantiego: poprawne prowadzenie przewodu uziemiającego ekranu z powrotem przez okno oraz błędne prowadzenie z pominięciem okna">
<text class="dg-t-b ok" x="10" y="18">Poprawnie — przewód ekranu wraca przez okno</text>
<text class="dg-t-b alarm" x="340" y="18">Błąd — przewód ekranu omija okno</text>
<path class="dg-os" d="M330 28 V318"/>
<rect x="96" y="40" width="48" height="30" rx="4" style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:2"/><text class="dg-t-m" x="150" y="54">głowica</text>
<path class="dg-przewod zywy" style="stroke-width:5" d="M120 70 V280"/>
<path style="fill:none;stroke:var(--atrament-3);stroke-width:1.8" d="M132 74 H150 V240 H230 V250"/>
<path class="dg-ziemia" d="M218 250 H242 M222 256 H238 M227 262 H233"/>
<ellipse cx="130" cy="170" rx="44" ry="13" style="fill:none;stroke:var(--roz);stroke-width:3"/>
<text class="dg-t-m roz" x="180" y="166">okno przekładnika</text>
<path style="fill:none;stroke:var(--ostrzezenie);stroke-width:2" d="M108 220 V196 M103 204 L108 196 L113 204"/><text class="dg-t-m uwaga kon" x="102" y="214">ekran</text>
<path style="fill:none;stroke:var(--ostrzezenie);stroke-width:2" d="M160 120 V144 M155 136 L160 144 L165 136"/><text class="dg-t-m uwaga" x="166" y="134">przewód</text>
<text class="dg-t-m ok" x="20" y="304">prąd ekranu przechodzi tam i z powrotem → znosi się</text>
<rect x="426" y="40" width="48" height="30" rx="4" style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:2"/><text class="dg-t-m" x="480" y="54">głowica</text>
<path class="dg-przewod zywy" style="stroke-width:5" d="M450 70 V280"/>
<path class="dg-przewod grozny" style="stroke-width:1.8" d="M462 74 H560 V96"/>
<path class="dg-ziemia" d="M548 96 H572 M552 102 H568 M557 108 H563"/>
<ellipse cx="460" cy="170" rx="44" ry="13" style="fill:none;stroke:var(--roz);stroke-width:3"/>
<path style="fill:none;stroke:var(--ostrzezenie);stroke-width:2" d="M438 220 V196 M433 204 L438 196 L443 204"/><text class="dg-t-m uwaga kon" x="432" y="214">ekran</text>
<text class="dg-t-m alarm" x="510" y="170">przez okno idzie</text>
<text class="dg-t-m alarm" x="510" y="186">żyła + ekran</text>
<text class="dg-t-m alarm" x="350" y="300">prąd powrotny ekranu odejmuje się od prądu żył</text>
<text class="dg-t-m alarm" x="350" y="316">→ 3I₀ ≈ 0: zabezpieczenie nie widzi zwarcia</text>
</svg></div>

### Pozostałe wymagania montażowe

- Okno obejmuje **wszystkie trzy żyły** (albo wszystkie trzy kable jednożyłowe danego pola razem).
  Kabel prowadzi się **centralnie i prostopadle** do okna. Kabel dociśnięty do jednej strony rdzenia
  daje pozorny $3I_0$ przy dużych prądach fazowych.
- **Orientacja:** strona oznaczona P1 (albo strzałka na obudowie) — zgodnie z projektem,
  zwykle w stronę szyn. Przekładnik założony „do góry nogami" odwraca kierunek tak samo jak
  zamiana S1 i S2.
- Przewód uziemiający ekranu jest **izolowany** i nie dotyka konstrukcji ani ekranu na odcinku
  między głowicą a oknem. Inaczej część prądu ekranu popłynie drogą obejściową.
- Przekładnik **rozbieralny** (dzielony): styki rdzenia muszą być czyste i dokręcone zgodnie
  z instrukcją. Szczelina zwiększa prąd magnesujący, a z nim błąd przekładni i **błąd kątowy**.
- **Przekładnię** (np. 60/1, 100/1) wpisz do przekaźnika. Błąd przekładni nie zmienia kierunku,
  ale przesuwa rzeczywisty próg zadziałania.
- Obwód wtórny: własna para żył do wejścia I_N, uziemiona w jednym punkcie, bez łączenia
  z obwodami przekładników fazowych.

---

## F. Skąd przekaźnik wie, że zwarcie jest „w jego linii"

### Fizyka — sieć izolowana

Przy zwarciu doziemnym w dowolnym miejscu sieci pojawia się to samo napięcie $U_0$. Każde pole
**zdrowe** ładuje swoje pojemności doziemne, więc płynie w nim **własny prąd pojemnościowy od
szyn do linii**. W polu **uszkodzonym** płynie suma prądów wszystkich pozostałych pól, ale
**w przeciwną stronę**: z miejsca zwarcia, przez ziemię, do szyn.

Zapis wskazowy (kierunek odniesienia: od szyn do linii):

$$3\underline{I}_0^{\,\text{zdrowe}} = \underline{U}_0 \,(G_k + j\,3\omega C_{0k})$$

$$3\underline{I}_0^{\,\text{uszk.}} = -\,\underline{U}_0 \Big[\sum_{i \ne u} (G_i + j\,3\omega C_{0i}) + \underline{Y}_N\Big]$$

| Oznaczenie | Znaczenie |
|---|---|
| $C_{0k}$ | pojemność doziemna jednej fazy danego pola |
| $G_k$ | konduktancja upływu pola (straty w izolacji) — kilka procent składowej biernej |
| $\underline{Y}_N$ | admitancja punktu neutralnego: 0 (izolowany), $G_L - j/(\omega L)$ (dławik), $1/R_N$ (rezystor) |
| $\sum_{i \ne u}$ | suma po wszystkich polach **oprócz** uszkodzonego — własna pojemność pola uszkodzonego się nie liczy |

<div class="dg-rysunek"><svg viewBox="0 0 660 230" class="dg-svg" role="img" aria-label="Wykres wskazowy sieci izolowanej: prąd pola zdrowego wyprzedza U0 o 90 stopni, prąd pola uszkodzonego jest przesunięty o 180 stopni względem prądu pola zdrowego">
<text class="dg-t-b" x="10" y="16">Sieć izolowana — kierunek odniesienia od szyn do linii</text>
<circle class="dg-siatka" cx="170" cy="120" r="90"/><path class="dg-os" d="M70 120 H270 M170 24 V216"/>
<path style="fill:none;stroke:var(--atrament);stroke-width:3" d="M170 120 H262 M254 114 L262 120 L254 126"/><text class="dg-t-num" x="232" y="112">U₀</text>
<path style="fill:none;stroke:var(--atrament-3);stroke-width:2;stroke-dasharray:5 4" d="M170 120 H78 M86 114 L78 120 L86 126"/><text class="dg-t-num" x="74" y="140">−U₀</text>
<path style="fill:none;stroke:var(--sukces);stroke-width:3" d="M170 120 V58 M164 66 L170 58 L176 66"/><text class="dg-t-num ok" x="178" y="62">3I₀ pola zdrowego</text>
<path style="fill:none;stroke:var(--alarm);stroke-width:3" d="M170 120 V206 M164 198 L170 206 L176 198"/><text class="dg-t-num alarm" x="178" y="206">3I₀ pola uszkodzonego</text>
<text class="dg-t-m" x="330" y="60">zdrowe: wyprzedza U₀ o 90° (pojemność własna)</text>
<text class="dg-t-m" x="330" y="78">uszkodzone: opóźnia się o 90° za U₀,</text>
<text class="dg-t-m" x="330" y="94">czyli wyprzedza −U₀ o 90°</text>
<text class="dg-t-num roz" x="330" y="124">różnica między nimi: dokładnie 180°</text>
<text class="dg-t-m" x="330" y="146">→ odwrócona biegunowość zamienia pole</text>
<text class="dg-t-m" x="330" y="162">zdrowe z uszkodzonym: przekaźnik pola</text>
<text class="dg-t-m" x="330" y="178">zdrowego „widzi” zwarcie do przodu</text>
</svg></div>

### Sieć kompensowana — dlaczego sin φ tu nie działa

Dławik wprowadza prąd indukcyjny, który w polu uszkodzonym **odejmuje się** od sumy prądów
pojemnościowych. Sieci pracują zwykle z **przekompensowaniem** (prąd dławika większy od prądu
pojemnościowego sieci). Wtedy składowa bierna w polu uszkodzonym ma **ten sam znak co w polu
zdrowym** i kryterium biernomocowe nie odróżnia pól. Odróżnia je **składowa czynna**: w polu
uszkodzonym płynie prąd strat dławika i rezystora wymuszającego, skierowany przeciwnie do $U_0$.
W polu zdrowym jest tylko jego własny, mały prąd upływu, zgodny z $U_0$.

Ta składowa czynna jest mała — kilka amperów przy kilkudziesięciu amperach składowej biernej.
Dlatego w sieci kompensowanej **liczy się każdy stopień błędu kątowego** (punkt G, czynnik 7).

### Sieć z rezystorem

Prąd rezystora (setki amperów) dominuje. Kierunek jest wyraźny, a kryterium czynnomocowe lub
nadprądowe kierunkowe z kątem ok. 0° (względem −U₀) działa z dużym zapasem.

### Konwencja kąta — skąd „90°" w jednym miejscu i „−90°" w drugim

Przekaźniki różnie wybierają wielkość odniesienia: jedne $U_0$, inne $-U_0$. Ta sama fizyka
daje wtedy kąty różniące się o 180°:

| Sieć | Prąd pola uszkodzonego względem **−U₀** | względem **U₀** | Kryterium |
|---|---|---|---|
| izolowana | wyprzedza o 90° | opóźnia się o 90° (−90°) | biernomocowe, $I_0 \sin\varphi$ |
| kompensowana | składowa czynna w fazie (0°) | 180° | czynnomocowe, $I_0 \cos\varphi$ |
| z rezystorem | ok. 0° do kilkunastu stopni wyprzedzenia | ok. 180° | czynnomocowe lub kierunkowe nadprądowe |

Dlatego w [rozdziale 11](11-zabezpieczenia-nastawy-i-testowanie.md) kąt dla sieci izolowanej
podano jako −90°, a w [rozdziale 17](17-punkt-neutralny-sieci-SN.md) jako 90°. **Przed wpisaniem
kąta sprawdź, względem czego przekaźnik go liczy.** To czynnik 180° tak samo groźny jak odwrócony
przekładnik.

---

## G. Wszystko, co wpływa na kierunkowość — lista kontrolna

| # | Czynnik | Skutek | Jak wykryć |
|---|---|---|---|
| 1 | **Biegunowość przekładnika**: P1/P2 odwrotnie w montażu albo S1/S2 zamienione na listwie | obrót $3I_0$ o 180° | oględziny, próba impulsowa, wymuszenie prądu pierwotnego |
| 2 | **Punkt gwiazdowy niezgodny z nastawą** przekaźnika | obrót o 180° wszystkich prądów fazowych i $3I_0$ z Holmgreena | pomiar wektorowy pod obciążeniem (kierunek mocy czynnej) |
| 3 | **Polaryzacja U₀**: zamienione zaciski otwartego trójkąta (da–dn) albo odwrotna nastawa | obrót odniesienia o 180° — ten sam skutek co punkt 1 | wtrysk wtórny od zacisków obwodu napięciowego, próba doziemienia |
| 4 | **Brak U₀**: otwarty obwód otwartego trójkąta, niezałączony wyłącznik nadprądowy, nieuziemiony punkt gwiazdowy strony pierwotnej przekładników napięciowych | brak odniesienia — zabezpieczenie blokowane albo przechodzi na bezkierunkowe (zależnie od nastawy) | kontrola ciągłości, wtrysk; wiedza, co robi przekaźnik bez U₀ |
| 5 | **Ekran kabla** źle poprowadzony przez okno Ferrantiego | $3I_0 \approx 0$ lub przypadkowy kierunek | tylko oględziny montażu albo próba doziemienia |
| 6 | **Przekładnia Ferrantiego** źle wpisana | zły próg (kierunek bez zmian) | wymuszenie prądu pierwotnego przez okno |
| 7 | **Błąd kątowy toru prądowego** (Ferranti przy małych prądach, przekładnik rozbieralny, przekładnik pośredniczący) | obrót o kilka stopni. W sieci kompensowanej potrafi przerzucić dużą składową bierną pola zdrowego na stronę czynną i dać **zbędne zadziałanie** | dane producenta, korekcja kąta w przekaźniku, ograniczenie sektora zadziałania |
| 8 | **Algorytm niezgodny z punktem neutralnym** (sin φ w sieci kompensowanej) | pole uszkodzone wygląda jak zdrowe | przegląd nastaw wobec dokumentacji sieci |
| 9 | **Zmiana pracy punktu neutralnego** (dławik odstawiony → sieć izolowana) | algorytm przestaje pasować | sygnał stanu dławika przełączający grupę nastaw lub kryterium sin/cos |
| 10 | **Filtr Holmgreena**: niezrównoważenie przekładni, nasycenie przy zwarciach międzyfazowych i załączaniu | fałszywy $3I_0$ o przypadkowym kierunku | stabilizacja, blokada od prądów fazowych, wyższy próg |
| 11 | **Duża pojemność własna pola** (długi kabel) | przy zwarciu gdzie indziej pole zdrowe ma duży prąd — przy bezkierunkowym I₀> wyłączy się zbędnie. W polu uszkodzonym zostaje mało prądu, bo jego pojemność własna się nie liczy | rachunek prądów pojemnościowych każdego pola |
| 12 | **Rezystancja przejścia** (zwarcie wysokooporowe) | mniejsze $U_0$ i $3I_0$ — pobudzenie może nie nastąpić; kąt się nie zmienia | próg U₀> i I₀> dobrane do wymaganej czułości |
| 13 | **Zwarcia przerywane** (łuk zapalający się co półokres) | algorytm wskazowy gubi kierunek | funkcja dla zwarć przejściowych i przerywanych |
| 14 | **Zamienione obwody między polami** (Ferranti pola A do przekaźnika pola B) | w obu polach kierunek i próg „cudze" | wymuszenie prądu pierwotnego **pole po polu** |
| 15 | **Mostek pozostawiony na listwie probierczej** | przekaźnik nie widzi prądu | kontrola listew po próbach, odczyt prądów po załączeniu |

> **Ważne.** Pomiar pod obciążeniem sprawdza czynniki 1–2 **tylko dla przekładników fazowych**.
> Przekładnik Ferrantiego w ruchu normalnym mierzy prawie zero, więc **jego biegunowości i toru U₀
> nie potwierdzi żadne obciążenie**. Potrzebne jest wymuszenie prądu pierwotnego ze znanym
> kierunkiem, wtrysk kątowy albo kontrolowana próba doziemienia.

---

## H. Jak sprawdzić kierunkowość — kolejność prób

1. **Oględziny:** orientacja P1, prowadzenie ekranu przez okno, jeden punkt uziemienia obwodu
   wtórnego, zgodność oznaczeń żył ze schematem, brak mostków na listwach.
2. **Biegunowość metodą impulsową:** bateria (kilka V) z plusem na P1, miliwoltomierz
   magnetoelektryczny z plusem na S1. Przy **zamknięciu** obwodu baterii wskazówka wychyla się
   w prawo — biegunowość zgodna. Przy otwarciu wychyla się w lewo, co jest normalne.
   Dla przekładnika Ferrantiego przeprowadź przez okno przewód pomocniczy w kierunku
   **od szyn do kabla** i podłącz do niego baterię.
3. **Wymuszenie prądu pierwotnego** (primary injection): przewód testowy przez okno
   Ferrantiego albo przez tor fazy, prąd znanego kierunku. Przekaźnik ma wskazać prąd
   o spodziewanej wartości (sprawdzenie przekładni) i fazie (sprawdzenie biegunowości).
4. **Wtrysk wtórny kątowy:** podaj $U_0$ i $3I_0$ z testera trójfazowego. Sprawdź zadziałanie
   „do przodu", **brak zadziałania „do tyłu"** i granice sektora. Najlepiej podawać napięcie
   **na zaciski obwodu otwartego trójkąta w polu**, a nie bezpośrednio na wejście przekaźnika.
   Wtedy próba obejmuje okablowanie i polaryzację U₀.
5. **Pełny łańcuch:** jedyną próbą, która sprawdza wszystko naraz (przekładnik, ekran, U₀, nastawy),
   jest **kontrolowana próba zwarcia doziemnego** w sieci. Wykonuje się ją według programu
   uzgodnionego z operatorem sieci. Równoważnie: przy pierwszym rzeczywistym doziemieniu
   **analizuj rejestracje zakłóceń** ze wszystkich pól sekcji. Pole uszkodzone ma wskazywać
   „do przodu", wszystkie zdrowe „do tyłu".

---

## I. Symulator — co widzi przekaźnik 67N

Symulator liczy prądy doziemne w sieci SN (zwarcie metaliczne, pełne $U_0$) i pokazuje wykres
wskazowy **tak, jak widzi go przekaźnik**: po przejściu przez biegunowość przekładnika, nastawę,
polaryzację U₀, ekran i błąd kątowy. Odniesienie przekaźnika to −U₀. Tabela pod wykresem
pokazuje decyzję dla **obu przypadków** — gdy zwarcie jest w tym polu i gdy jest gdzie indziej.
Zaczynaj od gotowych scenariuszy.

<div class="dg-widget" data-typ="ct-kierunek"></div>

### Ćwiczenia do symulatora

1. Scenariusz „Odwrócony przekładnik". Które pole się wyłącza i co dzieje się ze zwarciem?
2. Do odwróconego przekładnika dołóż odwróconą nastawę. Wszystko działa — dlaczego to i tak jest błąd?
3. Sieć kompensowana, kryterium sin φ. Zmieniaj rozstrojenie dławika od −20 % do +20 %.
   Przy jakim znaku rozstrojenia pole uszkodzone „znika"?
4. Sieć kompensowana, cos φ, prąd pojemnościowy pola 35 A. Jaki błąd kątowy wystarczy,
   żeby pole zdrowe zadziałało przy progu 1,5 A? Co zmienia większy prąd rezystora wymuszającego?
5. Scenariusz „Holmgren w sieci izolowanej" (reszta sieci 10 A, obciążenie 600 A). Przełącz widok
   na zwarcie w innym polu. Dlaczego zdrowe pole z dużym obciążeniem zadziałało? Przy jakim
   obciążeniu decyzja jest znów poprawna?
6. Ekran poza oknem: sprawdź wszystkie trzy rodzaje sieci. Czy sieć z rezystorem „ratuje" układ?

---

## J. Błędy montażowe — objaw w ruchu normalnym i przy zwarciu

| Błąd | W ruchu normalnym | Przy zwarciu doziemnym w tym polu | Przy zwarciu w innym polu |
|---|---|---|---|
| odwrócony Ferranti / S1–S2 | nic | **brak wyłączenia** — zwarcie trwa, wyłączy rezerwa (U₀> w polu zasilającym: cała sekcja) | **zbędne wyłączenie** zdrowego pola |
| odwrócona polaryzacja U₀ (wspólna dla sekcji!) | nic | brak wyłączenia **w każdym polu sekcji** | wszystkie zdrowe pola o prądzie ponad progiem dostają „do przodu" |
| ekran nie przez okno | nic | brak wyłączenia | zwykle nic |
| punkt gwiazdowy vs nastawa (fazowe) | **widać**: moc czynna ze złym znakiem, zły kierunek w pomiarach | Holmgren: jak odwrócony przekładnik | jak wyżej |
| drugi punkt uziemienia obwodu wtórnego | zwykle nic | prądy wyrównawcze → zniekształcony $3I_0$ | możliwe zbędne zadziałanie |
| sin φ w sieci kompensowanej | nic | brak wyłączenia | zwykle nic |

Zwróć uwagę na **polaryzację U₀**: jeden przekładnik napięciowy obsługuje całą sekcję, więc jeden
błąd psuje kierunkowość **wszystkich pól naraz**.

---

## K. Pytania kontrolne

1. Prąd wpływa do zacisku P1. Z którego zacisku wypływa prąd wtórny do przekaźnika?
2. Dlaczego obwód wtórny przekładnika prądowego uziemia się w jednym punkcie, a nie w dwóch?
3. Przekładnik ma odczepy S1–S2–S3, przekaźnik podłączono do S1–S2. Co robisz z zaciskiem S3,
   a co zrobiłbyś z całym nieużywanym rdzeniem?
4. Głowica kablowa jest nad przekładnikiem Ferrantiego. Jak musi biec przewód uziemiający ekranu?
5. W sieci izolowanej przekaźnik pola zdrowego zadziałał przy doziemieniu w sąsiednim polu,
   a pole uszkodzone nie. Wymień trzy możliwe przyczyny.
6. Dlaczego w sieci kompensowanej nie stosuje się kryterium $I_0 \sin\varphi$?
7. Dlaczego pomiar wektorowy pod obciążeniem nie potwierdza poprawnej biegunowości przekładnika
   Ferrantiego?
8. Zamieniono zaciski da–dn otwartego trójkąta w polu pomiaru napięcia sekcji. Jakie pola to dotyka?

> **Odpowiedź do pytania 5.** (1) odwrócona biegunowość przekładnika Ferrantiego (albo S1/S2,
> albo montaż „do góry nogami") **w obu polach** lub odwrócona nastawa kierunku; (2) odwrócona
> polaryzacja U₀ — wtedy błąd dotyczy całej sekcji; (3) kąt charakterystyczny wpisany w złej
> konwencji (U₀ zamiast −U₀). Każda z tych przyczyn obraca decyzję o 180°. W sieci izolowanej
> prąd pola zdrowego jest dokładnie przeciwny do prądu pola uszkodzonego, więc pola zamieniają
> się rolami. Samo odwrócenie w polu zdrowym nie tłumaczyłoby braku zadziałania pola uszkodzonego.

> **Odpowiedź do pytania 8.** Wszystkie pola z zabezpieczeniem kierunkowym zasilane napięciem
> $U_0$ z tej sekcji. Przy doziemieniu żadne pole uszkodzone nie zadziała, a pola zdrowe
> z prądem ponad progiem — tak. Zwarcie wyłączy dopiero zabezpieczenie rezerwowe, czyli
> cała sekcja.

---

**Poprzedni:** [19. Przekładniki prądowe i napięciowe](19-przekladniki-pradowe-i-napieciowe.md) ·
**Następny:** [20. Rezystancja izolacji i tg δ](20-rezystancja-izolacji-i-tg-delta.md)

# 17. Punkt neutralny sieci SN

To największa luka w wiedzy typowego pomiarowca — bo dotyczy fizyki **sieci**, a nie obiektu,
który masz przed sobą. A jednocześnie z niej wynika połowa pozostałych tematów: naprężenia
izolacji, wielkość prądów zwarciowych, logika zabezpieczeń ziemnozwarciowych i wymagania
dla uziemień stacji.

> **Ważne.** Sposób pracy punktu neutralnego nie jest szczegółem eksploatacyjnym.
> Decyduje o tym, **jak wysokie napięcie znosi izolacja faz zdrowych**, **jak duży prąd płynie
> przy zwarciu doziemnym** i **jaki algorytm musi mieć zabezpieczenie kierunkowe**.
> Ta sama nastawa, przeniesiona z sieci izolowanej do kompensowanej, daje zabezpieczenie,
> które nie zadziała.

---

## A. Cztery układy w jednej tabeli

| Układ | Prąd zwarcia doziemnego | Charakter prądu | Fazy zdrowe | Gdzie stosowany |
|---|---|---|---|---|
| **izolowany** | pojemnościowy, kilka–kilkadziesiąt A | bierny (90°) | $\sqrt{3} \cdot U_f$ | sieci napowietrzne SN o małej pojemności |
| **kompensowany** dławikiem | resztkowy, kilka A | czynny (0°) | $\sqrt{3} \cdot U_f$ | rozbudowane sieci SN, dużo kabla |
| **przez rezystor** | dziesiątki–setki A | czynny | ok. $1{,}7 \cdot U_f$ | przemysł, dystrybucja miejska |
| **skutecznie uziemiony** | kiloampery | czynny | ≤ $1{,}4 \cdot U_f$ | sieci 110 kV i wyżej |

Dwa pierwsze i częściowo trzeci to układy **nieskutecznie uziemione**: punkt neutralny przesuwa
się przy zwarciu praktycznie w całości, więc izolacja faz zdrowych pracuje pod napięciem
międzyfazowym względem ziemi. Ostatni to **uziemienie skuteczne**, gdzie przesunięcie jest
częściowe.

---

## B. Sieć izolowana

### Skąd bierze się prąd zwarcia doziemnego

W sieci izolowanej nie ma metalicznego połączenia punktu neutralnego z ziemią. Prąd przy zwarciu
doziemnym płynie więc **przez pojemności doziemne wszystkich zdrowych faz całej galwanicznie
połączonej sieci** — i wraca do miejsca zwarcia.

### Wzór i objaśnienie oznaczeń

$$I_C = 3 \cdot \omega \cdot C_0 \cdot U_f$$

| Oznaczenie | Jednostka | Co to jest |
|---|---|---|
| $I_C$ | A | prąd pojemnościowy zwarcia doziemnego (w miejscu uszkodzenia) |
| $3$ | — | **trzy fazy sieci** — prąd zbiera się z pojemności wszystkich faz, nie tylko jednej |
| $\omega$ | rad/s | pulsacja: $\omega = 2\pi f \approx 314$ dla 50 Hz |
| $C_0$ | F/fazę | **pojemność doziemna jednej fazy** całej sieci względem ziemi |
| $U_f$ | V | napięcie fazowe: $U_n/\sqrt{3}$ |

### Kabel a linia napowietrzna — różnica o dwa rzędy wielkości

To jest liczba, którą warto pamiętać, bo tłumaczy całą politykę doboru punktu neutralnego.

| Rodzaj toru | $C_0$ [µF/km/fazę] | Prąd doziemny na 1 km sieci 15 kV |
|---|---|---|
| kabel SN (XLPE) | 0,25–0,40 | **ok. 2–3 A** |
| linia napowietrzna SN | ok. 0,005 | **ok. 0,04 A** |

Kabel daje **kilkadziesiąt razy większy** prąd doziemny na kilometr niż linia napowietrzna
(dla wartości z tabeli około 60-krotnie). Dlatego sieć wiejska napowietrzna może pozostać izolowana
przy setkach kilometrów, a sieć miejska kablowa przekracza granicę stosowalności już po
kilku–kilkunastu kilometrach.

### Granica stosowalności

Łuk w miejscu zwarcia gaśnie samoczynnie, dopóki prąd jest mały. Praktyczna granica to
**około 10–20 A**. Powyżej łuk odpala się ponownie, przechodzi w zwarcie międzyfazowe i sieć
traci przewidywalność — trzeba przejść na kompensację albo rezystor.

### Rozkład napięć przy zwarciu doziemnym

| Faza | Napięcie względem ziemi |
|---|---|
| uszkodzona (L1) | $\to 0$ |
| zdrowa (L2) | $\to U_n$, czyli $\sqrt{3} \cdot U_f$ |
| zdrowa (L3) | $\to U_n$, czyli $\sqrt{3} \cdot U_f$ |
| punkt neutralny | przesuwa się o $U_f$; $U_0 = U_f$ |

**To jest sedno.** Izolacja faz zdrowych pracuje pod napięciem **międzyfazowym** względem ziemi —
o 73 % wyższym niż w pracy normalnej. Dlatego w sieciach izolowanych izolacja musi być na to
zaprojektowana, i dlatego **wolno pracować ze zwarciem doziemnym** przez ograniczony czas:
sieć jest do tego przygotowana konstrukcyjnie.

### Napięcie niesymetrii — poziom tła, który trzeba znać

Pojemności doziemne trzech faz nigdy nie są idealnie równe (różne trasy, różne odstępy).
Skutek: **$U_0$ w normalnej pracy nie jest zerem** — typowo kilka procent $U_f$.

> **Uwaga.** Musisz znać poziom tła $U_0$ dla danej sieci, zanim zinterpretujesz pomiar.
> Inaczej naturalną niesymetrię weźmiesz za zwarcie doziemne wysokooporowe — albo odwrotnie,
> ustawisz próg tak wysoko, że przeoczysz prawdziwe zwarcie.

---

## C. Sieć kompensowana (dławik gaszący, dławik Petersena)

### Zasada

Dławik włączony między punkt neutralny i ziemię wprowadza prąd **indukcyjny**, przesunięty
o 180° względem prądu pojemnościowego. Prądy się kompensują, a w miejscu zwarcia zostaje
**prąd resztkowy**: składowa czynna (straty w sieci i dławiku) plus niedopasowanie.

### Stopień rozstrojenia

$$v = \frac{I_L - I_C}{I_C}$$

| Oznaczenie | Znaczenie |
|---|---|
| $v$ | **stopień rozstrojenia** — bezwymiarowy, podawany w procentach |
| $I_L$ | prąd indukcyjny dławika |
| $I_C$ | prąd pojemnościowy sieci |

Prąd resztkowy w miejscu zwarcia:

$$I_{\text{reszt}} = \sqrt{(I_L - I_C)^2 + I_{\text{czynny}}^2}$$

gdzie $I_{\text{czynny}}$ to składowa czynna, typowo 2–5 % $I_C$.

### Dlaczego nie nastawia się dokładnie na rezonans

Intuicja mówi: $v = 0$ daje najmniejszy prąd resztkowy, więc to optimum. W praktyce nastawia się
**lekkie przekompensowanie, $v = +5 \ldots +10\ \%$**. Powody:

1. **Rezonans wzmacnia niesymetrię.** Przy $v = 0$ obwód zerowy jest w rezonansie i naturalna
   niesymetria pojemności daje bardzo wysokie $U_0$ w normalnej pracy — nawet do wartości
   powodujących zadziałanie sygnalizacji lub przepalenie przekładników napięciowych.
2. **Sieć się zmienia skokowo.** Każde dołączenie lub odłączenie kabla zmienia $C_0$.
   Przy przekompensowaniu wypadasz z rezonansu w bezpieczną stronę.

### Co to znaczy dla pomiarowca

- **Pojemność doziemną sieci trzeba mierzyć po każdej istotnej zmianie konfiguracji.**
  Metody: wtrysk napięcia pomocniczego do punktu neutralnego i pomiar odpowiedzi, albo zdjęcie
  **krzywej rezonansowej** przez przestrajanie dławika i rejestrację $U_0$.
- **Krzywa rezonansowa** $U_0$ w funkcji nastawy dławika ma wyraźne maksimum. Położenie maksimum
  daje punkt rezonansu (czyli aktualne $C_0$), a **szerokość** krzywej daje tłumienie, czyli
  składową czynną sieci.
- **Prąd resztkowy jest głównie czynny** — i to zmienia algorytm zabezpieczeń (punkt E).

---

## D. Uziemienie przez rezystor i uziemienie skuteczne

### Rezystor

Rezystor dobiera się tak, aby jego prąd był porównywalny z prądem pojemnościowym lub większy —
typowo **100–1000 A** w przemyśle, około **300 A** w dystrybucji.

**Zaleta:** prąd jest duży, czynny i jednoznaczny, więc identyfikacja pola uszkodzonego jest pewna,
a wyłączenie szybkie. Napięcia faz zdrowych rosną nieznacznie mniej niż w sieci izolowanej.

**Wada, która jest wprost problemem pomiarowca:** ten prąd wpływa do **siatki uziemiającej stacji**
i podnosi napięcie uziomowe.

> **Uwaga.** Siatka uziemiająca, która spełniała kryteria napięć rażeniowych przy sieci izolowanej
> (np. 15 A prądu doziemnego), przy przejściu na rezystor 300 A może już ich **nie spełniać**.
> Zmiana sposobu pracy punktu neutralnego wymaga **ponownego przeliczenia uziemienia**
> — patrz [rozdział 18](18-uziemienia-w-rozdzielni.md).

### Uziemienie skuteczne

Stosowane w sieciach 110 kV i wyżej. Warunek formalny: $X_0/X_1 \le 3$ oraz $R_0/X_1 \le 1$.

Skutek: **współczynnik uziemienia** $k_u \le 1{,}4$, czyli napięcie faz zdrowych rośnie najwyżej
do 1,4-krotności napięcia fazowego (a nie 1,73). To pozwala zaprojektować tańszą izolację —
ale prąd zwarcia doziemnego jest rzędu prądu zwarcia trójfazowego, więc cały ciężar przenosi się
na uziemienia i szybkość zabezpieczeń.

---

## E. Symulator — punkt neutralny na żywo

Przesuwaj długość kabli i obserwuj prąd pojemnościowy. Potem przełączaj układ punktu neutralnego
i patrz na wykres wskazowy: **jak przesuwa się punkt neutralny N′ i co się dzieje z długościami
wskazów faz zdrowych.**

<div class="dg-widget" data-typ="neutralny"></div>

### Ćwiczenia do symulatora

1. Ustaw sieć izolowaną, 0 km kabli, 300 km linii napowietrznych. Ile wynosi prąd doziemny?
   Teraz zamień: 15 km kabli, 0 km linii. Porównaj.
2. Znajdź, przy jakiej długości kabla sieć 15 kV izolowana przekracza granicę 20 A.
3. W układzie kompensowanym ustaw $v = 0$. Przeczytaj komunikat i wyjaśnij, dlaczego rezonans
   nie jest optimum.
4. Przełącz na rezystor 500 A i porównaj prąd z wartością dla sieci izolowanej. Pomyśl,
   co to znaczy dla siatki uziemiającej.
5. Przełącz na uziemienie skuteczne i popatrz na wykres wskazowy — dlaczego wskazy faz zdrowych
   są krótsze?

---

## F. Zabezpieczenia ziemnozwarciowe — tu jest najtrudniej

### F.1 Skąd wziąć sygnał 3I₀

Zabezpieczenie ziemnozwarciowe potrzebuje sumy prądów trzech faz. Są dwa sposoby jej pozyskania
i **różnią się czułością o rząd wielkości**.

<div class="dg-rysunek"><svg viewBox="0 0 660 250" class="dg-svg" role="img" aria-label="Porównanie filtru Holmgreena z trzema przekładnikami i przekładnika Ferrantiego obejmującego trzy żyły"><text class="dg-t-b" x="10" y="18">Filtr Holmgreena — trzy przekładniki, suma po stronie wtórnej</text><g><circle cx="60" cy="52" r="14" style="fill:none;stroke:var(--atrament-3);stroke-width:2"/><circle cx="120" cy="52" r="14" style="fill:none;stroke:var(--atrament-3);stroke-width:2"/><circle cx="180" cy="52" r="14" style="fill:none;stroke:var(--atrament-3);stroke-width:2"/><text class="dg-t-m sr" x="60" y="34">L1</text><text class="dg-t-m sr" x="120" y="34">L2</text><text class="dg-t-m sr" x="180" y="34">L3</text><path class="dg-przewod" d="M60 66 V96 M120 66 V96 M180 66 V96 M60 96 H180 M120 96 V120"/><rect x="96" y="120" width="48" height="26" rx="4" style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:2"/><text class="dg-t-m sr" x="120" y="137">3I₀</text></g><text class="dg-t-num alarm" x="220" y="60">błąd każdego przekładnika ±1 %</text><text class="dg-t-m" x="220" y="78">przy I_rob = 400 A to ±4 A na fazę</text><text class="dg-t-m" x="220" y="96">suma trzech błędów może dać 5–10 A</text><text class="dg-t-num alarm" x="220" y="118">a szukamy zwarcia dającego 2 A</text><text class="dg-t-m" x="220" y="136">→ próg musi być wysoki (&gt; 10–20 % I_n)</text><path class="dg-os" d="M10 168 H650"/><text class="dg-t-b" x="10" y="192">Przekładnik Ferrantiego — jeden rdzeń obejmuje wszystkie trzy żyły</text><ellipse cx="120" cy="222" rx="52" ry="20" style="fill:none;stroke:var(--roz);stroke-width:3"/><circle cx="100" cy="222" r="6" style="fill:var(--atrament-3)"/><circle cx="120" cy="222" r="6" style="fill:var(--atrament-3)"/><circle cx="140" cy="222" r="6" style="fill:var(--atrament-3)"/><text class="dg-t-num ok" x="196" y="212">strumień = suma prądów = 3I₀ bezpośrednio</text><text class="dg-t-m" x="196" y="230">brak odejmowania dużych liczb → czułość 0,5–1 A</text><text class="dg-t-m alarm" x="196" y="246">warunek: ekran kabla przeprowadzony z powrotem przez okno</text></svg></div>

**Filtr Holmgreena** — trzy przekładniki prądowe połączone równolegle po stronie wtórnej.
Problem jest **arytmetyczny**: żeby dostać małą liczbę ($3I_0 \approx 2$ A), sumujesz trzy duże
liczby (po 400 A), każdą obarczoną własnym błędem. Przy klasie 5P (błąd prądowy do 1 %)
każdy przekładnik wnosi ±4 A odniesione do strony pierwotnej, więc suma błędów może dać
kilka–kilkanaście amperów **pozornego** $3I_0$.

Wniosek: filtr Holmgreena wymaga wysokiego progu (typowo powyżej 10–20 % $I_n$) i **nie nadaje się
do sieci izolowanych o małych prądach doziemnych**. Dodatkowo przy zwarciach międzyfazowych
nasycenie rdzeni daje duży fałszywy $3I_0$ — konieczna blokada.

**Przekładnik Ferrantiego** (kablowy, obejmujący) — jeden rdzeń obejmuje wszystkie trzy żyły.
Strumień w rdzeniu jest proporcjonalny do **sumy** prądów, więc mierzysz $3I_0$ bezpośrednio,
bez odejmowania. Czułość do 0,5–1 A.

> **Nigdy** nie zapomnij o ekranie. Ekran (żyła powrotna) kabla musi być poprowadzony
> **z powrotem przez okno przekładnika** i uziemiony dopiero za nim. Jeśli ekran przechodzi
> przez okno tylko raz, prąd powrotny w ekranie kompensuje prąd zwarcia i **zabezpieczenie
> ziemnozwarciowe nie widzi zwarcia**. To usterka, która nie daje żadnego objawu w ruchu
> normalnym — ujawnia się dopiero przy awarii. Najczęstszy błąd montażowy w SN.

### F.2 Skąd wziąć sygnał U₀

Trzy jednofazowe przekładniki napięciowe z uzwojeniami wtórnymi w układzie **otwartego trójkąta**
(broken delta), typowo 100/3 V.

> **Ważne.** Warunek konieczny: **punkt neutralny strony pierwotnej przekładników napięciowych
> musi być uziemiony.** Bez tego nie ma drogi dla składowej zerowej i $U_0$ po prostu nie powstanie
> — a schemat będzie wyglądał poprawnie.

### F.3 Kierunkowość — najtrudniejszy element całej części III

Zabezpieczenie kierunkowe porównuje **fazę** $3I_0$ z fazą $U_0$. Ale charakterystyka kierunkowa
musi być dobrana do **sposobu pracy punktu neutralnego**, bo charakter prądu jest inny:

| Sieć | Charakter prądu w polu uszkodzonym | Algorytm | Kąt charakterystyki |
|---|---|---|---|
| **izolowana** | pojemnościowy (suma pojemności pozostałych pól) | moc **bierna** zerowa ($\sin\varphi$) | ok. 90° |
| **kompensowana** | czynny (prąd resztkowy) | moc **czynna** zerowa ($\cos\varphi$) | ok. 0° |
| **rezystorowa** | czynny, duży | nadprądowy kierunkowy | ok. 0° |

> **Nigdy** nie przenoś nastaw kierunkowych między sieciami o różnym punkcie neutralnym.
> Zastosowanie algorytmu z sieci izolowanej w sieci kompensowanej daje zabezpieczenie,
> które **nie zadziała albo zadziała odwrotnie** — a w ruchu normalnym nie widać po nim niczego.
> To najczęstsza „cicha" wada nastaw w sieciach SN.

### F.4 Metody dla sieci kompensowanych, gdzie prąd resztkowy jest bardzo mały

- **Admitancyjne** — pomiar $Y_0 = 3I_0 / U_0$ i ocena w płaszczyźnie zespolonej. Najbardziej
  odporne na zmiany konfiguracji sieci, bo admitancja pola jest jego cechą własną.
- **Przejściowe / falowe** — analiza pierwszej półfali prądu zwarcia (transient earth fault).
  Działa niezależnie od sposobu pracy punktu neutralnego, bo zjawisko przejściowe wyprzedza
  ustalenie się prądu resztkowego.
- **Chwilowe przestrojenie dławika** i obserwacja odpowiedzi poszczególnych pól.

---

## G. Lista kontrolna dla pomiarowca

- [ ] Znam sposób pracy punktu neutralnego tej sieci (z dokumentacji, nie z domysłu).
- [ ] Znam aktualne $C_0$ sieci i prąd doziemny — albo wiem, kto go zna.
- [ ] Znam poziom tła $U_0$ w normalnej pracy dla tej sieci.
- [ ] Sprawdziłem, czy algorytm kierunkowy zabezpieczenia odpowiada punktowi neutralnemu.
- [ ] Sprawdziłem przeprowadzenie ekranu przez okno przekładnika Ferrantiego w każdym polu.
- [ ] Sprawdziłem uziemienie punktu neutralnego strony pierwotnej przekładników napięciowych.
- [ ] Przy filtrze Holmgreena sprawdziłem, czy próg jest realistyczny wobec błędów przekładni.
- [ ] Wiem, czy uziemienie stacji było przeliczone dla aktualnego prądu doziemnego.

---

## H. Pytania kontrolne

1. Dlaczego we wzorze $I_C = 3\omega C_0 U_f$ występuje trójka?
2. Sieć 15 kV, 20 km kabla. Oszacuj prąd doziemny. Czy ta sieć może pracować z izolowanym
   punktem neutralnym?
3. Dlaczego dławik gaszący nastawia się na przekompensowanie, a nie dokładnie na rezonans?
4. Zabezpieczenie ziemnozwarciowe kierunkowe w sieci kompensowanej ma nastawiony kąt 90°.
   Co się stanie przy zwarciu doziemnym?
5. Dlaczego filtr Holmgreena nie nadaje się do wykrywania zwarć doziemnych o prądzie 2 A?
6. Ekran kabla uziemiono przed przekładnikiem Ferrantiego, nie przeprowadzając go przez okno.
   Kiedy ta usterka się ujawni?

> **Odpowiedź do pytania 6.** Nigdy w ruchu normalnym — dopiero przy zwarciu doziemnym.
> Prąd powrotny płynący ekranem znajduje się poza oknem przekładnika, więc nie jest kompensowany
> w strumieniu, a prąd zwarcia płynący żyłą jest. W efekcie przekładnik „widzi" prąd
> zbliżony do zera i zabezpieczenie milczy. To wada wykrywalna wyłącznie oględzinami montażu
> albo próbą z wtryskiem prądu doziemnego.

---

**Poprzedni:** [16. Napięcia indukowane](16-napiecia-indukowane.md) ·
**Następny:** [18. Uziemienia w rozdzielni](18-uziemienia-w-rozdzielni.md)

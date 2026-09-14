# 18. Uziemienia w rozdzielni

Pomiar uziemienia szpilki przy słupie to zadanie z podręcznika. Pomiar uziemienia stacji SN/WN
z rozległą siatką otokową to zupełnie inne zadanie — i metoda podręcznikowa **tu nie działa**.
To zaskakuje najczęściej, bo miernik nie zgłasza żadnego problemu: pokazuje ładną, stabilną liczbę.

> **Ważne.** Dwie rzeczy, które trzeba przewartościować:
> **(1)** kryterium poprawności pomiaru to **kształt krzywej**, nie wskazanie w jednym punkcie;
> **(2)** w rozdzielni nie interesuje cię wartość rezystancji w omach, a **napięcia rażeniowe**
> przy realnym prądzie zwarcia. Uziom 0,3 Ω może być niebezpieczny, a 2 Ω bezpieczny.

---

## A. Dlaczego metoda podręcznikowa zawodzi

### Strefa wpływu

Potencjał wokół uziomu zanika w przybliżeniu jak $1/r$, a około **90 % spadku** następuje
w promieniu równym **5-krotności największego wymiaru uziomu**.

| Uziom | Największy wymiar | Strefa wpływu |
|---|---|---|
| szpilka pionowa | 3 m | ok. 15 m — sondy zmieszczą się na trawniku |
| uziom fundamentowy budynku | 15 m | ok. 75 m |
| **siatka stacji 50 × 50 m** | przekątna ok. 70 m | **350–500 m** |

### Reguła 62 % ma ograniczony zakres stosowalności

Reguła Tagga (sonda napięciowa przy 62 % odległości do sondy prądowej) jest wyprowadzona dla
**uziomu punktowego w gruncie jednorodnym**. Dla rozległej siatki obowiązuje tylko wtedy,
gdy najpierw spełnisz warunek odległości:

$$D \ge 5 \cdot D_{\text{siatki}}$$

| Oznaczenie | Znaczenie |
|---|---|
| $D$ | odległość **sondy prądowej** od środka mierzonego uziomu |
| $D_{\text{siatki}}$ | największy wymiar (przekątna) siatki uziemiającej |

Dopiero potem sondę napięciową ustawiasz przy $0{,}62 \cdot D$.

### Jedyne wiarygodne kryterium poprawności: plateau

Pomiar wykonuje się w **kilku punktach** — typowo przy 20, 40, 52, 62, 72 i 80 % $D$ — i rysuje
krzywą $R(x)$. Musi mieć **wyraźny płaski odcinek (plateau)** w okolicy 55–70 % $D$.

**Po co właściwie to plateau?** Nie chodzi o samą estetykę krzywej. Plateau jest miarą tego,
**jak bardzo wynik zależy od tego, gdzie dokładnie postawisz sondę napięciową**:

| Sytuacja | Przesunięcie sondy o ± 5 % $D$ zmienia wskazanie o |
|---|---|
| plateau widoczne (sonda prądowa dostatecznie daleko) | kilka procent — wynik odporny |
| brak plateau (sonda za blisko) | **kilkadziesiąt procent** — mierzysz położenie szpilki, nie uziom |

W terenie ± 5 % $D$ to kilkanaście kroków. Bez plateau ta niedokładność, praktycznie nieunikniona,
przekłada się wprost na wynik protokołu — a miernik nie zgłosi żadnego problemu.

<div class="dg-rysunek"><svg viewBox="0 0 660 230" class="dg-svg" role="img" aria-label="Porównanie krzywej pomiarowej z plateau i bez plateau"><text class="dg-t-b" x="10" y="16">Pomiar POPRAWNY — plateau widoczne</text><path class="dg-os" d="M46 110 H300 M46 30 V110"/><path class="dg-krzywa" d="M52 108 C90 60 120 44 150 42 L210 41 C240 44 268 60 296 32"/><path class="dg-obszar" d="M150 30 H210 V110 H150 Z"/><text class="dg-t-m ok sr" x="180" y="26">płaski odcinek</text><text class="dg-t-m" x="52" y="124">0 %</text><text class="dg-t-m sr" x="180" y="124">62 %</text><text class="dg-t-m kon" x="300" y="124">100 % D</text><text class="dg-t-num ok" x="52" y="52">wynik odporny na rozstawienie sond</text><path class="dg-os" d="M330 0 V230"/><text class="dg-t-b" x="360" y="16">Pomiar NIEWAŻNY — brak plateau</text><path class="dg-os" d="M396 110 H650 M396 30 V110"/><path class="dg-krzywa" style="stroke:var(--alarm)" d="M402 108 C440 88 480 74 520 62 C560 50 600 40 646 30"/><circle class="dg-punkt" style="fill:var(--alarm)" cx="530" cy="59" r="5"/><path class="dg-os" style="stroke:var(--alarm);stroke-width:2" d="M505 68 L555 50"/><text class="dg-t-num alarm sr" x="530" y="42">± 5 % D → duża zmiana R</text><text class="dg-t-m" x="402" y="124">0 %</text><text class="dg-t-m sr" x="530" y="124">62 %</text><text class="dg-t-m kon" x="650" y="124">100 % D</text><text class="dg-t-num alarm" x="402" y="146">krzywa cały czas rośnie → sonda prądowa za blisko</text><text class="dg-t-m" x="402" y="164">wskazanie zależy krytycznie od tego, gdzie wbito szpilkę</text><text class="dg-t-m" x="402" y="182">a miernik pokaże stabilną liczbę i NIE zgłosi błędu</text><text class="dg-t-m alarm" x="402" y="204">To jest najczęstszy błąd w protokołach uziemieniowych.</text></svg></div>

---

## B. Symulator — zobacz brak plateau

Ustaw siatkę 70 m i sondę prądową na 120 m — czyli tak, jak realnie wygląda pomiar wykonany
„na oko" w ciasnej stacji. Potem odsuwaj sondę i patrz, kiedy pojawi się plateau.

<div class="dg-widget" data-typ="uziom"></div>

### Ćwiczenia do symulatora

1. Siatka 70 m, sonda 120 m. Jaka jest czułość na położenie sondy? Czy krzywa ma plateau?
2. Odsuwaj sondę, aż rozrzut w oknie 55–70 % spadnie poniżej 15 %. Porównaj wynik z regułą
   $D \ge 5 \cdot D_{\text{siatki}}$ — powinny się pokryć.
3. Siatka 6 m (mała stacja słupowa). Ile trzeba trasy? Dlaczego dla małych uziomów metoda
   trzysondowa jest zupełnie praktyczna?
4. Zmień rezystywność gruntu. Czy zmienia się **czułość procentowa**? (Nie — bo wynika ona
   z geometrii, nie z gruntu. Zmienia się tylko wartość w omach. To ważny wniosek.)

> **Uwaga na granice modelu.** Symulator przyjmuje **uziom półkolisty** w gruncie jednorodnym.
> W tej idealizacji punkt 62 % daje wartość dokładną niezależnie od $D$ — dlatego symulator
> pokazuje jako koszt braku plateau **czułość na położenie sondy**, a nie stały błąd odczytu.
> W rzeczywistości dochodzą dwa efekty, których model nie obejmuje: siatka **nie jest** punktem
> (rozkład prądu jest niejednorodny, więc punkt równowagi przesuwa się na zewnątrz od 62 %)
> oraz grunt jest **warstwowy**. Oba dodają błąd systematyczny — i oba są kolejnym powodem,
> dla którego operacyjnym kryterium jest **plateau**, a nie reguła 62 % sama w sobie.

---

## C. Co faktycznie mierzysz w czynnej stacji

Uziom stacji jest galwanicznie połączony z bardzo wieloma rzeczami:

- ekranami i żyłami powrotnymi **wszystkich** kabli wychodzących,
- przewodami odgromowymi linii napowietrznych — a przez nie z uziomami wszystkich słupów,
- konstrukcjami wsporczymi, zbrojeniem fundamentów, rurociągami,
- uziemieniami sąsiednich obiektów.

> **Uwaga.** Mierzysz zatem **impedancję całego systemu uziemiającego**, nie rezystancję uziomu
> tej stacji. Wynik będzie bardzo niski (0,1–1 Ω) i nie powie ci, czy siatka lokalnie jest sprawna.
> Aby zmierzyć składnik lokalny, potrzebny jest **pomiar selektywny** (cęgi na poszczególnych
> odgałęzieniach) — odłączanie połączeń w czynnej stacji jest zwykle niedopuszczalne.

---

## D. Metody pomiarowe — kiedy którą

| Metoda | Zastosowanie | Ograniczenia |
|---|---|---|
| **spadku potencjału 3p/4p** | uziomy pojedyncze, małe stacje | wymaga długich tras; niepewna dla rozległych siatek |
| **wysokoprądowa z pomiarem selektywnym** | duże stacje SN/WN | wtrysk 20–100 A, jako powrót często wyłączona linia SN/WN; pomiar na częstotliwości różnej od 50 Hz i jej harmonicznych (typowo ok. 128 Hz) albo z odwracaniem polaryzacji; **jedyna wiarygodna** dla dużych obiektów |
| **cęgowa (clamp-on)** | słupy linii z przewodem odgromowym | mierzy pętlę; wymaga jednego mierzonego uziomu i wielu równoległych o pomijalnej rezystancji — **w stacji nie działa** |
| **selektywna (cęgi + sondy)** | pojedyncze odgałęzienie bez rozłączania | wymaga dostępu do przewodu odgałęźnego |
| **Wennera (4-elektrodowa)** | rezystywność gruntu, model warstwowy do obliczeń | to pomiar **gruntu**, nie uziomu |

### Metoda Wennera — pomiar rezystywności gruntu

Cztery elektrody w linii z równym odstępem $a$:

$$\rho = 2 \pi a R$$

| Oznaczenie | Jednostka | Znaczenie |
|---|---|---|
| $\rho$ | Ω·m | **rezystywność gruntu** — parametr ziemi |
| $a$ | m | odstęp między kolejnymi elektrodami |
| $R$ | Ω | rezystancja wskazana przez miernik |

Zmieniając $a$, sondujesz coraz **głębsze warstwy** gruntu (głębokość wnikania ≈ $a$).
Wynik to model dwu- lub trójwarstwowy, potrzebny do obliczeń projektowych — a także do
sprawdzenia, czy zmierzona rezystancja siatki jest w ogóle fizycznie sensowna.

---

## E. To, co naprawdę się liczy: napięcia rażeniowe

Tu jest **zmiana perspektywy**, która jest sednem tego rozdziału. Wartość w omach jest wielkością
pośrednią. Kryterium bezpieczeństwa dotyczy napięć, jakie może zobaczyć człowiek.

### E.1 Napięcie uziomowe

$$U_E = I_E \cdot Z_E$$

| Oznaczenie | Jednostka | Znaczenie |
|---|---|---|
| $U_E$ | V | **napięcie uziomowe** — potencjał całej siatki względem ziemi odległej |
| $I_E$ | A | prąd faktycznie **odpływający do gruntu** przez uziom |
| $Z_E$ | Ω | impedancja uziemienia |

### E.2 Współczynnik redukcyjny — najczęściej pomijany

Nie cały prąd zwarcia płynie przez uziom do gruntu. Część wraca **metalicznie**: ekranami kabli
i przewodami odgromowymi, które biegną równolegle do trasy prądu.

$$I_E = r \cdot I_F$$

| Oznaczenie | Znaczenie |
|---|---|
| $r$ | **współczynnik redukcyjny** — jaka część prądu zwarcia wraca przez grunt |
| $I_F$ | pełny prąd zwarcia w miejscu uszkodzenia |

Dla stacji zasilanej kablami z ekranem $r$ może wynosić **0,1–0,3**.

> **Uwaga.** Pominięcie współczynnika redukcyjnego przeszacowuje $U_E$ nawet **dziesięciokrotnie**.
> To najczęstsza przyczyna wniosku „uziemienie nie spełnia wymagań" tam, gdzie w rzeczywistości
> spełnia je z zapasem.

### E.3 Napięcie dotykowe i krokowe

<div class="dg-rysunek"><svg viewBox="0 0 660 210" class="dg-svg" role="img" aria-label="Rozkład potencjału na powierzchni gruntu wokół stacji z zaznaczonym napięciem dotykowym i krokowym"><text class="dg-t-b" x="10" y="16">Rozkład potencjału na powierzchni gruntu</text><path class="dg-os" d="M40 150 H640"/><path class="dg-obszar" d="M40 150 L40 52 L120 52 C220 58 340 118 640 142 L640 150 Z"/><path class="dg-krzywa" d="M40 52 H120 C220 58 340 118 640 142"/><path class="dg-przewod zywy" style="stroke-width:5" d="M40 150 H180"/><text class="dg-t-m" x="46" y="166">siatka uziemiająca</text><path class="dg-przewod" style="stroke:var(--roz);stroke-width:3" d="M150 150 V70"/><text class="dg-t-m roz" x="158" y="66">konstrukcja</text><path class="dg-os" style="stroke:var(--alarm);stroke-width:2" d="M150 88 H236 M232 84 V92"/><text class="dg-t-num alarm" x="244" y="92">U_T — napięcie dotykowe</text><text class="dg-t-m" x="244" y="108">ręka na konstrukcji, stopy 1 m dalej</text><path class="dg-os" style="stroke:var(--ostrzezenie);stroke-width:2" d="M380 122 H440 M436 118 V126"/><text class="dg-t-num uwaga" x="448" y="126">U_S — krokowe (1 m)</text><path class="dg-os" style="stroke:var(--sukces);stroke-width:2" d="M28 52 V150"/><text class="dg-t-num ok" x="10" y="44">U_E</text><text class="dg-t-m" x="380" y="166">potencjał maleje z odległością — dlatego krokowe jest mniejsze niż dotykowe</text></svg></div>

| Wielkość | Definicja | Typowy udział w $U_E$ |
|---|---|---|
| $U_E$ | potencjał siatki względem ziemi odległej | 100 % |
| $U_T$ | **napięcie dotykowe** — między ręką na konstrukcji a stopami 1 m od niej | 10–50 % w gęstej siatce |
| $U_S$ | **napięcie krokowe** — na dystansie 1 m | zwykle mniej niż $U_T$ |

Napięcie krokowe jest mniej krytyczne, bo droga prądu **noga–noga** omija serce, w przeciwieństwie
do drogi **ręka–stopy**.

### E.4 Kryterium dopuszczalności

Kryterium (PN-EN 50522): $U_T \le U_{Tp}(t)$, gdzie dopuszczalne napięcie dotykowe zależy
od **czasu trwania zwarcia**:

| Czas trwania zwarcia | $U_{Tp}$ orientacyjnie |
|---|---|
| 0,05 s | ok. 1400 V |
| 0,2 s | ok. 650 V |
| 0,5 s | ok. 220 V |
| ≥ 1 s | ok. 80 V |

> **Ważne.** Widać stąd, że **szybkość zabezpieczeń jest środkiem ochrony przeciwporażeniowej**.
> Skrócenie czasu wyłączenia z 0,5 s do 0,2 s podnosi dopuszczalne napięcie dotykowe trzykrotnie —
> często taniej niż dobudowa uziomów. To argument, który łączy ten rozdział
> z [rozdziałem 14 o ZS](14-blokada-logiczna-ZS-symulator.md).

### E.5 Warstwa tłucznia

Warstwa kamienia o wysokiej rezystywności ($\rho_s$ = 2000–5000 Ω·m) i grubości 10–15 cm
podnosi rezystancję obwodu stopy, a tym samym **dopuszczalne napięcie dotykowe wielokrotnie**.
To jeden z najtańszych i najskuteczniejszych środków ochronnych.

Element do weryfikacji przy oględzinach: **tłuczeń zamulony, zarośnięty lub przemieszany
z gruntem traci swoje właściwości** — a wygląda podobnie.

---

## F. Praktyczne trudności, o których się zapomina

### F.1 Ciągłość i rezystancja przejścia połączeń

Każde połączenie konstrukcja ↔ siatka: **poniżej 0,1 Ω**, mierzone prądem **co najmniej 10 A**
(mikroomomierz), nie multimetrem.

> **Ważne.** Prąd 10 A przebija warstwy tlenków i ujawnia korozję, której omomierz zasilający
> obwód prądem 1 mA nie zauważy. **To tu są realne usterki** — nie w wartości rezystancji siatki.
> Skorodowane, ale „ciągłe" połączenie przy prądzie zwarciowym po prostu odparuje.

### F.2 Sprzężenie przewodów sond

Przewody sondy prądowej i napięciowej prowadzone równolegle **indukują się wzajemnie**
i zafałszowują wynik. Prowadź je pod kątem około 90° albo maksymalnie rozsunięte.

### F.3 Tło 50 Hz

W czynnej stacji napięcie zakłócające na sondzie może być rzędu **woltów**, przy sygnale
pomiarowym również rzędu woltów. **Pomiar selektywny częstotliwościowo jest obowiązkowy**,
nie opcjonalny.

### F.4 Rezystancja sondy prądowej

W suchym, kamienistym gruncie może przekroczyć możliwości źródła w mierniku.
Zabieg: kilka szpilek równolegle, polewanie wodą z solą, wykorzystanie ogrodzenia
lub innego elementu metalowego jako elektrody pomocniczej.

---

## G. Lista kontrolna pomiaru uziemienia stacji

- [ ] Znam największy wymiar siatki z dokumentacji.
- [ ] Sonda prądowa odsunięta na co najmniej 5-krotność tego wymiaru.
- [ ] Zmierzyłem co najmniej 5 punktów krzywej $R(x)$ i **narysowałem ją**.
- [ ] Krzywa ma plateau — jeśli nie, pomiar odrzucony, nie protokołowany.
- [ ] Przewody sond nie biegną równolegle.
- [ ] Miernik pracuje na częstotliwości różnej od 50 Hz (pomiar selektywny).
- [ ] Zmierzyłem rezystywność gruntu metodą Wennera do obliczeń.
- [ ] Sprawdziłem rezystancję przejścia wszystkich dostępnych połączeń prądem ≥ 10 A.
- [ ] Znam aktualny prąd zwarcia doziemnego i czas wyłączenia (→ [rozdz. 17](17-punkt-neutralny-sieci-SN.md)).
- [ ] Uwzględniłem współczynnik redukcyjny $r$ dla tej stacji.
- [ ] Oceniłem $U_T$, a nie tylko $Z_E$.
- [ ] Sprawdziłem stan warstwy tłucznia.

---

## H. Pytania kontrolne

1. Dlaczego reguła 62 % nie działa dla siatki 50 × 50 m przy sondzie prądowej na 100 m?
2. Miernik pokazał 0,4 Ω, stabilnie, trzy razy pod rząd. Czy to dowód poprawnego pomiaru?
3. Prąd zwarcia doziemnego 300 A, ale stacja zasilana kablami z ekranem. Jaki prąd realnie
   płynie przez uziom i dlaczego to ważne?
4. Uziom A ma 0,3 Ω, uziom B ma 2 Ω. Który jest bezpieczniejszy?
5. Dlaczego rezystancję przejścia połączeń mierzy się prądem 10 A, a nie zwykłym omomierzem?
6. Jak skrócenie czasu wyłączenia zwarcia wpływa na wymagania dla uziemienia?

> **Odpowiedź do pytania 4.** Nie da się odpowiedzieć bez dodatkowych danych. Bezpieczeństwo
> określa napięcie dotykowe $U_T$ przy realnym prądzie $I_E$ i realnym czasie wyłączenia,
> a nie wartość rezystancji. Uziom 0,3 Ω w sieci z prądem doziemnym 3 kA i czasem 1 s daje
> $U_E$ = 900 V — przy dopuszczalnym $U_{Tp}$ = 80 V. Uziom 2 Ω w sieci kompensowanej z prądem
> 5 A daje $U_E$ = 10 V. Decyduje **rozkład potencjału i iloczyn $I_E \cdot Z_E$**, nie sama impedancja.

---

**Poprzedni:** [17. Punkt neutralny sieci SN](17-punkt-neutralny-sieci-SN.md) ·
**Następny:** [19. Przekładniki prądowe i napięciowe](19-przekladniki-pradowe-i-napieciowe.md)

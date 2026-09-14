# 20. Rezystancja izolacji i tg δ

Tu problemem nie jest sam pomiar — przyciśnięcie przycisku na megaomomierzu opanowuje się
w pięć minut. Problemem jest **wnioskowanie**: przejście od liczby na wyświetlaczu do zdania
„izolacja tego obiektu jest w takim a takim stanie".

> **Ważne.** Dwie zasady, które porządkują cały rozdział:
> **(1)** przy rezystancji izolacji znaczenie ma **kształt krzywej**, nie punkt na niej;
> **(2)** przy tg δ trzy wskaźniki (poziom, tip-up, rozrzut faz) trzeba czytać **razem** —
> przyrząd podaje je osobno i bez kontekstu.

---

## A. Co składa się na prąd przy pomiarze rezystancji izolacji

Po przyłożeniu napięcia stałego przez izolację płyną **cztery** prądy o zupełnie różnych stałych
czasowych. Miernik pokazuje ich sumę, a ty chcesz znać tylko jeden z nich.

| Składowa | Czas zanikania | Co oznacza |
|---|---|---|
| **pojemnościowa** (ładowanie) | sekundy | nic diagnostycznego — tylko pojemność obiektu |
| **absorpcji / polaryzacji** | minuty do godzin | polaryzacja dielektryka; wrażliwa na zawilgocenie |
| **upływu powierzchniowego** | stała | stan **powierzchni** izolatorów: brud, wilgoć, rosa |
| **przewodzenia (objętościowa)** | stała | **rzeczywisty stan izolacji objętościowej** ← to chcesz zmierzyć |

<div class="dg-rysunek"><svg viewBox="0 0 660 230" class="dg-svg" role="img" aria-label="Składowe prądu w czasie: pojemnościowa zanika w sekundach, absorpcji w minutach, przewodzenia jest stała"><text class="dg-t-b" x="10" y="16">Składowe prądu w funkcji czasu</text><path class="dg-os" d="M56 190 H630 M56 30 V190"/><text class="dg-t-m" x="12" y="28">prąd</text><path class="dg-krzywa" style="stroke:var(--alarm)" d="M58 40 C70 130 84 178 110 186 L630 188"/><text class="dg-t-num alarm" x="118" y="60">pojemnościowa — zanika w sekundach</text><text class="dg-t-m" x="118" y="76">na kablu wielokilometrowym: dziesiątki sekund</text><path class="dg-krzywa" style="stroke:var(--ostrzezenie)" d="M58 96 C160 140 300 166 630 172"/><text class="dg-t-num uwaga" x="320" y="150">absorpcji — minuty do godzin</text><path class="dg-krzywa" style="stroke:var(--sukces)" d="M56 178 H630"/><text class="dg-t-num ok" x="330" y="196">przewodzenia — stała, to jest sygnał diagnostyczny</text><path class="dg-os" style="stroke:var(--kreska-2);stroke-dasharray:4 4" d="M120 30 V190"/><text class="dg-t-m sr" x="120" y="210">15 s</text><path class="dg-os" style="stroke:var(--roz);stroke-dasharray:4 4" d="M200 30 V190"/><text class="dg-t-m roz sr" x="200" y="210">60 s</text><path class="dg-os" style="stroke:var(--roz);stroke-dasharray:4 4" d="M540 30 V190"/><text class="dg-t-m roz sr" x="540" y="210">10 min</text><text class="dg-t-m alarm" x="132" y="226">odczyt po 15 s mierzy ładowanie pojemności, nie upływ</text></svg></div>

> **Uwaga.** Na obiekcie o dużej pojemności (kabel wielokilometrowy, uzwojenie transformatora WN)
> prąd ładowania dominuje w pierwszych **dziesiątkach sekund**. Odczyt po 15 s mierzy więc
> ładowanie pojemności, a nie prąd upływu. To nie jest ta sama wielkość fizyczna.

---

## B. Wskaźniki — czyli kształt krzywej, nie punkt

$$\text{DAR} = \frac{R_{60\text{s}}}{R_{30\text{s}}} \qquad\qquad \text{PI} = \frac{R_{10\text{min}}}{R_{1\text{min}}}$$

| Oznaczenie | Pełna nazwa | Co mierzy |
|---|---|---|
| **DAR** | *Dielectric Absorption Ratio*, wskaźnik absorpcji | szybką część krzywej — test „na skróty", gdy nie ma czasu na 10 minut |
| **PI** | *Polarisation Index*, wskaźnik polaryzacji | pełny przebieg polaryzacji — wskaźnik podstawowy |

### Interpretacja PI

Dla izolacji termoutwardzalnej (maszyny wirujące, transformatory):

| PI | Ocena |
|---|---|
| < 1 | **alarmujące** — R spada w czasie, izolacja pochłania wilgoć pod napięciem |
| 1–2 | wątpliwe |
| 2–4 | dobre |
| > 4 | bardzo dobre |

> **Ważne.** Dla nowoczesnej, bardzo suchej izolacji **PI traci sens**. Gdy R jest wysokie już
> od pierwszej sekundy, stosunek $R_{10\text{min}}/R_{1\text{min}}$ dąży do 1 — co *wygląda*
> jak zły wynik, a jest objawem doskonałego stanu. IEEE 43 rozstrzyga: jeśli $R_{1\text{min}}$
> przekracza **5000 MΩ**, PI nie jest wymagane i nie należy go interpretować.

---

## C. Korekta temperaturowa — najczęściej pomijana

$$K_T = 2^{\frac{T - 20}{10}} \qquad\qquad R_{20} = R_T \cdot K_T$$

| Oznaczenie | Jednostka | Znaczenie |
|---|---|---|
| $K_T$ | — | współczynnik korekty temperaturowej |
| $T$ | °C | temperatura **obiektu** w chwili pomiaru (nie powietrza) |
| $R_T$ | MΩ | rezystancja zmierzona w temperaturze $T$ |
| $R_{20}$ | MΩ | rezystancja przeliczona na bazę 20 °C |

**Reguła praktyczna: rezystancja izolacji zmienia się dwukrotnie na każde 10 °C.**

### Przykład

Zmierzone 500 MΩ przy temperaturze obiektu 35 °C:

$$K_T = 2^{\frac{35-20}{10}} = 2^{1{,}5} = 2{,}83$$

$$R_{20} = 500 \cdot 2{,}83 = 1415\ \text{MΩ}$$

Ten sam, zdrowy obiekt zmierzony w +5 °C dałby około 2800 MΩ, a w +35 °C — 500 MΩ.

> **Uwaga.** Bez przeliczenia **porównywanie pomiarów rok do roku jest bez wartości**.
> Trzymaj **jedną bazę** w całej historii obiektu: dla maszyn wirujących IEEE 43 normalizuje
> do 40 °C, dla transformatorów zwykle przyjmuje się 20 °C. Mieszanie baz jest gorsze
> niż brak korekty, bo daje pozorną porównywalność.

---

## D. Pozostałe warunki, które psują pomiar

### Punkt rosy

Pomiar przy temperaturze obiektu **poniżej punktu rosy** powietrza daje film wody na powierzchni.
Dominuje wtedy upływ powierzchniowy i mierzysz stan brudu, nie izolacji objętościowej.

**Rozwiązanie:** **zacisk ochronny (guard)**, który odprowadza prąd powierzchniowy poza obwód
pomiarowy. Trzeci zacisk megaomomierza nie jest ozdobą.

### Napięcie probiercze

Reguła: $2 \cdot U_n + 1000$ V. W praktyce dla SN/WN stosuje się 5 kV lub 10 kV.

> **Uwaga.** Na bardzo starej izolacji zbyt wysokie napięcie probiercze może **zainicjować
> przebicie w trakcie pomiaru**. To jeden z przypadków, w których badanie jest ingerencją.

### Próba schodkowa (step voltage test)

Pomiar przy **dwóch napięciach** (np. 2,5 kV i 5 kV), po jednakowym czasie:

| Zachowanie | Wniosek |
|---|---|
| R praktycznie niezależne od napięcia | izolacja zdrowa |
| R spada powyżej **25 %** przy wyższym napięciu | zawilgocenie lub spękanie |

Bardzo czuły i prosty test — a wykonywany rzadko.

### Rozładowanie po pomiarze

Czas rozładowania **co najmniej 5-krotność czasu ładowania**. Obiekt pojemnościowy trzyma napięcie
długo: rozładowanie przez rezystor, potem uziemienie na stałe.

---

## E. Symulator — krzywa R(t) i korekta temperaturowa

Wybierz stan izolacji i obserwuj, jak zmienia się **kształt** krzywej przy tej samej wartości
$R_{60}$. Potem przesuń temperaturę i zobacz, jak bardzo zmienia się liczba, która „opisuje ten sam
obiekt".

<div class="dg-widget" data-typ="izolacja"></div>

### Ćwiczenia do symulatora

1. Ustaw $R_{60}$ = 500 MΩ i przełączaj stan izolacji. Wartość odczytu po 60 s jest identyczna —
   co się zmienia?
2. Ustaw stan „mocno zawilgocona". Jak wygląda PI? Dlaczego sama wartość 500 MΩ mogłaby
   wyglądać przyzwoicie?
3. Ustaw stan „sucha" i $R_{60}$ = 2000 MΩ. Przeczytaj komunikat o PI — dlaczego wskaźnik
   przestaje być użyteczny?
4. Ustaw temperaturę −5 °C, potem 55 °C. Ile razy różni się $R_{20}$?

---

## F. tg δ — współczynnik strat dielektrycznych

### Co to jest

$$\tan\delta = \frac{I_R}{I_C} = \frac{1}{\omega R_p C}$$

| Oznaczenie | Znaczenie |
|---|---|
| $\tan\delta$ | współczynnik strat dielektrycznych, podawany w % lub bezwymiarowo |
| $I_R$ | składowa **czynna** prądu przez izolację (straty) |
| $I_C$ | składowa **bierna** (pojemnościowa) |
| $R_p$, $C$ | rezystancja i pojemność w modelu równoległym izolacji |

Idealny dielektryk ma $\tan\delta = 0$ — prąd wyprzedza napięcie dokładnie o 90°.
Kąt $\delta$ to odchylenie od tej idealności.

### Jak się mierzy

Mostek Scheringa albo miernik cyfrowy, standardowo przy **10 kV, 50 Hz**. W obecności zakłóceń —
z **przesuwem częstotliwości** (45 Hz i 55 Hz), bo zakłócenia sieciowe nie dają się odfiltrować
na 50 Hz (patrz [rozdział 16](16-napiecia-indukowane.md)).

### Poziomy orientacyjne dla izolacji transformatorowej (przy 20 °C)

| $\tan\delta$ | Ocena |
|---|---|
| < 0,5 % | nowa / bardzo dobra |
| 0,5–0,7 % | dobra |
| 0,7–1,0 % | wątpliwa, obserwować |
| > 1,0 % | zła |

---

## G. Trzy wskaźniki, które trzeba czytać razem

To sedno trudności z tg δ. Przyrząd podaje trzy liczby osobno i bez kontekstu, a każda mówi
o **innym rodzaju defektu**.

### 1. Poziom tg δ — wskaźnik globalny

Mówi o ogólnym zawilgoceniu i starzeniu **całej objętości** izolacji.

### 2. Tip-up (przyrost z napięciem) — wskaźnik lokalny

$$\Delta\tan\delta = \tan\delta(U_0) - \tan\delta(0{,}5 \cdot U_0)$$

Zdrowa izolacja ma $\Delta\tan\delta \approx 0$, ponieważ straty rosną proporcjonalnie do $U^2$,
a $\tan\delta$ jest ich **stosunkiem** do prądu biernego — który też rośnie z $U$. Więc iloraz
nie zależy od napięcia.

**Rosnący tip-up oznacza jonizację we wtrąceniach gazowych** — czyli wyładowania niezupełne,
które przy połowie napięcia jeszcze się nie zapalają, a przy pełnym już tak.

> **Ważne.** To jest przypadek, którego pojedynczy pomiar przy jednym napięciu **nie wykryje**.
> Poziom tg δ może być niski (izolacja globalnie sucha), a w środku rozwija się lokalny defekt.
> Poziom to wskaźnik globalny, tip-up — lokalny.

### 3. Zmiana pojemności C

| Kierunek zmiany | Przyczyna |
|---|---|
| **wzrost** C | zawilgocenie ($\varepsilon_r$ wody ≈ 80 wobec $\varepsilon_r$ oleju ≈ 2,2 — nawet mała ilość wody wyraźnie podnosi C), albo zwarcie warstw uzwojenia |
| **spadek** C | rozwarstwienie, delaminacja, wysuszenie, przesunięcie geometrii |

---

## H. Symulator — tg δ, tip-up i rozrzut faz

Ustaw niski poziom tg δ (0,4 %) i wysoki tip-up (0,8). Zobacz, jak wygląda obiekt, który
„wygląda zdrowo" w pojedynczym pomiarze, a ma rozwijający się defekt lokalny.

<div class="dg-widget" data-typ="tgdelta"></div>

### Ćwiczenia do symulatora

1. Poziom 0,4 %, tip-up 0,05, rozrzut 5 % — stan wzorcowy. Zapamiętaj kształt krzywych.
2. Poziom 0,4 %, tip-up 0,9 — co się zmienia w kształcie i co to znaczy?
3. Poziom 1,4 %, tip-up 0,05 — inny rodzaj problemu. Który?
4. Rozrzut faz 40 % przy dobrym poziomie i tip-upie. Dlaczego to mimo wszystko alarm?

---

## I. Dlaczego tg δ ma sens głównie trendowo

Bezwzględne wartości $\tan\delta$ zależą od konstrukcji obiektu, temperatury, wilgotności i wieku.
**Jeden pomiar bez odniesienia to niemal zgadywanie.** Trzy poziomy odniesienia, w kolejności
wartości:

1. **Pomiar odbiorczy (baseline)** — najlepszy. Dlatego pomiar przy przyjęciu obiektu
   do eksploatacji jest krytyczny, nawet gdy „wszystko jest nowe i pewnie dobre".
2. **Trend historyczny** — kolejne pomiary tego samego obiektu w porównywalnych warunkach.
3. **Porównanie faz między sobą** — najprostsze i zaskakująco skuteczne kryterium przy braku
   historii. **Rozrzut powyżej 20–30 % to podejrzenie defektu**, bo trzy fazy tego samego obiektu
   przeszły tę samą historię produkcyjną i termiczną. Analogicznie: porównanie z obiektem
   siostrzanym tego samego typu.

---

## J. Metody nowoczesne — dlaczego jeden punkt przy 50 Hz to za mało

### DFR / FDS

**DFR** (*Dielectric Frequency Response*), zwane też **FDS** (*Frequency Domain Spectroscopy*) —
pomiar $\tan\delta$ w funkcji **częstotliwości**, od około 1 mHz do 1 kHz.

Poszczególne zjawiska ujawniają się w różnych zakresach częstotliwości:

| Zakres częstotliwości | Co ujawnia |
|---|---|
| bardzo niskie (mHz) | **przewodność oleju** |
| średnie | **zawilgocenie celulozy** (papieru, preszpanu) |
| wysokie (setki Hz – kHz) | **geometria** układu izolacyjnego |

> **Ważne.** To pozwala **rozdzielić** zawilgocenie papieru od złego oleju — czego pojedynczy
> pomiar przy 50 Hz nie potrafi, bo daje jedną liczbę będącą mieszanką obu. DFR jest dziś
> podstawową metodą oceny zawilgocenia izolacji transformatorów WN, znacznie pewniejszą
> niż wnioskowanie z zawartości wody w oleju.

### PDC

**PDC** (*Polarisation / Depolarisation Current*) — odpowiednik DFR w domenie czasu: pomiar prądu
ładowania i rozładowania przez tysiące sekund. Ta sama informacja, inna droga dojścia.

---

## K. Lista kontrolna pomiaru izolacji

- [ ] Obiekt rozładowany i uziemiony przed przyłożeniem przyrządu.
- [ ] Zmierzone napięcie AC na obiekcie (→ [rozdz. 16](16-napiecia-indukowane.md)).
- [ ] Zanotowana **temperatura obiektu**, nie powietrza.
- [ ] Sprawdzone, czy obiekt jest powyżej punktu rosy; w razie wątpliwości użyty zacisk guard.
- [ ] Napięcie probiercze dobrane do obiektu i jego wieku.
- [ ] Odczyty po 30 s, 60 s i 10 min — nie jeden odczyt.
- [ ] Obliczone DAR i PI, wynik przeliczony na bazę temperaturową.
- [ ] Przy tg δ: pomiar co najmniej przy dwóch napięciach (tip-up) i osobno dla każdej fazy.
- [ ] Wynik porównany z pomiarem odbiorczym, historią albo pozostałymi fazami.
- [ ] Rozładowanie przez rezystor i uziemienie po pomiarze (≥ 5 × czas ładowania).

---

## L. Pytania kontrolne

1. Dlaczego odczyt rezystancji izolacji po 15 s na 5-kilometrowym kablu nie mówi nic o upływie?
2. PI wyszedł 1,05, a $R_{1\text{min}}$ = 8000 MΩ. Zły wynik czy dobry? Uzasadnij.
3. Zmierzono 800 MΩ w temperaturze 10 °C. Ile to jest po przeliczeniu na 20 °C?
4. Dlaczego $\tan\delta$ zdrowej izolacji nie zależy od napięcia probierczego?
5. Poziom tg δ = 0,45 %, ale tip-up = 0,7 pp. Co to znaczy i czego nie wykryłby pojedynczy pomiar?
6. Czego nie da się odróżnić pomiarem tg δ przy 50 Hz, a da się metodą DFR?

> **Odpowiedź do pytania 3.** $K_T = 2^{(10-20)/10} = 2^{-1} = 0{,}5$, więc
> $R_{20} = 800 \cdot 0{,}5 = 400$ MΩ. Uwaga na kierunek: pomiar w **niższej** temperaturze
> daje **wyższą** rezystancję, więc po przeliczeniu na 20 °C wartość **maleje**.
> Odruch „przeliczenie zawsze podnosi wynik" jest błędny.

---

**Poprzedni:** [19. Przekładniki prądowe i napięciowe](19-przekladniki-pradowe-i-napieciowe.md) ·
**Następny:** [21. Wyładowania niezupełne (WNZ)](21-wyladowania-niezupelne.md)

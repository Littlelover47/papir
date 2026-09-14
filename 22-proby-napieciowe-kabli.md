# 22. Próby napięciowe kabli

Rozdział o pomiarze, który **może zniszczyć obiekt** — czasem przez przypadek, a czasem
z założenia. Dwie rzeczy trzeba tu rozumieć: dlaczego napięcie stałe szkodzi polietylenowi
usieciowanemu, oraz czym różni się próba wytrzymałościowa od pomiaru diagnostycznego.

> **Nigdy** nie wykonuj próby napięciem stałym na kablu z izolacją XLPE.
> Kabel może przejść próbę i przebić **kilka tygodni później** — i nikt nie połączy tego
> z pomiarem.

---

## A. Dlaczego DC jest szkodliwe dla XLPE

Trzy niezależne mechanizmy działają jednocześnie.

### Mechanizm 1: ładunek przestrzenny (space charge)

Pod napięciem stałym nośniki wstrzykiwane z elektrod **gromadzą się w objętości izolacji**
i tworzą trwały rozkład ładunku. Po zdjęciu napięcia relaksuje on **tygodniami**.

Gdy kabel wraca do pracy pod napięciem przemiennym, pole od ładunku przestrzennego **sumuje się**
z polem roboczym. Lokalnie może przekroczyć wytrzymałość tam, gdzie nominalnie byłoby bezpiecznie.

### Mechanizm 2: inny rozkład pola

| Rodzaj napięcia | Pole rozkłada się według |
|---|---|
| przemienne (AC) | **przenikalności** $\varepsilon$ |
| stałe (DC) | **rezystywności** $\rho$ |

Te rozkłady są **różne**, szczególnie w układach warstwowych: mufach, głowicach, izolacji
kompozytowej. Skutek: próba DC naprężą **inne miejsca** niż praca ruchowa, więc nie testuje tego,
co powinna.

<div class="dg-rysunek"><svg viewBox="0 0 660 200" class="dg-svg" role="img" aria-label="Porównanie rozkładu natężenia pola w izolacji kabla pod napięciem przemiennym i stałym"><text class="dg-t-b" x="10" y="16">Natężenie pola w przekroju izolacji</text><text class="dg-t-num ok" x="40" y="40">AC — pole wg przenikalności</text><rect x="40" y="52" width="250" height="44" rx="3" style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:1.6"/><path style="fill:none;stroke:var(--sukces);stroke-width:2.4" d="M52 56 V92 M84 60 V88 M116 63 V85 M148 66 V82 M180 68 V80 M212 69 V79 M244 70 V78 M276 71 V77"/><text class="dg-t-m" x="40" y="112">żyła</text><text class="dg-t-m kon" x="290" y="112">ekran</text><text class="dg-t-m ok" x="40" y="130">maksimum przy żyle — tak jak w pracy ruchowej</text><text class="dg-t-num alarm" x="370" y="40">DC — pole wg rezystywności</text><rect x="370" y="52" width="250" height="44" rx="3" style="fill:var(--tlo-3);stroke:var(--kreska-2);stroke-width:1.6"/><path style="fill:none;stroke:var(--alarm);stroke-width:2.4" d="M382 71 V77 M414 70 V78 M446 68 V80 M478 66 V82 M510 63 V85 M542 60 V88 M574 57 V91 M606 54 V94"/><text class="dg-t-m" x="370" y="112">żyła</text><text class="dg-t-m kon" x="620" y="112">ekran</text><text class="dg-t-m alarm" x="370" y="130">maksimum przy ekranie — naprężasz nie to miejsce</text><path class="dg-os" d="M10 148 H650"/><text class="dg-t-m" x="10" y="170">Wniosek: próba DC sprawdza wytrzymałość obszaru, który w pracy nie jest krytyczny,</text><text class="dg-t-m" x="10" y="188">a jednocześnie zostawia w izolacji ładunek, który podnosi pole po powrocie pod AC.</text></svg></div>

### Mechanizm 3: przyspieszenie drzewienia wodnego

DC przyspiesza rozwój **drzew wodnych** (water trees) i sprzyja ich przekształceniu
w **drzewa elektryczne** — czyli w defekt nieodwracalny.

### Gdzie DC nadal ma sens

| Zastosowanie | Uzasadnienie |
|---|---|
| kable **papierowo-olejowe** (PILC, z masą przesyconą) | mechanizmy powyżej nie występują w tej formie; próba sprawdzona historycznie |
| pomiar **rezystancji izolacji** | niskie napięcie, krótki czas — inna kategoria badania |

Dla XLPE i EPR próby DC są w praktyce **wykluczone** przez współczesne normy — zarówno odbiorcze,
jak i po naprawie.

---

## B. VLF — bardzo niska częstotliwość

### Idea

Sinusoida (albo przebieg cosinusoidalno-prostokątny) o częstotliwości 0,01–1 Hz,
standardowo **0,1 Hz**.

Uzasadnienie jest energetyczne. Moc bierna potrzebna do naprężenia kabla:

$$Q = U^2 \cdot 2\pi f \cdot C$$

| Oznaczenie | Jednostka | Znaczenie |
|---|---|---|
| $Q$ | var | moc bierna, którą musi dostarczyć źródło probiercze |
| $U$ | V | napięcie probiercze |
| $f$ | Hz | częstotliwość próby |
| $C$ | F | pojemność kabla (0,25–0,40 µF/km/fazę) |

Przy 0,1 Hz zamiast 50 Hz częstotliwość jest **500 razy mniejsza**, więc moc bierna też.
Dlatego urządzenie przenośne o mocy kilku kVA napręża kilkukilometrowy kabel do trzykrotności
napięcia fazowego, podczas gdy układ 50 Hz wymagałby setek kVA.

### Zaleta merytoryczna

Mechanizm naprężenia i przebicia jest **zbliżony do AC** (polaryzacja zmienna, brak trwałego
ładunku przestrzennego), więc próba testuje to, co ma testować — bez szkodliwości DC.

### Poziomy i czasy (IEEE 400.2, orientacyjnie)

| Rodzaj próby | Napięcie | Czas |
|---|---|---|
| odbiorcza (nowy kabel) | 2–3 $U_0$ | 15–60 min |
| po naprawie / konserwacyjna | 1,5–2 $U_0$ | 15–60 min |

gdzie $U_0$ to napięcie znamionowe faza–ziemia (8,7 kV dla sieci 15 kV, 12 kV dla 20 kV,
18 kV dla 30 kV).

### VLF-TD — połączenie próby z diagnostyką

Wersja z jednoczesnym pomiarem $\tan\delta$. Daje **trzy niezależne wskaźniki**:

| Wskaźnik | Co mówi |
|---|---|
| poziom $\tan\delta$ przy VLF | ogólny stan izolacji |
| **DTD** (*Differential TD*) | przyrost $\tan\delta$ między poziomami napięcia — odpowiednik tip-up |
| **stabilność** $\sigma$ | rozrzut $\tan\delta$ w czasie przy stałym napięciu; niestabilność wskazuje na **aktywny, rozwijający się defekt** |

To jedna z najlepszych dostępnych diagnostyk kabli SN, bo w jednym podejściu daje ocenę globalną
i wskazanie defektu lokalnego.

---

## C. AC rezonansowe (ACRT / ASR)

Obiekt (pojemność $C$) tworzy z dławikiem probierczym ($L$) obwód **rezonansowy**.
W rezonansie źródło pokrywa **tylko straty**, więc zasilanie o mocy kilkudziesięciu kVA generuje
setki Mvar mocy biernej probierczej.

| Wariant | Zasada |
|---|---|
| **ACRT** | dławik regulowany, częstotliwość stała 50 Hz |
| **ASR** | częstotliwość regulowana (typowo 20–300 Hz), dławik stały — tańsze i lżejsze, dopuszczone normami do prób odbiorczych |

**Najbardziej wiarygodna metoda** — naprężenie identyczne lub bardzo bliskie warunkom ruchowym.
Standard dla rozdzielnic gazowych (GIS), transformatorów i długich kabli WN. Umożliwia jednoczesny
pomiar WNZ przy naprężeniu roboczym, co jest ideałem diagnostycznym
(→ [rozdział 21](21-wyladowania-niezupelne.md)).

---

## D. Symulator — moc probiercza i dobór metody

Ustaw kabel XLPE 5 km i metodę **DC** — przeczytaj ostrzeżenie i popatrz na rozkład pola.
Potem przełączaj metody i porównuj słupki mocy: to jest cała odpowiedź na pytanie,
dlaczego VLF w ogóle wymyślono.

<div class="dg-widget" data-typ="proba-kabla"></div>

### Ćwiczenia do symulatora

1. Kabel 5 km, 2 $U_0$. Ile mocy biernej wymaga próba przy 50 Hz, a ile przy 0,1 Hz?
   Jaki jest stosunek?
2. Przełącz na ACRT. Dlaczego wymagana moc źródła jest jeszcze mniejsza niż przy VLF,
   choć częstotliwość jest 500× wyższa?
3. Ustaw kabel 12 km i sprawdź energię zgromadzoną. Co to znaczy dla procedury po próbie?
4. Przełącz izolację na papier-olej i metodę na DC. Dlaczego teraz ostrzeżenie znika?

---

## E. Wytrzymałościowa a diagnostyczna — podział, który trzeba mieć w głowie

| | Próba **wytrzymałościowa** (withstand) | Pomiar **diagnostyczny** |
|---|---|---|
| Wynik | pass / fail | wartości liczbowe, trend, lokalizacja |
| Cel | ujawnić słabe miejsce **teraz**, w kontrolowanych warunkach, zamiast w ruchu | ocenić stan i przewidzieć |
| Ryzyko dla obiektu | **świadomie akceptowane przebicie** | brak (nieniszczące) |
| Co daje | pewność „wytrzymał 3 $U_0$ przez 30 min" | brak pewności wytrzymałości, ale wiedza o kierunku zmian |
| Metody | VLF withstand, ACRT, DC (tylko PILC) | tg δ, DFR, WNZ, rezystancja izolacji, VLF-TD |

### Monitored withstand — połączenie obu

Próba wytrzymałościowa z **jednoczesnym monitoringiem** $\tan\delta$ i WNZ. Jeśli parametry
zaczynają się pogarszać w trakcie, próbę można **przerwać przed przebiciem**.

> **Ważne.** To jest dziś zalecane podejście, bo daje wynik pass/fail **bez konieczności
> niszczenia obiektu**. Klasyczna próba wytrzymałościowa to test binarny, w którym cena pomyłki
> to uszkodzony kabel i nieplanowana naprawa.

---

## F. Organizacja i bezpieczeństwo

### Przed próbą

> **Ważne.** Próba wytrzymałościowa to **świadome ryzyko uszkodzenia obiektu**.
> Nie wolno jej rozpoczynać bez **zgody właściciela** i bez **gotowego planu naprawy**:
> dostępnej ekipy muf, materiałów i czasu w oknie wyłączeniowym. Przebicie w mufie w piątek
> po południu, bez planu, jest sytuacją gorszą niż brak próby.

### Drugi koniec kabla

Na głowicy odległej pojawia się **pełne napięcie probiercze** — np. 26 kV przy próbie 3 $U_0$
kabla 15 kV. Miejsce musi być:

- obsadzone albo trwale zabezpieczone i odgrodzone,
- w ciągłej łączności radiowej z operatorem układu probierczego,
- objęte jednoznaczną procedurą „gotów / stop".

### Po próbie

Kolejność ma znaczenie:

1. **Rozładowanie przez rezystor** — nie przez zwarcie. Ograniczenie prądu chroni izolację
   i głowice.
2. **Uziemienie trwałe** na czas **co najmniej równy czasowi próby**.
3. Ekrany i żyły powrotne uziemione po obu stronach; żyły nieprzebadane również uziemione,
   nie pozostawione „w powietrzu".

> **Uwaga.** Przy dłuższych próbach występuje zjawisko **powrotu napięcia** (recovery voltage):
> po zdjęciu uziemienia kabel „odzyskuje" napięcie na skutek relaksacji polaryzacji.
> Dlatego uziemienie zostaje **do końca prac**, a nie tylko na czas rozładowania.

---

## G. Ilustracja: energia zgromadzona w kablu

Kabel 15 kV, 5 km, pojemność 0,3 µF/km na fazę, czyli $C$ = 1,5 µF.

$$E = \tfrac{1}{2} C U^2$$

| Napięcie | Energia |
|---|---|
| robocze $U_0$ = 8,7 kV | $E = \tfrac{1}{2} \cdot 1{,}5\cdot10^{-6} \cdot 8700^2 \approx 57$ J |
| probiercze 3 $U_0$ = 26,1 kV | $E = \tfrac{1}{2} \cdot 1{,}5\cdot10^{-6} \cdot 26100^2 \approx 511$ J |

Dla porównania: granica energii uznawanej za bezpieczną przy rozładowaniu przez człowieka
to rząd **pojedynczych dżuli**.

> **Nigdy** nie traktuj rozładowania i uziemienia jako jednej czynności.
> **57 J zabija. 511 J zabija z zapasem.** Kabel wyłączony nie znaczy kabel rozładowany,
> a kabel rozładowany nie znaczy kabel uziemiony.

---

## H. Lista kontrolna próby napięciowej kabla

- [ ] Znany typ izolacji — i **wykluczone DC dla XLPE/EPR**.
- [ ] Metoda dobrana do celu: wytrzymałościowa czy diagnostyczna (decyzja świadoma).
- [ ] Zgoda właściciela obiektu i plan naprawy na wypadek przebicia.
- [ ] Obliczona pojemność kabla i wymagana moc źródła.
- [ ] Drugi koniec zabezpieczony, obsadzony, z łącznością i procedurą „gotów / stop".
- [ ] Żyły nieprzebadane oraz ekrany uziemione.
- [ ] Poziom i czas próby zgodne z normą i rodzajem próby (odbiorcza / po naprawie).
- [ ] Jeśli możliwe — monitoring tg δ i WNZ w trakcie (monitored withstand).
- [ ] Rozładowanie **przez rezystor**, potem uziemienie na czas ≥ czas próby.
- [ ] Uziemienie utrzymane do końca prac (zjawisko powrotu napięcia).

---

## I. Pytania kontrolne

1. Wymień trzy mechanizmy, którymi napięcie stałe szkodzi izolacji XLPE.
2. Dlaczego próba DC „nie testuje tego, co powinna", nawet gdyby nie zostawiała ładunku
   przestrzennego?
3. Skąd bierze się 500-krotna redukcja mocy biernej przy przejściu z 50 Hz na 0,1 Hz?
4. Dlaczego przy ACRT źródło o mocy kilkudziesięciu kVA wystarcza do wytworzenia setek Mvar?
5. Czym różni się próba wytrzymałościowa od pomiaru diagnostycznego i co daje ich połączenie?
6. Kabel 20 kV, 8 km, 0,3 µF/km. Ile energii zgromadzi przy próbie 2 $U_0$?
7. Dlaczego uziemienie po próbie utrzymuje się do końca prac, a nie tylko do rozładowania?

> **Odpowiedź do pytania 6.** $C = 0{,}3 \cdot 8 = 2{,}4$ µF. Napięcie próby:
> $2 \cdot 12 = 24$ kV. Energia:
> $E = \tfrac{1}{2} \cdot 2{,}4\cdot10^{-6} \cdot 24000^2 \approx 691$ J.
> Blisko siedmiuset dżuli w kablu, który „jest wyłączony". To dlatego rozładowanie wykonuje się
> przez rezystor, a nie przez rzucenie uziemiacza — zwarcie takiej energii uszkadza głowice
> i sam uziemiacz.

---

**Poprzedni:** [21. Wyładowania niezupełne (WNZ)](21-wyladowania-niezupelne.md) ·
**Następny:** [23. Topologia i zasilanie zwrotne](23-topologia-i-zasilanie-zwrotne.md)

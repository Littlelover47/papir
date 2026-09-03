# 02. Urządzenia do 1 kV i ochrona przeciwporażeniowa

To najczęściej pytany blok — również na egzaminie „do 30 kV", bo każda stacja SN ma stronę nn.

---

## A. Podstawy — działanie prądu na organizm

### 1. Jakie skutki wywołuje prąd przepływający przez ciało człowieka?
- **skutki bezpośrednie**: skurcz mięśni (nie można puścić przewodu — prąd samouwolnienia),
  zaburzenia oddychania, **migotanie komór serca** (fibrylacja — główna przyczyna zgonów),
  zatrzymanie krążenia, oparzenia wewnętrzne i zewnętrzne, elektroliza krwi;
- **skutki wtórne**: upadek z wysokości, uderzenie, oparzenie łukiem, oślepienie.

Wartości progowe dla prądu przemiennego 50 Hz (drogą ręka–ręka/ręka–stopy):
- **~0,5 mA** — próg odczuwania,
- **~10 mA** — próg samouwolnienia (dla mężczyzn ok. 10 mA, kobiet ok. 6–7 mA),
- **~30 mA** — zaburzenia oddychania (stąd wartość 30 mA dla wyłączników różnicowoprądowych
  ochrony uzupełniającej),
- **> ~50–80 mA przez ok. 1 s** — realne ryzyko migotania komór,
- **> 1 A** — zatrzymanie serca, ciężkie oparzenia.

**Prąd stały** jest ok. 3–4 razy mniej groźny (dla migotania), ale groźniejszy przy elektrolizie
i przy przerwaniu obwodu.

### 2. Od czego zależy stopień zagrożenia?
Od **wartości prądu** i **czasu przepływu** (iloczyn I·t), **drogi przepływu** (najgroźniejsza:
ręka–ręka i lewa ręka–stopy, bo przez serce), **rodzaju i częstotliwości prądu**, **rezystancji
ciała** (1000 Ω przyjmowane obliczeniowo; zależy od wilgotności, powierzchni styku, napięcia),
warunków środowiska (wilgoć, temperatura), stanu zdrowia.

### 3. Jakie napięcia uważa się za bezpieczne (dopuszczalne długotrwale U_L)?
| Warunki | AC | DC |
|---|---|---|
| Warunki normalne (środowisko suche) | **50 V** | **120 V** |
| Warunki zwiększonego zagrożenia (wilgotne, przewodzące otoczenie) | **25 V** | **60 V** |
| Warunki szczególnego zagrożenia (np. w wodzie, ciasne przestrzenie przewodzące) | 12 V | 30 V |

### 4. Jakie są zakresy napięciowe?
- **Zakres I**: AC ≤ 50 V, DC ≤ 120 V (napięcia bardzo niskie).
- **Zakres II**: AC 50–1000 V, DC 120–1500 V (niskie napięcie).
- Powyżej: **wysokie napięcie** (w praktyce polskiej: SN 1–60 kV, WN 110–220 kV, NN 400–750 kV).

---

## B. Zasady ochrony przeciwporażeniowej (PN-EN 61140, PN-HD 60364-4-41)

### 5. Jaka jest podstawowa zasada ochrony przed porażeniem?
Części czynne nie mogą być dostępne, a części dostępne nie mogą być czynne — ani w warunkach
normalnych, ani w warunkach uszkodzenia (pojedynczego). Realizuje się to przez:
- **ochronę podstawową** (dawniej: przed dotykiem bezpośrednim),
- **ochronę przy uszkodzeniu** (dawniej: przed dotykiem pośrednim),
- **ochronę uzupełniającą**.

### 6. Środki ochrony podstawowej
- **izolacja podstawowa** części czynnych,
- **przegrody i obudowy** (co najmniej IP2X / IPXXB, dla powierzchni górnych dostępnych IP4X/IPXXD),
- **przeszkody** (tylko dla osób wykwalifikowanych),
- **umieszczenie poza zasięgiem ręki**,
- **ograniczenie napięcia** (SELV/PELV),
- **ograniczenie prądu ustalonego i ładunku**.

### 7. Środki ochrony przy uszkodzeniu
- **samoczynne wyłączenie zasilania** (najczęstsze; wymaga uziemienia ochronnego, połączeń
  wyrównawczych i odpowiedniego zabezpieczenia),
- **izolacja podwójna lub wzmocniona** (urządzenia **klasy II**),
- **separacja elektryczna** (transformator separacyjny, jeden odbiornik),
- **SELV / PELV**,
- **wyrównanie potencjałów**.

### 8. Środki ochrony uzupełniającej
- **wyłącznik różnicowoprądowy** o **I_Δn ≤ 30 mA**,
- **dodatkowe (miejscowe) połączenia wyrównawcze**.

### 9. Klasy ochronności urządzeń
- **Klasa 0** — tylko izolacja podstawowa, bez zacisku PE (w Polsce **niedopuszczalna** w nowych
  instalacjach).
- **Klasa I** — izolacja podstawowa + zacisk ochronny PE (obudowa metalowa przyłączona do PE).
- **Klasa II** — izolacja podwójna lub wzmocniona, **bez** zacisku PE; symbol: dwa kwadraty ▫▫.
- **Klasa III** — zasilanie napięciem **SELV**; symbol: romb z III.

### 10. Co to SELV, PELV, FELV?
- **SELV** (Safety Extra-Low Voltage) — obwód o napięciu bardzo niskim, **odseparowany** od sieci
  (transformator bezpieczeństwa), **nieuziemiony**, bez połączenia z PE i z częściami obcymi.
- **PELV** — jak SELV, ale obwód (lub części dostępne) **jest uziemiony**.
- **FELV** — obwód o napięciu bardzo niskim, ale **bez separacji ochronnej** (np. przez zwykły
  autotransformator/dzielnik) — nie stanowi ochrony, wymaga takich środków ochrony jak obwód
  pierwotny.

---

## C. Układy sieci

### 11. Jakie są układy sieci i co oznaczają litery?
Pierwsza litera — sposób uziemienia **punktu neutralnego źródła**:
- **T** — bezpośrednio uziemiony, **I** — izolowany lub uziemiony przez impedancję.

Druga litera — sposób połączenia **części dostępnych odbiornika**:
- **T** — uziemione bezpośrednio (niezależnie od źródła), **N** — połączone z uziemionym punktem
  neutralnym sieci.

Dalsze litery — sposób prowadzenia przewodów N i PE:
- **S** — oddzielne (separate), **C** — wspólne (combined, PEN).

**Układy:**
- **TN-C** — funkcje N i PE w jednym przewodzie **PEN** na całej długości. Nie wolno stosować
  wyłączników różnicowoprądowych, nie wolno stosować w nowych instalacjach wewnętrznych;
  przekrój PEN min. **10 mm² Cu**
  (16 mm² Al).
- **TN-S** — N i PE rozdzielone od źródła.
- **TN-C-S** — PEN rozdzielany na N i PE w określonym punkcie (typowo w złączu/rozdzielnicy
  głównej); **po rozdzieleniu nie wolno ich ponownie łączyć**. To najczęstszy układ w Polsce.
- **TT** — punkt neutralny źródła uziemiony, części dostępne odbiorcy uziemione **własnym,
  niezależnym uziemieniem**. Ochronę realizuje praktycznie zawsze
  **wyłącznik różnicowoprądowy**.
- **IT** — punkt neutralny izolowany (lub przez dużą impedancję), części dostępne uziemione;
  stosowany tam, gdzie nie wolno przerwać zasilania (sale operacyjne, przemysł ciągły, potrzeby
  własne stacji) — wymaga **kontroli stanu izolacji** i sygnalizacji pierwszego zwarcia doziemnego.

### 12. Warunek skuteczności samoczynnego wyłączenia zasilania
$$Z_s \cdot I_a \le U_0$$
gdzie: **Z_s** — impedancja pętli zwarciowej, **I_a** — prąd powodujący samoczynne zadziałanie
zabezpieczenia w wymaganym czasie, **U_0** — napięcie fazowe względem ziemi (230 V).

Równoważnie: $I_k = \dfrac{U_0}{Z_s} \ge I_a$

W układzie **TT** dodatkowo: $R_A \le \dfrac{U_L}{I_a}$ (dla wyłącznika różnicowoprądowego:
$R_A \le \dfrac{50}{I_{\Delta n}}$).

### 13. Wymagane czasy wyłączenia (PN-HD 60364-4-41, tabl. 41.1)
Dla obwodów końcowych o prądzie znamionowym **≤ 32 A**:

| U₀ (AC) | TN | TT |
|---|---|---|
| 50 V < U₀ ≤ 120 V | 0,8 s | 0,3 s |
| **120 V < U₀ ≤ 230 V** | **0,4 s** | **0,2 s** |
| 230 V < U₀ ≤ 400 V | 0,2 s | 0,07 s |
| U₀ > 400 V | 0,1 s | 0,04 s |

Dla obwodów **rozdzielczych** oraz obwodów końcowych **> 32 A**:
**TN — 5 s**, **TT — 1 s**.

### 14. Gdzie obowiązkowo stosuje się wyłączniki różnicowoprądowe 30 mA?
- **gniazda wtyczkowe o prądzie znamionowym do 32 A** dostępne dla osób niewykwalifikowanych,
- **obwody na zewnątrz** (przenośne urządzenia używane na zewnątrz) do 32 A,
- pomieszczenia **z wanną lub natryskiem**, baseny, sauny, place budowy, kempingi, przystanie,
  pomieszczenia rolnicze i inwentarskie (tam często 30 mA, a dla ochrony przeciwpożarowej 300 mA),
- obwody oświetleniowe w lokalach mieszkalnych (wg aktualnych wymagań).

### 15. Rodzaje (typy) wyłączników różnicowoprądowych
- **AC** — reaguje na prąd różnicowy przemienny sinusoidalny.
- **A** — dodatkowo na prąd pulsujący jednokierunkowy (elektronika, zasilacze) — obecnie standard.
- **F** — jak A + prądy o mieszanej częstotliwości (falowniki 1-fazowe, pralki z inwerterem).
- **B** — dodatkowo prąd różnicowy stały wygładzony (falowniki 3-fazowe, ładowarki pojazdów
  elektrycznych, instalacje fotowoltaiczne).
- Podział wg zwłoki: **bezzwłoczne**, **G** (krótka zwłoka ~10 ms), **S** (selektywne, opóźnione —
  do selektywności z wyłącznikiem różnicowoprądowym zainstalowanym za nim).
- Podział konstrukcyjny: **bez wbudowanego zabezpieczenia nadprądowego** (sam wyłącznik
  różnicowoprądowy) i **z wbudowanym zabezpieczeniem nadprądowym** (wyłącznik
  różnicowoprądowy z członem nadprądowym),
  **typu A/AC**, **sieciowo niezależne (elektromechaniczne)** i **zależne od napięcia sieci**
  (elektroniczne — mniej pewne).

### 16. Czy wyłącznik różnicowoprądowy chroni przed zwarciem i przeciążeniem?
**Nie.** Wyłącznik różnicowoprądowy reaguje wyłącznie na **prąd różnicowy** (upływowy).
Zabezpieczenie przed przeciążeniem i zwarciem musi zapewniać wyłącznik nadprądowy lub
bezpiecznik — albo wyłącznik różnicowoprądowy **z wbudowanym członem nadprądowym**,
który łączy obie funkcje.

### 17. Czy wyłącznik różnicowoprądowy chroni przy dotknięciu L i N jednocześnie?
**Nie.** Jeśli człowiek dotknie równocześnie przewodu fazowego i neutralnego, prąd przepływa
„w obwodzie" i suma prądów w rdzeniu jest zerowa — wyłącznik nie zadziała.

### 18. Połączenia wyrównawcze — jakie są?
- **Główne (główna szyna uziemiająca)** — łączy: przewód ochronny instalacji, przewód uziemiający,
  metalowe rury instalacji wodnej, gazowej, C.O., kanalizacji, metalowe elementy konstrukcyjne
  budynku, zbrojenie, zbrojenie fundamentu (uziom fundamentowy), ekrany kabli telekomunikacyjnych,
  instalację odgromową.
- **Dodatkowe (miejscowe)** — w łazienkach, kotłowniach, pomieszczeniach przewodzących: łączą
  wszystkie jednocześnie dostępne części przewodzące i przewody ochronne; warunek:
  $R \le \dfrac{U_L}{I_a}$ (praktycznie R ≤ 1 Ω dla części dostępnych).

### 19. Minimalne przekroje przewodów ochronnych (PE)
- Gdy PE prowadzony razem z przewodami fazowymi (S — przekrój fazowego):
  - S ≤ 16 mm² → **S_PE = S**
  - 16 < S ≤ 35 mm² → **S_PE = 16 mm²**
  - S > 35 mm² → **S_PE = S/2**
- Przewód ochronny nieprowadzony w wspólnej osłonie: min. **2,5 mm² Cu** z ochroną mechaniczną,
  **4 mm² Cu** bez ochrony mechanicznej.
- **PEN**: min. **10 mm² Cu** lub **16 mm² Al**.
- Przewód uziemiający: min. **16 mm² Cu**, **25 mm² Al**, **50 mm² Fe/Zn** (dla ochrony odgromowej
  wg PN-EN 62305: Cu 16 / Al 25 / Fe 50 mm²).

### 20. Charakterystyki wyłączników nadprądowych (instalacyjnych)
- **B** — wyłączenie magnetyczne przy **3–5 × I_n** (obwody oświetleniowe, gniazda).
- **C** — **5–10 × I_n** (odbiorniki o prądzie rozruchowym: silniki małe, transformatory,
  oświetlenie LED/wyładowcze).
- **D** — **10–20 × I_n** (transformatory, silniki o ciężkim rozruchu, spawarki).
- Prąd umowny niewyzwalający **1,13 I_n**, wyzwalający **1,45 I_n** (w 1 h).
- **Zdolność zwarciowa** (np. 6000 A) i **klasa selektywności** (1, 2, 3).

### 21. Bezpieczniki topikowe — charakterystyki
- **gG** (dawniej gL) — ogólnego przeznaczenia, zabezpieczenie przewodów i odbiorników.
- **gM** — do obwodów silnikowych (zabezpieczenie zwarciowe silnika).
- **aM** — tylko zwarciowe (do silników; nie chroni przed przeciążeniem).
- **gR / aR** — szybkie, do zabezpieczania półprzewodników.
- Zaleta bezpiecznika: duża zdolność zwarciowa, ograniczanie prądu zwarciowego. Wada: jednorazowy,
  brak biegunowej jednoczesności wyłączenia, ryzyko „pracy na dwóch fazach" silnika.

### 22. Stopnie ochrony IP — jak czytać?
**IP** + pierwsza cyfra (ciała obce/pył) + druga cyfra (woda).
- 1. cyfra: 0 brak, 1 ≥50 mm, 2 ≥12,5 mm (palec), 3 ≥2,5 mm, 4 ≥1 mm (drut), 5 pyłoodporny
  (ograniczony), 6 pyłoszczelny.
- 2. cyfra: 0 brak, 1 kapiąca pionowo, 2 kapiąca do 15°, 3 natrysk 60°, 4 bryzgi z każdej strony,
  5 strumień wody, 6 silny strumień, 7 krótkotrwałe zanurzenie, 8 ciągłe zanurzenie,
  9 (9K) strumień wysokociśnieniowy.
- Litera dodatkowa: **B** — palec, **D** — drut 1 mm (ochrona przed dostępem do części
  niebezpiecznych).
- Przykłady: **IP2X** minimum dla przegród/obudów; **IP44** — łazienki/na zewnątrz;
  **IP65/IP66** — natrysk/mycie; **IP20** — rozdzielnica wewnętrzna.

### 23. Strefy w łazience
- **Strefa 0** — wnętrze wanny/brodzika: tylko **SELV 12 V AC / 30 V DC**, IPX7.
- **Strefa 1** — nad wanną do 2,25 m: urządzenia przystosowane (bojler, oprawa), min. **IPX4**.
- **Strefa 2** — 0,6 m od strefy 1: min. **IPX4**, dopuszczalne oprawy, grzejniki, gniazdo
  ogolarki na transformatorze separacyjnym.
- Wszystkie obwody łazienki: **wyłącznik różnicowoprądowy 30 mA** + **dodatkowe połączenia
  wyrównawcze**.

### 24. Ochrona odgromowa i przeciwprzepięciowa
- **Instalacja piorunochronna (urządzenie piorunochronne)**: zwody, przewody odprowadzające,
  przewody uziemiające, uziom.
  Klasy ochrony **I–IV** (I najostrzejsza). Metody projektowania zwodów: **kąta ochronnego**,
  **toczącej się kuli**, **siatki**.
- **Ograniczniki przepięć**:
  - **Typ 1** — wytrzymuje prąd udarowy piorunowy (10/350 µs), w złączu/rozdzielnicy głównej,
  - **Typ 2** — udary indukowane (8/20 µs), w rozdzielnicy piętrowej/obiektowej,
  - **Typ 3** — ochrona precyzyjna przy odbiorniku (listwy, gniazda).
- Kluczowe: **koordynacja energetyczna** ograniczników, długość przewodów przyłączeniowych (≤ 0,5 m),
  poziom ochrony **U_p** niższy od wytrzymałości udarowej urządzenia.

### 25. Przekroje i spadki napięcia — o co pyta komisja?
- Dopuszczalny **spadek napięcia**: od złącza do odbiornika zwykle **≤ 4 %** (dla oświetlenia
  często ≤ 3 %); od stacji transformatorowej — sumaryczne wg wymagań dostawcy.
- Wzór dla obwodu 3-fazowego: $\Delta U = \dfrac{\sqrt3 \cdot I \cdot l (R\cos\varphi + X\sin\varphi)}{1}$;
  uproszczenie dla nn miedzianego: $\Delta U\% = \dfrac{\sqrt3 \cdot 100 \cdot P \cdot l}{\gamma \cdot S \cdot U^2}$.
- Dobór przewodu: **obciążalność prądowa długotrwała** (z uwzględnieniem współczynników:
  temperatura, sposób ułożenia, grupowanie) ⇒ **zabezpieczenie** ⇒ **spadek napięcia** ⇒
  **warunek samoczynnego wyłączenia** ⇒ **wytrzymałość zwarciowa** ($I^2t \le k^2S^2$).
- Warunek dla zabezpieczenia przewodu: $I_B \le I_n \le I_z$ oraz $I_2 \le 1{,}45\,I_z$.

### 26. Ochrona silników — jakie zabezpieczenia?
Zwarciowe (bezpiecznik aM / wyłącznik silnikowy), przeciążeniowe (przekaźnik termiczny, wyłącznik
silnikowy z nastawą na I_n), zabezpieczenie zanikowe/podnapięciowe (przed samoczynnym rozruchem po
powrocie napięcia), zabezpieczenie od asymetrii/zaniku fazy, termistorowe (PTC w uzwojeniu),
zabezpieczenie od zbyt długiego rozruchu i utyku.

### 27. Kompensacja mocy biernej — dlaczego i jak?
Cel: zmniejszenie prądu i strat, uniknięcie opłat za moc bierną (tgφ > 0,4), odciążenie
transformatorów i kabli. Realizacja: baterie kondensatorów (indywidualne, grupowe, centralne
z regulatorem), dławiki w przypadku nadmiaru mocy biernej pojemnościowej (instalacje
fotowoltaiczne, sieci
kablowe). **Zagrożenie BHP**: kondensatory pozostają naładowane — przed pracą trzeba je
**rozładować i uziemić**, odczekać czas wg instrukcji.

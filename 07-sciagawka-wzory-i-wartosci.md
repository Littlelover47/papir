# 07. Ściągawka — wzory i wartości do zapamiętania

Powtórka „na dzień przed". Wszystko, co komisja może kazać policzyć albo podać z pamięci.

---

## A. Podstawowe wzory elektrotechniczne

| Zależność | Wzór |
|---|---|
| Prawo Ohma | `U = I · R`, `I = U/R` |
| Rezystancja przewodu | `R = ρ·l/S = l/(γ·S)` |
| Moc DC / 1-fazowa czynna | `P = U·I·cosφ` |
| Moc 3-fazowa czynna | `P = √3 · U · I · cosφ` |
| Moc bierna / pozorna | `Q = √3·U·I·sinφ`, `S = √3·U·I` |
| Trójkąt mocy | `S² = P² + Q²`, `cosφ = P/S` |
| Energia | `W = P·t` |
| Ciepło Joule'a | `Q = I²·R·t` |
| Reaktancja | `X_L = 2πfL`, `X_C = 1/(2πfC)` |
| Impedancja | `Z = √(R² + X²)` |
| Napięcie międzyfazowe/fazowe | `U_L = √3 · U_f` → 400 V ≈ 1,73 · 230 V |
| Przekładnia transformatora | `ϑ = U₁/U₂ ≈ z₁/z₂ ≈ I₂/I₁` |
| Prąd znamionowy transformatora 3-faz. | `I_n = S/(√3·U_n)` |
| Prąd zwarciowy transformatora (przybl.) | `I_k ≈ I_n · 100/u_k%` |
| Poślizg silnika | `s = (n_s − n)/n_s`, `n_s = 60f/p` |
| Rezystancja zastępcza uziomów równoległych | `R = R₁/n · k` (k — wsp. wykorzystania > 1) |
| Rezystywność gruntu (Wenner) | `ρ = 2π·a·R` |

**Konduktywność (do obliczeń rezystancji przewodów):**
miedź γ ≈ **56 m/(Ω·mm²)**, aluminium γ ≈ **35 m/(Ω·mm²)**.

**Przykład:** przewód Cu 2,5 mm², długość 30 m (w jedną stronę → pętla 60 m):
`R = 60/(56·2,5) ≈ 0,43 Ω`.

---

## B. Ochrona przeciwporażeniowa — liczby

| Parametr | Wartość |
|---|---|
| Napięcie dotykowe dopuszczalne, warunki normalne | **50 V AC / 120 V DC** |
| Napięcie dotykowe dopuszczalne, warunki zwiększonego zagrożenia | **25 V AC / 60 V DC** |
| Napięcie dotykowe, warunki szczególne | 12 V AC / 30 V DC |
| Zakres napięciowy I | ≤ 50 V AC / ≤ 120 V DC |
| Zakres napięciowy II | 50–1000 V AC / 120–1500 V DC |
| Rezystancja ciała człowieka (obliczeniowo) | **1000 Ω** |
| Próg odczuwania prądu AC | ~0,5 mA |
| Próg samouwolnienia AC | ~10 mA |
| Próg zaburzeń oddychania | ~30 mA |
| Ryzyko migotania komór | > ~50 mA przez ~1 s |
| Warunek samoczynnego wyłączenia | **Z_s · I_a ≤ U₀** |
| Warunek dla TT | **R_A ≤ U_L/I_a**, dla RCD `R_A ≤ 50/I_Δn` |

**Czasy wyłączenia (obwody końcowe ≤ 32 A, U₀ = 230 V):** TN — **0,4 s**, TT — **0,2 s**.
**Obwody rozdzielcze / > 32 A:** TN — **5 s**, TT — **1 s**.

**Krotności wyzwalania magnetycznego wyłączników:** B → **5·I_n**, C → **10·I_n**, D → **20·I_n**.

**Maksymalna Z_s (TN, 230 V, bez zapasu):**

| Zabezpieczenie | I_a | Z_s max | Z_s max z regułą 2/3 |
|---|---|---|---|
| B6 | 30 A | 7,67 Ω | 5,11 Ω |
| B10 | 50 A | 4,60 Ω | 3,07 Ω |
| **B16** | 80 A | **2,88 Ω** | **1,92 Ω** |
| B20 | 100 A | 2,30 Ω | 1,53 Ω |
| B25 | 125 A | 1,84 Ω | 1,23 Ω |
| C10 | 100 A | 2,30 Ω | 1,53 Ω |
| **C16** | 160 A | **1,44 Ω** | **0,96 Ω** |
| C20 | 200 A | 1,15 Ω | 0,77 Ω |
| C25 | 250 A | 0,92 Ω | 0,61 Ω |
| D16 | 320 A | 0,72 Ω | 0,48 Ω |

---

## C. RCD

| Parametr | Wartość |
|---|---|
| Ochrona uzupełniająca (przeciwporażeniowa) | I_Δn ≤ **30 mA** |
| Ochrona przeciwpożarowa | I_Δn ≤ **300 mA** (często 300/500 mA) |
| Prąd wyłączający (typ AC) | **0,5·I_Δn ≤ I_Δ ≤ I_Δn** |
| Czas przy I_Δn (bezzwłoczny) | ≤ **300 ms** |
| Czas przy 2·I_Δn | ≤ **150 ms** |
| Czas przy 5·I_Δn | ≤ **40 ms** |
| Czas przy I_Δn (typ S, selektywny) | 130–500 ms |
| Typy | AC, A, F, B |

---

## D. Pomiary — wartości graniczne

| Pomiar | Wymaganie |
|---|---|
| Ciągłość PE — źródło | 4–24 V, prąd ≥ **200 mA** |
| Ciągłość PE — wartość | porównanie z obliczoną; praktycznie **≤ 1 Ω** |
| Połączenia wyrównawcze dodatkowe | **≤ 1 Ω** (kryterium R ≤ U_L/I_a) |
| Połączenia instalacji odgromowej | **≤ 0,2 Ω** |
| Rezystancja izolacji SELV/PELV | 250 V DC, **≥ 0,5 MΩ** |
| Rezystancja izolacji do 500 V | 500 V DC, **≥ 1,0 MΩ** |
| Rezystancja izolacji 500–1000 V | 1000 V DC, **≥ 1,0 MΩ** |
| Odczyt rezystancji izolacji | po **60 s** |
| Współczynnik absorpcji k = R₆₀/R₁₅ | > **1,3** |
| Wskaźnik polaryzacji PI = R₆₀₀/R₆₀ | > **2** (dobra izolacja) |
| Rezystancja izolacji maszyn nn | `R ≥ U_n/1000 + 1 [MΩ]` przy 40 °C |
| Sonda w metodzie technicznej uziemienia | **62 %** odległości E–H |
| Rozstaw elektroda prądowa | ≥ 5 × największy wymiar uziomu |
| Uziemienie ochronne SN (praktyczne) | **≤ 10 Ω** |
| Uziemienie stacji SN/nn wspólne (praktyczne) | **≤ 1–2 Ω** |
| Uziemienie odgromowe | **≤ 10 Ω** |
| Wzorcowanie mierników | typowo co **12 miesięcy** |
| Kategoria pomiarowa dla instalacji nn | **CAT III** (przyłącze — CAT IV) |

---

## E. Przewody, przekroje, barwy

**Minimalne przekroje PE (Cu):**
- S ≤ 16 mm² → S_PE = S
- 16 < S ≤ 35 mm² → S_PE = 16 mm²
- S > 35 mm² → S_PE = S/2
- PE osobny: ≥ 2,5 mm² (z ochroną mechaniczną) / ≥ 4 mm² (bez)
- **PEN: ≥ 10 mm² Cu / 16 mm² Al**
- Przewód uziemiający: ≥ 16 mm² Cu / 25 mm² Al / 50 mm² Fe

**Minimalne przekroje przewodów instalacji (Cu):**
- obwody oświetleniowe **1,5 mm²**, gniazd wtyczkowych **2,5 mm²**,
- obwód kuchenki elektrycznej 3-faz. 2,5–4 mm², WLZ ≥ 10 mm².

**Barwy:** PE — **żółto-zielona** (tylko PE/PEN), N — **jasnoniebieska**,
L1/L2/L3 — brązowa / czarna / szara. Szyny: L1 żółta, L2 zielona, L3 czerwona.

**Głębokości ułożenia kabli:** nn — ok. **0,7 m**, SN — ok. **0,8 m**
(pod drogami głębiej, w rurach osłonowych). Folia: nn **niebieska**, SN **czerwona**.

**Dopuszczalny spadek napięcia:** instalacja odbiorcza zwykle **≤ 4 %** (oświetlenie często ≤ 3 %).

**Warunek doboru zabezpieczenia:** `I_B ≤ I_n ≤ I_z` oraz `I₂ ≤ 1,45·I_z`.
**Wytrzymałość zwarciowa przewodu:** `I²t ≤ k²S²`.

---

## F. SN — liczby i fakty

| Zagadnienie | Wartość / fakt |
|---|---|
| Napięcia SN w Polsce | 6, 10, **15**, **20**, 30 kV |
| Napięcia nn | 230/400 V (500, 690 V) |
| Napięcia WN/NN | 110, 220, 400 (750) kV |
| Przekładniki prądowe — strona wtórna | **5 A** lub 1 A; **nie rozwierać!** |
| Przekładniki napięciowe — strona wtórna | **100 V** (100/√3 V); **nie zwierać!** |
| Typowe moce transformatorów SN/nn | 63, 100, 160, 250, 400, 630, 1000 kVA |
| Napięcie zwarcia u_k transformatorów rozdzielczych | ok. **4–6 %** |
| Izolacja kabli SN | **XLPE** (dawniej papierowo-olejowa) |
| Próba napięciowa kabli XLPE | **VLF 0,1 Hz** lub DAC (nie DC!) |
| Wzrost napięcia faz zdrowych przy doziemieniu w sieci izolowanej | do wartości międzyfazowej (√3 ×) |
| Odstęp D_L / D_V dla 15 kV | 0,16 m / 1,16 m |
| Odstęp D_L / D_V dla 20 kV | 0,22 m / 1,22 m |
| Odstęp D_L / D_V dla 30 kV | 0,32 m / 1,32 m |

**Kolejność łączeń — wyłączanie:** wyłącznik → odłącznik → zabezpieczenie przed załączeniem →
sprawdzenie braku napięcia → uziemienie → wygrodzenie strefy.
**Załączanie:** odwrotnie.

**Uziemiacz przenośny:** zakładać **uziom → fazy**, zdejmować **fazy → uziom**.

---

## G. Ochrona odgromowa i przepięciowa

- Klasy ochrony LPS: **I–IV** (I — najwyższy poziom, obiekty szczególne).
- Metody projektowania zwodów: **kąta ochronnego**, **toczącej się kuli**, **siatki**.
- SPD: **Typ 1** (10/350 µs, złącze/rozdzielnica główna), **Typ 2** (8/20 µs, rozdzielnica
  obiektowa), **Typ 3** (przy odbiorniku).
- Przewody przyłączeniowe SPD: **≤ 0,5 m**.
- Minimalne przekroje przewodów odgromowych: **Cu 16 / Al 25 / Fe 50 mm²**.

---

## H. Terminy badań okresowych — tabelka

| Warunki środowiskowe | Rezystancja izolacji | Ochrona przeciwporażeniowa |
|---|---|---|
| Wyziewy żrące | 1 rok | 1 rok |
| Zagrożenie wybuchem | 1 rok | 1 rok |
| Otwarta przestrzeń, place budowy | 1 rok | 1 rok |
| Bardzo wilgotne / gorące (> 35 °C) | 1 rok | 1 rok |
| Zagrożenie pożarem | 1 rok | 5 lat |
| Zapylone | — | 1 rok |
| Pozostałe | 5 lat | 5 lat |

**Podstawa ustawowa:** Prawo budowlane art. 62 ust. 1 pkt 2 — instalacja elektryczna
i piorunochronna **co najmniej raz na 5 lat**.

---

## I. IP — szybka pamięciówka

- **IP2X** — ochrona przed palcem (minimum dla przegród/obudów).
- **IP4X** — ochrona przed drutem 1 mm (górne powierzchnie dostępne).
- **IP44** — bryzgi z każdej strony (łazienki, na zewnątrz).
- **IP54/55** — pyłoodporność + strumień wody (przemysł, warsztat).
- **IP65/66** — pyłoszczelność + silny strumień (mycie).
- **IP67/68** — zanurzenie.
- Litery dodatkowe: **B** — palec, **D** — drut 1 mm.

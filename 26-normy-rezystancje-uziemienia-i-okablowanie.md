# 26. Normy — rezystancje, uziemienia, okablowanie

Zakładka do sprawdzania wartości: **co musi być spełnione, ile to wynosi i skąd to wynika**.
Wszystko w jednym miejscu, z rozdzieleniem tego, co jest **wymaganiem normy**, od tego,
co jest **regułą kciuka** — bo na egzaminie to rozróżnienie bywa punktowane, a w terenie
decyduje o tym, czy protokół się obroni.

> **Ważne.** Największe nieporozumienie w temacie uziemień: **PN-HD 60364 w większości
> przypadków nie podaje wymaganej rezystancji uziemienia w omach**. Podaje kryterium
> funkcjonalne — napięcie dotykowe albo prąd zadziałania zabezpieczenia — a wartość w omach
> jest z niego *wyliczana*. Liczby typu „10 Ω” to wymagania branżowe, instrukcje operatorów
> i praktyka, nie uniwersalne wymaganie normy.

---

## A. Rezystancja uziemienia — kryteria, nie liczby

### Skąd bierze się wymagana wartość

| Sytuacja | Kryterium normatywne | Wynik dla typowych danych |
|---|---|---|
| TT, ochrona różnicówką | $R_A \le U_L / I_{\Delta n}$ | 30 mA → **1667 Ω**; 100 mA → 500 Ω; 300 mA → 167 Ω |
| TT, warunki zwiększonego zagrożenia | $R_A \le 25 / I_{\Delta n}$ | 30 mA → **833 Ω** |
| TT, ochrona nadprądowa | $R_A + R_B \le U_0 / I_a$ | B16 → **2,88 Ω** — praktycznie nieosiągalne |
| TN, ograniczenie potencjału PEN | $R_B / R_E \le 50 / (U_0 - 50)$ | dla 230 V → $R_B/R_E \le 0{,}28$ |
| Stacja SN i SN/nn | napięcia rażeniowe $U_T \le U_{Tp}(t)$ wg **PN-EN 50522** | zależnie od prądu i czasu — zob. [rozdział 18](18-uziemienia-w-rozdzielni.md) |
| Instalacja odgromowa | **PN-EN 62305**: rezystancja nie jest kryterium głównym, liczy się układ i rozpływ | zalecane **≤ 10 Ω** |

Zauważ paradoks układu TT: norma pozwala formalnie na uziom o rezystancji **1667 Ω**,
a jednocześnie ochrona nadprądowa wymagałaby **2,88 Ω**. To nie błąd — to dowód, że w TT
środkiem ochrony jest różnicówka, a nie bezpiecznik. Symulator poniżej pokazuje to na liczbach.

<div class="dg-widget" data-typ="uziemienie-tt"></div>

### Wartości spotykane w praktyce (nie wymagania PN-HD 60364)

| Obiekt / funkcja | Wartość praktyczna | Źródło wymagania |
|---|---|---|
| Uziemienie ochronne SN | **≤ 10 Ω** | instrukcje operatorów, N SEP-E-001 |
| Uziemienie wspólne stacji SN/nn | **≤ 1–2 Ω** | praktyka projektowa, ocena napięć rażeniowych |
| Punkt neutralny sieci nn (R_B) | **≤ 5 Ω**, wypadkowa PEN **≤ 5 Ω** | N SEP-E-001 |
| Uziemienie powtarzalne PEN (pojedyncze) | **≤ 30 Ω** | N SEP-E-001, co ok. 200 m i na końcach linii |
| Słup z aparaturą łączeniową / ogranicznikiem | **≤ 10 Ω** | instrukcje operatorów |
| Uziemienie odgromowe budynku | **≤ 10 Ω** | PN-EN 62305 (zalecenie) |
| Uziemienie ograniczników przepięć nn | **≤ 10 Ω** | praktyka, karta katalogowa |
| Uziemienie robocze przy pracach (uziemiacze) | jak najmniejsza, ciągłość pewna | PN-EN 50110-1 |

> **Uwaga.** Rezystancja uziomu **nie jest stałą obiektu**. W mrozie i w suszy rośnie
> wielokrotnie — pomiar w lipcu po deszczu to najlepszy możliwy wynik, a nie wynik
> reprezentatywny. Dlatego projekt zakłada zapas, a nie równość z limitem.

---

## B. Ciągłość przewodów ochronnych i rezystancja okablowania

### Wymagania pomiarowe

| Parametr | Wymaganie | Podstawa |
|---|---|---|
| Źródło pomiarowe | **4–24 V** AC lub DC, na biegu jałowym | PN-EN 61557-4 |
| Prąd pomiarowy | **≥ 200 mA** | PN-EN 61557-4 |
| Kryterium oceny | **porównanie z wartością obliczoną** dla danego przewodu | PN-HD 60364-6 |
| Reguła kciuka — połączenia ochronne | **≤ 1 Ω** | praktyka |
| Połączenia wyrównawcze dodatkowe | $R \le U_L / I_a$ (praktycznie ≤ 1 Ω) | PN-HD 60364-4-41 |
| Połączenia instalacji odgromowej | **≤ 0,2 Ω** | PN-EN 62305 |
| Zerowanie rezystancji przewodów pomiarowych | obowiązkowe przed pomiarem | instrukcja miernika |

**Norma nie podaje granicy 1 Ω** — to reguła kciuka dla krótkich połączeń. Poprawna ocena polega
na obliczeniu, ile *powinno* wyjść, i porównaniu z pomiarem. Wynik dwa razy większy od obliczonego
oznacza złe połączenie, choćby był mniejszy od 1 Ω.

<div class="dg-widget" data-typ="rezystancja-przewodu"></div>

### Rezystancja żył — wartości do sprawdzenia w pamięci

Miedź: $\rho_{20} = 1/56 \approx 0{,}0179$ Ω·mm²/m. Aluminium: $\rho_{20} = 1/35 \approx 0{,}0286$ Ω·mm²/m.
Przy 70 °C obie wartości rosną o **20 %**.

| S [mm²] | Cu 20 °C [mΩ/m] | Cu 70 °C [mΩ/m] | Al 20 °C [mΩ/m] | długość Cu dla 1 Ω |
|---|---|---|---|---|
| 1,5 | 11,90 | 14,29 | 19,05 | 84 m |
| **2,5** | **7,14** | **8,57** | 11,43 | **140 m** |
| 4 | 4,46 | 5,36 | 7,14 | 224 m |
| 6 | 2,98 | 3,57 | 4,76 | 336 m |
| 10 | 1,79 | 2,14 | 2,86 | 560 m |
| 16 | 1,12 | 1,34 | 1,79 | 896 m |
| 25 | 0,71 | 0,86 | 1,14 | 1400 m |
| 35 | 0,51 | 0,61 | 0,82 | 1960 m |
| 50 | 0,36 | 0,43 | 0,57 | 2800 m |
| 95 | 0,19 | 0,23 | 0,30 | 5320 m |

Reaktancja żyły kabla nn: **≈ 0,08 Ω/km** — pomijalna do 25 mm², dominująca od ok. 95 mm².

---

## C. Rezystancja izolacji

| Napięcie obwodu | Napięcie probiercze DC | Wymagana rezystancja |
|---|---|---|
| SELV / PELV | **250 V** | **≥ 0,5 MΩ** |
| do 500 V (w tym FELV) | **500 V** | **≥ 1,0 MΩ** |
| powyżej 500 V do 1000 V | **1000 V** | **≥ 1,0 MΩ** |

Podstawa: **PN-HD 60364-6, tabl. 6.1**. Odczyt po **60 s**. Maszyny nn: kryterium praktyczne
$R \ge U_n/1000 + 1$ [MΩ] przy 40 °C. Współczynnik absorpcji $k = R_{60}/R_{15} > 1{,}3$,
wskaźnik polaryzacji $PI = R_{600}/R_{60} > 2$.

Diagnostyka izolacji SN/WN (korekta temperaturowa, tip-up, DFR, tg δ) —
[rozdział 20](20-rezystancja-izolacji-i-tg-delta.md).

---

## D. Minimalne przekroje

### Przewody ochronne PE (PN-HD 60364-5-54, tabl. 54.2)

| Przekrój żyły fazowej S | Minimalny przekrój PE |
|---|---|
| S ≤ 16 mm² | **S** |
| 16 < S ≤ 35 mm² | **16 mm²** |
| S > 35 mm² | **S / 2** |

Dodatkowo, gdy PE nie wchodzi w skład kabla wielożyłowego:
**≥ 2,5 mm² Cu** z ochroną mechaniczną, **≥ 4 mm² Cu** bez ochrony mechanicznej.

**PEN: ≥ 10 mm² Cu / 16 mm² Al** — bo prowadzi prąd roboczy i jego przerwanie jest groźne
(zob. [rozdział 24](24-uklady-sieci-i-petla-zwarcia.md)).

Alternatywnie przekrój PE można wyliczyć z warunku cieplnego (wzór adiabatyczny):

$$S \ge \frac{\sqrt{I^2 t}}{k}$$

### Przewody uziemiające i wyrównawcze (PN-HD 60364-5-54, tabl. 54.1)

| Warunki ułożenia | Cu | Fe / stal |
|---|---|---|
| Chroniony od korozji **i** mechanicznie | wg tabl. 54.2 (jak PE) | wg tabl. 54.2 |
| Chroniony od korozji, **bez** ochrony mechanicznej | **16 mm²** | 16 mm² |
| **Bez** ochrony od korozji | **25 mm²** | **50 mm²** |

| Rodzaj połączenia | Minimum |
|---|---|
| Główny przewód wyrównawczy | **≥ 6 mm² Cu**, nie mniej niż połowa PE instalacji, max wymagane 25 mm² Cu |
| Dodatkowe (miejscowe) połączenia wyrównawcze | **2,5 mm² Cu** z ochroną / **4 mm² Cu** bez ochrony |
| Przewód uziemiający ograniczników przepięć | ≥ 16 mm² Cu (praktyka) |

### Uziomy — minimalne wymiary (PN-EN 62305-3, PN-EN 50522)

| Element | Minimum |
|---|---|
| Taśma stalowa ocynkowana | **90 mm²**, grubość ≥ 3 mm |
| Pręt stalowy ocynkowany | **⌀ 16 mm** |
| Drut stalowy ocynkowany (uziom poziomy) | ⌀ 10 mm |
| Taśma / drut miedziany | 50 mm² (drut ⌀ 8 mm) |
| Pręt miedziowany | ⌀ 14–15 mm, powłoka Cu ≥ 250 µm |
| Głębokość uziomu poziomego | ≥ **0,5–0,8 m** (poniżej strefy przemarzania) |

### Przekroje instalacji odbiorczej — minima praktyczne

- obwody oświetleniowe **1,5 mm²**, gniazd wtyczkowych **2,5 mm²**,
- kuchenka elektryczna 3-fazowa 2,5–4 mm², **WLZ ≥ 10 mm²**,
- dopuszczalny spadek napięcia: instalacja odbiorcza **≤ 4 %** (oświetlenie często ≤ 3 %).

---

## E. Wyłączniki różnicowoprądowe — wartości graniczne

| Parametr | Wartość |
|---|---|
| Ochrona uzupełniająca (przeciwporażeniowa) | $I_{\Delta n} \le$ **30 mA** |
| Ochrona przeciwpożarowa | $I_{\Delta n} \le$ **300 mA** (często 300/500 mA) |
| Prąd wyłączający (typ AC) | $0{,}5 I_{\Delta n} \le I_\Delta \le I_{\Delta n}$ |
| Czas przy $I_{\Delta n}$ (bezzwłoczny) | ≤ **300 ms** |
| Czas przy $2 I_{\Delta n}$ | ≤ **150 ms** |
| Czas przy $5 I_{\Delta n}$ | ≤ **40 ms** |
| Czas przy $I_{\Delta n}$ (typ S, selektywny) | 130–500 ms |
| Wymagany czas wyłączenia w TT (obwody ≤ 32 A) | **0,2 s** |
| Typy | AC, A, F, B (i wersje selektywne S, opóźnione G) |

---

## F. Terminy badań i pomiarów

| Zakres | Termin | Podstawa |
|---|---|---|
| Ocena stanu technicznego instalacji (rezystancja izolacji) | **nie rzadziej niż co 5 lat** | Prawo budowlane, rozporządzenie |
| Skuteczność ochrony przeciwporażeniowej | **nie rzadziej niż co 5 lat** | rozporządzenie |
| Środowiska o zwiększonym zagrożeniu (wilgotne, zapylone, wybuchowe, na zewnątrz) | **co 1 rok** | rozporządzenie, PN-HD 60364-6 |
| Instalacja odgromowa | zwykle **co 1–5 lat** (zależnie od klasy LPS) | PN-EN 62305-3 |
| Wyłączniki różnicowoprądowe — przycisk TEST | zalecane **co miesiąc** przez użytkownika | instrukcja producenta |
| Wzorcowanie mierników | typowo **co 12 miesięcy** | polityka jakości / producent |
| Kategoria pomiarowa miernika dla instalacji nn | **CAT III**, przyłącze **CAT IV** | PN-EN 61010 |

Szczegóły terminów, wzory protokołów i kolejność pomiarów —
[rozdział 04](04-pomiary-ochronne.md).

---

## G. Ściągawka — co powiedzieć, gdy komisja zapyta o „wymaganą rezystancję uziemienia”

Najlepsza odpowiedź nie zawiera pojedynczej liczby:

> „To zależy od funkcji uziemienia i od kryterium. W układzie TT wymaganie wynika ze wzoru
> $R_A \le U_L / I_{\Delta n}$ — dla różnicówki 30 mA i 50 V daje to około 1667 Ω, ale w praktyce
> uziom robi się znacznie lepszy, bo jego rezystancja rośnie w mrozie i suszy, a napięcie
> na obudowie przed wyłączeniem ma być jak najmniejsze. Dla stacji SN kryterium nie jest wartość
> w omach, ale **dopuszczalne napięcia rażeniowe wg PN-EN 50522**. Wartości typu 10 Ω dla
> uziemienia ochronnego SN czy 30 Ω dla pojedynczego uziemienia powtarzalnego PEN to wymagania
> branżowe i normy N SEP-E-001, nie PN-HD 60364.”

To jest właśnie różnica między wyuczoną liczbą a rozumieniem tematu.

> **Ważne.** Wartości w tym rozdziale odpowiadają stanowi typowemu dla egzaminów SEP.
> Przed egzaminem i przed protokołem sprawdź **aktualne wydania** norm (PN-HD 60364-4-41,
> -5-54, -6, PN-EN 50522, PN-EN 62305, N SEP-E-001) oraz instrukcję eksploatacji obiektu —
> wymagania operatorów sieci bywają ostrzejsze od normy.

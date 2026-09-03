# 04. Pomiary ochronne i prace kontrolno-pomiarowe

Zakres świadectwa: **aparatura kontrolno-pomiarowa oraz urządzenia i instalacje automatycznej
regulacji, sterowania i zabezpieczeń** (pkt grupy 1) — potocznie „uprawnienia pomiarowe".
Podstawowa norma: **PN-HD 60364-6** (sprawdzanie), **PN-HD 60364-4-41**, **PN-EN 61557** (przyrządy).

---

## A. Zagadnienia ogólne

### 1. Kto może wykonywać pomiary ochronne?
Osoba posiadająca **świadectwo kwalifikacyjne E** w grupie 1 z wpisem obejmującym aparaturę
kontrolno-pomiarową (i odpowiedni zakres napięć), przeszkolona BHP, dysponująca sprawnymi,
**wzorcowanymi** przyrządami i wiedzą o metodach. Osoba podpisująca protokół i oceniająca wyniki
powinna dodatkowo mieć uprawnienia **D** (w praktyce wymagane przez odbiorców/nadzór).

### 2. Jakie są rodzaje sprawdzań instalacji?
- **Odbiorcze (wstępne)** — przed przekazaniem instalacji do eksploatacji (nowa, przebudowana).
- **Okresowe** — w trakcie eksploatacji, w ustalonych terminach.
- **Doraźne / poawaryjne** — po awarii, remoncie, zalaniu, pożarze, zmianie sposobu użytkowania.

### 3. Z czego składa się sprawdzenie instalacji?
1. **Oględziny** (przed pomiarami, przy wyłączonym zasilaniu),
2. **Próby i pomiary**,
3. **Sporządzenie protokołu i ocena**.

### 4. Co obejmują oględziny?
Sprawdzenie:
- zgodności z dokumentacją i przepisami, prawidłowości doboru urządzeń,
- zastosowanych **środków ochrony przeciwporażeniowej** (klasy ochronności, przegrody, IP),
- obecności i prawidłowości **przegród ogniowych** i uszczelnień przepustów,
- **oznakowania** przewodów (barwy), obwodów, aparatów, tablic ostrzegawczych,
- prawidłowości **połączeń** (dokręcenie, brak śladów przegrzania, prawidłowe zaciski),
- doboru i nastaw **zabezpieczeń**,
- obecności **schematów, instrukcji, dokumentacji**,
- dostępności aparatów, przejść obsługowych, wyposażenia w sprzęt ochronny i ppoż.,
- stanu izolacji widocznej, stopnia zawilgocenia, korozji,
- **połączeń wyrównawczych** głównych i dodatkowych.

### 5. Jaka jest wymagana kolejność pomiarów wg PN-HD 60364-6?
1. **Ciągłość przewodów ochronnych** i połączeń wyrównawczych,
2. **Rezystancja izolacji** instalacji,
3. Ochrona przez **separację** obwodów (SELV/PELV/separacja elektryczna),
4. **Rezystancja/impedancja podłogi i ścian** (gdy stosowana jako środek ochrony),
5. **Samoczynne wyłączenie zasilania** (impedancja pętli zwarciowej, sprawdzenie wyłączników
   różnicowoprądowych),
6. **Ochrona uzupełniająca** (wyłącznik różnicowoprądowy 30 mA),
7. **Sprawdzenie biegunowości** (czy nie wstawiono łącznika w przewód neutralny),
8. **Sprawdzenie kolejności faz**,
9. **Próby funkcjonalne** (aparaty, blokady, sterowanie, wyłączniki różnicowoprądowe
   przyciskiem kontrolnym TEST),
10. **Spadek napięcia** (jeśli wymagany),
11. Sprawdzenie skutków cieplnych / obciążalności.

Uzasadnienie kolejności: pomiary „bezpieczne" i takie, które ujawniają błędy grożące podaniem
napięcia, wykonuje się **przed** podaniem napięcia.

### 6. Jakie wymagania stawia się przyrządom pomiarowym?
- zgodność z **PN-EN 61557** (mierniki do sprawdzania instalacji),
- **aktualne świadectwo wzorcowania / sprawdzenia** (typowo 12 miesięcy, wg systemu jakości),
- odpowiednia **kategoria pomiarowa** (CAT III 300/600 V dla instalacji nn, CAT IV dla przyłącza),
- odpowiedni zakres, rozdzielczość, znana **niepewność pomiaru** (uwzględniana przy ocenie
  wyników — wynik graniczny należy interpretować z niepewnością),
- sprawne przewody pomiarowe, sondy z osłonami i bezpiecznikami,
- oznaczenie CE, klasa ochronności, IP odpowiedni do warunków.

---

## B. Pomiar ciągłości przewodów ochronnych

### 7. Po co i jak mierzy się ciągłość PE?
Aby potwierdzić, że przewód ochronny i połączenia wyrównawcze są nieprzerwane i mają małą
rezystancję (pętla zwarciowa będzie skuteczna). Wymagania dla źródła pomiarowego:
napięcie **4–24 V** (AC lub DC) w stanie bezobciążeniowym, prąd pomiarowy **co najmniej 200 mA**.

### 8. Jakie wartości uznaje się za poprawne?
Norma nie podaje jednej granicy — ocenia się przez porównanie z **wartością obliczoną**
z długości i przekroju przewodu (R = ρ·l/S). Praktyczne kryterium: dla obwodów odbiorczych
**R ≤ 1 Ω**; dla połączeń wyrównawczych dodatkowych **R ≤ 1 Ω** (albo z warunku R ≤ U_L/I_a);
dla połączeń instalacji odgromowej **≤ 0,2 Ω** (jakość połączenia).

### 9. Pomiar rezystancji małych wartości — na co uważać?
Kompensacja rezystancji przewodów pomiarowych (zerowanie), pomiar **metodą techniczną
4-przewodową** (Kelvina) przy bardzo małych wartościach, czyste i dociśnięte styki,
pomiar **w obu kierunkach polaryzacji** (wykrycie napięć zakłócających i połączeń
półprzewodnikowych/korozji).

---

## C. Pomiar rezystancji izolacji

### 10. Jakie napięcia probiercze i jakie wartości wymagane? (PN-HD 60364-6, tabl. 6.1)
| Napięcie znamionowe obwodu | Napięcie probiercze DC | Wymagana rezystancja izolacji |
|---|---|---|
| SELV / PELV | **250 V** | **≥ 0,5 MΩ** |
| do 500 V (w tym FELV) | **500 V** | **≥ 1,0 MΩ** |
| powyżej 500 V do 1000 V | **1000 V** | **≥ 1,0 MΩ** |

Odczyt po ustabilizowaniu, zwykle po **60 s**.

### 11. Jak wykonać pomiar rezystancji izolacji?
- Instalacja **wyłączona spod napięcia**, zabezpieczona przed załączeniem.
- **Odłączyć odbiorniki** oraz elementy wrażliwe (elektronika, **ograniczniki przepięć**,
  wyłączniki różnicowoprądowe, oświetlenie LED, falowniki, sterowniki), albo mierzyć
  fragmentami. Nieodłączenie ogranicznika przepięć → zaniżony wynik i
  ryzyko uszkodzenia.
- Mierzy się:
  - między **każdym przewodem czynnym (L1, L2, L3, N) a PE/ziemią**,
  - **między przewodami czynnymi** (gdy odbiorniki odłączone), także L–N,
  - w układzie TN-C: między PEN a przewodami fazowymi.
- Po pomiarze **rozładować** pojemność instalacji (miernik zwykle robi to sam) — długie kable
  utrzymują ładunek.
- Uwaga BHP: miernik podaje napięcie do 1000 V DC — ostrzec otoczenie, zabezpieczyć końce
  przewodów.

### 12. Współczynnik absorpcji i wskaźnik polaryzacji
- **Współczynnik absorpcji** k = R₆₀ / R₁₅ — dla izolacji dobrej k > 1,3 (dla maszyn > 1,3–1,6).
- **Wskaźnik polaryzacji** PI = R₆₀₀ / R₆₀ — dobra izolacja PI > 2 (poniżej 1 → zawilgocenie,
  zabrudzenie).
- Rezystancja izolacji jest silnie zależna od **temperatury** — wyniki przelicza się na
  temperaturę odniesienia.

### 13. Rezystancja izolacji maszyn i transformatorów
Kryterium praktyczne: **R ≥ U_n [V] / 1000 + 1 [MΩ]** przy 40 °C (dla maszyn nn zwykle ≥ 1 MΩ,
dla uzwojeń SN — kilkadziesiąt–kilkaset MΩ). Uzwojenia mierzy się względem kadzi/korpusu
i między sobą, przy uziemieniu pozostałych uzwojeń.

---

## D. Pomiar impedancji pętli zwarciowej

### 14. Co to pętla zwarciowa?
Droga prądu zwarciowego przy zwarciu przewodu fazowego z przewodem ochronnym (lub ziemią):
uzwojenie transformatora → przewód fazowy → miejsce zwarcia → przewód ochronny PE/PEN → punkt
neutralny transformatora.
**Z_s = Z_transformatora + Z_przewodu fazowego + Z_przewodu ochronnego.**

### 15. Jak mierzy się impedancję pętli?
**Metodą spadku napięcia** (technicznej): miernik mierzy napięcie bez obciążenia U₁, następnie
załącza znane obciążenie (rezystor) i mierzy U₂ oraz prąd I; wtedy
$$Z_s = \frac{U_1 - U_2}{I}$$
Pomiar wykonuje się **przy załączonym napięciu**, w najbardziej niekorzystnym (najdalszym)
punkcie obwodu. Warianty mierników: pomiar pełnoprądowy (duży prąd, krótki czas), pomiar
z małym prądem i filtracją — **konieczny w obwodach z wyłącznikiem różnicowoprądowym**, aby go
nie wyzwolić (funkcja „bez wyzwalania wyłącznika różnicowoprądowego").

### 16. Jak ocenia się wynik?
Oblicza się prąd zwarciowy:
$$I_k = \frac{U_0}{Z_s}$$
i porównuje z prądem **I_a** powodującym zadziałanie zabezpieczenia w wymaganym czasie
(0,4 s / 5 s dla TN). Warunek: **I_k ≥ I_a**, czyli **Z_s ≤ U₀ / I_a**.

W praktyce stosuje się **zapas na wzrost rezystancji przewodów przy nagrzaniu** — reguła
„2/3": zmierzona impedancja powinna spełniać
$$Z_{s(zmierzona)} \le \frac{2}{3}\cdot\frac{U_0}{I_a}$$
(albo równoważnie: przelicza się Z_s na temperaturę pracy, mnożąc rezystancję przewodów
przez współczynnik ≈ 1,5 dla 70 °C, oraz uwzględnia współczynnik napięciowy c = 0,95).

### 17. Prądy I_a dla typowych zabezpieczeń — jak je znaleźć?
- **Wyłącznik nadprądowy**: I_a = górna granica wyzwalania magnetycznego:
  **B → 5·I_n**, **C → 10·I_n**, **D → 20·I_n** (dla wyłączenia w czasie < 0,1 s).
- **Bezpiecznik gG**: z charakterystyki czasowo-prądowej dla wymaganego czasu (0,4 s lub 5 s),
  typowo I_a ≈ (4–10)·I_n zależnie od wielkości wkładki.
- **Wyłącznik różnicowoprądowy**: I_a = I_Δn (gdy ochronę realizuje ten wyłącznik).

**Przykład:** obwód z wyłącznikiem B16, TN, U₀ = 230 V, wymagane 0,4 s.
I_a = 5 × 16 = 80 A ⇒ Z_s ≤ 230/80 = **2,88 Ω**; z regułą 2/3: zmierzona **≤ 1,92 Ω**.

**Przykład 2:** C16 → I_a = 160 A ⇒ Z_s ≤ 230/160 = **1,44 Ω**; zmierzona ≤ **0,96 Ω**.

### 18. Kiedy pomiar pętli nie jest wystarczający i co wtedy?
W układzie **TT** i **IT** — ochronę zapewnia wyłącznik różnicowoprądowy i uziemienie, więc
mierzy się **rezystancję uziemienia R_A** i sprawdza ten wyłącznik. W obwodach zasilanych przez
falowniki, zasilacze bezprzerwowe, agregaty —
pomiar może być niemiarodajny (ograniczenie prądu przez elektronikę) → ocena obliczeniowa
i sprawdzenie zabezpieczeń.

### 19. Pomiar pętli w obwodzie L–N (impedancja obwodu zwarciowego)
Wykonuje się dla oceny prądu zwarcia dwufazowego/jednofazowego L–N (dobór zabezpieczenia i
sprawdzenie zdolności zwarciowej). Mierzy się między L i N. Podobnie L–L dla zwarć międzyfazowych.

---

## E. Sprawdzanie wyłączników różnicowoprądowych

### 20. Co się mierzy w wyłączniku różnicowoprądowym?
1. **Prąd wyłączający I_Δ** (rzeczywisty prąd zadziałania) — narastający prąd różnicowy;
   wymagane: **0,5·I_Δn ≤ I_Δ ≤ I_Δn** (dla typu AC).
2. **Czas wyłączenia t_a** przy I_Δn, 2·I_Δn, 5·I_Δn.
3. **Napięcie dotykowe** (funkcja niektórych mierników) i rezystancja uziemienia mierzona
   z wykorzystaniem wyłącznika różnicowoprądowego.
4. **Próba przyciskiem kontrolnym TEST** — sprawdzenie mechanizmu (nie zastępuje pomiaru!).

### 21. Dopuszczalne czasy wyłączenia wyłącznika różnicowoprądowego (wg PN-EN 61008/61009)
| Krotność | Wyłącznik **bezzwłoczny (ogólny)** | Wyłącznik **selektywny (S)** |
|---|---|---|
| **I_Δn** | ≤ 300 ms | 130–500 ms |
| **2·I_Δn** | ≤ 150 ms | 60–200 ms |
| **5·I_Δn** | ≤ 40 ms | 50–150 ms |

W instalacji dodatkowo musi być spełniony **wymagany czas wyłączenia obwodu** (np. 0,4 s w TN) —
wyłącznik różnicowoprądowy 30 mA praktycznie zawsze go spełnia.

### 22. Jak wykonać pomiar wyłącznika różnicowoprądowego?
Miernik podłącza się **za** wyłącznikiem (L, N, PE) — najlepiej w gniazdku obwodu chronionego.
Pomiar dla
**obu połówek okresu** (0° i 180°) — przyjmuje się **wynik najbardziej niekorzystny (najdłuższy
czas / najwyższy prąd)**. Dla typu A dodatkowo pomiar prądem pulsującym; dla typu B — prądem
stałym. Trzeba uwzględnić prądy upływowe odbiorników (odłączyć odbiorniki, by nie zafałszowały
wyniku i nie sumowały się z prądem miernika).

### 23. Najczęstsze przyczyny „samoczynnego" wyzwalania wyłącznika różnicowoprądowego
Sumowanie prądów upływowych wielu odbiorników (filtry przeciwzakłóceniowe, falowniki, zasilacze),
zawilgocenie izolacji, uszkodzony grzejnik/pralka, połączenie N z PE za wyłącznikiem
(błąd instalacyjny!), przepięcia atmosferyczne, niewłaściwy typ wyłącznika (typ AC przy
odbiornikach z prądem pulsującym), zbyt małe I_Δn dla długiego obwodu.

### 24. Jak sprawdzić błąd „N połączone z PE za wyłącznikiem różnicowym"?
Objaw: wyłącznik wyzwala natychmiast po załączeniu lub przy obciążeniu. Diagnostyka: pomiar rezystancji
izolacji N–PE (będzie ~0), rozłączanie obwodów kolejno, pomiar prądu w N.

---

## F. Pomiar rezystancji uziemienia i rezystywności gruntu

### 25. Jakie metody pomiaru rezystancji uziemienia znasz?
1. **Metoda techniczna (3-przewodowa, „62 %")** — badany uziom E, sonda napięciowa S i elektroda
   prądowa H w linii; sondę umieszcza się w odległości ok. **62 %** odległości E–H.
   Odległość E–H ≥ 5 × (największy wymiar uziomu), typowo 20–40 m.
2. **Metoda 4-przewodowa** — jak wyżej, ale osobne przewody napięciowe eliminują rezystancję
   przewodów pomiarowych (dokładniejsza dla małych R).
3. **Metoda dwóch cęgów (bez elektrod)** — tylko dla uziomów w układzie wielokrotnym
   (siatki, słupy z uziemieniem wspólnym); mierzy rezystancję pętli.
4. **Metoda cęgowa z jednymi cęgami + elektrody (selektywna)** — pomiar rezystancji jednego
   uziomu w układzie połączonym, bez rozłączania.
5. **Metoda udarowa** — dla uziemień **odgromowych** (mierzy impedancję udarową).
6. **Metoda kompensacyjna / mostkowa**, **metoda techniczna z amperomierzem i woltomierzem**
   (prądem przemiennym, nie stałym — DC daje błąd od polaryzacji i napięć błądzących).

### 26. Dlaczego pomiar wykonuje się prądem przemiennym?
Aby wyeliminować **polaryzację elektrod** i wpływ **napięć błądzących/stałych** w gruncie.
Mierniki stosują prąd o częstotliwości różnej od 50 Hz (np. 94–128 Hz), by odfiltrować
zakłócenia sieciowe.

### 27. Kiedy trzeba rozłączyć uziom od instalacji?
Przy pomiarze metodą techniczną uziomu pojedynczego — aby nie zmierzyć równolegle innych uziomów
(PEN sieci, uziemienia obce). Rozłączenie wykonuje się w **złączu kontrolnym**. **Uwaga BHP**:
rozłączanie przewodu uziemiającego pracującej instalacji jest niebezpieczne (może pojawić się
napięcie) — wykonuje się to przy wyłączonym zasilaniu lub stosuje metodę selektywną/cęgową.

### 28. Pomiar rezystywności gruntu — metoda Wennera
Cztery elektrody w linii, w równych odstępach **a**, zagłębione na ≤ a/20.
$$\rho = 2\pi a R$$
gdzie R — zmierzona rezystancja. Odstęp a odpowiada w przybliżeniu **głębokości**, dla której
uzyskuje się rezystywność zastępczą. Wynik służy do projektowania uziomów.

### 29. Orientacyjne rezystywności gruntów
| Grunt | ρ [Ω·m] |
|---|---|
| Grunt torfowy, bagienny | 5–50 |
| Glina, ił wilgotny | 20–60 |
| Ziemia uprawna, humus | 50–100 |
| Piasek wilgotny | 100–500 |
| Piasek suchy, żwir | 500–3000 |
| Skała, beton suchy | > 3000 |

### 30. Jak zmniejszyć rezystancję uziemienia?
Wydłużyć/pogłębić uziom (uziom głęboki działa najskuteczniej — sięga wilgotnych warstw),
zwiększyć liczbę elektrod z zachowaniem odstępów (≥ 2 × długość), zastosować uziom otokowy
lub kratowy, wykorzystać uziom fundamentowy, użyć bentonitu / materiałów zmniejszających
rezystancję przejścia, połączyć uziomy w system uziemień.
(Zasolenie gruntu **nie jest** zalecane — powoduje korozję i szkody dla środowiska.)

---

## G. Pozostałe pomiary i sprawdzenia

### 31. Sprawdzenie biegunowości i kolejności faz
- **Biegunowość**: sprawdzenie, że łączniki jednobiegunowe są w przewodach **fazowych**, a nie
  w N; że gniazda mają prawidłowo przyłączone L, N, PE; że oprawy mają fazę na styku środkowym.
- **Kolejność faz**: wskaźnikiem kolejności faz — istotne dla silników, wind, sprężarek,
  dla pracy równoległej i dla urządzeń z kierunkiem obrotów.

### 32. Pomiar natężenia oświetlenia
Luksomierzem, w siatce punktów pomiarowych, po ustabilizowaniu strumienia (LED ~ kilka minut,
wyładowcze ~ 30 min), przy wygaszonym oświetleniu dziennym lub z pomiarem tła. Wymagania wg
**PN-EN 12464-1** (wnętrza): np. biuro/praca z komputerem **500 lx**, korytarz 100 lx,
klatka schodowa 150 lx, warsztat precyzyjny 750–1000 lx, oświetlenie awaryjne ewakuacyjne
**≥ 1 lx** na osi drogi ewakuacyjnej (PN-EN 1838). Ocenia się też **równomierność U₀**
i **ograniczenie olśnienia UGR**.

### 33. Pomiar prądów upływowych i obciążenia
Cęgi z rdzeniem dzielonym o dużej czułości (mA), obejmując wszystkie przewody czynne obwodu —
zmierzy się sumę (prąd różnicowy). Pomiar obciążenia: cęgi mierzące **rzeczywistą wartość
skuteczną**, pomiar w obwodach z
odkształceniami; ważny jest **współczynnik odkształcenia harmonicznymi** oraz prąd w przewodzie
neutralnym (trzecia harmoniczna sumuje się w przewodzie neutralnym!).

### 34. Jakie pomiary wykonuje się przy urządzeniach SN?
Rezystancja izolacji (megomierz 2,5–5 kV), próba napięciowa kabli (napięciem o bardzo niskiej
częstotliwości albo napięciem tłumionym), **współczynnik strat dielektrycznych tgδ**,
diagnostyka **wyładowań niezupełnych**, rezystancja uzwojeń i przekładnia transformatora,
badanie oleju (przebicie, wilgotność, **analiza gazów rozpuszczonych**), rezystancja styków
(mikroomomierz),
**czas własny i jednoczesność łączenia wyłącznika** (analizator wyłączników),
badanie przekładników (przekładnia, błąd kątowy, obciążenie),
sprawdzenie i nastawy **zabezpieczeń** (testery przekaźników — próba prądowo-czasowa),
pomiar rezystancji uziemienia i **napięć rażeniowych** stacji, kontrola termowizyjna,
sprawdzenie blokad i sygnalizacji.

### 35. Badania termowizyjne — po co?
Wykrywają miejsca o podwyższonej temperaturze: poluzowane i skorodowane połączenia, przeciążone
przewody, uszkodzone styki, asymetrię obciążenia, uszkodzone wkładki bezpiecznikowe, przegrzane
uzwojenia. Wykonywane **pod obciążeniem** (min. ok. 40–60 % obciążenia nominalnego), bezstykowo,
z uwzględnieniem emisyjności i odległości. To badanie **diagnostyczne (predykcyjne)**, nie
zastępuje pomiarów ochronnych.

---

## H. Terminy badań i protokoły

### 36. Jak często wykonuje się pomiary okresowe?
**Wymóg ustawowy** (Prawo budowlane, art. 62 ust. 1 pkt 2): kontrola instalacji elektrycznej
i piorunochronnej **co najmniej raz na 5 lat**, w zakresie: stanu sprawności połączeń, osprzętu,
zabezpieczeń i środków ochrony od porażeń, oporności izolacji przewodów oraz uziemień instalacji
i aparatów.

**Terminy zaostrzone** (wg zaleceń normy PN-HD 60364-6 i praktyki, w zależności od środowiska):
| Rodzaj obiektu / warunki | Rezystancja izolacji | Skuteczność ochrony przeciwporażeniowej |
|---|---|---|
| Pomieszczenia o wyziewach żrących | 1 rok | 1 rok |
| Zagrożone wybuchem (strefy Ex) | 1 rok | 1 rok |
| Otwarta przestrzeń, place budowy | 1 rok | 1 rok |
| Bardzo wilgotne (wilgotność ~100 %) i gorące (> 35 °C) | 1 rok | 1 rok |
| Zagrożone pożarem | 1 rok | 5 lat |
| Zapylone | — | 1 rok |
| Pozostałe (biura, mieszkania, przemysł typowy) | 5 lat | 5 lat |

Wyłączniki różnicowoprądowe: zaleca się sprawdzanie **przyciskiem kontrolnym TEST** co miesiąc
(przez użytkownika) i pomiar
parametrów wraz z badaniami okresowymi (a w obiektach wymagających — co roku).

### 37. Co powinien zawierać protokół pomiarów?
- nazwa i adres obiektu, opis badanej instalacji/urządzenia,
- **zleceniodawca**, wykonawca, **numer świadectwa kwalifikacyjnego** osoby mierzącej,
- **data pomiarów**, warunki środowiskowe (temperatura, wilgotność, stan gruntu),
- **rodzaj sprawdzenia** (odbiorcze / okresowe / doraźne) i podstawa (normy, przepisy),
- **wykaz użytych przyrządów**: typ, nr fabryczny, **data i numer świadectwa wzorcowania**,
- **metoda pomiaru**,
- **schemat / opis punktów pomiarowych**,
- **wyniki pomiarów** w tabeli, z podaniem wartości wymaganych,
- **ocena wyników** i wniosek: instalacja/urządzenie **spełnia / nie spełnia** wymagań,
- **wykaz usterek i zaleceń**, termin następnego badania,
- **podpis** osoby wykonującej i sprawdzającej (osoby dozoru).

### 38. Jak ocenić wynik „na granicy"?
Trzeba uwzględnić **niepewność pomiaru** przyrządu. Wynik jest wątpliwy, jeśli wartość zmierzona
± niepewność obejmuje wartość dopuszczalną. Wówczas należy powtórzyć pomiar, użyć dokładniejszej
metody lub uznać wynik za niespełniający wymagań (zasada bezpieczeństwa).

### 39. Co zrobić, gdy wynik jest niezgodny z wymaganiami?
Nie dopuszczać instalacji do użytkowania / wpisać do protokołu jako **niespełniającą wymagań**,
niezwłocznie powiadomić właściciela i osobę dozoru, wskazać usterkę i sposób usunięcia,
w razie bezpośredniego zagrożenia — **wyłączyć obwód** i zabezpieczyć przed załączeniem,
po naprawie wykonać pomiar sprawdzający i sporządzić protokół uzupełniający.

### 40. BHP przy pracach pomiarowych
- Pomiary pod napięciem tylko wtedy, gdy metoda tego wymaga; w rękawicach, z narzędziami 1000 V,
  na macie izolacyjnej, przewodami pomiarowymi z osłonami i bezpiecznikami.
- Praca **min. dwuosobowa** przy pomiarach w rozdzielnicach, przy urządzeniach SN i w warunkach
  szczególnego zagrożenia.
- Przy pomiarach z podawaniem napięcia probierczego — wygrodzenie, oznakowanie, ostrzeżenie
  otoczenia, kontrola, by nikt nie dotykał badanego obiektu.
- Po pomiarze izolacji i próbie napięciowej — **rozładowanie i uziemienie** obiektu
  (kable SN — uziemienie na czas określony w instrukcji, nawet kilkanaście minut).
- Przyrządy o właściwej kategorii pomiarowej; zakaz stosowania mierników uszkodzonych,
  bez wzorcowania.
- Przy pomiarach na wysokości i na słupach — sprzęt chroniący przed upadkiem, asekuracja.

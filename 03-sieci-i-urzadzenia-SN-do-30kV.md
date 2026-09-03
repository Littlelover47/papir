# 03. Sieci i urządzenia średniego napięcia do 30 kV

Blok kluczowy dla świadectwa „powyżej 1 kV — do 30 kV".

---

## A. Sieć elektroenergetyczna — podstawy

### 1. Jakie napięcia znamionowe występują w krajowej sieci?
- **nn**: 230/400 V (dawniej 220/380 V), 500 V, 690 V.
- **SN**: **6, 10, 15, 20, 30 kV** (dominują **15 kV** i **20 kV**).
- **WN**: 110 kV.
- **NN (najwyższe)**: 220 kV, 400 kV, 750 kV.

### 2. Jak dzieli się sieć wg funkcji?
- **przesyłowa** — 400/220 kV (i 110 kV w części), operator: PSE,
- **rozdzielcza** — 110 kV, SN i nn, operatorzy OSD,
- **odbiorcza / wewnątrzzakładowa**.

### 3. Jakie są układy pracy sieci SN?
- **promieniowy (radialny)** — najprostszy, najtańszy, mała pewność zasilania (typowo wsie).
- **magistralny** z odgałęzieniami.
- **pierścieniowy / obwodowy** — zasilany dwustronnie, pracujący **promieniowo** z otwartym
  punktem podziału; przy awarii przełącza się zasilanie (typowo miasta, sieć kablowa).
- **kratowy (oczkowy)** — najwyższa pewność, sieci nn miejskie.
- **z rezerwą** — dwutorowe, dwustronne zasilanie stacji.

### 4. Dlaczego sieć SN pracuje promieniowo, a nie w zamkniętym pierścieniu?
Bo upraszcza zabezpieczenia (nadprądowe kierunkowe nie są potrzebne), ogranicza prądy zwarciowe,
umożliwia jednoznaczną lokalizację zwarcia i selektywność. Pierścień jest **rezerwą**, zamykany
tylko na czas przełączeń.

---

## B. Stacje i rozdzielnice SN

### 5. Co to stacja elektroenergetyczna i jakie są rodzaje?
Zespół urządzeń służących do przetwarzania (transformacji) i/lub rozdziału energii.
Podział:
- wg funkcji: **transformatorowa**, **rozdzielcza (łącznikowa)**, **przekształtnikowa**,
- wg konstrukcji: **wnętrzowa (budynek, kontenerowa, wbudowana, podziemna)**, **napowietrzna**
  (słupowa: STSa/STSp, ITS — na żerdziach wirowanych, dawniej „małogabarytowa"),
- wg izolacji rozdzielnicy: **powietrzna (AIS)**, **w izolacji SF₆ (GIS)**, **hybrydowa**,
- wg obsługi: **z obsługą stałą**, **bez obsługi (zdalnie sterowana)**.

### 6. Z jakich elementów składa się stacja SN/nn?
Rozdzielnica SN (pola liniowe, transformatorowe, pomiarowe, sprzęgłowe), **transformator SN/nn**,
rozdzielnica nn, obwody pomocnicze (potrzeby własne, oświetlenie, sterowanie, zasilanie
gwarantowane / bateria), obwody zabezpieczeń i telemechaniki, **układ pomiarowo-rozliczeniowy**
(przekładniki + licznik), **instalacja uziemiająca i wyrównawcza**, **ograniczniki przepięć**,
konstrukcje wsporcze, misa olejowa, wentylacja, sprzęt ochronny i przeciwpożarowy, oznakowanie,
schematy.

### 7. Jakie pola występują w rozdzielnicy SN?
Liniowe (kablowe/napowietrzne), transformatorowe, sprzęgłowe (łącznik szyn), pomiarowe
(przekładniki napięciowe), potrzeb własnych, uziemiające, wtykowe/rezerwowe, pole pomiaru
energii.

### 8. Jakie warunki musi spełniać pomieszczenie rozdzielni SN?
Odpowiednia **wysokość i szerokość przejść obsługowych** (przejście obsługi min. 0,8 m, przejście
ewakuacyjne min. 0,8 m, drzwi otwierane na zewnątrz, ≥ 0,75 m szerokości), **odstępy izolacyjne**
i osłony (IP min. wg przeznaczenia), wentylacja i chłodzenie, oświetlenie podstawowe i awaryjne,
zabezpieczenie od wilgoci i wody, uszczelnienie przepustów, **misa olejowa** dla transformatorów
olejowych o odpowiedniej pojemności, odporność ogniowa przegród, wyposażenie ppoż. i sprzęt
ochronny, tablice ostrzegawcze, schemat jednobiegunowy, zamki i zabezpieczenie przed dostępem
osób nieupoważnionych, **dwa wyjścia** przy dłuższych rozdzielniach.

---

## C. Aparaty łączeniowe SN — najczęstsze pytanie egzaminacyjne!

### 9. Wyjaśnij różnicę: wyłącznik, rozłącznik, odłącznik, uziemnik.
| Aparat | Załącza/wyłącza | Gasi łuk | Widoczna przerwa izolacyjna |
|---|---|---|---|
| **Wyłącznik** | prądy **roboczych i zwarciowe** | tak, komora gaszeniowa | zwykle **nie** |
| **Rozłącznik** | prądy **robocze (obciążenia)**, nie zwarciowe | tak, w ograniczonym zakresie | tak (najczęściej) |
| **Odłącznik** | **tylko przy braku prądu** (stan bezprądowy) | nie | **tak — to jego główna funkcja** |
| **Uziemnik** | zwiera i uziemia część wyłączoną | nie (ma zdolność załączania na zwarcie) | — |
| **Rozłącznik bezpiecznikowy** | prądy robocze + zwarciowe przez wkładkę | wkładka | tak |

**Wniosek egzaminacyjny:** odłącznikiem **nie wolno** przerywać prądu obciążenia (poza znikomymi
prądami: prądy jałowe małych transformatorów, prądy ładowania krótkich odcinków — i to tylko
gdy dopuszcza instrukcja).

### 10. Jakie są rodzaje wyłączników SN i jak gaszą łuk?
- **próżniowy (VCB)** — łuk gaszony w komorze próżniowej; najpopularniejszy do 36 kV; duża
  trwałość łączeniowa, mała energia napędu, mała konserwacja; wada — możliwość przepięć przy
  łączeniu obwodów indukcyjnych (stąd ograniczniki przepięć).
- **z izolacją SF₆** — gaz o dużej wytrzymałości elektrycznej i doskonałych właściwościach
  gaszeniowych; nadaje się do wyższych napięć; **SF₆ jest gazem cieplarnianym** — obsługa i
  odzysk wg przepisów F-gazowych; produkty rozkładu są toksyczne i korozyjne.
- **małoolejowy** — starsze konstrukcje; łuk gaszony olejem, gazy rozkładu; wymaga częstej
  konserwacji i badania oleju; ryzyko pożarowe/wybuchowe.
- **powietrzny (pneumatyczny)**, **magnetowydmuchowy** — starsze rozwiązania.
- Napędy: **sprężynowy (zbrojony ręcznie lub silnikiem)**, **magnetyczny**, elektromagnetyczny;
  z wyzwalaczami: **wybijakowym (zanikowym/napięciowym)**, **prądowym**, **cewką wyłączającą**.

### 11. Rola przekładników w rozdzielni SN
- **Przekładnik prądowy (CT)**: przetwarza duży prąd na 5 A lub 1 A; oddziela obwody wtórne od
  wysokiego napięcia. **Uzwojenia wtórnego nigdy nie wolno rozwierać** pod prądem — powstaje
  bardzo wysokie napięcie i zniszczenie przekładnika (zwierać zaciski!). Uzwojenie wtórne
  i rdzeń są **uziemione**.
- **Przekładnik napięciowy (VT)**: przetwarza napięcie na 100 V / 100/√3 V; **nie wolno zwierać**
  uzwojenia wtórnego (zwarcie = zniszczenie); zabezpieczany bezpiecznikami z obu stron.
  Uzwojenie wtórne uziemione w jednym punkcie. Uwaga BHP: **przekładnik napięciowy może być
  źródłem napięcia zwrotnego** — przy pracach trzeba go odłączyć również od strony wtórnej.
- Klasy dokładności: pomiarowe 0,2 / 0,5 / 1; zabezpieczeniowe 5P / 10P (z liczbą granicznej
  dokładności, np. 5P20).

### 12. Ograniczniki przepięć w sieci SN
Beziskiernikowe **z tlenków metali (ZnO)** — nieliniowa charakterystyka, w normalnych warunkach
prąd znikomy, przy przepięciu przewodzi i ogranicza napięcie do poziomu **U_p**. Montowane:
na wejściach kablowych do stacji, przy transformatorach, na przejściach linia napowietrzna–kabel,
przed silnikami SN. Parametry: napięcie trwałej pracy **U_c**, napięcie obniżone **U_r**,
prąd znamionowy wyładowczy (5/10/20 kA), klasa ograniczania ciśnienia.
Starsze: **odgromniki zaworowe** z iskiernikiem.

### 13. Blokady w rozdzielnicach SN — jaki jest ich sens?
Uniemożliwiają błędne łączenia: nie da się otworzyć odłącznika pod obciążeniem, załączyć
uziemnika na pole pod napięciem, otworzyć drzwi przedziału bez uziemienia, załączyć wyłącznika
przy załączonym uziemniku. Rodzaje: **mechaniczne**, **elektromagnetyczne (zamki, klucze)**,
**elektryczne (obwody sterownicze)**, **logiczne/programowe**. Blokad **nie wolno mostkować**;
odblokowanie awaryjne tylko wg instrukcji, przez osobę upoważnioną, z zapisem.

### 14. Wskaźniki napięcia i uzgadnianie faz
- Wskaźniki: **pojemnościowe (na drążku)** dla SN, **wskaźniki na przedziale (LRM)** — układy
  sygnalizacji obecności napięcia w rozdzielnicach.
- Przed sprawdzeniem braku napięcia trzeba **sprawdzić działanie wskaźnika** (na źródle
  kontrolnym lub części pod napięciem) — i powtórzyć sprawdzenie po pomiarze.
- **Uzgadnianie faz** (fazowanie) — sprawdzenie zgodności faz przed zamknięciem połączenia
  równoległego (dwa źródła / dwa kierunki zasilania); wykonuje się fazowskazem na drążku
  lub przez pomiar napięcia różnicowego na przekładnikach.

---

## D. Transformatory

### 15. Zasada działania i budowa transformatora
Działa na zasadzie **indukcji elektromagnetycznej** — zmienny strumień magnetyczny wytworzony
przez uzwojenie pierwotne indukuje SEM w uzwojeniu wtórnym. Nie zmienia częstotliwości;
zmienia napięcie i prąd w stosunku **przekładni** ϑ = U₁/U₂ ≈ z₁/z₂.
Budowa: rdzeń z blach transformatorowych izolowanych (zmniejszenie prądów wirowych), uzwojenia
(Cu/Al), izolacja (papier-olej, żywica), **kadź**, **konserwator** (zbiornik wyrównawczy),
osuszacz powietrza (silikażel), izolatory przepustowe, przełącznik zaczepów, chłodnice,
zabezpieczenia (przekaźnik Buchholza, termometry, zawór nadciśnieniowy), tabliczka znamionowa.

### 16. Jakie dane są na tabliczce znamionowej transformatora?
Moc znamionowa (kVA), napięcia znamionowe górne/dolne, prądy znamionowe, **grupa połączeń**
(np. Dyn5, Yzn5), **napięcie zwarcia u_k %**, prąd biegu jałowego, straty jałowe i obciążeniowe,
częstotliwość, sposób chłodzenia (ONAN, ONAF, AN — dla żywicznych), masa, ilość oleju,
klasa izolacji, rok produkcji, norma.

### 17. Jakie typy transformatorów rozdzielczych SN/nn?
- **olejowe hermetyczne** (najczęściej, chłodzenie ONAN, tanie, ale ryzyko pożaru/wycieku),
- **żywiczne (suche, odlewane)** — bezpieczne pożarowo, do stacji wnętrzowych w budynkach,
- **z izolacją estrową** (biodegradowalna, wyższy punkt zapłonu).

### 18. Jakie zabezpieczenia stosuje się dla transformatora SN/nn?
Od strony SN: **bezpieczniki WN** (małe moce) albo **wyłącznik z zabezpieczeniem nadprądowym
zwarciowym bezzwłocznym + przeciążeniowym zwłocznym**; **zabezpieczenie ziemnozwarciowe**.
Wewnętrzne: **przekaźnik gazowo-przepływowy (Buchholza)** — reaguje na wydzielanie gazów
i przepływ oleju (sygnalizacja / wyłączenie), **czujniki temperatury oleju i uzwojeń**,
**zawór nadciśnieniowy**, **wskaźnik poziomu oleju**. Dla dużych: **zabezpieczenie różnicowe**,
zabezpieczenie odległościowe/rezerwowe. Od strony nn: wyłącznik powietrzny/kompaktowy
z zabezpieczeniem przeciążeniowym i zwarciowym.

### 19. Jak przygotować transformator do pracy (do bezpiecznej pracy przy nim)?
1. Wyłączyć od strony **nn** i **SN**; 2. otworzyć odłącznik / wysunąć rozłącznik i zabezpieczyć
przed załączeniem; 3. sprawdzić brak napięcia po obu stronach; 4. **uziemić po obu stronach**
(SN i nn) — bo transformator może być zasilony zwrotnie od nn; 5. odłączyć obwody pomocnicze
i przekładniki napięciowe; 6. wygrodzić i oznakować strefę pracy.

### 20. Dlaczego przy pracach przy transformatorze uziemia się z obu stron?
Bo napięcie może pojawić się od strony nn (praca równoległa, agregat, instalacja PV odbiorcy,
zasilanie rezerwowe) i wtedy transformator działa jako podwyższający — na stronie SN wystąpi pełne
napięcie SN.

### 21. Warunki pracy równoległej transformatorów
1. **jednakowe napięcia znamionowe** (jednakowe przekładnie),
2. **jednakowa grupa połączeń** (ta sama przesunięcie fazowe / godzinowa),
3. **jednakowa kolejność faz**,
4. **napięcia zwarcia u_k** możliwie równe (różnica ≤ ok. 10 %),
5. stosunek moc znamionowych nie większy niż ok. **1:3**.
Niespełnienie → prądy wyrównawcze, nierównomierne obciążenie, przegrzewanie.

### 22. Badania eksploatacyjne transformatora
Oględziny (poziom i szczelność oleju, silikażel, izolatory, przekaźnik Buchholza, hałas,
temperatura), pomiar **rezystancji izolacji uzwojeń** (i współczynnika absorpcji R60/R15,
polaryzacji PI = R600/R60), pomiar **rezystancji uzwojeń** prądem stałym, sprawdzenie
**przekładni i grupy połączeń**, **pomiar tgδ i pojemności**, **badanie oleju** (napięcie
przebicia, zawartość wody, liczba kwasowa, DGA — analiza gazów rozpuszczonych), próba
napięciowa, pomiar prądu i strat jałowych, pomiar napięcia i strat zwarcia, sprawdzenie
zabezpieczeń i uziemienia. Częstotliwość — wg instrukcji eksploatacji / zaleceń producenta.

---

## E. Linie i kable SN

### 23. Rodzaje linii SN
- **napowietrzne**: przewody gołe **AFl** (AL/stalowo-aluminiowe), **przewody w osłonie (PAS/BLL)**,
  **linie izolowane** — na słupach żelbetowych (ŻN, E), wirowanych, drewnianych; izolatory
  stojące i wiszące (porcelanowe, szklane, kompozytowe).
- **kablowe**: kable z izolacją **XLPE** (polietylen usieciowany) — dominują, dawniej kable
  **papierowo-olejowe** (np. HAKnFtA); jednożyłowe (3 × 1) lub trójżyłowe; z żyłą powrotną
  (ekran z drutów miedzianych) i izolacją zewnętrzną PE/PVC.
- Głowice i mufy: termoutwardzalne, termoskurczliwe, zimnoskurczliwe, wtykowe (konektory).

### 24. Zasady układania kabli SN
Głębokość ułożenia (typowo **0,8 m** dla SN, 0,7 m dla nn poza drogami; pod drogami głębiej i w
rurach osłonowych), podsypka i obsypka z piasku, **folia ostrzegawcza czerwona** nad kablem SN
(nn — niebieska), oznaczniki na trasie i przy mufach, zapas kabla przy mufach, minimalne
promienie gięcia (wg producenta, zwykle 12–20 × D), odstępy od innych instalacji i uzbrojenia,
rury osłonowe na skrzyżowaniach, uziemienie ekranów (jednostronne / dwustronne / cross-bonding),
próba napięciowa i pomiary po ułożeniu.

### 25. Jakie zagrożenia niesie kabel SN wyłączony spod napięcia?
- **Napięcie powrotne (pojemnościowe)** — kabel jest kondensatorem, po wyłączeniu utrzymuje
  ładunek → trzeba **rozładować i uziemić** przed pracą i pozostawić uziemienie.
- **Napięcie indukowane** z równoległych obwodów pod napięciem.
- **Możliwość zasilania z drugiej strony** — sieć pierścieniowa.
- Dlatego przed przecięciem/nacięciem kabla wykonuje się jego **jednoznaczną identyfikację**
  i **przekłucie/przestrzelenie** (nakłuwaczem z uziemieniem) — potwierdzenie, że kabel jest
  bez napięcia.

### 26. Pomiary i próby kabla SN
Rezystancja izolacji (megomierzem, zwykle 5 kV), **próba napięciowa** — dla XLPE napięciem
**przemiennym o bardzo niskiej częstotliwości (VLF 0,1 Hz)** lub napięciem tłumionym (DAC),
dla kabli papierowych dopuszczalne DC; pomiar **tgδ** (ocena zawilgocenia i starzenia),
**diagnostyka wyładowań niezupełnych (PD)**, lokalizacja uszkodzeń: **reflektometria TDR**,
metoda udarowa (ICM), metoda akustyczna, metoda krokowa (dla uszkodzeń powłoki), pomiar
ciągłości i rezystancji żył, sprawdzenie ciągłości i rezystancji ekranu, sprawdzenie kolejności
i zgodności faz.

> **Uwaga:** kabli z izolacją XLPE **nie należy** badać wysokim napięciem stałym — DC powoduje
> gromadzenie ładunku przestrzennego i przyspiesza degradację (drzewienie wodne).

---

## F. Zwarcia, punkt neutralny, zabezpieczenia

### 27. Rodzaje zwarć
- **jednofazowe doziemne** (najczęstsze w sieciach SN),
- **dwufazowe** (bez ziemi i z ziemią),
- **trójfazowe** (najgroźniejsze prądowo, najrzadsze),
- **zwarcia łukowe** i **metaliczne**, przemijające i trwałe.

### 28. Skutki zwarć
Cieplne (nagrzewanie i uszkodzenie przewodów, izolacji), **dynamiczne** (siły elektrodynamiczne
na szynach i uzwojeniach), spadki napięcia i zaburzenia pracy odbiorników, utrata stabilności,
**napięcia rażeniowe** (dotykowe i krokowe) w obszarze uziemienia, łuk i pożar, zakłócenia
w torach telekomunikacyjnych.

### 29. Sposoby pracy punktu neutralnego sieci SN — WAŻNE
1. **Punkt neutralny izolowany** — prąd zwarcia doziemnego mały (prąd pojemnościowy), sieć może
   pracować krótko ze zwarciem 1-fazowym; wada: przepięcia, zwarcia łukowe przerywane, trudna
   lokalizacja. Stosowane w małych sieciach napowietrznych.
2. **Uziemiony przez dławik gaszący (reaktor Petersena) — sieć skompensowana** — kompensuje prąd
   pojemnościowy, łuk gaśnie samoczynnie; typowe dla dużych sieci napowietrznych 15/20 kV.
3. **Uziemiony przez rezystor** — ogranicza prąd doziemny do kilkudziesięciu–kilkuset amperów,
   ułatwia selektywne wykrycie i wyłączenie zwarcia, tłumi przepięcia; typowe dla **sieci
   kablowych miejskich**.
4. **Bezpośrednio uziemiony** — duże prądy zwarciowe, natychmiastowe wyłączenie; stosowany w
   sieciach nn i WN/NN, w SN wyjątkowo.

### 30. Jakie zabezpieczenia stosuje się w sieciach SN?
- **nadprądowe zwarciowe** bezzwłoczne (I>>) i **przeciążeniowe** zwłoczne (I>),
- **ziemnozwarciowe**: zerowoprądowe, **kierunkowe czynnomocowe** (sieci skompensowane),
  **kierunkowe biernomocowe** (sieci izolowane), admitancyjne, konduktancyjne,
- **różnicowe** (transformatory, szyny, silniki, kable),
- **odległościowe** (dłuższe linie, WN),
- **od skutków przeciążeń cieplnych** (obraz cieplny),
- **SPZ (samoczynne ponowne załączanie)** — dla linii napowietrznych, likwiduje zwarcia
  przemijające; **SZR (samoczynne załączanie rezerwy)** — przełączenie na zasilanie rezerwowe,
- zabezpieczenia napięciowe (U<, U>), częstotliwościowe (f<), od asymetrii, od zaniku fazy,
- **zabezpieczenie łukoochronne (arc-protection)** w rozdzielnicach.

### 31. Jakie wymagania stawia się zabezpieczeniom?
**Selektywność (wybiórczość)**, **szybkość działania**, **czułość** (odpowiedni współczynnik
czułości), **niezawodność**, **pewność nie zadziałania zbędnego**, ekonomiczność, możliwość
sprawdzenia (testowania).

### 32. Co to strefa martwa / współczynnik czułości?
Współczynnik czułości k = I_k min / I_nastawienia — dla zabezpieczeń zwarciowych wymagany zwykle
≥ 1,5 (rezerwowo ≥ 1,2). Strefa martwa — fragment obiektu, w którym zwarcie nie powoduje
zadziałania danego zabezpieczenia (musi być pokryty zabezpieczeniem rezerwowym).

---

## G. Czynności łączeniowe

### 33. Kolejność łączeń przy **wyłączaniu** pola liniowego SN
1. Wyłączyć **wyłącznik** (przerwanie prądu).
2. Sprawdzić sygnalizację/pozycję (wskaźniki, amperomierz).
3. Otworzyć **odłącznik** (widoczna przerwa izolacyjna) — dopiero po pewności, że nie ma prądu.
4. **Zabezpieczyć** odłącznik/wyłącznik przed załączeniem (blokada, zamek, tablice, wyjęcie cewek).
5. **Sprawdzić brak napięcia** wskaźnikiem odpowiednim dla SN (sprawdzić wskaźnik przed i po).
6. Załączyć **uziemnik** lub założyć **uziemiacz przenośny** (najpierw przyłączyć do uziemienia,
   potem do przewodów; zdejmować w odwrotnej kolejności).
7. Wygrodzić i oznakować **strefę pracy**, oznaczyć części czynne w pobliżu.

### 34. Kolejność przy **załączaniu**
Odwrotna: likwidacja strefy pracy → zdjęcie uziemień/otwarcie uziemnika → zdjęcie blokad i tablic
→ zamknięcie **odłącznika** → zamknięcie **wyłącznika** → sprawdzenie stanu i obciążenia.

### 35. Jak zakłada się uziemiacz przenośny?
Sprzęt sprawdzony i o odpowiednim przekroju/wytrzymałości zwarciowej. Kolejność:
**najpierw zacisk uziemiający do szyny/uziomu, potem kolejno zaciski na przewody fazowe**
(drążkiem izolacyjnym, w rękawicach, kasku, na pomoście izolacyjnym). Zdejmowanie —
**w odwrotnej kolejności** (najpierw fazy, na końcu uziemienie).

### 36. Kto kieruje czynnościami łączeniowymi?
Osoba wskazana w polecaniu (kierujący czynnościami łączeniowymi), zwykle dyspozytor lub
uprawniony pracownik ruchu; łączenia w polach SN wykonuje się na podstawie **programu łączeń**
przy operacjach złożonych, z potwierdzaniem każdej czynności (powtarzanie polecenia — „zwrotne
potwierdzanie").

---

## H. Uziemienia w instalacjach powyżej 1 kV

### 37. Jakie funkcje spełniają uziemienia?
- **ochronne** — ograniczenie napięć rażeniowych,
- **roboczo-funkcjonalne** — punkt neutralny, obwody pomiarowe, ekrany,
- **odgromowe** — odprowadzenie prądu piorunowego,
- **robocze przenośne** — uziemienie części wyłączonych na czas pracy.

### 38. Rodzaje uziomów
**Naturalne** (fundamentowy — zbrojenie, rurociągi metalowe dopuszczone, konstrukcje) oraz
**sztuczne**: pionowe (pręty, rury), poziome (taśmy, bednarka, przewody), kratowe (siatka
uziemiająca stacji), pierścieniowe, głębokie (studniowe). Materiały: stal ocynkowana, miedź,
stal miedziowana, stal nierdzewna. Uziom otokowy wokół stacji + siatka wyrównawcza.

### 39. Od czego zależy rezystancja uziemienia?
Od **rezystywności gruntu ρ** (zależnej od rodzaju gruntu, wilgotności, temperatury, zasolenia),
wymiarów i głębokości uziomu, liczby i rozmieszczenia elektrod (współczynnik wykorzystania),
rezystancji przejścia uziom–grunt. Zmienia się sezonowo — dlatego pomiary wykonuje się
w warunkach niekorzystnych (suchy/zmarznięty grunt) lub z współczynnikiem poprawkowym.

### 40. Jakie wymagania stawia się uziemieniu stacji SN/nn?
Wg **PN-EN 50522**: kryterium nie jest sama wartość R, ale **dopuszczalne napięcie dotykowe
rażeniowe** w funkcji czasu trwania zwarcia oraz **napięcie uziomowe** U_E = I_E · R_E
(dla urządzeń SN dopuszcza się U_E do 2 × U_Tp przy odpowiednich środkach dodatkowych).
Sprawdza się: napięcie dotykowe, **napięcie krokowe**, przeniesienie potencjału, oddziaływanie na
instalacje obce i telekomunikacyjne. Praktycznie dla stacji SN/nn dąży się do
**R_E ≤ 1–10 Ω** (zależnie od prądu zwarcia doziemnego i sposobu pracy punktu neutralnego).
Popularne kryteria „praktyczne" spotykane w eksploatacji: uziemienie ochronne SN ≤ 10 Ω,
uziemienie stacji ze wspólnym uziemieniem SN i nn ≤ 1–2 Ω, uziemienie ochronne słupa
z aparaturą ≤ 10 Ω, uziemienie odgromowe ≤ 10 Ω.

### 41. Co to napięcie dotykowe, krokowe i uziomowe?
- **Napięcie uziomowe U_E** — napięcie uziomu względem ziemi odniesienia przy przepływie prądu
  ziemnozwarciowego.
- **Napięcie dotykowe rażeniowe U_T** — część U_E, która występuje na drodze rażenia ręka–stopy
  (przyjmuje się dotknięcie z odległości 1 m).
- **Napięcie krokowe** — różnica potencjałów na powierzchni gruntu na długości kroku (1 m).
- Ograniczanie: siatka wyrównawcza, warstwa żwiru/asfaltu (zwiększenie rezystancji stóp),
  izolowane pomosty, zwiększenie liczby uziomów, skrócenie czasu wyłączenia.

### 42. Czy uziemienia SN i nn łączyć razem?
To decyzja projektowa. **Uziemienie wspólne** (połączone) stosuje się, gdy rezystancja jest
dostatecznie mała i napięcie uziomowe nie przeniesie się groźnie na instalację nn odbiorcy —
zwykle w stacjach miejskich, kablowych, gdzie R_E jest bardzo małe. **Uziemienia rozdzielone**
stosuje się, gdy istnieje ryzyko przeniesienia potencjału do instalacji nn (stacje wiejskie,
napowietrzne) — z zachowaniem odpowiedniego odstępu między uziomami.

---

## I. Sytuacje awaryjne w SN

### 43. Postępowanie przy zwarciu doziemnym w sieci izolowanej/skompensowanej
Sygnalizacja doziemienia → lokalizacja uszkodzonego odcinka (przełączenia próbne, wskaźniki
kierunku), ograniczenie czasu pracy z doziemieniem (zagrożenie przepięciami i porażeniem —
napięcie faz zdrowych rośnie do napięcia międzyfazowego), zakaz zbliżania się do miejsca
doziemienia (napięcie krokowe!), wyłączenie i naprawa. **Nie wolno** dotykać ani zbliżać się do
zerwanego przewodu — należy oddalić się i zabezpieczyć teren w promieniu co najmniej kilku metrów
(zwykle podaje się 10 m, ruchem „drobnymi krokami" lub skokami).

### 44. Co robić przy pożarze urządzenia elektroenergetycznego?
Wyłączyć zasilanie (jeśli to możliwe i bezpieczne), zgłosić (alarm, straż pożarna 112/998),
gasić **gaśnicą proszkową lub CO₂** — nigdy wodą ani pianą do urządzeń pod napięciem,
zachować odstęp bezpieczny, ewakuować, poinformować straż o napięciu i braku odłączenia.
Transformator olejowy w pożarze — ryzyko wybuchu i rozprysku oleju.

### 45. Ryzyko związane z SF₆
SF₆ czysty jest nietoksyczny, ale **cięższy od powietrza** — gromadzi się w dolnych częściach
pomieszczeń i **wypiera tlen** (ryzyko uduszenia w kanałach, piwnicach). Po zadziałaniu łuku
powstają **toksyczne i korozyjne produkty rozkładu** (m.in. fluorki, SF₄, HF). Wymagana
wentylacja, detekcja, odzysk gazu przez uprawnione osoby (przepisy o F-gazach), zakaz uwalniania
do atmosfery.

### 46. Postępowanie przy awarii transformatora (Buchholz)
Zadziałanie sygnalizacji Buchholza — sprawdzić poziom oleju, pobrać próbkę gazu, ocenić
(gaz palny → uszkodzenie wewnętrzne). Przy zadziałaniu członu wyłączającego lub sygnałach
uszkodzenia **nie wolno ponownie załączać** transformatora bez badań; zgłosić do służb
utrzymania, wykonać pomiary diagnostyczne i DGA.

# 11. Zabezpieczenia SN — funkcje, nastawy i metodyka badania

> Nastawy podane są jako **typowe punkty wyjścia**. Obowiązuje **karta nastaw** zatwierdzona
> przez projektanta i uzgodniona z zabezpieczeniami nadrzędnymi.

Symbole w nawiasach (np. „I>", „U₀>") to **oznaczenia stosowane na schematach polskich**
i na wyświetlaczach zabezpieczeń. Tabelę przeliczeniową na numery amerykańskie (które bywają
na obcych schematach i w menu zabezpieczeń) znajdziesz w **załączniku na końcu pliku**.

---

## A. Katalog zabezpieczeń — funkcja, nastawa, sposób badania

### A.1 Zabezpieczenia nadprądowe

| Zabezpieczenie | Symbol | Typowa nastawa | Jak badać |
|---|---|---|---|
| **Nadprądowe zwarciowe bezzwłoczne** | I≫ | 6–10 × prąd znamionowy odpływu; **poniżej** najmniejszego prądu zwarciowego, **powyżej** prądów rozruchowych i prądu włączania transformatora | Podaj prąd trójfazowy: 0,9 × nastawy (brak zadziałania) i 1,1 × (zadziałanie); zmierz czas własny (typowo 20–40 ms) |
| **Nadprądowe zwłoczne przeciążeniowe** | I> | 1,2–1,4 × prąd obciążenia; charakterystyka niezależna (stałoczasowa) lub zależna | Sprawdź **próg rozruchowy** oraz **co najmniej trzy punkty charakterystyki** (np. 2×, 5×, 10× nastawy) i porównaj z czasem obliczonym |
| **Ziemnozwarciowe zerowoprądowe** | I₀> | Sieć z rezystorem uziemiającym: 10–20 % prądu zwarcia doziemnego. Sieć izolowana: czułe, 1–5 A pierwotnie | Podaj prąd **jednofazowy** albo wprost w obwód przekładnika sumującego; sprawdź brak przeniku od prądów fazowych |
| **Ziemnozwarciowe kierunkowe** | I₀> ⟶ | Kąt charakterystyczny: sieć z rezystorem ≈ 0° (kryterium czynnomocowe), sieć izolowana ≈ −90° (biernomocowe) | Podaj **prąd i napięcie** z regulacją kąta; sprawdź granice strefy zadziałania (±85–88° od kąta charakterystycznego) i **brak zadziałania w kierunku przeciwnym** |
| **Nadprądowe kierunkowe** | I> ⟶ | jak nadprądowe, z kierunkiem | jak wyżej, dla składowych fazowych |
| **Nadprądowe z blokadą napięciową** | I>/U< | Dla generatorów | Podaj prąd przy zmiennym napięciu — sprawdź przesunięcie progu |
| **Od asymetrii prądów (składowej przeciwnej)** | I₂> | 10–20 % prądu znamionowego, czas 2–10 s | Podaj asymetryczny układ trójfazowy (jedna faza obniżona) |
| **Cieplne (obraz cieplny)** | ϑ> | Prąd bazowy 1,0–1,05 × znamionowego, stała czasowa z DTR | Podaj skokowo prąd i zmierz czas do zadziałania; porównaj z modelem cieplnym; sprawdź **pamięć cieplną** i sposób kasowania |
| **Podprądowe** | I< | 30–60 % prądu znamionowego, z blokadą na czas rozruchu | Podaj prąd i obniżaj poniżej progu |
| **Od zbyt długiego rozruchu** | — | Czas rozruchu × 1,2–1,5 | Podaj prąd rozruchowy dłużej niż nastawiony czas |
| **Od utyku (zablokowania) wirnika** | — | Prąd rozruchowy przy braku spadku | Podaj prąd rozruchowy bez zaniku |
| **Od zbyt częstych rozruchów** | — | 2 rozruchy gorące / 3 zimne na godzinę | Symulacja kolejnych rozruchów; sprawdź blokadę i licznik |

### A.2 Zabezpieczenia napięciowe i częstotliwościowe

| Zabezpieczenie | Symbol | Typowa nastawa | Jak badać |
|---|---|---|---|
| **Podnapięciowe** | U< | 70–85 % napięcia znamionowego, czas 0,5–3 s (dla automatyki SZR krócej) | Obniżaj napięcie trójfazowe; sprawdź blokadę przy „szynach bez napięcia", żeby nie działało przy wyłączonej sekcji |
| **Nadnapięciowe** | U> | 110–120 % napięcia znamionowego | Podnoś napięcie |
| **Od składowej zerowej napięcia** | U₀> | 10–30 % (sieć skompensowana); niżej dla układów czułych | Podaj napięcie w obwód otwartego trójkąta albo wywołaj asymetrię trójfazową |
| **Od niezgodnej kolejności faz / asymetrii napięć** | — | — | Zamień kolejność faz na przyrządzie probierczym |
| **Podczęstotliwościowe** | f< | 47,5–49,5 Hz | Płynna zmiana (rampa) częstotliwości |
| **Nadczęstotliwościowe** | f> | 50,5–52 Hz | jak wyżej |
| **Od szybkości zmian częstotliwości** | df/dt | 0,5–2 Hz/s | Rampa z zadanym nachyleniem |
| **Nadzór obwodów napięciowych** (od zaniku napięcia przekładnika) | — | Logika: składowa zerowa napięcia bez składowej zerowej prądu | **Wyjmij jeden bezpiecznik przekładnika** albo podaj asymetrię napięć bez prądu → musi być alarm **i blokada zabezpieczeń kierunkowych, odległościowych i podnapięciowego** |
| **Kontrola synchronizmu** (zgodności napięć) | — | Różnica napięć ≤ 5–10 %, różnica częstotliwości ≤ 0,1–0,2 Hz, różnica kątów ≤ 10–20° | Dwa źródła napięcia z regulacją kąta i częstotliwości; sprawdź **każdy warunek osobno** oraz tryby zezwolenia przy braku napięcia na jednej stronie |

### A.3 Zabezpieczenia strefowe i różnicowe

| Zabezpieczenie | Jak badać |
|---|---|
| **Różnicowe transformatora** | Sprawdź: dopasowanie przekładni i grupy połączeń, próg rozruchowy, **nachylenie charakterystyki hamowania** (min. dwa punkty na każdym odcinku), **blokadę od drugiej harmonicznej** (prąd włączania) i **od piątej harmonicznej** (przewzbudzenie). Podawaj prąd z obu stron jednocześnie |
| **Różnicowe szyn zbiorczych** | Podaj prąd w każdy zestaw przekładników **osobno** (sprawdzenie biegunowości i przypisania do strefy), potem sumarycznie; sprawdź **strefę kontrolną** i dynamiczne łączenie stref przy zamkniętym sprzęgle |
| **Ziemnozwarciowe stabilizowane** (obejmujące uzwojenie w gwiazdę) | Podaj prąd w przekładnik punktu neutralnego **i** w przekładniki fazowe w przeciwfazie — sprawdzenie stabilności; potem tylko w neutralny — musi zadziałać |
| **Różnicowe silnika / linii** | Jak dla transformatora; dla linii dodatkowo test kanału transmisji i jego opóźnienia |
| **Lokalne rezerwowanie wyłącznika (LRW)** | Wywołaj wyzwolenie i **utrzymaj prąd** → po nastawionym czasie musi wyjść komenda na pole zasilające i sprzęgło + blokada automatyki SZR |
| **Łukoochronne** | Oświetl każdy czujnik osobno (źródło światła) razem z podaniem prądu; zmierz czas wykrycia i całkowity czas wyłączenia |

### A.4 Sygnały z obiektu (nie wymagają podawania prądu)

| Sygnał | Sposób badania |
|---|---|
| **Przekaźnik gazowo-przepływowy (Buchholza)** — gaz (sygnał) / przepływ (wyłączenie) | Zewrzyj odpowiednie zaciski **w skrzynce transformatora**, nie w szafie — wtedy sprawdzasz cały tor |
| **Kontrola poziomu oleju** | jak wyżej |
| **Kontrola temperatury oleju i uzwojeń** (PT100, termistory) | Symulator rezystancji (dekada oporowa) — sprawdzenie progów sygnału i wyłączenia |
| **Zawór nadciśnieniowy** | Zwarcie zacisków |
| **Kontrola ciśnienia (gęstości) SF₆** — dwa progi: sygnał i blokada | Zwarcie zacisków czujnika; sprawdź, że **blokada faktycznie blokuje** operacje łączeniowe |

---

## B. Nastawy — zasady doboru i weryfikacji

### B.1 Warunki, które nastawa musi spełnić jednocześnie
1. **Czułość:** najmniejszy prąd zwarciowy / prąd nastawiony ≥ **1,5** (rezerwowo ≥ 1,2)
2. **Nieczułość na stany normalne:** powyżej prądu obciążenia, prądu rozruchowego silników,
   **prądu włączania transformatora** (udar magnesujący: 6–12 × prąd znamionowy, zanikający
   w 0,1–0,3 s), prądu załączania baterii kondensatorów
3. **Selektywność:** stopień czasowy do zabezpieczenia nadrzędnego i podrzędnego
4. **Wytrzymałość cieplna:** czas wyłączenia krótszy od wytrzymałości zwarciowej kabla
   (warunek `I²t ≤ k²S²`) i uzwojeń transformatora
5. **Ochrona ludzi:** czas wyłączenia zgodny z dopuszczalnym napięciem rażeniowym
   (PN-EN 50522); energia łuku w granicach odporności odzieży ochronnej

### B.2 Stopień czasowy
```
Δt = czas własny wyłącznika + czas powrotu zabezpieczenia
     + błąd pomiaru czasu + margines bezpieczeństwa
Δt ≈ 60 ms + 40 ms + 30 ms + 70 ms ≈ 200 ms   (zabezpieczenia cyfrowe)
```
Dla zabezpieczeń elektromechanicznych przyjmuje się **0,3–0,4 s**.

### B.3 Weryfikacja dokumentacyjna przed badaniem
- karta nastaw **zatwierdzona** (podpis projektanta), zgodna z aktualnym schematem
- **plik nastaw wyeksportowany z zabezpieczenia** i porównany z kartą **linia po linii** —
  to wykrywa więcej błędów niż same próby prądowe
- weryfikacja **przekładni przekładników** wprowadzonych w zabezpieczeniu względem tabliczek
- sprawdzenie wersji oprogramowania i konfiguracji logiki
- **zapis stanu zastanego** przed zmianami i **stanu pozostawionego** po badaniach

---

## C. Metodyka badania — kolejność

### C.1 Piramida badań
```
1. Badania elementów (przekładniki, wyłącznik, cewki, przekaźniki)      ← bez napięcia
2. Kontrola połączeń zacisk–zacisk (żyła po żyle)                       ← bez napięcia
3. Próby zabezpieczeń prądem wtórnym                                    ← bez napięcia SN
4. Próby prądem pierwotnym — przekładnie, biegunowość                   ← bez napięcia SN
5. Próby funkcjonalne sterowania i blokad                               ← bez napięcia SN
6. Próby logiki i komunikacji                                           ← bez napięcia SN
7. Próba zintegrowana na rzeczywistym torze (macierz wyzwalania)        ← bez napięcia SN
8. Próby po podaniu napięcia (stabilność różnicowego, kierunkowość)     ← pod napięciem
```

### C.2 Sprzęt pomiarowy
| Zadanie | Przyrząd |
|---|---|
| Podawanie prądu i napięcia wtórnego (z regulacją kąta i częstotliwości) | zestaw probierczy do zabezpieczeń |
| Podawanie prądu pierwotnego | źródło prądowe 500–2000 A |
| Badanie przekładników prądowych (przekładnia, kąt, charakterystyka magnesowania) | analizator przekładników |
| Rezystancja styków | mikroomomierz 100–600 A |
| Czasy i droga styków wyłącznika | analizator wyłączników |
| Rezystancja izolacji | megomierz 2,5 / 5 kV |
| Próba napięciowa przemienna | zestaw probierczy napięciowy (rezonansowy) |
| Próba kabli SN | zestaw napięcia o bardzo niskiej częstotliwości (0,1 Hz) lub napięcia tłumionego |
| Wyładowania niezupełne | zestaw do pomiaru wyładowań niezupełnych |
| Kontrola termowizyjna | kamera termowizyjna (pod obciążeniem) |

### C.3 Zasada „izoluj, nie rozkręcaj"
- obwody **prądowe** — izoluj bloczkiem probierczym ze **zwieraniem**; nigdy nie rozwieraj
- obwody **napięciowe** — izoluj bloczkiem rozłącznym i **wyjmij bezpieczniki pierwotne
  przekładników napięciowych**
- **wyjścia wyzwalające** — na czas badania progów można je odizolować, ale **próba końcowa
  musi być wykonana na rzeczywistym torze** aż do cewki wyłącznika
- **system nadzoru w trybie próbnym / z zablokowanymi alarmami** — żeby nie generować fałszywych
  zgłoszeń u dyspozytora
- nanoś zmiany na schematach na bieżąco; każda rozbieżność → **lista usterek**

---

## D. Badania elementów pierwotnych

### D.1 Przekładniki prądowe
| Badanie | Metoda | Kryterium (typowe) |
|---|---|---|
| Rezystancja izolacji | 1 kV — uzwojenie wtórne względem ziemi; 5 kV — pierwotne względem wtórnego | > 100 MΩ (wtórne), > 1 GΩ (pierwotne) |
| Ciągłość i rezystancja uzwojenia | mikroomomierz | zgodna z DTR, symetria między fazami |
| **Przekładnia** | prąd pierwotny lub analizator | błąd w granicach klasy |
| **Biegunowość** | metoda impulsowa (bateria + miliwoltomierz) lub analizator | zgodna z oznaczeniem zacisków |
| Charakterystyka magnesowania, napięcie kolanowe, graniczny współczynnik dokładności | analizator przekładników | zgodna z klasą |
| Obciążenie wtórne | pomiar rezystancji pętli | poniżej znamionowej moc pozornej |

**Błędna biegunowość przekładnika prądowego to najczęstsza przyczyna wadliwego działania
zabezpieczeń różnicowych i kierunkowych.** Sprawdzaj ją zawsze, także po każdej ingerencji
w obwody.

### D.2 Przekładniki napięciowe
- rezystancja izolacji, przekładnia, biegunowość, **sprawdzenie uziemienia w jednym punkcie**
- kontrola bezpieczników pierwotnych i zabezpieczeń wtórnych (selektywność, oznaczenie)
- **sprawdzenie obwodu otwartego trójkąta** (składowa zerowa ≈ 0 przy symetrii napięć)
- kontrola **rezystora tłumiącego ferrorezonans** (obecność i wartość)

### D.3 Wyłącznik
| Badanie | Kryterium (typowe — sprawdź DTR) |
|---|---|
| Rezystancja styków głównych | 20–60 µΩ na biegun dla wyłączników próżniowych; różnica między fazami < 20 % |
| Czas zamykania | 40–80 ms |
| Czas otwierania (od komendy do rozejścia styków) | 30–60 ms |
| Całkowity czas przerywania | 50–70 ms |
| Niejednoczesność biegunów | < 2–3 ms |
| Rezystancja cewek załączającej i wyłączającej | zgodna z DTR |
| Najmniejsze napięcie zadziałania cewki wyłączającej | zwykle ≤ 70 % napięcia znamionowego (badanie: obniżaj napięcie) |
| Wytrzymałość próżni komory gaszeniowej | próba napięciowa na otwartych stykach lub przyrząd do badania próżni |
| Szczelność i ciśnienie SF₆ | wg DTR, z uwzględnieniem temperatury |
| Zbrojenie sprężyny, licznik operacji, blokady napędu | działanie poprawne |
| Cykl otwórz–zamknij–otwórz, próba blokady przeciwpompującej | zgodnie z DTR |

### D.4 Szyny, izolacja, kable
- **rezystancja izolacji szyn**: megomierz **5 kV**, faza–ziemia i faza–faza; typowo **> 1 GΩ**
- **próba napięciowa przemienna na obiekcie** — norma dla rozdzielnic powyżej 1 kV zaleca
  **80 % znamionowego napięcia probierczego**:

  | Napięcie znamionowe rozdzielnicy | Znamionowe napięcie probiercze (1 min) | Próba na obiekcie (~80 %) |
  |---|---|---|
  | 12 kV | 28 kV | ok. 22 kV |
  | 17,5 kV | 38 kV | ok. 30 kV |
  | 24 kV | 50 kV | ok. **40 kV** |
  | 36 kV | 70 kV | ok. 56 kV |

- **kable SN**: próba napięciem o bardzo niskiej częstotliwości lub napięciem tłumionym,
  współczynnik strat dielektrycznych, wyładowania niezupełne, ciągłość i zgodność faz,
  rezystancja żyły powrotnej
- **rezystancja połączeń śrubowych** i kontrola **momentów dokręcenia** — z protokołem
- **ciągłość uziemienia** każdego przedziału i konstrukcji: **≤ 0,1 Ω** do głównej szyny uziemiającej

---

## E. Próby prądem wtórnym — jak to robić poprawnie

### E.1 Procedura dla jednej funkcji (przykład: zabezpieczenie nadprądowe zwłoczne)
1. Nastawa z karty: prąd rozruchowy **240 A pierwotnie**, przekładniki 300/5 →
   **4,0 A wtórnie**, charakterystyka zależna, mnożnik czasowy 0,2
2. **Izoluj obwód prądowy** bloczkiem probierczym; podłącz przyrząd do zacisków zabezpieczenia
3. **Próg rozruchowy:** płynnie narastający prąd → odczytaj prąd zadziałania.
   Kryterium: w granicach **±5 %** nastawy (lub wg DTR)
4. **Nieczułość:** 0,95 × nastawy przez podwójny nastawiony czas → **brak zadziałania**
5. **Czasy:** prąd skokowy 2×, 5×, 10× nastawy; porównaj z czasem obliczonym z charakterystyki.
   Kryterium: **±5 % lub ±30 ms**, co jest większe
6. **Powrót:** sprawdź czas i sposób powrotu (natychmiastowy / wg charakterystyki)
7. **Wyjście:** sprawdź, że zadziałanie trafia na właściwy styk i właściwy sygnał do systemu nadzoru
8. Zapisz wyniki w protokole; przywróć bloczek; zapisz stan pozostawiony

### E.2 Zasady odróżniające badanie rzetelne od pozornego
- badaj **każdą fazę osobno** — to wykrywa błąd w jednym torze prądowym
- badaj **zabezpieczenie bezzwłoczne i zwłoczne rozdzielnie** (czasowo blokując drugie),
  potem razem
- **kierunkowość badaj kątowo**, nie tylko amplitudą prądu
- weryfikuj **kierunek przepływu** na wskazaniach wektorowych w zabezpieczeniu, nie tylko
  po samym zadziałaniu
- sprawdź zachowanie przy **zaniku napięcia** (blokada zabezpieczeń kierunkowych) i przy
  **utracie komunikatów międzypolowych**
- dla zabezpieczeń różnicowych **stabilność jest ważniejsza od progu** — badaj prądy
  przechodzące (zwarcie zewnętrzne)

### E.3 Próby prądem pierwotnym — kiedy są niezbędne
- sprawdzenie **przekładni i biegunowości przekładników wraz z całym obwodem** do zabezpieczenia
  (jedyna próba potwierdzająca kompletny tor, w tym pomyłki w skrzynce zaciskowej i w szafie)
- sprawdzenie **przypisania stref** zabezpieczenia różnicowego szyn i granic tych stref
- weryfikacja **przekładników sumujących** i obwodów zabezpieczenia ziemnozwarciowego
- badanie **ciągłości pętli dużym prądem** — wykrywa luźne zaciski, których omomierz nie pokaże

Typowo podaje się **100–1000 A** przez szynę lub kabel, mierząc jednocześnie prąd wtórny
i odczytując wskazanie w zabezpieczeniu. Wymaga zwarcia i uziemienia po drugiej stronie obwodu.

---

## F. Badania po podaniu napięcia (niemożliwe do wykonania wcześniej)

| Badanie | Cel | Metoda |
|---|---|---|
| **Sprawdzenie napięć wtórnych** | poprawność obwodów, przekładni i faz | pomiar 57,7 / 100 V, kolejność faz, składowa zerowa ≈ 0 |
| **Kontrola wektorów w zabezpieczeniu** | zgodność przypisania faz prądu i napięcia | odczyt wskazań wektorowych pod obciążeniem |
| **Stabilność zabezpieczeń różnicowych** | brak prądu różnicowego przy obciążeniu | odczyt prądu różnicowego przy rosnącym obciążeniu — musi być znacznie poniżej progu |
| **Kierunkowość** | poprawność kierunku przy rzeczywistym przepływie | porównanie kierunku mocy ze stanem faktycznym |
| **Weryfikacja kontroli synchronizmu** | zgodność faz między sekcjami | pomiar napięcia różnicowego na **otwartym** sprzęgle ≈ 0 V |
| **Pomiary i układ rozliczeniowy** | poprawność wskazań mocy i energii | porównanie z niezależnym miernikiem |
| **Kontrola termowizyjna** | jakość połączeń | po 1–2 h przy obciążeniu min. 40–60 % |
| **Próba automatyki SZR w warunkach rzeczywistych** | działanie na obiekcie | wg uzgodnionego scenariusza, z odbiorami przygotowanymi na przerwę |

---

## G. Protokół z badań zabezpieczeń — zawartość

- identyfikacja obiektu, pola, zabezpieczenia (typ, numer fabryczny, **wersja oprogramowania**,
  suma kontrolna konfiguracji)
- **przekładnie przekładników** rzeczywiste i wprowadzone w zabezpieczeniu
- **nastawy stanu zastanego** i **stanu pozostawionego** (pełny wydruk)
- użyte przyrządy z numerami i datami wzorcowania
- dla każdej funkcji: nastawa, wartość zmierzona, odchyłka, kryterium, **wynik: spełnia / nie spełnia**
- tabela **czasów** dla co najmniej trzech punktów charakterystyki
- wyniki prób blokad, macierzy wyzwalania, sygnalizacji i przesyłania do systemu nadzoru
- **lista usterek** z klasyfikacją (blokująca / do usunięcia przed odbiorem / drobna)
- wniosek: **czy pole można załączyć**
- podpisy: wykonawca, sprawdzający (dozór), przedstawiciel użytkownika
- data i **termin następnego badania** (typowo 3–6 lat, wg instrukcji eksploatacji obiektu)

---

## H. Najczęstsze błędy wykrywane podczas badań

1. **Odwrotna biegunowość jednego przekładnika prądowego** → zbędne zadziałanie zabezpieczenia
   różnicowego lub błędny kierunek
2. **Zamienione fazy** między obwodem prądowym i napięciowym → zabezpieczenie kierunkowe działa
   w złą stronę
3. **Podwójne uziemienie obwodu wtórnego** przekładnika prądowego lub napięciowego → prądy
   krążące i błędy pomiaru
4. **Brak lub niesprawny bloczek zwierający** w obwodzie prądowym → uszkodzenie przekładnika
   przy pracach
5. **Nastawy w zabezpieczeniu niezgodne z kartą** — najczęściej przekładnia przekładnika
   albo mnożnik czasowy
6. **Brak kontroli ciągłości obwodu wyzwalającego** albo kontrola tylko w jednej pozycji wyłącznika
7. **Blokada logiczna podłączona odwrotnie** (odpływ zamieniony z zasilaniem) → szyny bez ochrony
8. **Przekładniki sprzęgła przypisane do niewłaściwej strefy** zabezpieczenia różnicowego szyn
9. **Przekaźnik blokujący nietrzymający stanu** albo kasowany zdalnie (nie powinien być kasowany
   zdalnie bez oględzin)
10. **Wyzwolenie skierowane do niewłaściwego wyłącznika** — wychwytuje to tylko próba zintegrowana
    na rzeczywistym torze
11. **Automatyka SZR bez blokady od zabezpieczenia różnicowego szyn i łukoochronnego** →
    przełączenie zasilania na zwarcie
12. **Nieprzebadana reakcja na utratę komunikatów międzypolowych** → cicha utrata blokady logicznej

---

## ZAŁĄCZNIK — tabela przeliczeniowa oznaczeń

Numery amerykańskie (ANSI/IEEE) bywają na schematach obcego pochodzenia oraz **w menu
zabezpieczeń cyfrowych** — dlatego warto je rozpoznawać, mimo że w tekście używamy pełnych nazw.

| Pełna nazwa polska | Symbol PL | Numer |
|---|---|---|
| Nadprądowe zwarciowe bezzwłoczne | I≫ | 50 |
| Nadprądowe zwłoczne przeciążeniowe | I> | 51 |
| Ziemnozwarciowe zerowoprądowe (bezzwłoczne / zwłoczne) | I₀> | 50N / 51N |
| Nadprądowe kierunkowe | I> ⟶ | 67 |
| Ziemnozwarciowe kierunkowe | I₀> ⟶ | 67N |
| Nadprądowe z blokadą napięciową | I>/U< | 51V |
| Od asymetrii prądów (składowej przeciwnej) | I₂> | 46 |
| Cieplne (obraz cieplny) | ϑ> | 49 |
| Podprądowe | I< | 37 |
| Od zbyt długiego rozruchu / utyku wirnika | — | 48 / 51LR |
| Od zbyt częstych rozruchów | — | 66 |
| Podnapięciowe | U< | 27 |
| Nadnapięciowe | U> | 59 |
| Od składowej zerowej napięcia | U₀> | 59N / 64 |
| Od niezgodnej kolejności faz | — | 47 |
| Podczęstotliwościowe / nadczęstotliwościowe | f< / f> | 81U / 81O |
| Od szybkości zmian częstotliwości | df/dt | 81R |
| Nadzór obwodów napięciowych | — | 60 / VTS |
| Kontrola synchronizmu | — | 25 |
| Różnicowe (transformatora / szyn / silnika / linii) | ΔI | 87T / 87B / 87M / 87L |
| Ziemnozwarciowe stabilizowane | — | 64REF |
| Lokalne rezerwowanie wyłącznika | LRW | 50BF |
| Przekaźnik blokujący kasowany ręcznie | — | 86 |
| Przekaźnik wyzwalający pośredniczący | — | 94 |
| Samoczynne ponowne załączanie | SPZ | 79 |
| Gazowo-przepływowe (Buchholza) | — | 63 |
| Kontrola poziomu cieczy | — | 71 |
| Kontrola temperatury | ϑ | 26 / 49T |
| Kontrola temperatury łożysk | — | 38 |
| Wyłącznik (aparat) | W | 52 |

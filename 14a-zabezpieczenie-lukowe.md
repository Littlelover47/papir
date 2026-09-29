# 14a. Zabezpieczenie łukowe (łukoochronne) — jak działa i co wyłącza

Rozdział odpowiada na dwa pytania: **jak działa** zabezpieczenie łukowe i **które pola wyłącza**
w zależności od tego, **w którym przedziale której celki** zobaczyło łuk. Najpierw zasada, potem
reguła jednego zdania, tabela „miejsce → wyłączniki”, **symulator** do przeklikania, na końcu
rezerwa wyłącznikowa, próby i odpowiedzi na egzamin.

> **Pamiętaj.** Całą logikę streszcza jedno zdanie:
> **wyłącz wszystkie wyłączniki, przez które łuk może być zasilany — i tylko te.**
> Który to wyłącznik, zależy od tego, **po której stronie wyłącznika pola** pali się łuk.

---

## A. Po co — bo energia łuku rośnie z czasem

Zwarcie łukowe wewnątrz celki to nie tylko prąd zwarciowy. Łuk o temperaturze kilku tysięcy
stopni odparowuje miedź, w ciągu milisekund podnosi ciśnienie w przedziale, wyrzuca gorące gazy
i odpryski. Energia wydzielona w łuku jest w przybliżeniu proporcjonalna do czasu jego trwania:

$$W_{\text{łuku}} \approx U_{\text{łuku}} \cdot I_{\text{łuku}} \cdot t$$

Napięcia łuku ani prądu zwarciowego w czasie zwarcia nie zmienisz. **Zmienić możesz tylko $t$.**
Orientacyjne skutki podawane przez producentów rozdzielnic i zabezpieczeń:

| Czas trwania łuku | Typowe skutki |
|---|---|
| do ok. 35 ms | praktycznie bez uszkodzeń, rozdzielnica wraca do pracy po przeglądzie |
| ok. 100 ms | niewielkie uszkodzenia, czyszczenie i wymiana drobnych elementów |
| ok. 500 ms i dłużej | poważne zniszczenie celki, zagrożenie pożarem i dla ludzi |

Zwykła kaskada czasowa (rozdział 14) wyłącza zwarcie na szynach po **0,8 s** + czas wyłącznika.
ZS skraca to do ok. **120 ms**. Zabezpieczenie łukowe — do ok. **50–60 ms**, z czego prawie
wszystko to własny czas wyłącznika.

> **Uwaga — dwie różne rzeczy.** Klasyfikacja **łuku wewnętrznego IAC** (PN-EN 62271-200,
> np. „IAC AFLR 16 kA 1 s”) to ochrona **bierna**: celka ma wytrzymać łuk i odprowadzić gazy tak,
> żeby nie zranić obsługi. **Zabezpieczenie łukowe** to ochrona **czynna**: skraca czas łuku.
> Jedno nie zastępuje drugiego.

---

## B. Jak działa — dwa warunki naraz

Zabezpieczenie łukowe wyłącza, gdy **jednocześnie** spełnione są dwa kryteria:

1. **Światło** — czujnik optyczny w przedziale celki widzi błysk o natężeniu powyżej progu
   (typowo kilka–kilkanaście tysięcy luksów). Reakcja w ok. 1 ms.
2. **Prąd** — szybki człon nadprądowy widzi prąd zwarciowy (próg zwykle kilka razy powyżej prądu
   znamionowego pola zasilającego, powyżej prądów rozruchowych). Też ok. 1 ms, bez zwłoki czasowej.

```
  czujnik światła w przedziale ──┐
                                 ├── AND ──► komenda WYŁĄCZ (szybkie wyjście) ──► wyłączniki strefy
  człon prądowy I> (bez zwłoki) ─┘
```

Od błysku do komendy mija ok. **2–7 ms** (zależnie od typu wyjścia: półprzewodnikowe jest
szybsze niż przekaźnik). Resztę — ok. **40–60 ms** — zajmuje otwarcie wyłącznika.

**Po co iloczyn, skoro łuk zawsze świeci?** Bo świeci też flesz aparatu, latarka, słońce przez
otwarte drzwi przedziału, łuk spawalniczy w pobliżu. Sam czujnik światła nie odróżni ich od łuku.
Kryterium prądowe mówi: *płynie prąd zwarciowy*. Czujnik światła mówi: *tutaj*. Dopiero oba naraz
dają pewność, że to łuk i gdzie jest.

**Tryb „samo światło”** istnieje, ale jest wyjątkiem — stosuje się go tam, gdzie brak sensownego
kryterium prądowego. Grozi zbędnym wyłączeniem (sprawdź w symulatorze: *sam błysk* + *samo światło*).

### Rodzaje czujników

| Czujnik | Co widzi | Selektywność |
|---|---|---|
| **punktowy** (po jednym w przedziale) | jeden przedział jednej celki | pełna — logika wie, *gdzie* jest łuk, i może wyłączyć tylko to, co trzeba |
| **pętla światłowodowa** (włókno bez osłony prowadzone przez wiele przedziałów) | cały odcinek włókna | słaba — wie tylko, że łuk jest *gdzieś* na pętli; wyłącza się wtedy całą sekcję |

Tabela i symulator poniżej zakładają **czujniki punktowe w każdym przedziale**: to jedyny układ,
w którym „jakie pola wyłącza” w ogóle zależy od miejsca łuku.

> **Ważne — sieć izolowana i kompensowana.** Jednofazowe zwarcie łukowe z ziemią ma tam prąd
> rzędu kilku–kilkudziesięciu amperów. Fazowy człon prądowy go nie zobaczy. Łuk wyłączy się dopiero
> po przejściu w zwarcie międzyfazowe albo gdy kryterium prądowe uzupełni się składową zerową
> (prąd I₀ lub napięcie U₀) — to trzeba sprawdzić w dokumentacji obiektu.

---

## C. Trzy przedziały celki — i dlaczego granica przebiega przez wyłącznik

Typowa celka SN w obudowie metalowej ma trzy przedziały pierwotne (plus przedział obwodów
wtórnych, którego się nie monitoruje):

```
  ┌──────────────────────┐
  │  S — szyny zbiorcze  │   ← wspólne dla całej sekcji
  ├──────────────────────┤
  │  W — wyłącznik/wózek │   ← górne gniazda: strona szyn, dolne: strona kabla
  ├──────────────────────┤
  │  K — przyłącza kabli │   ← przekładniki prądowe, głowice kablowe, uziemnik
  └──────────────────────┘
```

Całe rozumowanie opiera się na jednym pytaniu: **czy łuk jest przed, czy za wyłącznikiem pola
(patrząc od źródła)?**

- **Za wyłącznikiem** (przedział kablowy odpływu) — prąd łuku płynie *przez* wyłącznik tego pola.
  Wystarczy go otworzyć. Reszta rozdzielni pracuje.
- **Przed wyłącznikiem** (szyny, a w praktyce też przedział wyłącznika) — łuk wisi na szynach.
  Własny wyłącznik pola nic nie da. Trzeba odciąć **wszystkie źródła sekcji**: pole zasilające
  i sprzęgło.

**Dlaczego przedział wyłącznika liczy się jako „przed”?** Są w nim górne gniazda wózka, połączone
na stałe z szynami, a łuk w ciągu milisekund obejmuje całą zawartość przedziału. Nie da się
zagwarantować, że pali się tylko po stronie kabla — więc zakłada się przypadek gorszy.

**Odpływ nie jest źródłem.** Przy łuku na szynach wyłączniki odpływów nie dostają komendy
(nie ma po co — nie zasilają łuku). Mimo to tracą napięcie, bo znikają szyny.
Wyjątek: odpływ z generacją rozproszoną lub z możliwym zasilaniem zwrotnym — wtedy traktuje się
go jak źródło.

---

## D. Tabela: gdzie zadziałało → co wyłącza

Rozdzielnica dwusekcyjna: sekcja I z transformatora T1, sekcja II z T2, sprzęgło otwarte
(typowy układ pracy). Pierwszy stopień, bez odmowy wyłącznika.

| Gdzie jest łuk | Komendę wyłączenia dostają | Bez napięcia zostaje |
|---|---|---|
| **odpływ — przedział kablowy (K)** | **tylko wyłącznik tego odpływu** | tylko ten odpływ |
| odpływ — przedział wyłącznika (W) | pole zasilające sekcji + sprzęgło + własny wyłącznik | cała sekcja |
| dowolna celka sekcji — przedział szyn (S) | pole zasilające sekcji + sprzęgło | cała sekcja |
| pole pomiaru napięcia — dowolny przedział | pole zasilające sekcji + sprzęgło | cała sekcja |
| pole potrzeb własnych (rozłącznik z bezpiecznikami) — dowolny przedział | pole zasilające sekcji + sprzęgło | cała sekcja (w tym potrzeby własne) |
| pole zasilające — przedział szyn (S) | pole zasilające + sprzęgło | cała sekcja |
| **pole zasilające — przedział wyłącznika (W)** | pole zasilające + sprzęgło + **wyłącznik 110 kV transformatora** | cała sekcja, transformator odstawiony |
| **pole zasilające — przedział kablowy (K)** | **wyłącznik 110 kV transformatora** + pole zasilające | cała sekcja, transformator odstawiony |
| sprzęgło — przedział szyn (S) | pole zasilające sekcji I + sprzęgło | sekcja I |
| **sprzęgło — przedział wyłącznika (W)** | **oba pola zasilające** + sprzęgło | **cała rozdzielnia** |
| sprzęgło — przedział mostka do sekcji II (K) | pole zasilające sekcji II + sprzęgło | sekcja II |

Trzy wiersze pogrubione to te, o które najczęściej potyka się rozumowanie:

1. **Przedział kablowy pola zasilającego.** Łuk jest między transformatorem a wyłącznikiem pola —
   wyłącznik pola jest „za” łukiem i jego otwarcie łuku nie zgasi. Musi wyłączyć **strona 110 kV**
   transformatora. Komenda idzie tam sygnałem międzypolowym (przewodowo lub po światłowodzie) —
   to połączenie trzeba zaprojektować i sprawdzić razem z właścicielem pola 110 kV.
2. **Przedział wyłącznika pola zasilającego.** Obie strony naraz — więc i 110 kV, i sprzęgło.
3. **Przedział wyłącznika sprzęgła.** Z jednej strony sekcja I, z drugiej sekcja II — wyłączają
   oba pola zasilające.

**Sprzęgło zamknięte, jeden transformator odstawiony.** Logika się nie zmienia — komendy idą do
tych samych wyłączników, część z nich jest po prostu już otwarta. Łuk na szynach sekcji II przerywa
wtedy **sprzęgło** (to przez nie płynie prąd z T1), a sekcja I pracuje dalej. Za to łuk na szynach
sekcji I gasi obie sekcje, bo sekcja II była zasilana przez sekcję I.

---

## E. Symulator — kliknij przedział i zobacz, co wypadnie

Kliknij dowolny przedział (S, W, K) dowolnej celki. Wyłączniki, które dostały komendę, świecą na
różowo i są otwarte. Szare przewody są bez napięcia. Pod rysunkiem: czasy, lista wyłączników
i stan zasilania wszystkich odbiorów.

Warto sprawdzić po kolei:

- **odpływ 1: K, potem W** — kilkadziesiąt centymetrów różnicy, a raz wypada jeden kabel, raz cała sekcja;
- **pole zasilające T1: K** — wyłącza strona 110 kV;
- **sam błysk** przy „światło + prąd”, a potem przy „samo światło”;
- **odmowa wyłącznika** — zadziała lokalna rezerwa wyłącznikowa (punkt F);
- **sprzęgło zamknięte, T2 odstawiony** — szyny sekcji II, a potem szyny sekcji I.

<div class="dg-widget" data-typ="luk-rozdzielnia"></div>

---

## F. Gdy wyłącznik odmówi — lokalna rezerwa wyłącznikowa (LRW)

Zabezpieczenie łukowe wysłało komendę, ale wyłącznik się nie otworzył (zapieczony napęd, brak
napięcia w obwodzie wyłączającym, uszkodzona cewka). Prąd łuku płynie dalej, więc kryterium
prądowe nadal jest spełnione. Po krótkiej zwłoce — typowo **ok. 100 ms** — LRW wysyła komendę
**o jeden stopień w stronę źródła**:

| Odmówił | LRW wyłącza | Skutek |
|---|---|---|
| wyłącznik odpływu (łuk w przedziale kablowym) | pole zasilające sekcji + sprzęgło | zamiast jednego odpływu — cała sekcja |
| wyłącznik pola zasilającego | wyłącznik 110 kV transformatora | sekcja i transformator |
| wyłącznik sprzęgła (sprzęgło zamknięte, jeden transformator) | pole zasilające drugiej sekcji | obie sekcje |
| wyłącznik 110 kV transformatora | LRW stacji 110 kV — pola zasilające szyny 110 kV | poza tą rozdzielnią |

Łuk trwa wtedy ok. **150–170 ms** zamiast ok. 55 ms. Wciąż kilka razy krócej niż bez
zabezpieczenia łukowego — ale tylko wtedy, gdy LRW jest włączona i sprawdzona.

---

## G. Zabezpieczenie łukowe a ZS i różnicowe szyn

| | ZS (blokada logiczna) | Różnicowe szyn | Zabezpieczenie łukowe |
|---|---|---|---|
| Kryterium | prąd w polu zasilającym + brak blokady z odpływów | bilans prądów wszystkich pól | światło w przedziale + prąd |
| Czas do komendy | 40–100 ms | ok. 20–30 ms | 2–7 ms |
| Wskazuje przedział | nie | nie | **tak** (czujniki punktowe) |
| Widzi łuk w przedziale kablowym odpływu | nie — to zwarcie „w odpływie” | nie | **tak** |
| Koszt | prawie zero | wysoki | średni (czujniki + okablowanie) |

Te zabezpieczenia się nie wykluczają. ZS i zabezpieczenie łukowe często pracują równolegle w tej
samej rozdzielnicy: ZS jako szybka ochrona szyn przy zwarciach metalicznych, zabezpieczenie
łukowe przy łuku — najszybciej ze wszystkich.

---

## H. Ruch i prace — co może pójść źle

- **Prace przy otwartych celkach.** Latarki, lampy robocze, słońce. W trybie „światło + prąd”
  bez znaczenia. Jeżeli obiekt ma tryb „samo światło” — instrukcja musi mówić, co przełączyć
  przed otwarciem drzwi.
- **Zasłonięte lub zabrudzone czujniki.** Czujnik bez światła nie zadziała. Nowoczesne
  czujniki mają nadzór ciągłości (alarm po odpięciu), ale nie wykryją zasłonięcia folią czy kurzem.
- **Zła adresacja czujników.** Czujnik z przedziału kablowego odpływu przypisany w logice do
  przedziału szyn da wyłączenie całej sekcji zamiast jednego odpływu. Odwrotnie jest gorzej:
  łuk na szynach wyłączy tylko odpływ, a łuk pali się dalej. **Dlatego każdy czujnik sprawdza
  się osobno błyskiem.**
- **Sygnał międzypolowy do 110 kV.** Najczęściej zaniedbywany. Bez niego łuk w przedziale
  kablowym pola zasilającego gasi dopiero zabezpieczenie transformatora.
- **Odstawienie zabezpieczenia łukowego** to zmiana warunków bezpieczeństwa przy pracach
  w rozdzielnicy pod napięciem — wymaga decyzji i zapisu tak samo jak odstawienie ZS.

---

## I. Próby — minimum do protokołu

1. **Każdy czujnik osobno**: błysk lampą testową lub fleszem → pobudzenie właściwego kanału
   (strefy) w sterowniku. Porównanie z dokumentacją: *przedział — kanał — strefa*.
2. **Iloczyn**: sam błysk bez prądu → **brak** wyłączenia; wymuszenie prądu powyżej nastawy
   (wymuszalnik prądowy) + błysk → wyłączenie.
3. **Macierz wyłączeń**: dla każdej strefy sprawdzić, *które* wyłączniki dostają komendę, i że
   *inne* jej nie dostają (tabela z punktu D). Wyłączniki w pozycji próby albo odizolowane obwody
   wyłączające tam, gdzie wyłączenie groziłoby przerwą w zasilaniu.
4. **Czas**: od błysku do zamknięcia styku wyjściowego (ms) i do otwarcia wyłącznika.
5. **LRW**: symulacja odmowy (wyłącznik nie otwiera się przy obecnym prądzie) → komenda o stopień wyżej
   po nastawionej zwłoce.
6. **Sygnał do 110 kV**: sprawdzenie na rzeczywistym obwodzie, uzgodnione z właścicielem pola 110 kV.
7. **Nadzór**: odpięcie czujnika / światłowodu → alarm.

---

## J. Odpowiedzi na egzamin — po trzy zdania

**Jak działa zabezpieczenie łukowe?**
> Czujniki optyczne w przedziałach celek wykrywają błysk łuku, a szybki człon nadprądowy
> potwierdza, że płynie prąd zwarciowy. Gdy oba warunki są spełnione jednocześnie, zabezpieczenie
> w kilka milisekund wysyła komendę wyłączenia do wyłączników zasilających miejsce łuku. Łuk gaśnie
> po czasie własnym wyłącznika, ok. 50–60 ms, zamiast kilkuset milisekund przy kaskadzie czasowej.

**Po co kryterium prądowe, skoro czujnik widzi łuk?**
> Czujnik światła nie odróżni łuku od flesza, latarki czy słońca przez otwarte drzwi.
> Kryterium prądowe potwierdza, że to zwarcie, a czujnik wskazuje, gdzie ono jest.
> Iloczyn obu warunków chroni przed zbędnymi wyłączeniami.

**Co wyłączy łuk w przedziale kablowym odpływu, a co w jego przedziale wyłącznika?**
> W przedziale kablowym łuk jest za wyłącznikiem odpływu, więc wystarczy wyłączyć tylko ten
> odpływ. W przedziale wyłącznika są gniazda połączone z szynami, więc łuk traktuje się jak łuk
> na szynach: wyłącza pole zasilające sekcji i sprzęgło, a cała sekcja traci napięcie.

**Dlaczego przy łuku w przedziale kablowym pola zasilającego trzeba wyłączyć stronę 110 kV?**
> Bo łuk jest między transformatorem a wyłącznikiem pola zasilającego i zasila go wprost
> transformator. Otwarcie wyłącznika pola odcina tylko szyny, a łuk pali się dalej. Komenda
> musi dotrzeć sygnałem międzypolowym do wyłącznika po stronie 110 kV transformatora.

**Co się dzieje, gdy wyłącznik nie zadziała?**
> Prąd łuku płynie dalej, więc lokalna rezerwa wyłącznikowa po zwłoce ok. 100 ms wysyła
> komendę do wyłączników o stopień bliżej źródła. Łuk trwa wtedy ok. 150–170 ms, a bez napięcia
> zostaje większa część rozdzielni — na przykład cała sekcja zamiast jednego odpływu.

---

## K. Powiązane rozdziały

- [ZS — zabezpieczenie szyn (symulator)](14-blokada-logiczna-ZS-symulator.md) — kaskada czasowa,
  z której wynika problem 0,8 s na szynach
- [Rozdzielnia SN — pola i obwody wtórne](10-rozdzielnia-SN-pola-i-obwody-wtorne.md) — typy pól
  i współpraca między nimi
- [Zabezpieczenia — nastawy i badania](11-zabezpieczenia-nastawy-i-testowanie.md) — pomiar czasów,
  LRW, protokół
- [Podstawy prawne i organizacja pracy](01-podstawy-prawne-i-organizacja-pracy.md) — punkt F:
  ochrona przed skutkami łuku, odzież łukoochronna

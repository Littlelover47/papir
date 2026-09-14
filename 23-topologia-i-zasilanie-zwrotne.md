# 23. Topologia i zasilanie zwrotne

Najprostszy koncepcyjnie temat w całej części III — i ten, który odpowiada za realne wypadki.
Nie wymaga rozumienia dielektryków ani składowych symetrycznych. Wymaga tylko jednego:
**wiedzy, że schemat jednokreskowy nie pokazuje wszystkiego.**

> **Nigdy** nie utożsamiaj „pole wyłączone według schematu" z „w polu nie ma napięcia".
> Siedem z dziewięciu źródeł napięcia w typowym polu rozdzielnicy **nie występuje na schemacie
> jednokreskowym**.

---

## A. Trzy poziomy dokumentacji

| Dokument | Co pokazuje | Do czego służy |
|---|---|---|
| **schemat jednokreskowy** | topologia toru głównego | orientacja, planowanie łączeń |
| **schemat rozwinięty** | obwody wtórne faza po fazie, przekładniki, przekaźniki, listwy, obwody wyłączające | **to jest dokument pomiarowca** |
| **schemat montażowy / kablowy** | fizyczne rozmieszczenie, numeracja listew i żył, trasy | odnalezienie się w celce |

> **Ważne.** Większość niebezpieczeństw z tego rozdziału wynika z jednego faktu: **schemat
> jednokreskowy ich po prostu nie zawiera.** Potrzeby własne, obwody pomocnicze, obwody prądu
> stałego i obwody wtórne przekładników istnieją wyłącznie na schemacie rozwiniętym.

---

## B. Symulator — polowanie na źródła napięcia

Pole jest wyłączone, odłącznik szynowy otwarty, uziemnik załączony. Na schemacie jednokreskowym
wszystko w porządku. Kliknij kolejne punkty i sprawdź, gdzie faktycznie jest napięcie.

<div class="dg-widget" data-typ="zwrotne"></div>

---

## C. Katalog źródeł napięcia w „wyłączonym" polu

| Źródło | Mechanizm | Dlaczego łatwo przeoczyć |
|---|---|---|
| **drugostronne zasilanie pierścienia SN** | pole liniowe zasilane z drugiej stacji | wymaga wiedzy o konfiguracji **całej** sieci, nie tylko tej stacji |
| **sprzęgło szynowe** | szyny sekcji wyłączonej zasilane z sekcji sąsiedniej | sprzęgło jest na schemacie, ale jego **stan** trzeba odczytać z rzeczywistości |
| **transformator potrzeb własnych (TPW)** | bardzo często wpięty **przed** wyłącznikiem, za odłącznikiem szynowym | wyłączenie pola go nie odcina |
| **transformator zasilany od strony nn** | generator, agregat, PV, zasilanie rezerwowe podaje napięcie na stronę SN | nawyk myślowy „transformator zasila w dół" |
| **generacja rozproszona / PV w sieci SN** | falowniki mogą chwilowo zasilać wyspowo przed zadziałaniem zabezpieczenia anti-islanding | zjawisko nowe, często brak w starej dokumentacji stacji |
| **bateria kondensatorów** | magazynuje $\tfrac{1}{2}CU^2$; rozładowanie przez rezystory trwa **minuty** | wygląda jak element martwy — jest naładowana |
| **kabel jako pojemność** | 0,2–0,5 µF/km/fazę, trzyma ładunek po wyłączeniu | „kabel wyłączony" ≠ „kabel rozładowany" |
| **obwody pomocnicze AC 230/400 V** | z rozdzielnicy potrzeb własnych: grzałki, oświetlenie celki, napędy, gniazda serwisowe | całkowicie osobny obwód, poza torem głównym |
| **obwody DC 110/220 V z baterii stacyjnej** | **zawsze obecne**, niezależne od stanu toru głównego: sterowanie, sygnalizacja, obwody wyzwalające | nie da się ich wyłączyć bez pozbawienia stacji sterowania |
| **obwody wtórne przekładników** | rdzeń CT pola pracującego jest pod prądem; VT z innej sekcji podaje napięcie na listwę | listwa wygląda identycznie jak martwa |

### Kabel jako magazyn energii — liczby

Kabel 15 kV, 5 km, 0,3 µF/km/fazę → $C$ = 1,5 µF:

$$E = \tfrac{1}{2} C U_0^2 = \tfrac{1}{2} \cdot 1{,}5 \cdot 10^{-6} \cdot 8700^2 \approx 57\ \text{J}$$

Granica energii uznawanej za bezpieczną przy rozładowaniu przez człowieka to rząd
**pojedynczych dżuli**.

> **Nigdy** nie traktuj rozładowania i uziemienia jako jednej czynności. To dwie różne czynności
> i **obie są konieczne** — patrz [rozdział 22](22-proby-napieciowe-kabli.md).

---

## D. Pięć zasad — i gdzie w nich jest realna trudność

### Zasady

1. **Wyłączyć i zabezpieczyć przed ponownym załączeniem** — widoczna przerwa izolacyjna, blokada
   mechaniczna lub kłódka, zdjęcie napięcia z obwodów napędu, tabliczka ostrzegawcza.
2. **Sprawdzić brak napięcia** — na **wszystkich fazach**, wskaźnikiem odpowiednim do napięcia
   i typu rozdzielnicy, **sprawdzonym przed i po użyciu**.
3. **Uziemić i zwarć** — w miejscu pracy, po sprawdzeniu braku napięcia, przewodami o przekroju
   dobranym do prądu zwarciowego (a przy torach równoległych — także do prądu cyrkulacyjnego,
   → [rozdz. 16](16-napiecia-indukowane.md)).
4. **Odgrodzić lub oznaczyć elementy pod napięciem** — osłony, przegrody, taśmy, tablice.
5. **Oznaczyć strefę pracy** — jednoznacznie, tak by wykonawca wiedział, gdzie jest granica.

### Gdzie jest realna trudność: zasada 2

> **Uwaga.** **Wskaźnik pojemnościowy w rozdzielnicy ekranowanej często nie zadziała.**
> W metalowej, uziemionej celce brakuje drogi powrotnej dla prądu pojemnościowego przez ciało
> operatora, więc wskaźnik pokazuje „brak napięcia" **przy pełnym napięciu**.
> Wskaźnik musi być odpowiedni do konstrukcji rozdzielnicy: kontaktowy, z anteną odniesienia,
> albo wbudowany system z gniazdami pomiarowymi.

> **Ważne.** **Sprawdzenie sprawności wskaźnika przed i po użyciu jest obowiązkowe**, ponieważ
> **uszkodzony wskaźnik pokazuje „brak napięcia" zawsze**. Do tego służy wbudowany tester
> lub zewnętrzne źródło wzorcowe.

**Wbudowane systemy sygnalizacji obecności napięcia (VPIS/VDS)** są wskaźnikami pomocniczymi —
dobre do wstępnej orientacji, ale zwykle **nie zastępują** sprawdzenia braku napięcia zgodnie
z instrukcją obiektową. Trzeba znać zasady dla konkretnej rozdzielnicy.

---

## E. Blokady

| Rodzaj | Zasada działania |
|---|---|
| **mechaniczne** | krzywki, zapadki — uniemożliwiają fizycznie niewłaściwą kolejność |
| **elektromagnetyczne** | zamki zwalniane elektrycznie po spełnieniu warunków logicznych |
| **kluczowe** (klucz przenoszony) | wymuszają kolejność czynności w układzie rozproszonym |

Podstawowa blokada w każdej rozdzielnicy: **uziemnik nie może być załączony, gdy tor jest pod
napięciem** — i odwrotnie.

> **Nigdy** nie obchodź blokady. Jeśli blokada „przeszkadza", to znaczy, że **kolejność czynności
> jest błędna** — nie że blokada jest zła. Obchodzenie blokady jest jednym z najczęstszych
> bezpośrednich mechanizmów wypadku w rozdzielni.

Szerzej o logice blokad: [rozdział 10](10-rozdzielnia-SN-pola-i-obwody-wtorne.md)
oraz [rozdział 13](13-procedura-odstawienia-i-zalaczenia-rozdzielni-SN.md).

---

## F. Odległości — planowanie stanowiska pomiarowego

Wg PN-EN 50110, orientacyjnie:

| $U_n$ | $D_L$ — granica strefy prac pod napięciem | $D_V$ — granica strefy zbliżenia |
|---|---|---|
| 15 kV | 0,12 m | 0,60 m |
| 30 kV | 0,32 m | 0,86 m |
| 110 kV | 1,00 m | 1,50 m |
| 220 kV | 1,60 m | 2,50 m |
| 400 kV | 2,50 m | 3,50 m |

Dla pomiarowca to **liczby operacyjne**, bo dotyczą nie tylko ciała, ale też:

- **przewodów pomiarowych** — kilkumetrowy przewód megaomomierza łatwo trafia w strefę,
- drabin, podnośników, wysięgników,
- **aparatury probierczej** — transformator, dławik, kondensator sprzęgający to obiekty o dużych
  gabarytach, często stawiane pod czynnymi szynami,
- trasy kabli zasilających układ probierczy.

> **Ważne.** Rozłożenie stanowiska pomiarowego w czynnej rozdzielni jest zadaniem **planistycznym**,
> które trzeba wykonać **przed** dopuszczeniem — na schemacie i w terenie. Nie improwizuje się
> przy wnoszeniu sprzętu.

---

## G. Lista kontrolna przed przystąpieniem do pomiarów

- [ ] Mam schemat **rozwinięty**, nie tylko jednokreskowy.
- [ ] Sprawdziłem stan sprzęgła szynowego i konfigurację sąsiednich sekcji.
- [ ] Sprawdziłem, gdzie jest wpięty transformator potrzeb własnych.
- [ ] Sprawdziłem konfigurację pierścienia SN — czy odpływ może być zasilony drugostronnie.
- [ ] Sprawdziłem obecność generacji rozproszonej / PV w tej sieci.
- [ ] Baterie kondensatorów rozładowane i uziemione, z odczekaniem.
- [ ] Kable rozładowane **i** uziemione (dwie osobne czynności).
- [ ] Wiem, które obwody AC 230 V są w tej celce i skąd są zasilane.
- [ ] Wiem, że obwody DC z baterii stacyjnej są pod napięciem i których listew dotyczą.
- [ ] Obwody wtórne przekładników pól pracujących zidentyfikowane i oznaczone.
- [ ] Wskaźnik napięcia **odpowiedni do typu rozdzielnicy**, sprawdzony przed i po.
- [ ] Uziemienie robocze w miejscu pracy, nie tylko uziemnik pola.
- [ ] Stanowisko pomiarowe rozplanowane z uwzględnieniem $D_L$ i $D_V$ dla przewodów i aparatury.

---

## H. Pytania kontrolne

1. Dlaczego schemat jednokreskowy nie wystarcza pomiarowcowi?
2. Pole wyłączone, odłącznik szynowy otwarty. Wymień co najmniej pięć źródeł, z których
   w tym polu może być napięcie.
3. Wskaźnik pojemnościowy w rozdzielnicy ekranowanej pokazuje „brak napięcia". Czy to dowód?
4. Dlaczego sprawdzenie sprawności wskaźnika po użyciu jest równie ważne jak przed?
5. Uziemnik pola jest załączony. Czy to spełnia zasadę 3 z pięciu zasad?
6. Dlaczego odległości $D_L$ i $D_V$ dotyczą także przewodów pomiarowych?

> **Odpowiedź do pytania 5.** Nie w pełni. Zasada 3 wymaga uziemienia **w miejscu pracy**.
> Uziemnik pola uziemia tor w jednym, konkretnym punkcie rozdzielnicy — a przy torach
> równoległych albo długich odcinkach potencjał w miejscu pracy może być wyraźnie różny od zera
> (→ [rozdz. 16](16-napiecia-indukowane.md)). Uziemnik pola jest warunkiem koniecznym,
> ale nie wystarczającym; uziemienie robocze zakłada się dodatkowo w strefie pracy.

---

## I. Zamknięcie części III

Przeszliśmy osiem tematów. Wracając do pytania, od którego rozdział
[15](15-trudne-miejsca-przewodnik.md) się zaczął — **co jest najtrudniejsze?**

Nie miernik. Nie procedura. Najtrudniejsze jest utrzymanie w głowie **jednocześnie** trzech
warstw:

1. **fizyki obiektu** — co się dzieje w izolacji, w rdzeniu, w gruncie,
2. **fizyki sieci** — jak pracuje punkt neutralny, skąd wraca prąd, co indukuje sąsiedni tor,
3. **granic metody pomiarowej** — co ten przyrząd faktycznie mierzy i kiedy kłamie.

Pomiar wykonany bez którejkolwiek z tych warstw daje liczbę. Pomiar z wszystkimi trzema daje
**diagnozę**. I to jest cała różnica.

> **Ważne.** Jeśli miałbyś zapamiętać z tej części jedną rzecz: **przyrząd nigdy nie zgłosi,
> że pomiar był bezsensowny.** Zgłosi tylko awarię własną. Ocena sensowności pomiaru
> jest zawsze twoja.

---

**Poprzedni:** [22. Próby napięciowe kabli](22-proby-napieciowe-kabli.md) ·
**Wróć do:** [15. Trudne miejsca — przewodnik](15-trudne-miejsca-przewodnik.md)

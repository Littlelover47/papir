# 24. Układy sieci i pętla zwarcia

Litery TN, TT, IT umie wymienić każdy przed egzaminem. Komisja pyta o coś innego:
**którędy popłynie prąd, kiedy faza dotknie obudowy** — i dlaczego w jednym układzie
bezpiecznik zadziała w setnych sekundy, a w drugim nie zadziała nigdy.

Cała ochrona przez samoczynne wyłączenie zasilania sprowadza się do jednego zdania:
**prąd zwarciowy musi mieć drogę powrotu o dostatecznie małej impedancji.**
Reszta — litery, tabele, nastawy — to konsekwencje tego zdania.

> **Ważne.** Dwie rzeczy, które trzeba mieć w głowie, patrząc na dowolny schemat:
> **(1)** pętla zwarciowa zawsze *wraca do punktu neutralnego źródła* — nie „do ziemi”,
> nie „do rozdzielnicy”; **(2)** to, czy w pętli jest **metal**, czy **grunt**, zmienia prąd
> zwarciowy o dwa rzędy wielkości i decyduje o wyborze środka ochrony.

---

## A. Czym właściwie jest pętla zwarciowa

Pętla zwarciowa to **zamknięty obwód elektryczny**, jaki powstaje w chwili zwarcia. Zaczyna się
i kończy w uzwojeniu źródła. Dla zwarcia „faza → obudowa” składa się z:

1. uzwojenia transformatora (od punktu neutralnego do zacisku fazowego),
2. przewodu fazowego aż do miejsca zwarcia,
3. samego miejsca zwarcia (rezystancja przejścia — w obliczeniach zwykle pomijana),
4. **drogi powrotnej**: przewodu ochronnego, przewodu PEN albo gruntu z uziomami,
5. powrotu do punktu neutralnego.

$$Z_s = Z_{tr} + Z_{L} + Z_{PE}$$

Prąd, jaki się w niej ustala, i warunek skuteczności ochrony:

$$I_k = \frac{c \cdot U_0}{Z_s} \ge I_a \qquad \Leftrightarrow \qquad Z_s \le \frac{c \cdot U_0}{I_a}$$

gdzie $U_0 = 230$ V, $I_a$ — prąd powodujący zadziałanie zabezpieczenia w wymaganym czasie
(0,4 s albo 5 s w TN), a $c \approx 0{,}95$ — współczynnik napięciowy dla zwarcia minimalnego.

Pełny rachunek liczbowy — [kalkulator w rozdziale 25](25-kalkulator-petli-zwarcia.md).
Wymagane czasy wyłączenia i kryteria — [rozdział 02](02-do-1kV-i-ochrona-przeciwporazeniowa.md).

### Dlaczego to jedno zdanie tłumaczy wszystko

| Jeśli w pętli jest… | to Z_s wynosi… | więc I_k to… | i ochronę daje… |
|---|---|---|---|
| tylko metal (przewód PE / PEN) | 0,1–2 Ω | setki do tysięcy A | zabezpieczenie nadprądowe |
| metal + dwa uziomy i grunt | 10–100 Ω | kilka do kilkunastu A | **wyłącznik różnicowoprądowy** |
| brak drogi powrotu (IT, przerwany PE) | praktycznie ∞ | prąd pojemnościowy albo zero | kontrola izolacji / nic nie zadziała |

To cała tabela układów sieci, tylko powiedziana od strony fizyki.

---

## B. Pięć układów sieci na rysunkach

Na każdym rysunku zaznaczono **drogę prądu zwarciowego** przy zwarciu „faza → obudowa
odbiornika klasy I”. Rysunki są celowo w jednej siatce, żeby różnice były widoczne od razu.

<div class="dg-widget" data-typ="uklady-galeria"></div>

### Jak czytać oznaczenia

| Symbol | Znaczenie |
|---|---|
| **R_B** | uziemienie roboczo-ochronne punktu neutralnego (po stronie stacji) |
| **R_A** | uziom ochronny odbiorcy (jego własny, w układach TT i IT) |
| **PEN** | jeden przewód pełniący funkcję ochronną i neutralną |
| **KSI** | kontrola stanu izolacji (urządzenie monitorujące w układzie IT) |
| **C doziemne** | pojemności doziemne linii — jedyna droga powrotu w IT przy pierwszym zwarciu |

---

## C. Symulator — przełącz układ i zobacz, co się dzieje z prądem

Przesuń długość obwodu i przekrój żyły, przełącz układ sieci, a potem — najciekawsze —
przełącz rodzaj uszkodzenia na **przerwę w PE** i na **drugie zwarcie**.

<div class="dg-widget" data-typ="uklady-sieci"></div>

> **Uwaga.** Symulator liczy z uproszczeniami wypisanymi pod komentarzem (stała impedancja
> źródła, S_PE = S_fazowe, R_B = 10 Ω). Służy do zrozumienia proporcji, nie do projektu.
> Do projektu i do protokołu — kalkulator z rozdziału 25 i dokumentacja obiektu.

---

## D. Układ po układzie

### TN-C — jeden przewód PEN

**Pętla:** faza → obudowa → **PEN** → punkt neutralny. Cała droga metaliczna, więc prąd
zwarciowy duży, a zabezpieczenie nadprądowe działa poprawnie.

Cena tego rozwiązania jest jednak wysoka:

- tym samym przewodem **płynie prąd roboczy**, więc obudowy odbiorników nigdy nie są na czystym
  potencjale ziemi — przy niesymetrii obciążenia pojawia się na nich napięcie;
- **nie wolno stosować wyłączników różnicowoprądowych** — przekładnik Ferrantiego zsumowałby prąd
  roboczy wracający przez PEN i wyzwalał bez powodu;
- **przerwanie PEN jest katastrofą**: obudowy zostają podciągnięte przez uzwojenia odbiorników
  do potencjału fazowego, a żadne zabezpieczenie tego nie zgłosi;
- dlatego PEN ma wymagany **zwiększony przekrój: ≥ 10 mm² Cu (16 mm² Al)** oraz **powtarzalne
  uziemienia** na trasie.

W nowych instalacjach wewnętrznych **nie stosuje się TN-C**. Spotkasz go w starym budownictwie
i w liniach napowietrznych nn.

### TN-S — N i PE rozdzielone od źródła

**Pętla:** faza → obudowa → **PE** → punkt neutralny.

Przewodem PE **normalnie nie płynie żaden prąd**. Konsekwencje są wyłącznie dobre: obudowa siedzi
na potencjale ziemi, wyłączniki różnicowoprądowe pracują poprawnie, a pomiar pętli daje wynik
powtarzalny. Układ stosowany tam, gdzie źródło jest własne — np. **instalacja nn we własnej
stacji SN/nn**, potrzeby własne, obiekty przemysłowe.

### TN-C-S — najczęstszy układ w Polsce

**Pętla:** faza → obudowa → PE → **punkt rozdziału** → PEN → punkt neutralny.

Od stacji do złącza/rozdzielnicy głównej biegnie PEN, dalej — osobne N i PE. Punkt rozdziału
powinien być uziemiony.

> **Nigdy** nie łącz N z PE **za** punktem rozdziału. Każde takie połączenie wpuszcza prąd roboczy
> w przewód ochronny: obudowy dostają napięcie, wyłączniki różnicowoprądowe zaczynają wyzwalać
> „bez powodu” (albo — co groźniejsze — przestają widzieć część prądu upływu), a pomiar pętli
> daje wyniki, których nie da się powtórzyć. To jeden z najczęstszych błędów wykonawczych.

### TT — pętla przez grunt

**Pętla:** faza → obudowa → **R_A → grunt → R_B** → punkt neutralny.

Tu zmienia się wszystko, bo w pętli nie ma metalu — są dwa uziomy w szeregu. Typowo
$R_A + R_B$ to kilkadziesiąt omów, więc:

$$I_k = \frac{230}{0{,}4 + 30 + 10} \approx 5{,}7 \text{ A}$$

To **mniej niż prąd roboczy** typowego obwodu. Żaden bezpiecznik ani wyłącznik nadprądowy tego
nie wyłączy. Dlatego w TT:

- ochronę realizuje praktycznie zawsze **wyłącznik różnicowoprądowy**,
- kryterium jest inne: $R_A \le U_L / I_{\Delta n}$ (dla 30 mA i 50 V → 1667 Ω — formalnie bardzo
  luźno, patrz [rozdział 26](26-normy-rezystancje-uziemienia-i-okablowanie.md)),
- **uziom, a nie zabezpieczenie, jest elementem krytycznym** — i to on zmienia rezystancję
  w mrozie i w suszy.

TT spotkasz przy zasilaniu odbiorców z linii napowietrznych, w gospodarstwach rolnych,
w obiektach zasilanych kablem bez przewodu ochronnego od strony dostawcy.

### IT — punkt neutralny izolowany

**Pierwsze zwarcie nie domyka pętli.** Punkt neutralny nie jest połączony z ziemią (albo tylko
przez dużą impedancję), więc prąd wraca wyłącznie **pojemnościami doziemnymi linii** — rzędu
pojedynczych amperów.

Skutki:

- zabezpieczenie nadprądowe milczy i **norma nie wymaga wyłączenia** przy pierwszym zwarciu;
- wymaga natomiast **wykrycia i zgłoszenia** — obowiązkowa **kontrola stanu izolacji**;
- napięcia faz zdrowych względem ziemi rosną do wartości międzyfazowej ($\sqrt{3}\times$),
  czyli izolacja pracuje pod większym naprężeniem;
- **groźne jest drugie zwarcie** — dopiero ono zamyka pętlę (praktycznie jak zwarcie
  międzyfazowe) i wymusza wyłączenie, czyli dokładnie to, czego w IT chcieliśmy uniknąć.

Cała wartość układu IT polega więc na tym, żeby **usunąć pierwsze doziemienie, zanim pojawi się
drugie**. Stosowany tam, gdzie przerwa jest niedopuszczalna: sale operacyjne, procesy ciągłe,
**obwody pomocnicze i potrzeby własne stacji** (obwody DC i AC sterowania).

Zauważ analogię: to ta sama filozofia, co **sieć SN z izolowanym punktem neutralnym** —
zwarcie doziemne nie wyłącza, tylko sygnalizuje. Zob. [rozdział 17](17-punkt-neutralny-sieci-SN.md).

---

## E. Co realnie psuje pętlę w terenie

| Usterka | Objaw pomiarowy | Dlaczego groźna |
|---|---|---|
| **Przerwa w PE / PEN** | brak wyniku pomiaru pętli albo wynik absurdalnie duży | napięcie na obudowie zostaje, prąd nie płynie, więc **nic nie zadziała** — także różnicówka |
| **N połączone z PE za punktem rozdziału** | różnicówka wyzwala „bez powodu”, wyniki niepowtarzalne | prąd roboczy w przewodzie ochronnym |
| **PE o mniejszym przekroju niż projekt** | Z_s większa od obliczonej | pętla nie spełnia warunku, choć „wszystko jest podłączone” |
| **Poluzowany zacisk ochronny** | rezystancja ciągłości rośnie, wynik zmienny przy poruszeniu | pętla „działa” do pierwszej wibracji |
| **Uziom wysuszony / zamarznięty (TT)** | R_A rośnie wielokrotnie | ochrona zależna od pogody |
| **Zbyt długi obwód** | Z_s > Z_dop, ale ciągłość PE poprawna | wyłączenie tylko członem termicznym, w sekundach |

> **Ważne.** Dlatego norma PN-HD 60364-6 ustala **kolejność pomiarów**: najpierw ciągłość
> przewodów ochronnych, potem rezystancja izolacji, a **pętla zwarciowa dopiero później**.
> Pomiar pętli w obwodzie z przerwanym PE nie powie, co jest nie tak — po prostu nie da wyniku.

---

## F. Pytania, które padają na egzaminie

**Którędy zamyka się pętla zwarciowa w układzie TN-S?**
Faza → miejsce zwarcia → obudowa → przewód PE → punkt neutralny transformatora → uzwojenie.
Grunt nie bierze w niej udziału.

**Dlaczego w TT nie wystarczy bezpiecznik?**
Bo w pętli są dwa uziomy w szeregu — impedancja rzędu dziesiątek omów daje prąd zwarciowy
kilku amperów, mniejszy od prądu roboczego. Warunek $Z_s \le U_0/I_a$ jest niemożliwy
do spełnienia, więc stosuje się wyłącznik różnicowoprądowy z kryterium $R_A \le U_L/I_{\Delta n}$.

**Czy w TN-C można zastosować wyłącznik różnicowoprądowy?**
Nie. Przez PEN wraca prąd roboczy, który przechodziłby przez przekładnik sumujący
i powodował wyzwalanie. Różnicówkę można stosować **dopiero za punktem rozdziału** PEN na N i PE.

**Co się dzieje przy pierwszym zwarciu doziemnym w IT?**
Prąd jest znikomy (pojemnościowy), wyłączenie nie jest wymagane, wymagane jest wykrycie
i zgłoszenie przez kontrolę stanu izolacji. Trzeba usunąć zwarcie, bo drugie zwarcie
tworzy już pełną pętlę i wymusi wyłączenie.

**Dlaczego przekrój PEN musi być większy niż PE?**
Bo PEN prowadzi prąd roboczy, a jego przerwanie oznacza jednoczesną utratę przewodu neutralnego
i ochronnego — z podaniem potencjału fazowego na obudowy. Minimum: 10 mm² Cu / 16 mm² Al.

**Co zwiększa impedancję pętli najbardziej?**
Długość obwodu i mały przekrój **przewodu ochronnego** — bo w pętli L–PE liczą się oba przewody:
$R = \rho L (1/S_L + 1/S_{PE})$. W TT dominują natomiast uziomy, a przewody są nieistotne.

---

## Zastrzeżenie

> **Ważne.** Rysunki są uproszczone do jednego odbiornika i pomijają m.in. połączenia
> wyrównawcze główne, ograniczniki przepięć i uziemienia powtarzalne PEN. Wymagania liczbowe
> sprawdzaj w aktualnych wydaniach PN-HD 60364-4-41, -5-54 i -6 oraz w dokumentacji obiektu.

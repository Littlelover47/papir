# 30. Kalkulator portfela ETF

Dodatek poza materiałem egzaminacyjnym. Problem jest prosty do postawienia i nieprzyjemny
do policzenia w głowie: masz **jedną wpłatę w złotych**, plan w procentach (np. 70 / 20 / 10)
i ETF-y notowane **w euro, w całych sztukach**, z **prowizją minimalną od każdego zlecenia**.
Procenty nigdy nie wychodzą równo.

Kalkulator odpowiada na jedno pytanie: **ile sztuk czego kupić dziś**, żeby portfel wypadł
jak najbliżej wag docelowych i żeby całość zmieściła się w kwocie razem z prowizjami.

---

## A. Kalkulator

<div class="dg-widget" data-typ="portfel-etf"></div>

### Jak korzystać

1. **Wpłata i koszty** — kwota w złotych, kurs EUR/PLN i narzut brokera na przewalutowanie.
   Narzut to różnica między kursem rynkowym a tym, po którym broker faktycznie przeliczy
   transakcję; 0,3–0,5 % to typowy rząd wielkości, ale sprawdź go w swojej tabeli opłat.
   Dalej prowizja procentowa i **prowizja minimalna** — ta druga decyduje o tym, czy warto
   w ogóle składać małe zlecenie.
2. **Pozycje** — dla każdej: kurs z **oferty sprzedaży** (to po niej kupujesz, nie po ostatniej
   transakcji), waga docelowa i liczba sztuk, które **już masz** na rachunku. Nazwy pozycji są
   stałe — traktuj je jak szufladki i pamiętaj, co gdzie wpisałeś.
3. **Wagi** nie muszą sumować się do 100 — kalkulator przeliczy je proporcjonalnie i o tym
   napisze. Waga 0 wyłącza pozycję zupełnie.
4. **„Pomiń w tej wpłacie”** — pozycja nie jest kupowana, ale jej waga docelowa nadal liczy się
   do udziałów. Tak sprawdzisz wariant „małą pozycję kupuję co drugą wpłatę, żeby nie płacić
   trzeciej prowizji minimalnej”.
5. Pole **„już posiadam”** zamienia kalkulator w narzędzie do **dopłat**: przy kolejnej wpłacie
   wpisujesz stan rachunku, a plan sam dosypie tam, gdzie portfel odjechał od wag.

---

## B. Skąd biorą się liczby

### Kurs efektywny i budżet

$$k_{ef} = k_{rynkowy} \cdot \left(1 + \frac{narzut}{100}\right),
\qquad B_{EUR} = \frac{W_{PLN}}{k_{ef}}$$

Narzut na przewalutowanie to koszt, którego nie widać na potwierdzeniu jako osobna pozycja —
jest wbudowany w kurs. Przy 0,5 % od 8 500 zł to ponad 40 zł, czyli więcej niż dwie prowizje
minimalne. Dlatego liczy się od razu w kursie, a nie „gdzieś obok”.

### Prowizja

$$prow_i = \max\left(prow_{min},\ \frac{p\ [\%]}{100} \cdot W_i\right)$$

liczona **osobno dla każdego zlecenia**. Warunek, który musi spełnić cały plan:

$$\sum_i W_i + \sum_i prow_i \le W_{PLN}$$

Konsekwencja jest praktyczna i nieoczywista: **każda dodatkowa pozycja to dodatkowa prowizja
minimalna**. Przy trzech ETF-ach i prowizji minimalnej 19 zł płacisz 57 zł niezależnie od tego,
czy wpłacasz 8 500 zł (0,67 %), czy 1 500 zł (3,8 %). Kalkulator pokazuje ten udział w kafelku
„Prowizje” i ostrzega, jeśli w którymś zleceniu prowizja minimalna zjada ponad 1 % wartości.

### Całe sztuki

Tu nie ma wzoru zamkniętego — sztuki są niepodzielne, więc zadanie jest **całkowitoliczbowe**.
Kalkulator dokłada **po jednej sztuce** tej pozycji, która najbardziej zbliża cały portfel
do wag docelowych, i powtarza to, dopóki kolejna sztuka mieści się w budżecie razem z prowizją.
Miarą dopasowania jest suma kwadratów odchyłek udziałów od wag.

> **Ważne, bo zmienia interpretację wyniku.** Kalkulator **wykorzystuje budżet**, a dopasowanie
> wag optymalizuje w jego granicach. To nie to samo co „najlepsze dopasowanie w ogóle”:
> zostawiając część gotówki bezczynnie, zwykle da się trafić w wagi dokładniej. Jeśli wolisz
> taki wariant, zmniejszaj pole wpłaty i patrz, jak spada odchyłka — przy 8 500 zł i wagach
> 70 / 20 / 10 dopasowanie jest najlepsze dla około 7 500 zł, ale 1 000 zł zostaje wtedy
> na rachunku.

---

## C. Czego kalkulator nie robi

| Nie robi tego | Dlaczego to ważne |
|---|---|
| Nie sprawdza, czy podział ma sens | 70 / 20 / 10 to Twoja decyzja, nie wynik obliczeń |
| Nie zna spreadu ani płynności | wpisujesz kurs z arkusza; przy cienkim arkuszu realizacja może być gorsza |
| Nie liczy podatku | na rachunku IKE/IKZE nie ma podatku od zysku, na zwykłym jest |
| Nie sprzedaje | przy dopłatach wyrównuje wagi **tylko nowymi pieniędzmi** |
| Nie pilnuje limitu wpłat | roczne limity IKE/IKZE sprawdź w tabeli na dany rok |
| Nie zna opłat za prowadzenie rachunku ani opłat funduszu (TER) | to koszty roczne, nie transakcyjne |

Odchyłki: **do ~1,5 pp** to szum zaokrągleń (zielone), **do ~4 pp** — do wyrównania przy
kolejnej wpłacie (żółte), **powyżej** — warto zmienić plan zakupu (czerwone).

---

## D. Praktyka składania zleceń

1. **Zlecenie z limitem**, nie PKC — szczególnie na pozycjach o cienkim arkuszu. Limit ustaw
   na poziomie oferty sprzedaży albo groszowo wyżej.
2. **Broker blokuje środki po limicie**, nie po ostatnim kursie. Jeśli podnosisz limit,
   sprawdź, czy suma nadal mieści się we wpłacie — kalkulator pokazuje resztę.
3. **Godziny** — ETF-y z ekspozycją na USA mają najwęższe spready, gdy handluje rynek bazowy,
   czyli po 15:30. Kursy z wieczora, po zamknięciu Xetry, są tylko orientacyjne.
4. **Przed zleceniem przelicz plan na aktualnych kursach.** Plan jest wyliczony dokładnie
   dla wpisanych liczb; zmiana kursu o 1 % potrafi zmienić liczbę sztuk.
5. **Sprawdź, czy rachunek rozlicza zagranicę z PLN automatycznie**, czy trzeba najpierw
   przewalutować. To zmienia dostępny budżet o kilkadziesiąt złotych i moment, w którym
   „łapiesz” kurs.

> **Ważne.** To arytmetyka zleceń, nie rekomendacja inwestycyjna. Kalkulator nie ocenia doboru
> instrumentów ani wag — liczy tylko to, co wynika z kursu waluty, prowizji i niepodzielności
> sztuk.

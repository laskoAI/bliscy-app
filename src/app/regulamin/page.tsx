import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Regulamin | bliscy",
  description: "Regulamin serwisu bliscy — zasady zostawiania zgłoszenia i kontaktu telefonicznego.",
};

export default function RegulaminPage() {
  return (
    <LegalLayout title="Regulamin" version="30 lipca 2026 r.">
      <p>
        Ten regulamin opisuje, co dokładnie dzieje się, gdy zostawiasz nam swój numer telefonu na
        stronie <strong>bliscy</strong>, i czego możesz od nas oczekiwać. Jest krótki, bo usługa na tym
        etapie jest prosta.
      </p>

      <h2>1. Kim jesteśmy</h2>
      <p>
        Serwis bliscy prowadzą wspólnie <strong>Norbert Laskowski</strong> i{" "}
        <strong>Mikołaj Komorek</strong>, osoby fizyczne, w Warszawie. Kontakt:{" "}
        <a href="mailto:bliscykontakt@gmail.com">bliscykontakt@gmail.com</a>.
      </p>
      <p>
        Mówimy to wprost już na stronie głównej i powtarzamy tutaj: jesteśmy na początku drogi. Nie
        działamy jeszcze na dużą skalę i celem tego etapu jest rozmowa z pierwszymi rodzinami, żeby
        zrozumieć, czego naprawdę potrzebują.
      </p>

      <h2>2. Czym jest usługa opisana w tym regulaminie</h2>
      <p>Usługa polega na tym, że:</p>
      <ul>
        <li>wypełniasz na stronie krótki formularz i zostawiasz imię oraz numer telefonu,</li>
        <li>my dzwonimy do Ciebie, zwykle w ciągu 2 dni roboczych, i rozmawiamy o sytuacji Twojego bliskiego,</li>
        <li>w rozmowie mówimy szczerze, czy dziś jesteśmy w stanie pomóc, na jakich warunkach i ile mogłoby to kosztować,</li>
        <li>jeśli obie strony będą chciały, proponujemy konkretną osobę i umawiamy pierwsze spotkanie.</li>
      </ul>
      <p>To wszystko. Nic więcej się nie dzieje bez Twojej wiedzy.</p>

      <h2>3. Czym ta usługa nie jest</h2>
      <p>To ważniejsze niż punkt powyżej, więc mówimy wyraźnie:</p>
      <ul>
        <li>
          <strong>Wypełnienie formularza nie jest zawarciem żadnej umowy.</strong> Nie zamawiasz
          usługi, nie rezerwujesz terminu i do niczego się nie zobowiązujesz. Zapraszasz nas jedynie
          do rozmowy telefonicznej.
        </li>
        <li>
          <strong>Nie świadczymy usług medycznych ani pielęgniarskich.</strong> Osoby, które
          współpracują z nami jako Bliscy, nie podają leków, nie wykonują zabiegów, nie zmieniają
          opatrunków i nie zastępują pielęgniarki, opiekuna medycznego ani fizjoterapeuty w
          rozumieniu przepisów o wykonywaniu zawodów medycznych.
        </li>
        <li>
          <strong>Nie zapewniamy opieki całodobowej</strong> ani opieki nad osobami wymagającymi
          stałego nadzoru, w tym osobami leżącymi lub z zaawansowaną demencją.
        </li>
        <li>Nie jesteśmy podmiotem leczniczym ani agencją pracy tymczasowej.</li>
        <li>
          Nie prowadzimy jeszcze bazy osób do samodzielnego przeglądania. Dobór odbywa się przez
          rozmowę z nami.
        </li>
      </ul>
      <p>
        Jeśli sytuacja Twojego bliskiego wymaga opieki medycznej, poinformujemy Cię o tym w rozmowie
        i nie będziemy udawać, że możemy pomóc.
      </p>

      <h2>4. Kto może zostawić zgłoszenie</h2>
      <p>
        Zgłoszenie może zostawić osoba, która ma pełną zdolność do czynności prawnych, czyli w
        praktyce osoba pełnoletnia. Jeśli szukasz pomocy dla kogoś innego, powinieneś być z tą osobą
        w takiej relacji, która uzasadnia kontakt w jej sprawie — najczęściej jesteś jej dzieckiem,
        wnukiem lub inną bliską osobą.
      </p>
      <p>
        Na tym etapie działamy w <strong>Warszawie i okolicach</strong>. Zgłoszenie z innego miasta
        możesz zostawić i jest to sensowne, bo pokazuje nam, gdzie jest zapotrzebowanie — ale nie
        zadzwonimy z propozycją, której nie umiemy zrealizować. Powiemy wprost, że jeszcze tam nie
        działamy.
      </p>

      <h2>5. Ile to kosztuje</h2>
      <p>
        Zostawienie zgłoszenia, rozmowa telefoniczna i dobranie osoby są{" "}
        <strong>bezpłatne</strong>. Nie pobieramy żadnych opłat przez tę stronę i nie prosimy o dane
        karty ani przelewu. Jeśli po rozmowie zdecydujecie się na współpracę, warunki finansowe
        ustalimy osobno, w sposób jasny i przed pierwszym spotkaniem.
      </p>

      <h2>6. Zgoda na kontakt telefoniczny</h2>
      <p>
        Zostawiając numer telefonu i wysyłając formularz, prosisz nas o telefon i zgadzasz się na
        kontakt telefoniczny w sprawie swojego zgłoszenia. Ta zgoda dotyczy wyłącznie rozmowy o
        Twoim zapytaniu. Nie będziemy dzwonić z ofertami niezwiązanymi z tym zgłoszeniem, nie
        przekażemy Twojego numeru nikomu do celów marketingowych i nie zapiszemy Cię na newsletter.
      </p>
      <p>
        W każdej chwili możesz wycofać tę zgodę — wystarczy powiedzieć to w rozmowie albo napisać na{" "}
        <a href="mailto:bliscykontakt@gmail.com">bliscykontakt@gmail.com</a>. Wtedy przestajemy
        dzwonić i usuwamy numer.
      </p>
      <p>
        Jeśli nie odbierzesz, próbujemy maksymalnie trzy razy w ciągu dwóch tygodni. Potem uznajemy,
        że temat jest nieaktualny, i usuwamy Twoje dane.
      </p>

      <h2>7. Za co odpowiadasz Ty</h2>
      <ul>
        <li>Podaj prawdziwy numer telefonu i prawdziwe imię. Bez tego nie zadzwonimy.</li>
        <li>
          Nie podawaj w formularzu danych identyfikujących osobę, dla której szukasz pomocy — nie
          potrzebujemy jej imienia, nazwiska ani adresu na tym etapie.
        </li>
        <li>
          Nie wpisuj informacji o stanie zdrowia, diagnozach ani lekach. Formularz nie jest miejscem
          na takie dane, a my ich tam nie chcemy. O zdrowiu porozmawiamy przez telefon, tylko w
          zakresie naprawdę potrzebnym.
        </li>
        <li>Nie wysyłaj treści bezprawnych, obraźliwych ani nie wypełniaj formularza automatycznie.</li>
      </ul>

      <h2>8. Wymagania techniczne</h2>
      <p>
        Do korzystania ze strony wystarczy urządzenie z dostępem do internetu i aktualną
        przeglądarką z włączoną obsługą JavaScript. Nie musisz nic instalować ani zakładać konta.
      </p>

      <h2>9. Za co odpowiadamy my</h2>
      <p>
        Dokładamy starań, żeby strona działała i żeby zadzwonić w podanym terminie. Nie możemy jednak
        zagwarantować, że dla każdego zgłoszenia znajdziemy odpowiednią osobę — jesteśmy na początku i
        czasem po prostu nie będziemy mieć kogo zaproponować. W takiej sytuacji powiemy to otwarcie i
        nie będziemy Cię zwodzić.
      </p>
      <p>
        Nie ponosimy odpowiedzialności za przerwy w działaniu strony wynikające z przyczyn od nas
        niezależnych, w tym z awarii u dostawcy hostingu, ani za skutki podania przez Ciebie
        nieprawdziwych danych.
      </p>
      <p>
        Powyższe ograniczenia nie wyłączają ani nie ograniczają odpowiedzialności w zakresie, w
        jakim przepisy prawa tego nie dopuszczają, w szczególności wobec konsumentów.
      </p>

      <h2>10. Reklamacje</h2>
      <p>
        Jeśli coś poszło nie tak — nie zadzwoniliśmy, zachowaliśmy się nieprofesjonalnie, coś Cię
        zaniepokoiło — napisz na{" "}
        <a href="mailto:bliscykontakt@gmail.com">bliscykontakt@gmail.com</a>. Opisz, co się stało i
        czego oczekujesz. Odpowiadamy w ciągu 14 dni. Jeśli reklamacja dotyczy zachowania konkretnej
        osoby, sprawdzimy sprawę i poinformujemy Cię o wyniku.
      </p>
      <p>
        Jeśli jesteś konsumentem i nie zgadzasz się z naszym stanowiskiem, możesz skorzystać z
        pozasądowych sposobów rozpatrywania reklamacji, w tym mediacji przy wojewódzkich
        inspektoratach Inspekcji Handlowej oraz pomocy miejskiego lub powiatowego rzecznika
        konsumentów. Informacje o tych możliwościach dostępne są na stronach Urzędu Ochrony
        Konkurencji i Konsumentów.
      </p>

      <h2>11. Rezygnacja i usunięcie danych</h2>
      <p>
        Możesz zrezygnować w każdej chwili, bez podawania powodu i bez żadnych konsekwencji, także w
        trakcie rozmowy telefonicznej. Wystarczy jedno zdanie na{" "}
        <a href="mailto:bliscykontakt@gmail.com">bliscykontakt@gmail.com</a>, żebyśmy usunęli
        wszystkie Twoje dane. Szczegóły opisuje <a href="/polityka-prywatnosci">polityka prywatności</a>.
      </p>

      <h2>12. Dane osobowe</h2>
      <p>
        Zasady przetwarzania danych opisuje osobny dokument:{" "}
        <a href="/polityka-prywatnosci">polityka prywatności</a>. Znajdziesz w niej między innymi
        to, jak długo trzymamy Twój numer, komu go powierzamy i jakie masz prawa.
      </p>

      <h2>13. Zmiany regulaminu</h2>
      <p>
        Możemy zmienić ten regulamin, jeśli zmieni się sposób działania usługi albo przepisy.
        Aktualna wersja jest zawsze dostępna na tej stronie, z datą na górze. Zmiana nie wpływa na
        zgłoszenia wysłane przed jej wejściem w życie.
      </p>

      <h2>14. Prawo właściwe</h2>
      <p>
        W sprawach nieuregulowanych tym regulaminem stosuje się prawo polskie, w szczególności
        Kodeks cywilny, ustawę o świadczeniu usług drogą elektroniczną oraz ustawę o prawach
        konsumenta. Regulamin nie ogranicza praw, które przysługują konsumentom z mocy prawa.
      </p>
    </LegalLayout>
  );
}

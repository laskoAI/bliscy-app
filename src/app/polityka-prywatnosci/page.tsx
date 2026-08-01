import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Polityka prywatności | bliscy",
  description: "Polityka prywatności — jak przetwarzamy Twoje dane osobowe w serwisie bliscy.",
};

export default function PolitykaPage() {
  return (
    <LegalLayout title="Polityka prywatności" version="30 lipca 2026 r.">
      <p>
        Zostawiasz nam swój numer telefonu, więc należy Ci się jasna informacja, co z nim robimy.
        Poniżej opisujemy to bez prawniczej mowy, ale kompletnie. Jeśli po przeczytaniu coś będzie
        niejasne, napisz na{" "}
        <a href="mailto:bliscykontakt@gmail.com">bliscykontakt@gmail.com</a> — odpowiemy.
      </p>

      <h2>1. Kto odpowiada za Twoje dane</h2>
      <p>
        Współadministratorami Twoich danych są <strong>Norbert Laskowski</strong> i{" "}
        <strong>Mikołaj Komorek</strong>, osoby fizyczne prowadzące wspólnie projekt bliscy w
        Warszawie.
      </p>
      <p>
        Adres do korespondencji: ul. Chmielna 2 lok. 31, 00-020 Warszawa.
      </p>
      <p>
        Kontakt elektroniczny:{" "}
        <a href="mailto:bliscykontakt@gmail.com">bliscykontakt@gmail.com</a>
      </p>
      <p>
        Nie mamy wyznaczonego inspektora ochrony danych. Wszystkie zgłoszenia trafiają bezpośrednio
        do nas dwóch i tylko my mamy do nich dostęp.
      </p>

      <h2>2. Jakie dane zbieramy</h2>
      <p>Dane, które podajesz w formularzu:</p>
      <ul>
        <li>Twoje imię,</li>
        <li>Twój numer telefonu,</li>
        <li>miasto lub dzielnicę, jeśli je podasz (pole nieobowiązkowe),</li>
        <li>preferowaną porę kontaktu telefonicznego,</li>
        <li>
          informację o tym, kogo dotyczy zapytanie (mama, tata, babcia, dziadek, ktoś inny bliski
          lub Ty sam), przedział wieku tej osoby oraz to, czy mieszka sama,
        </li>
        <li>rodzaj potrzebnego wsparcia, który wybierasz z gotowej listy,</li>
        <li>treść, którą wpiszesz w nieobowiązkowe pole opisowe.</li>
      </ul>

      <p>
        <strong>Dane osoby, dla której szukasz pomocy.</strong> Formularz celowo nie pyta o imię,
        nazwisko ani adres Twojego bliskiego. Zbieramy o nim wyłącznie przedział wieku, sposób
        zamieszkania i rodzaj potrzebnego wsparcia, bo tyle wystarczy nam do pierwszej rozmowy.
        Prosimy Cię, żebyś w polu opisowym nie podawał danych identyfikujących tę osobę ani
        informacji o jej stanie zdrowia, diagnozach czy przyjmowanych lekach. Jeśli mimo tego takie
        informacje się tam pojawią, usuwamy je z naszych zapisów niezwłocznie po rozmowie
        telefonicznej.
      </p>

      <p>
        <strong>Dane techniczne.</strong> Strona korzysta z narzędzia Vercel Web Analytics, które
        zbiera anonimowe statystyki odwiedzin: datę i godzinę wizyty, adres odwiedzonej podstrony,
        stronę, z której przyszedłeś, przybliżoną lokalizację na poziomie kraju i miasta, rodzaj
        urządzenia, system operacyjny i przeglądarkę. Narzędzie to nie używa plików cookies i nie
        zapisuje żadnego trwałego identyfikatora, który pozwalałby rozpoznać Cię przy kolejnej
        wizycie albo na innej stronie. Nie potrafimy powiązać tych statystyk z Twoim zgłoszeniem z
        formularza.
      </p>

      <h2>3. Po co i na jakiej podstawie prawnej</h2>
      <ul>
        <li>
          <strong>Skontaktowanie się z Tobą telefonicznie</strong>, żeby porozmawiać o sytuacji
          Twojego bliskiego i o tym, czy możemy pomóc — art. 6 ust. 1 lit. b RODO (podjęcie działań
          na Twoje żądanie przed zawarciem umowy). To Ty prosisz nas o kontakt, zostawiając numer.
        </li>
        <li>
          <strong>Dobranie konkretnej osoby, która mogłaby pomóc</strong>, jeśli po rozmowie obie
          strony będą tego chciały — art. 6 ust. 1 lit. b RODO.
        </li>
        <li>
          <strong>Zrozumienie, czego potrzebują rodziny</strong>, i podjęcie decyzji, czy i w jakim
          kształcie rozwijać usługę. Analizujemy odpowiedzi łącznie, w postaci statystyk, bez
          odnoszenia ich do konkretnych osób — art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony
          interes polegający na rozwoju usługi). Możesz się temu sprzeciwić, patrz punkt 6.
        </li>
        <li>
          <strong>Prowadzenie anonimowych statystyk odwiedzin strony</strong> — art. 6 ust. 1 lit. f
          RODO (nasz prawnie uzasadniony interes polegający na sprawdzeniu, czy strona jest
          zrozumiała i czy ktoś ją odwiedza).
        </li>
        <li>
          <strong>Obrona przed ewentualnymi roszczeniami</strong> lub wykazanie, że działaliśmy
          zgodnie z prawem — art. 6 ust. 1 lit. f RODO.
        </li>
      </ul>
      <p>
        Nie wykorzystujemy Twoich danych do marketingu, nie zapisujemy Cię na newsletter i nie
        będziemy dzwonić z ofertami innych produktów. Dzwonimy raz, w sprawie, o którą sam
        poprosiłeś.
      </p>

      <h2>4. Jak długo trzymamy Twoje dane</h2>
      <ul>
        <li>
          Jeśli po rozmowie nie zaczynamy współpracy — <strong>usuwamy Twoje imię i numer
          telefonu najpóźniej w ciągu 12 miesięcy</strong> od wysłania zgłoszenia. Zachowujemy
          jedynie odpowiedzi z formularza pozbawione danych kontaktowych, w formie, która nie
          pozwala już ustalić, kto je wysłał, bo służą nam do statystyk.
        </li>
        <li>
          Jeśli zaczynamy współpracę — trzymamy dane tak długo, jak trwa współpraca, a potem przez
          okres wymagany przepisami lub potrzebny do rozliczenia i obrony przed roszczeniami.
        </li>
        <li>
          Jeśli poprosisz o usunięcie danych wcześniej — usuwamy je niezwłocznie, najpóźniej w ciągu
          30 dni.
        </li>
        <li>
          Nie odbierasz telefonu — próbujemy dodzwonić się maksymalnie trzy razy w ciągu dwóch
          tygodni. Potem uznajemy, że nie jesteś zainteresowany, i usuwamy numer.
        </li>
      </ul>

      <h2>5. Komu przekazujemy dane</h2>
      <p>
        Nie sprzedajemy danych i nie udostępniamy ich w celach marketingowych nikomu. Korzystamy
        jednak z dwóch narzędzi, które z technicznego punktu widzenia przetwarzają dane na nasze
        zlecenie:
      </p>
      <ul>
        <li>
          <strong>Supabase Inc.</strong> — zgłoszenia z formularza zapisują się w bazie danych
          Supabase Inc.
        </li>
        <li>
          <strong>Vercel Inc.</strong> — firma hostująca tę stronę i dostarczająca narzędzie do
          anonimowych statystyk odwiedzin.
        </li>
      </ul>
      <p>
        Podmioty mają siedzibę lub infrastrukturę w Stanach Zjednoczonych, co oznacza przekazanie
        danych poza Europejski Obszar Gospodarczy. Odbywa się to na podstawie decyzji Komisji
        Europejskiej o odpowiednim stopniu ochrony w ramach EU-US Data Privacy Framework, do którego
        oba podmioty przystąpiły, oraz standardowych klauzul umownych.
      </p>
      <p>
        Dane mogą też zostać udostępnione osobie, którą zaproponujemy jako Bliskiego — ale wyłącznie
        w zakresie niezbędnym do umówienia pierwszego spotkania, dopiero po Twojej wyraźnej zgodzie
        wyrażonej w rozmowie telefonicznej, i nigdy wcześniej.
      </p>
      <p>
        Jeśli przepisy nas do tego zobowiążą, możemy być zmuszeni przekazać dane uprawnionym organom
        państwowym.
      </p>

      <h2>6. Twoje prawa</h2>
      <p>Masz prawo:</p>
      <ul>
        <li><strong>dostępu</strong> do swoich danych — możesz zapytać, co o Tobie mamy, i dostać kopię,</li>
        <li><strong>sprostowania</strong> — jeśli coś zapisaliśmy błędnie,</li>
        <li><strong>usunięcia</strong> — napisz jedno zdanie i usuwamy wszystko,</li>
        <li><strong>ograniczenia przetwarzania</strong> — możesz zażądać, żebyśmy dane zachowali, ale przestali ich używać,</li>
        <li><strong>przenoszenia danych</strong> — możesz dostać swoje dane w formacie do odczytu maszynowego,</li>
        <li>
          <strong>sprzeciwu</strong> — wobec przetwarzania opartego na naszym prawnie uzasadnionym
          interesie, czyli wobec wykorzystywania Twoich odpowiedzi do statystyk i analizy
          zapotrzebowania,
        </li>
        <li>
          <strong>skargi do organu nadzorczego</strong> — Prezes Urzędu Ochrony Danych Osobowych,
          ul. Stawki 2, 00-193 Warszawa.
        </li>
      </ul>
      <p>
        Żeby skorzystać z któregokolwiek z tych praw, wystarczy e-mail na{" "}
        <a href="mailto:bliscykontakt@gmail.com">bliscykontakt@gmail.com</a>. Nie wymagamy żadnego
        formularza ani uzasadnienia. Odpowiadamy w ciągu 30 dni, zwykle znacznie szybciej.
      </p>

      <h2>7. Czy musisz podać dane</h2>
      <p>
        Nie. Podanie danych jest całkowicie dobrowolne. Bez imienia i numeru telefonu nie będziemy
        jednak w stanie do Ciebie zadzwonić, a to jedyne, co ten formularz robi. Pola dotyczące
        miasta i opisu sytuacji są nieobowiązkowe — możesz je pominąć i nic się nie stanie.
      </p>

      <h2>8. Czy podejmujemy decyzje automatycznie</h2>
      <p>
        Nie. Nie profilujemy Cię i nie podejmujemy wobec Ciebie żadnych decyzji w sposób
        automatyczny. Każde zgłoszenie czyta człowiek i człowiek do Ciebie dzwoni.
      </p>

      <h2>9. Pliki cookies</h2>
      <p>
        Ta strona nie używa plików cookies do analityki, marketingu ani profilowania. Narzędzie
        statystyczne, z którego korzystamy, działa bez ciasteczek. Mogą działać wyłącznie pliki
        niezbędne do technicznego funkcjonowania strony, jeśli takie są używane przez hosting — nie
        służą one do śledzenia Cię i nie wymagają Twojej zgody.
      </p>

      <h2>10. Zmiany polityki</h2>
      <p>
        Jesteśmy na początku i nasza usługa będzie się zmieniać, więc ta polityka też może się
        zmienić. Aktualna wersja zawsze jest dostępna na tej stronie, z datą na górze. Jeśli zmiana
        będzie istotna i dotknie osób, których dane już mamy, poinformujemy o niej wcześniej.
      </p>
    </LegalLayout>
  );
}

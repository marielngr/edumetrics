import { entferneDuplikate, ladeDaten } from "@/data";
import { Benotung, Fach, Klasse, Schuljahr } from "@/model";
import styles from "./page.module.scss";
import DropDownMenu, {
  DropDownMenuEintrag,
} from "@/components/DropDownMenu/DropDownMenu";

function TableHeader() {
  const klasseneintraege: DropDownMenuEintrag[] = [
    { id: "Klasse_5a", label: "Klasse 5a", selected: false },
    { id: "Klasse_5b", label: "Klasse 5b", selected: false },
    { id: "Klasse_6a", label: "Klasse 6a", selected: false },
  ];

  const schuljahreintraege: DropDownMenuEintrag[] = [
    { id: "Schuljahr_2021", label: "2021", selected: false },
  ];

  return (
    <div className={styles.tableHeader}>
      <div className={styles.tableHeader__item}>
        <p>Zeile</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>Klassen-ID</p>
        <DropDownMenu eintraege={klasseneintraege} />
      </div>
      <div className={styles.tableHeader__item}>
        <p>Schuljahr</p>
        <DropDownMenu eintraege={schuljahreintraege} />
      </div>
      <div className={styles.tableHeader__item}>
        <p>Klasse</p>
        {/* <DropDownMenu /> */}
      </div>
      <div className={styles.tableHeader__item}>
        <p>Fach</p>
        {/* <DropDownMenu /> */}
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 1.1</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 1.2</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 1.3</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 2.1</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>KA 2.2</p>
      </div>
      <div className={styles.tableHeader__item}></div>
      <div className={styles.tableHeader__item}>
        <p>Ø 1.HJ</p>
      </div>
      <div className={styles.tableHeader__item}>
        <p>Ø 2.HJ</p>
      </div>
    </div>
  );
}

type TableRowProps = {
  klasse: Klasse;
  schuljahr: Schuljahr;
  fach: Fach;
  noteneinträge: Benotung[];
};

function TableRow({ klasse, schuljahr, fach, noteneinträge }: TableRowProps) {
  //To do:
}

export default async function Monitoring() {
  const data = await ladeDaten();

  let zeilenIds = data.benotung.map((benotung) => ({
    klasseId: benotung.klasseId,
    fachId: benotung.fachId,
    schuljahrId: benotung.schuljahrId,
  }));

  function sindGleich(
    zeile1: { klasseId: string; fachId: string; schuljahrId: string },
    zeile2: { klasseId: string; fachId: string; schuljahrId: string }
  ): boolean {
    return (
      zeile1.klasseId === zeile2.klasseId &&
      zeile1.fachId === zeile2.fachId &&
      zeile1.schuljahrId === zeile2.schuljahrId
    );
  }
  zeilenIds = entferneDuplikate(zeilenIds, sindGleich);

  //für die Darstellung sortieren - zuerst nach Schuljahr, dann nach Klasse, dann nach Fach
  zeilenIds = zeilenIds.sort((a, b) => {
    if (a.schuljahrId < b.schuljahrId) return -1;
    if (a.schuljahrId > b.schuljahrId) return 1;
    //TODO hier evtl so refactoren, dass nach aktueller Klasse sortiert wird?! Anzeige sonst verwirrend, wenn höhere Klassenstufen zuerst kommen
    if (a.klasseId < b.klasseId) return -1;
    if (a.klasseId > b.klasseId) return 1;

    if (a.fachId < b.fachId) return -1;
    if (a.fachId > b.fachId) return 1;

    return 0;
  });

  const rows = zeilenIds.map((zeile, index) => {
    const uniqueRowIds = `${zeile.schuljahrId}-${zeile.klasseId}-${zeile.fachId}`;
    const zeilennr = index + 1;
    const klasse = data.klassen.find((klasse) => klasse.id === zeile.klasseId);
    if (!klasse) return; // TODO Fehlerbehandlung

    const schuljahr = data.schuljahre.find((s) => s.id === zeile.schuljahrId);
    if (!schuljahr) return;

    const eingangsschuljahr = data.schuljahre.find(
      (s) => s.id === klasse.eingangsSchuljahr
    );
    if (!eingangsschuljahr) return;

    const differenz = schuljahr.startjahr - eingangsschuljahr.startjahr;

    //Noten + Lehrer für diese Klasse, Fach und Schuljahr finden und ausgeben

    function findNotenFuerKlasseFachSchuljahr(
      notenArray: Benotung[]
    ): Benotung[] {
      let notenProZeile = notenArray
        .filter(
          (noten) =>
            noten.klasseId === zeile.klasseId &&
            noten.fachId === zeile.fachId &&
            noten.schuljahrId === zeile.schuljahrId
        )
        .sort((a, b) => {
          if (a.periodenNummer < b.periodenNummer) return -1;
          if (a.periodenNummer > b.periodenNummer) return 1;

          if (a.laufendeNummer < b.laufendeNummer) return -1;
          if (a.laufendeNummer > b.laufendeNummer) return 1;

          return 0;
        });

      if (!notenProZeile) {
        return [];
      }
      return notenProZeile;
    }

    const notenProKlasseFachSchuljahr = findNotenFuerKlasseFachSchuljahr(
      data.benotung
    );

    const anzuzeigendeLeistungsabschnitte = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3],
    ];

    function noteFuerPeriodeUndKlausur(
      periodenNummer: number,
      laufendeNummer: number
    ) {
      const note = notenProKlasseFachSchuljahr.find(
        (note) =>
          note.periodenNummer === periodenNummer &&
          note.laufendeNummer === laufendeNummer
      );

      if (!note) {
        return <div className={styles.tableCell}>-</div>;
      }

      return (
        <div className={styles.tableCell}>
          {note.periodenNummer}-{note.laufendeNummer}: Ø{note.note}/
          {note.lehrerId}
        </div>
      );
    }

    /**
     * Halbjahresdurchschnitt berechnen und ausgeben
     * Kommazahlen auf 2 Stellen runden
     */
    function berechneHalbjahresdurchschnitt(periodenNummer: number) {
      const notenProHalbjahr = notenProKlasseFachSchuljahr.filter(
        (note) => note.periodenNummer === periodenNummer
      );

      if (notenProHalbjahr.length === 0) {
        return <div className={styles.tableCell}>-</div>;
      }

      let durchschnitt =
        notenProHalbjahr.reduce((acc, note) => acc + note.note, 0) /
        notenProHalbjahr.length;

      durchschnitt = Math.round(durchschnitt * 100) / 100;

      return <div className={styles.tableCell}>Ø{durchschnitt}</div>;
    }

    //Zellen ausgeben
    return (
      <div className={styles.tableRow} key={uniqueRowIds}>
        <div className={styles.tableCell}>{zeilennr}</div>
        <div className={styles.tableCell}>{zeile.klasseId}</div>
        <div className={styles.tableCell}>{zeile.schuljahrId}</div>
        <div className={styles.tableCell}>
          {differenz + klasse.eingangsJahrgangsstufe}
          {klasse.kuerzel}
        </div>
        <div className={styles.tableCell}>{zeile.fachId}</div>
        {anzuzeigendeLeistungsabschnitte.map((interesse) =>
          noteFuerPeriodeUndKlausur(interesse[0], interesse[1])
        )}
        <div className={styles.tableCell}>
          {berechneHalbjahresdurchschnitt(1)}
        </div>
        <div className={styles.tableCell}>
          {berechneHalbjahresdurchschnitt(2)}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles.container}>
        <section className={styles.sidebarLeft}>
          <div className={styles.sidebarLeft__content}>hallo</div>
          <div className={styles.sidebarLeft__content}>hallo kjhgfdsdfghj</div>
        </section>
        <section className={styles.tablesheet}>
          <h2 className={styles.tablesheet__headline}>Überschrift whatever</h2>
          <div className={styles.tablesheet__wrapper}>
            <TableHeader />
            <div>{rows}</div>
          </div>
        </section>
      </div>
    </>
  );
}

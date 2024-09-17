import { entferneDuplikate, ladeDaten } from "@/data";
import {
  Benotung,
  Fach,
  Klasse,
  Schuljahr,
  KlasseFachSchuljahrId,
  klasseFachSchuljahrSindGleich,
  klasseFachSchuljahrCompare,
} from "@/model";
import TableHeader from "@/components/TableHeader/TableHeader";
import styles from "./page.module.scss";
import { findNotenFuerKlasseFachSchuljahr } from "@/utils/utils";

type TableRowProps = {
  zeile: KlasseFachSchuljahrId;
  zeilennr: number;
  klasse: Klasse;
  jahrgang: number;
  benotung: Benotung[];
};

function TableRow({
  zeile,
  zeilennr,
  klasse,
  jahrgang,
  benotung,
}: TableRowProps) {
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
    const note = benotung.find(
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

  const halbjahresdurchschnitte = [
    berechneHalbjahresdurchschnitt(benotung, 1),
    berechneHalbjahresdurchschnitt(benotung, 2),
  ];

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>{zeilennr}</div>
      <div className={styles.tableCell}>{zeile.klasseId}</div>
      <div className={styles.tableCell}>{zeile.schuljahrId}</div>
      <div className={styles.tableCell}>
        {jahrgang} {klasse.kuerzel}
      </div>
      <div className={styles.tableCell}>{zeile.fachId}</div>
      {anzuzeigendeLeistungsabschnitte.map((interesse) =>
        noteFuerPeriodeUndKlausur(interesse[0], interesse[1])
      )}
      <div className={styles.tableCell}>Ø{halbjahresdurchschnitte[0]}</div>
      <div className={styles.tableCell}>Ø{halbjahresdurchschnitte[1]}</div>
    </div>
  );
}

/**
 * Halbjahresdurchschnitt berechnen und ausgeben
 * Kommazahlen auf 2 Stellen runden
 */
function berechneHalbjahresdurchschnitt(
  notenProKlasseFachSchuljahr: Benotung[],
  periodenNummer: number
) {
  const notenProHalbjahr = notenProKlasseFachSchuljahr.filter(
    (note) => note.periodenNummer === periodenNummer
  );

  if (notenProHalbjahr.length === 0) {
    return null;
  }

  let durchschnitt =
    notenProHalbjahr.reduce((acc, note) => acc + note.note, 0) /
    notenProHalbjahr.length;

  durchschnitt = Math.round(durchschnitt * 100) / 100;
  return durchschnitt;
}

export default async function Monitoring() {
  const data = await ladeDaten();

  let zeilenIds = data.benotung.map((benotung) => ({
    klasseId: benotung.klasseId,
    fachId: benotung.fachId,
    schuljahrId: benotung.schuljahrId,
  }));

  zeilenIds = entferneDuplikate(zeilenIds, klasseFachSchuljahrSindGleich);

  //für die Darstellung sortieren - zuerst nach Schuljahr, dann nach Klasse, dann nach Fach
  zeilenIds = zeilenIds.sort(klasseFachSchuljahrCompare);

  const rows = zeilenIds.map((zeile, index) => {
    const uniqueRowIds = `${zeile.schuljahrId}-${zeile.klasseId}-${zeile.fachId}`;
    const zeilennr = index + 1;
    const klasse = data.klassen.find((klasse) => klasse.id === zeile.klasseId);
    if (!klasse) return; // TODO Fehlerbehandlung, z.B. DIV Mit Fehlermeldung

    const schuljahr = data.schuljahre.find((s) => s.id === zeile.schuljahrId);
    if (!schuljahr) return;

    const eingangsschuljahr = data.schuljahre.find(
      (s) => s.id === klasse.eingangsSchuljahr
    );
    if (!eingangsschuljahr) return;

    const differenz = schuljahr.startjahr - eingangsschuljahr.startjahr;

    //Noten + Lehrer für diese Klasse, Fach und Schuljahr finden und ausgeben
    const notenProKlasseFachSchuljahr = findNotenFuerKlasseFachSchuljahr(
      data.benotung,
      zeile
    );

    return (
      <TableRow
        key={uniqueRowIds}
        zeile={zeile}
        zeilennr={zeilennr}
        klasse={klasse}
        jahrgang={differenz + klasse.eingangsJahrgangsstufe}
        benotung={notenProKlasseFachSchuljahr}
      />
    );
  });

  const jahrgaenge = [5, 6, 7, 8, 9, 10];
  const sortierteKlassen = [...data.klassen].sort();

  return (
    <>
      <div className={styles.container}>
        <section className={styles.sidebarLeft}>
          <div className={styles.sidebarLeft__content}>Lehrerfilter</div>
        </section>
        <section className={styles.tablesheet}>
          <h2 className={styles.tablesheet__headline}>Überschrift whatever</h2>
          <div className={styles.tablesheet__wrapper}>
            <TableHeader
              klassen={sortierteKlassen}
              schuljahre={data.schuljahre}
              jahrgaenge={jahrgaenge}
              faecher={data.faecher}
            />
            <div>{rows}</div>
          </div>
        </section>
      </div>
    </>
  );
}

//refactoren in einzelne Komponenten
//Filter-Logik --> state für Häkchen setzen in DropDownMenu
//Lehrerdropdown in Seitenleiste

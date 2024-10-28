import { Benotung, Klasse, KlasseFachSchuljahrId } from "@/model";
import styles from "./TableRow.module.scss";

type TableRowProps = {
  zeile: KlasseFachSchuljahrId;
  zeilennr: number;
  klasse: Klasse;
  jahrgang: number;
  benotung: Benotung[];
};

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

export default function TableRow({
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
  //To Do: Refactor als eigene Komponente
  function noteFuerPeriodeUndKlausur(
    periodenNummer: number,
    laufendeNummer: number
  ) {
    const note = benotung.find(
      (note) =>
        note.periodenNummer === periodenNummer &&
        note.laufendeNummer === laufendeNummer
    );
    const key = `${periodenNummer}-${laufendeNummer}`;
    if (!note) {
      return (
        <div key={key} className={styles.tableCell}>
          -
        </div>
      );
    }

    return (
      <div key={key} className={styles.tableCell}>
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

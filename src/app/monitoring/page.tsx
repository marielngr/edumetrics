import { entferneDuplikate, ladeDaten } from "@/data";
import {
  Benotung,
  KlasseFachSchuljahrId,
  klasseFachSchuljahrSindGleich,
  klasseFachSchuljahrCompare,
} from "@/model";
import TableHeader from "@/components/TableHeader/TableHeader";
import styles from "./page.module.scss";
import TableRow from "@/components/TableRow/TableRow";

//to do: in utils auslagern
function findNotenFuerKlasseFachSchuljahr(
  notenArray: Benotung[],
  zeile: KlasseFachSchuljahrId
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

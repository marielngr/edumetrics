import { Data, ladeDaten } from "@/data";
import {
  // Benotung,
  // KlasseFachSchuljahrId,
  klasseFachSchuljahrSindGleich,
  klasseFachSchuljahrCompare,
  KlasseFachSchuljahrId,
  KlasseId,
  FachId,
  SchuljahrId,
} from "@/model";
import TableHeader from "@/components/TableHeader/TableHeader";
import styles from "./page.module.scss";
import {
  entferneDuplikate,
  filterRowsByFachId,
  filterRowsByJahrgang,
  filterRowsByKlasseID,
  filterRowsBySchuljahrId,
  findNotenFuerKlasseFachSchuljahr,
  getKlassenkuerzelFuerKlasseInSchuljahr,
  Jahrgang,
} from "@/utils/utils";
import TableRow from "@/components/TableRow/TableRow";

export default async function Monitoring() {
  const data = await ladeDaten();

  let zeilenIds: KlasseFachSchuljahrId[] = data.benotung.map((benotung) => ({
    klasseId: benotung.klasseId,
    fachId: benotung.fachId,
    schuljahrId: benotung.schuljahrId,
  }));

  //Filter für angezeigte rows
  const selectedKlassen: KlasseId[] = [];

  zeilenIds = filterRowsByKlasseID(selectedKlassen, zeilenIds);

  const selectedFaecher: FachId[] = [];

  zeilenIds = filterRowsByFachId(selectedFaecher, zeilenIds);

  const selectedSchuljahre: SchuljahrId[] = ["2015-16"];

  zeilenIds = filterRowsBySchuljahrId(selectedSchuljahre, zeilenIds);

  const selectedJahrgaenge: Jahrgang[] = [7];

  zeilenIds = filterRowsByJahrgang(selectedJahrgaenge, zeilenIds, data);

  zeilenIds = entferneDuplikate(zeilenIds, klasseFachSchuljahrSindGleich);

  //für die Darstellung sortieren - zuerst nach Schuljahr, dann nach Klasse, dann nach Fach
  zeilenIds = zeilenIds.sort(klasseFachSchuljahrCompare);

  const rows = zeilenIds
    .map((zeile, index) => {
      const uniqueRowIds = `${zeile.schuljahrId}-${zeile.klasseId}-${zeile.fachId}`;
      const zeilennr = index + 1;

      //passende Klasse heraussuchen
      const klasse = data.klassen.find(
        (klasse) => klasse.id === zeile.klasseId
      );
      if (!klasse) return; // TODO Fehlerbehandlung, z.B. DIV Mit Fehlermeldung

      const klassenkuerzel = getKlassenkuerzelFuerKlasseInSchuljahr(
        zeile.klasseId,
        zeile.schuljahrId,
        data
      );
      if (!klassenkuerzel) return; // TODO Fehlerbehandlung, z.B. DIV Mit Fehlermeldung
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
          jahrgang={klassenkuerzel.jahrgang}
          benotung={notenProKlasseFachSchuljahr}
        />
      );
    })
    .filter((row) => row !== null);

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

//Lehrerdropdown in Seitenleiste

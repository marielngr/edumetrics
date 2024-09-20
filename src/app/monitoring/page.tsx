import { ladeDaten } from "@/data";
import {
  // Benotung,
  // KlasseFachSchuljahrId,
  klasseFachSchuljahrSindGleich,
  klasseFachSchuljahrCompare,
  KlasseFachSchuljahrId,
  KlasseId,
  FachId,
} from "@/model";
import TableHeader from "@/components/TableHeader/TableHeader";
import styles from "./page.module.scss";
import {
  entferneDuplikate,
  filterRowsByFachId,
  filterRowsByKlasseID,
  findNotenFuerKlasseFachSchuljahr,
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
  const selectedKlassen: KlasseId[] = ["2013-14-5b"];

  zeilenIds = filterRowsByKlasseID(selectedKlassen, zeilenIds);

  const selectedFaecher: FachId[] = ["D"];

  zeilenIds = filterRowsByFachId(selectedFaecher, zeilenIds);

  zeilenIds = entferneDuplikate(zeilenIds, klasseFachSchuljahrSindGleich);

  //für die Darstellung sortieren - zuerst nach Schuljahr, dann nach Klasse, dann nach Fach
  zeilenIds = zeilenIds.sort(klasseFachSchuljahrCompare);

  const rows = zeilenIds
    .map((zeile, index) => {
      const uniqueRowIds = `${zeile.schuljahrId}-${zeile.klasseId}-${zeile.fachId}`;
      const zeilennr = index + 1;
      const klasse = data.klassen.find(
        (klasse) => klasse.id === zeile.klasseId
      );
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

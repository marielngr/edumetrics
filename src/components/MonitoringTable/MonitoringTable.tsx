"use client";
import {
  klasseFachSchuljahrSindGleich,
  klasseFachSchuljahrCompare,
  KlasseFachSchuljahrId,
  FachId,
  SchuljahrId,
  KlasseId,
  Jahrgang,
  LehrerId,
} from "@/model";
import TableHeader from "@/components/TableHeader/TableHeader";
import styles from "./MonitoringTable.module.scss";
import {
  entferneDuplikate,
  filterRowsByFachId,
  filterRowsByJahrgang,
  filterRowsByKlasseID,
  filterRowsBySchuljahrId,
  findNotenFuerKlasseFachSchuljahr,
  getKlassenkuerzelFuerKlasseInSchuljahr,
} from "@/utils/utils";
import TableRow from "@/components/TableRow/TableRow";
import { use, useState } from "react";
import { useDataContext } from "@/app/context";
import SidebarLeft from "../SidebarLeft/SidebarLeft";

export default function MonitoringTable() {
  let dataPromise = useDataContext();
  let data = use(dataPromise);

  let zeilenIds: KlasseFachSchuljahrId[] = data.benotung.map((benotung) => ({
    klasseId: benotung.klasseId,
    fachId: benotung.fachId,
    schuljahrId: benotung.schuljahrId,
  }));

  //Lehrerfilter SidebarLeft
  const [selectedLehrer, setSelectedLehrer] = useState<LehrerId[]>([]);
  function handleChangeSelectedLehrer(id: LehrerId) {
    setSelectedLehrer((prev) =>
      prev.includes(id)
        ? prev.filter((lehrerId) => lehrerId !== id)
        : [...prev, id]
    );
    console.log("selectedLehrer", selectedLehrer);
  }

  //Filter für angezeigte rows

  const [selectedKlassen, setSelectedKlassen] = useState<KlasseId[]>([]);
  const handleSelectedKlassen = (id: KlasseId, selected: boolean) => {
    setSelectedKlassen((prev) =>
      selected ? [...prev, id] : prev.filter((klasseId) => klasseId !== id)
    );
  };

  zeilenIds = filterRowsByKlasseID(selectedKlassen, zeilenIds);

  const [selectedSchuljahre, setSelectedSchuljahre] = useState<SchuljahrId[]>(
    []
  );
  const handleSelectedSchuljahre = (id: SchuljahrId, selected: boolean) => {
    setSelectedSchuljahre((prev) =>
      selected
        ? [...prev, id]
        : prev.filter((schuljahrId) => schuljahrId !== id)
    );
  };

  zeilenIds = filterRowsBySchuljahrId(selectedSchuljahre, zeilenIds);

  const [selectedJahrgaenge, setSelectedJahrgaenge] = useState<Jahrgang[]>([]);
  const handleSelectedJahrgaenge = (jahrgang: Jahrgang, selected: boolean) => {
    setSelectedJahrgaenge((prev) =>
      selected
        ? [...prev, jahrgang]
        : prev.filter((jahrgang) => jahrgang !== jahrgang)
    );
  };

  const [selectedFaecher, setSelectedFaecher] = useState<FachId[]>([]);
  const handleSelectedFaecher = (id: FachId, selected: boolean) => {
    // console.log("selectedFaecher", selectedFaecher); hier stimmt noch was nicht mit dem console.log überein
    setSelectedFaecher((prev) =>
      selected ? [...prev, id] : prev.filter((fachId) => fachId !== id)
    );
  };

  zeilenIds = filterRowsByFachId(selectedFaecher, zeilenIds);

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
        <SidebarLeft
          lehrer={data.lehrer}
          selectedLehrer={selectedLehrer}
          onChangeSelectedLehrer={handleChangeSelectedLehrer}
        />
        <section className={styles.tablesheet}>
          <h2 className={styles.tablesheet__headline}>Überschrift whatever</h2>
          <div className={styles.tablesheet__wrapper}>
            <TableHeader
              klassen={sortierteKlassen}
              schuljahre={data.schuljahre}
              jahrgaenge={jahrgaenge}
              faecher={data.faecher}
              selectedKlassen={selectedKlassen}
              onSelectedKlassenChange={handleSelectedKlassen}
              selectedFaecher={selectedFaecher}
              onSelectedFaecherChange={handleSelectedFaecher}
              selectedSchuljahre={selectedSchuljahre}
              onSelectedSchuljahreChange={handleSelectedSchuljahre}
              selectedJahrgaenge={selectedJahrgaenge}
              onSelectedJahrgaengeChange={handleSelectedJahrgaenge}
            />
            <div>{rows}</div>
          </div>
        </section>
      </div>
    </>
  );
}

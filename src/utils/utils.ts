import { Benotung, KlasseFachSchuljahrId } from "@/model";

export function findNotenFuerKlasseFachSchuljahr(
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

/**diese Funktionen filtern den Datensatz nach übergebenen Filterkriterien
 * und geben ein neues Array mit neuen Ergebnissen zurück*/
export function filterRows(
  selectedKlasseIds: KlasseId[],
  rows: KlasseFachSchuljahrId[]
) {
  const filteredRows = rows.filter((row) => {
    if (selectedKlasseIds.length === 0) return true;
    const klasse = row.klasseId;

    return selectedKlasseIds.includes(klasse);
  });

  return filteredRows;
}

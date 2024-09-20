import { Benotung, KlasseFachSchuljahrId, KlasseId } from "@/model";

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

type VergleichFunktion<T> = (element1: T, element2: T) => boolean;

/**
 * diese Funktion entfernt doppelte Elemente aus einem Array. Dafür bekommt es ein
 * Array von Elementen und eine Vergleichsfunktion, die zwei Elemente vergleicht und true zurückgibt, wenn sie gleich sind.
 * @param elemente das Array, aus dem die Duplikate entfernt werden sollen
 * @param vergleich die Vergleichsfunktion, die zwei Elemente vergleicht
 * @returns das Array ohne Duplikate
 */

export function entferneDuplikate<T>(
  elemente: T[],
  vergleich: VergleichFunktion<T>
): T[] {
  const ergebnis: T[] = [];
  elemente.forEach((element) => {
    const istDuplikat = ergebnis.some((uElement) =>
      vergleich(element, uElement)
    );
    if (!istDuplikat) {
      ergebnis.push(element);
    }
  });
  return ergebnis;
}

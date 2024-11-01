import { Data } from "@/data";
import {
  Benotung,
  FachId,
  KlasseFachSchuljahrId,
  KlasseId,
  SchuljahrId,
  Klassenkuerzel,
  Jahrgang,
} from "@/model";

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

export function filterRowsByLehrerId(
  selectedLehrerIds: string[],
  rows: KlasseFachSchuljahrId[],
  data: Data
) {
  const filteredRows = rows.filter((row) => {
    if (selectedLehrerIds.length === 0) return true;
    const noten = findNotenFuerKlasseFachSchuljahr(data.benotung, row);

    const lehrerIds = noten.map((note) => note.lehrerId);

    return lehrerIds.some((lehrerId) => selectedLehrerIds.includes(lehrerId));
  });

  return filteredRows;
}

export function filterRowsByKlasseID(
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

export function filterRowsByFachId(
  selectedFachIds: FachId[],
  rows: KlasseFachSchuljahrId[]
) {
  const filteredRows = rows.filter((row) => {
    if (selectedFachIds.length === 0) return true;
    const fach = row.fachId;

    return selectedFachIds.includes(fach);
  });

  return filteredRows;
}

export function filterRowsBySchuljahrId(
  selectedSchuljahrIds: SchuljahrId[],
  rows: KlasseFachSchuljahrId[]
) {
  const filteredRows = rows.filter((row) => {
    if (selectedSchuljahrIds.length === 0) return true;
    const schuljahr = row.schuljahrId;

    return selectedSchuljahrIds.includes(schuljahr);
  });

  return filteredRows;
}

export function getKlassenkuerzelFuerKlasseInSchuljahr(
  klasseId: KlasseId,
  schuljahrId: SchuljahrId,
  data: Data
): Klassenkuerzel | null {
  //passende Klasse heraussuchen
  const klasse = data.klassen.find((klasse) => klasse.id === klasseId);
  if (!klasse) return null;

  //passendes Schuljahr heraussuchen
  const schuljahr = data.schuljahre.find((s) => s.id === schuljahrId);
  if (!schuljahr) return null;

  //Eingangsschuljahr der Klasse heraussuchen
  const eingangsschuljahr = data.schuljahre.find(
    (s) => s.id === klasse.eingangsSchuljahr
  );
  if (!eingangsschuljahr) return null;

  //DIfferenz zwischen aktuellem Schuljahr und Eingangsschuljahr berechnen
  const differenz = schuljahr.startjahr - eingangsschuljahr.startjahr;

  const jahrgang = differenz + klasse.eingangsJahrgangsstufe;

  return { jahrgang, kuerzel: klasse.kuerzel };
}

export function filterRowsByJahrgang(
  selectedJahrgaenge: Jahrgang[],
  rows: KlasseFachSchuljahrId[],
  data: Data
) {
  const filteredRows = rows.filter((row) => {
    if (selectedJahrgaenge.length === 0) return true;
    const kuerzel = getKlassenkuerzelFuerKlasseInSchuljahr(
      row.klasseId,
      row.schuljahrId,
      data
    );

    if (!kuerzel) return false;

    return selectedJahrgaenge.includes(kuerzel.jahrgang);
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

import { Benotung, Fach, Klasse, Lehrer, Schuljahr } from "./model";

async function ladeCsvDaten(filePath: string): Promise<string[][]> {
  try {
    const response = await fetch(filePath);
    const fileContent = await response.text();
    const lines = fileContent.split("\n");
    const result = lines.map((line) => line.split(";"));
    return result;
  } catch (error) {
    console.error("Fehler beim Einlesen der CSV-Datei:", error);
    throw error;
  }
}

export interface Data {
  schuljahre: Schuljahr[];
  klassen: Klasse[];
  faecher: Fach[];
  lehrer: Lehrer[];
  benotung: Benotung[];
}

type VergleichFunktion<T> = (element1: T, element2: T) => boolean;

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

export async function ladeDaten(): Promise<Data> {
  let csv = await ladeCsvDaten("http://localhost:3000/daten.csv");
  //erste Zeile enthält die Spaltenüberschriften, weg damit
  csv.shift();
  //in csv alle Vorkommen von _ durch - ersetzen
  csv = csv.map((zeile) => zeile.map((feld) => feld.replace(/_/g, "-")));

  // Schuljahre auslesen und nur Werte ohne Leerzeichen oder undefined filtern

  let schuljahreIDs = csv.map((zeile) => zeile[1]).filter((sj) => sj);
  //duplicate rausfiltern (strings)
  schuljahreIDs = Array.from(new Set(schuljahreIDs));
  const schuljahre: Schuljahr[] = schuljahreIDs.map((sj) => {
    const startjahr = sj.slice(0, 4);
    return {
      id: sj,
      name: sj,
      startjahr: +startjahr,
    };
  });

  //Klassen auslesen

  const klassen: Klasse[] = csv
    .map((zeile, index) => {
      const id = zeile[0];
      if (!id) {
        return null;
      }

      //splitte Strings der Form 10abc in 10 und abc
      const match = zeile[2].match(/^(\d+)(.*)$/);
      let kuerzel: string;
      if (match) {
        kuerzel = match[2].trim();
      } else {
        console.log("Kein Match:", zeile[2]);
        kuerzel = "";
      }
      if (!kuerzel) {
        console.log("Kein Kürzel:", index, zeile);
        return null;
      }

      const eingangsschuljahr = zeile[0].slice(0, 7);
      if (!eingangsschuljahr) {
        console.log("Kein Schuljahr:", index, zeile);
        return null;
      }
      //prüfen, ob dieses Schuljahr schon in der Liste ist
      const schuljahr = schuljahre.find((sj) => sj.id === eingangsschuljahr);
      if (!schuljahr) {
        console.log("Schuljahr nicht gefunden:", index, eingangsschuljahr);
        return null;
      }
      const klasse: Klasse = {
        id: id,
        kuerzel: kuerzel,
        eingangsSchuljahr: eingangsschuljahr,
        eingangsJahrgangsstufe: 5,
      };
      return klasse;
    })

    .filter((klasse) => klasse !== null) as Klasse[];

  const klassenOhneDuplikate = entferneDuplikate(
    klassen,
    (k1, k2) => k1.id === k2.id
  );

  //Fächer auslesen und Nullwerte filtern
  const faecher: Fach[] = csv
    .map((zeile) => {
      const id = zeile[3];
      if (!id) {
        return null;
      }
      const fach: Fach = {
        id: id,
        name: zeile[3],
      };
      return fach;
    })
    .filter((fach) => fach !== null) as Fach[];

  //Duplikate entfernen
  function sindGleicheFaecher(fach1: Fach, fach2: Fach): boolean {
    return fach1.id === fach2.id;
  }

  const faecherOhneDuplikate = entferneDuplikate(faecher, sindGleicheFaecher);

  //Lehrer auslesen als Array von Objekten
  let lehrer: Lehrer[] = csv.flatMap((zeile) => {
    let lehrerIds = `${zeile[4]}/${zeile[9]}`;

    // Aufteilen der Lehrer-IDs, falls durch "/" getrennt
    let zeilenLehrer: Lehrer[] = lehrerIds
      .split("/")
      .filter((l) => l)
      .map((lehrerId) => {
        let ergebnis: Lehrer = {
          id: lehrerId,
          kuerzel: lehrerId,
          faecherIds: [],
        };
        return ergebnis;
      })
      .filter((l) => l !== null) as Lehrer[];
    return zeilenLehrer;
  });

  //prüfen, ob Lehrer schon in der Liste ist u Duplikate entfernen
  function sindGleicheLehrer(l1: Lehrer, l2: Lehrer): boolean {
    return l1.id === l2.id;
  }

  lehrer = entferneDuplikate(lehrer, sindGleicheLehrer);

  //Benotungen auslesen

  function generiereZufaelligeId() {
    return Math.random().toString(36).substring(2, 9);
  }

  const benotung: Benotung[] = csv
    .flatMap((zeile) => {
      function generiereNote(
        periodennummer: number,
        laufendeNummer: number,
        lehrerspalte: number[],
        notenspalte: number
      ): Benotung | null {
        const lehrer =
          // zuerst Lehrer aus der primären Spalte für dieses Halbjahr nehmen
          zeile[lehrerspalte[0]] ||
          // falls in der primären Spalte kein Lehrer steht, aber noch eine zweite Lehrerspalte
          // angegeben wurde, dann den Lehrer noch aus dieser Spalte nehmen
          (lehrerspalte.length > 1 && zeile[lehrerspalte[1]]);
        if (!lehrer) {
          //console.log("Kein Lehrer:", zeile);
          return null;
        }
        let lehrerIds = lehrer.split("/");
        if (!zeile[notenspalte]) {
          return null;
        }
        let note = parseFloat(zeile[notenspalte].replace(",", "."));

        return {
          id: generiereZufaelligeId(),
          schuljahrId: zeile[1],
          klasseId: zeile[0],
          lehrerId: lehrerIds[lehrerIds.length - 1],
          periodenNummer: periodennummer,
          laufendeNummer: laufendeNummer,
          note: note,
          fachId: zeile[3],
        };
      }

      return [
        generiereNote(1, 1, [4], 5),
        generiereNote(1, 2, [4], 6),
        generiereNote(1, 3, [4], 7),
        generiereNote(2, 1, [9, 4], 10),
        generiereNote(2, 2, [9, 4], 11),
        generiereNote(2, 3, [9, 4], 12),
      ];
    })
    .filter((n) => n !== null) as Benotung[];

  const result = {
    schuljahre: schuljahre,
    klassen: klassenOhneDuplikate,
    faecher: faecherOhneDuplikate,
    lehrer: lehrer,
    benotung: benotung,
  };

  return result;
}

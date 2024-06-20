import { Klasse, Lehrer, Schuljahr, Fach } from "@/model";

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

export default async function Monitoring() {
  console.log("neuer Import");
  let csv = await ladeCsvDaten("http://localhost:3000/daten.csv");
  //erste Zeile enthält die Spaltenüberschriften, weg damit
  csv.shift();
  //in csv alle Vorkommen von _ durch - ersetzen
  csv = csv.map((zeile) => zeile.map((feld) => feld.replace(/_/g, "-")));

  // Schuljahre auslesen und nur Werte ohne Leerzeichen oder undefined filtern
  let schuljahreIDs = csv.map((zeile) => zeile[1]).filter((sj) => sj);
  //duplicate rausfiltern
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

  //Doppelte Objekte rausfiltern:
  // Funktion, um zu überprüfen, ob zwei Klassen gleich sind
  function sindGleicheKlassen(klasse1: Klasse, klasse2: Klasse): boolean {
    return klasse1.id === klasse2.id;
  }

  // Funktion, um Duplikate aus einem Array von Klassen zu entfernen
  function entferneDuplikate(klassen: Klasse[]): Klasse[] {
    const ergebnis: Klasse[] = [];
    klassen.forEach((klasse) => {
      const istDuplikat = ergebnis.some((uklasse) =>
        sindGleicheKlassen(klasse, uklasse)
      );
      if (!istDuplikat) {
        ergebnis.push(klasse);
      }
    });
    return ergebnis;
  }
  const klassenOhneDuplikate = entferneDuplikate(klassen);
  // console.log(klassenOhneDuplikate);

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
  function bereinigung(faecher: Fach[]): Fach[] {
    const ergebnis: Fach[] = [];
    faecher.forEach((fach) => {
      const istDuplikat = ergebnis.some((ufach) =>
        sindGleicheFaecher(fach, ufach)
      );
      if (!istDuplikat) {
        ergebnis.push(fach);
      }
    });
    return ergebnis;
  }
  const faecherOhneDuplikate = bereinigung(faecher);
  // console.log("hallo", faecherOhneDuplikate);

  //Lehrer auslesen
  let arrayVonArrayVonLehrern: Lehrer[][] = csv.map((zeile) => {
    let lehrerIds = zeile[4];
    if (!lehrerIds) {
      return [];
    }

    // Aufteilen der Lehrer-IDs, falls durch "/" getrennt
    let ids = lehrerIds.split("/");

    let zeilenLehrer: Lehrer[] = ids
      .map((lehrerId) => {
        let ergebnis: Lehrer = {
          id: lehrerId,
          kuerzel: lehrerId,
          faecherIds: [],
        };
        return ergebnis;
      })
      .filter((l) => l !== null) as Lehrer[];

    let arrayVonLehrern: Lehrer[] = zeilenLehrer;
    console.log("arrayVonLehrern", arrayVonLehrern);

    //prüfen, ob Lehrer schon in der Liste ist u Duplikate entfernen
    function sindGleicheLehrer(l1: Lehrer, l2: Lehrer): boolean {
      return l1.id === l2.id;
    }

    function entferneDuplikateLehrer(lehrer: Lehrer[]): Lehrer[] {
      const ergebnis: Lehrer[] = [];
      lehrer.forEach((lehrer) => {
        const istDuplikat = ergebnis.some((ulehrer) =>
          sindGleicheLehrer(lehrer, ulehrer)
        );
        if (!istDuplikat) {
          ergebnis.push(lehrer);
        }
      });
      return ergebnis;
    }

    const lehrerOhneDuplikate = entferneDuplikateLehrer(zeilenLehrer);

    return lehrerOhneDuplikate;
  });

  const lehrer: Lehrer[] = arrayVonArrayVonLehrern.flat();
  // console.log("hallo:", arrayVonArrayVonLehrern.flat());

  //       Fächer des Lehrers auslesen
  let faecherIds: string[] = []; //Array für die IDs der Fächer
  // for (let i = 5; i < zeile.length; i++) {
  //   if (zeile[i] && zeile[i] !== "") {
  //     faecherIds.push(zeile[i]);
  //   }
  // }

  //Benotungen auslesen

  //als Komponente refactoren

  return <div>Monitoring</div>;
}

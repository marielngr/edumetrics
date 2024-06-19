import { Klasse, Schuljahr } from "@/model";

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
  const csv = await ladeCsvDaten("http://localhost:3000/daten.csv");
  // // erste Zeile enthält die Spaltenüberschriften, weg damit
  csv.shift();

  // Schuljahre auslesen und nur Werte ohne Leerzeichen oder undefined filtern
  const schuljahre = csv.map((zeile) => zeile[1]).filter((sj) => sj);
  //duplicate rausfiltern
  const uniqueSchuljahre = Array.from(new Set(schuljahre));
  const Schuljahre: Schuljahr[] = uniqueSchuljahre.map((sj) => {
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
      const kuerzel = zeile[2];
      if (!kuerzel) {
        return null;
      }

      const eingangsschuljahr = zeile[0].slice(0, 4);
      if (!eingangsschuljahr) {
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
  console.log(klassenOhneDuplikate);

  return <div>Monitoring</div>;
}

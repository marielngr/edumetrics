import { Klasse, Schuljahr } from "@/model";

async function ladeCsvDaten(filePath: string): Promise<string[][]> {
  try {
    const response = await fetch(filePath);
    const fileContent = await response.text();
    const lines = fileContent.split("\n");
    const result = lines.map((line) => line.split(";"));
    // console.log("CSV-Daten:", result);
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
  //console.log("unique Schuljahre:", uniqueSchuljahre),
  // console.log("Array of Schuljahre:", Schuljahre);

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

      console.log("Klasse:", id, kuerzel);

      // eingangsSchuljahr pro klasse
      // eingangsJahrgangsstufe pro klasse
      //console.log("Kl:", id);
      const klasse: Klasse = { id: id };
      return klasse;
    })
    .filter((klasse) => klasse !== null) as Klasse[];

  return <div>Monitoring</div>;
}

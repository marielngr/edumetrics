// import fs from "fs";
// import { promisify } from "util";

// async function parseCsv(filePath: string): Promise<string[][]> {
//   try {
//     const fileContent = await readFileAsync(filePath, { encoding: "utf8" }); // hier stattdessern fetch aufrufen
//     const lines = fileContent.split("\n");
//     const result = lines.map((line) => line.split(";"));
//     return result;
//   } catch (error) {
//     console.error("Fehler beim Einlesen der CSV-Datei:", error);
//     throw error;
//   }
// }

// async function main() {
//   const csvData = await parseCsv("data.csv");
//   console.log(csvData);
// }

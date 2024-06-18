import fs from "fs";
import { promisify } from "util";
import { useEffect, useState } from "react";

async function ladeCsvDaten(filePath: string): Promise<string[][]> {
  try {
    const response = await fetch(filePath);
    const fileContent = await response.text();
    const lines = fileContent.split("\n");
    const result = lines.map((line) => line.split(";"));
    console.log("CSV-Daten:", result);
    return result;
    return [];
  } catch (error) {
    console.error("Fehler beim Einlesen der CSV-Datei:", error);
    throw error;
  }
}

export default async function Monitoring() {
  const csv = await ladeCsvDaten("http://localhost:3000/daten.csv");
  return <div>Monitoring</div>;
}

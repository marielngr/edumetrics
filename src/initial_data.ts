import { Lehrer, Zeitabschnitt, Fach, Vorgabe, Klasse } from "./model";
export { lehrerListe, klassen, faecher, zeitabschnitte, vorgaben };

const lehrerListe: Lehrer[] = [
  {
    id: "lehrer1",
    kuerzel: "AB",
    pflichtstundenanzahl: 24,
    faecherIds: ["deutsch", "physik"],
  },
  {
    id: "lehrer2",
    kuerzel: "CD",
    pflichtstundenanzahl: 20,
    faecherIds: ["englisch", "religion"],
  },
  {
    id: "lehrer3",
    kuerzel: "EF",
    pflichtstundenanzahl: 20,
    faecherIds: ["englisch", "deutsch"],
  },
];

const klassen: Klasse[] = [
  {
    id: "klasse5a",
    name: "5A",
    jahrgang: 5,
    lehrerId: "lehrer1",
  },
  {
    id: "klasse5b",
    name: "5B",
    jahrgang: 5,
    lehrerId: "lehrer2",
  },
  {
    id: "klasse6a",
    name: "6A",
    jahrgang: 6,
    lehrerId: "lehrer3",
  },
  {
    id: "klasse6b",
    name: "6B",
    jahrgang: 6,
    lehrerId: "lehrer3",
  },
];

const faecher: Fach[] = [
  {
    id: "deutsch",
    name: "Deutsch",
  },
  {
    id: "englisch",
    name: "Englisch",
  },
  {
    id: "mathe",
    name: "Mathe",
  },
  {
    id: "religion",
    name: "Religion",
  },
  {
    id: "physik",
    name: "Physik",
  },
];

const zeitabschnitte: Zeitabschnitt[] = [
  {
    id: "za2023-1",
    schuljahr: 2023,
    halbjahr: "1",
    version: 1,
  },
];

const vorgaben: Vorgabe[] = [
  {
    id: "vorgabe15",
    zeitabschnittId: "za2023-1",
    klassenIds: ["klasse5a"],
    fachId: "deutsch",
    stundenanzahl: 4,
  },
  {
    id: "vorgabe15b-de",
    zeitabschnittId: "za2023-1",
    klassenIds: ["klasse5b"],
    fachId: "deutsch",
    stundenanzahl: 4,
  },
  {
    id: "vorgabe2",
    zeitabschnittId: "za2023-1",
    klassenIds: ["klasse5b"],
    fachId: "englisch",
    stundenanzahl: 3,
  },
  {
    id: "vorgabe25a-e",
    zeitabschnittId: "za2023-1",
    klassenIds: ["klasse5a"],
    fachId: "englisch",
    stundenanzahl: 3,
  },
  // Teilen der Klassen, klassenuebergreifender Unterricht
  {
    id: "vorgabe3",
    zeitabschnittId: "za2023-1",
    klassenIds: ["klasse6a", "klasse6b"],
    fachId: "religion",
    stundenanzahl: 2,
  },
  // Teamteaching: Zwei Eintraege fuer die gleiche Klasse
  {
    id: "vorgabe4-1",
    zeitabschnittId: "za2023-1",
    klassenIds: ["klasse6a"],
    fachId: "deutsch",
    stundenanzahl: 3,
  },
  {
    id: "vorgabe4-2",
    zeitabschnittId: "za2023-1",
    klassenIds: ["klasse6a"],
    fachId: "deutsch",
    stundenanzahl: 3,
  },
];

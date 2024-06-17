import {
  Lehrer,
  Schuljahr,
  Fach,
  Benotung,
  Klasse,
  Organisationsform,
} from "./model";
export { lehrerListe, klassen, faecher, organisationsform, noten, schuljahre };

const organisationsform: Organisationsform[] = [
  {
    id: "org-Jg5",
    gueltigVon: "2021/22",
    jahrgangsstufe: 5,
    periodenUndKlausuren: [3, 3],
  },
  {
    id: "org-Jg6",
    gueltigVon: "2021/22",
    jahrgangsstufe: 6,
    periodenUndKlausuren: [3, 3],
  },
  {
    id: "org-Jg7",
    gueltigVon: "2021/22",
    jahrgangsstufe: 7,
    periodenUndKlausuren: [3, 3],
  },
  {
    id: "org-Jg8",
    gueltigVon: "2021/22",
    jahrgangsstufe: 8,
    periodenUndKlausuren: [3, 3],
  },
  {
    id: "org-Jg9",
    gueltigVon: "2021/22",
    jahrgangsstufe: 9,
    periodenUndKlausuren: [3, 3],
  },
  {
    id: "org-Jg10",
    gueltigVon: "2021/22",
    jahrgangsstufe: 10,
    periodenUndKlausuren: [3, 3],
  },
];

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
    id: "2021-22-5a",
    kuerzel: "a",
    eingangsSchuljahr: "2021/22",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2021-22-5b",
    kuerzel: "b",
    eingangsSchuljahr: "2021/22",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2021-22-5c",
    kuerzel: "c",
    eingangsSchuljahr: "2021/22",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2021-22_5abc",
    kuerzel: "abc",
    eingangsSchuljahr: "2021/22",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2020/21_5a",
    kuerzel: "a",
    eingangsSchuljahr: "2020/21",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2020/21_5b",
    kuerzel: "b",
    eingangsSchuljahr: "2020/21",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2020/21_5c",
    kuerzel: "c",
    eingangsSchuljahr: "2020/21",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2019/20_5a",
    kuerzel: "a",
    eingangsSchuljahr: "2019/20",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2019/20_5b",
    kuerzel: "b",
    eingangsSchuljahr: "2019/20",
    eingangsJahrgangsstufe: 5,
  },
  {
    id: "2019/20_5c",
    kuerzel: "c",
    eingangsSchuljahr: "2019/20",
    eingangsJahrgangsstufe: 5,
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

const schuljahre: Schuljahr[] = [
  {
    id: "2019/20",
    name: "2019/20",
    startjahr: 2021,
  },
  {
    id: "2020/21",
    name: "2020/21",
    startjahr: 2021,
  },
  {
    id: "2021/22",
    name: "2021/22",
    startjahr: 2021,
  },
  {
    id: "2022/23",
    name: "2022/23",
    startjahr: 2022,
  },
  {
    id: "2023/24",
    name: "2023/24",
    startjahr: 2023,
  },
];

const noten: Benotung[] = [
  {
    id: "2021-22-5a-1_1",
    schuljahrId: "2021/22",
    klasseId: "2021-22-5a",
    lehrerId: "lehrer1",
    periodenNummer: 1,
    laufendeNummer: 1,
    note: 2.1,
    fachId: "deutsch",
  },
  {
    id: "2021-22-5a-1_2",
    schuljahrId: "2021/22",
    klasseId: "2021-22-5a",
    lehrerId: "lehrer1",
    periodenNummer: 1,
    laufendeNummer: 2,
    note: 2.2,
    fachId: "deutsch",
  },
  {
    id: "2021-22-5a-1_3",
    schuljahrId: "2021/22",
    klasseId: "2021-22-5a",
    lehrerId: "lehrer1",
    periodenNummer: 1,
    laufendeNummer: 3,
    note: 2.3,
    fachId: "deutsch",
  },
  {
    id: "2020-21-5a-1_1",
    schuljahrId: "2020/21",
    fachId: "englisch",
    lehrerId: "lehrer3",
    periodenNummer: 1,
    laufendeNummer: 1,
    klasseId: "5a",
    note: 1.2,
  },
  {
    id: "2019-20-5a-1_2",
    schuljahrId: "2019/20",
    fachId: "englisch",
    lehrerId: "lehrer3",
    periodenNummer: 1,
    laufendeNummer: 2,
    klasseId: "5a",
    note: 1.3,
  },
  {
    id: "2019-20-5a-1_2",
    schuljahrId: "2019/20",
    fachId: "englisch",
    lehrerId: "lehrer3",
    periodenNummer: 1,
    laufendeNummer: 2,
    klasseId: "5a",
    note: 1.3,
  },
];

// const zeitabschnitte: Zeitabschnitt[] = [
//   {
//     id: "za2023-1",
//     schuljahr: 2023,
//     halbjahr: "1",
//     version: 1,
//   },
// ];

// const vorgaben: Vorgabe[] = [
//   {
//     id: "vorgabe15",
//     zeitabschnittId: "za2023-1",
//     klassenIds: ["klasse5a"],
//     fachId: "deutsch",
//     stundenanzahl: 4,
//   },
//   {
//     id: "vorgabe15b-de",
//     zeitabschnittId: "za2023-1",
//     klassenIds: ["klasse5b"],
//     fachId: "deutsch",
//     stundenanzahl: 4,
//   },
//   {
//     id: "vorgabe2",
//     zeitabschnittId: "za2023-1",
//     klassenIds: ["klasse5b"],
//     fachId: "englisch",
//     stundenanzahl: 3,
//   },
//   {
//     id: "vorgabe25a-e",
//     zeitabschnittId: "za2023-1",
//     klassenIds: ["klasse5a"],
//     fachId: "englisch",
//     stundenanzahl: 3,
//   },
//   // Teilen der Klassen, klassenuebergreifender Unterricht
//   {
//     id: "vorgabe3",
//     zeitabschnittId: "za2023-1",
//     klassenIds: ["klasse6a", "klasse6b"],
//     fachId: "religion",
//     stundenanzahl: 2,
//   },
//   // Teamteaching: Zwei Eintraege fuer die gleiche Klasse
//   {
//     id: "vorgabe4-1",
//     zeitabschnittId: "za2023-1",
//     klassenIds: ["klasse6a"],
//     fachId: "deutsch",
//     stundenanzahl: 3,
//   },
//   {
//     id: "vorgabe4-2",
//     zeitabschnittId: "za2023-1",
//     klassenIds: ["klasse6a"],
//     fachId: "deutsch",
//     stundenanzahl: 3,
//   },
// ];

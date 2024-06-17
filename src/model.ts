import { machine } from "os";

export type FachId = string;
export type LehrerId = string;
export type KlasseId = string;
export type ZeitabschnittId = string;
export type VorgabeId = string;
export type SchuljahrId = string;
export type OrganisationsformId = string;
export type BenotungId = string;

export interface Fach {
  name: string;
  id: FachId;
}

export interface Lehrer {
  id: LehrerId;
  kuerzel: string;
  pflichtstundenanzahl?: number;
  faecherIds: FachId[];
}

/**
 * Eine Klasse ist eine Gruppe von Schülern, die gemeinsam unterrichtet werden.  Sie hat in einem bestimmten
 * Schuljahr neu gestartet, also z.B. 5. Klasse im Schuljahr 2021/22.
 * Das Kuerzel dient der Unterscheridung der Klassen in A-Klasse usw., die aktuelle Bezichnung der Klasse, z.B. 6a,
 * ergibt sich immer aus dem Eingangsschuljahr und der Eingangsjahrgangsstufe und haengt davon ab, in welchem
 * aktuellen Schuljahr man die Klasse betrachtet.
 * Es ist so gedacht, dass jede Klasse fuer sich ueber den gesamten Zeitraum, in dem sie existiert, eindeutig identifizierbar ist,
 * der ja mehrere Schuljahr umfasst.  Daher ist die KlasseId eindeutig, aber die Jahrgangsstufe sind in verschiedenen Schuljahren
 * natuerlich nicht eindeutig.
 */
export interface Klasse {
  id: KlasseId;
  kuerzel: string; // z.B. a, b, c, d
  eingangsSchuljahr: SchuljahrId; // y.z. 2021/22
  eingangsJahrgangsstufe: number; // z.B. 5
}

// export interface Zeitabschnitt {
//   id: ZeitabschnittId;
//   schuljahr: number;
//   halbjahr: string;
//   version: number;
// }

// type ZuteilungId = string;

// im Zeitabschnitt XZ (z.B. 2021/22, 1. Halbjahr) ist die Klasse 5A in dem Fach C dem Lehrer AB zugeordnet
// interface Zuteilung {
//   id: ZuteilungId;
//   zeitabschnittId: ZeitabschnittId;
//   klasseId: KlasseId;
//   fachId: FachId;
//   lehrerId: LehrerId;
// }

export interface Schuljahr {
  id: SchuljahrId;
  name: string;
  startjahr: number; // z.B. 2021
}

/**
 *  In der Organisationsform merken wir uns, wie die Jahrgangsstufen organisiert sind,
 * insbesondere wie viele Unterterme es pro Schuljahr gibt (Halbjahre, Trimester, Quartale, ...)
 * und wie viele Klausuren es pro Unterterm gibt.
 */
export interface Organisationsform {
  id: OrganisationsformId;
  /// Gueltig ab diesem Schuljahr.  In den meisten Schulen wird man das einfach fix auf das erste
  /// Schuljahr setzen, in dem die Schule mit dem System anfaengt und muss es nie mehr aendern.
  gueltigVon: SchuljahrId;
  /// Gueltig bis zu diesem Schuljahr.  Wenn das nicht gesetzt ist, ist die Organisationsform
  /// weiterhin gueltig.  Kann in der Regel offen gelassen werden, weil sich die Organisationsform
  /// fast nie aendert.
  gueltigBis?: SchuljahrId;

  // z.B. Klasse 10
  jahrgangsstufe: number;

  // z.B. [3, 2] wuerde bedeuten, es sind zwei Halbjahre pro Schuljahr (weil das Array 2 Eintraege hat) und im 1. HJ gibt es 3 Klausuren, im 2. HJ nur noch 2 Klausuren
  periodenUndKlausuren: number[];
}

// Fuer jede normale Schule muesste man wqhrscheinlich nur einmal eine allgemeine Organisationsform anlegen, die fuer alle Jahrgangsstufen, alle Gymnasien, Gesamtschulen usw. gilt,
// weil ueberall pro Schuljahr 2 Halbjahre sind und in jedem Halbjahr 3 Klausuren geschrieben werden usw.

/**
 * Eine Benotung enthaelt fuer eine durchgefuehrte Klassenarbeit oder Klausur die Note, die die Klasse im Durchschnitt erreicht hat.
 */

export interface Benotung {
  id: BenotungId; // zufaellig vergeben (in MongoDB waere das eine ObjectId)
  schuljahrId: SchuljahrId;
  klasseId: KlasseId;
  lehrerId: LehrerId; // Der Lehrer, der die Klausur geschrieben-/abgenommen hat
  periodenNummer: number; // z.B. 1 fuer 1. Halbjahr, 2 fuer 2. Halbjahr oder 1-4 wenn es Quartale sind usw.
  laufendeNummer: number; // z.B. 2 fuer 2. KLausur in der obigen Periode (z.B. 1. HJ)
  note: number; // Durchschnittsnote der Klasse
  fachId: FachId;
}

// export interface VorgabeUnterrichtsverteilung {
//   id: VorgabeId;
//   zeitabschnittId: ZeitabschnittId;
//   klassenIds: KlasseId[];
//   fachId: FachId;
//   stundenanzahl: number;
// }

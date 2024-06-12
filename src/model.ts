export type FachId = string;
export type LehrerId = string;
export type KlasseId = string;
export type ZeitabschnittId = string;
export type VorgabeId = string;

export interface Fach {
  name: string;
  id: FachId;
}

export interface Lehrer {
  id: LehrerId;
  kuerzel: string;
  pflichtstundenanzahl: number;
  faecherIds: FachId[];
}

export interface Klasse {
  id: KlasseId;
  name: string;
  jahrgang: number;
  lehrerId: LehrerId;
}

export interface Zeitabschnitt {
  id: ZeitabschnittId;
  schuljahr: number;
  halbjahr: string;
  version: number;
}

export interface Vorgabe {
  id: VorgabeId;
  zeitabschnittId: ZeitabschnittId;
  klassenIds: KlasseId[];
  fachId: FachId;
  stundenanzahl: number;
}

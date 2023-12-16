export class Adresse {
  readonly id: string;
  readonly longitude: number;
  readonly lattitude: number;
  readonly description: string;
  readonly adresse: string;
  readonly telephone: string;
  readonly titre: string;

  constructor(
    id: string,
    longitude: number,
    lattitude: number,
    description: string,
    adresse: string,
    telephone: string,
    titre: string,
  ) {
    this.id = id;
    this.longitude = longitude;
    this.lattitude = lattitude;
    this.description = description;
    this.adresse = adresse;
    this.telephone = telephone;
    this.titre = titre;
  }
}

export interface AdresseRepo {
  getAllAdresses(): Promise<Adresse[]>;
}

import { Adresse, AdresseRepo } from "../../_domain/Adresse";
import { HygraphClient } from "../HygraphClient";

export class AdresseGateway implements AdresseRepo {
  async getAllAdresses(): Promise<Adresse[]> {
    const hygraph = new HygraphClient(process.env.HYGRAPH_URL);
    const { adresses } = await hygraph.fetchAllAdresses();
    if (!adresses)
      throw new Error("erreur lors de la récuperation des données");
    return adresses.map(
      (adresse) =>
        new Adresse(
          adresse.id,
          adresse.longitude,
          adresse.lattitude,
          adresse.description,
          adresse.adresse,
          adresse.telephone,
          adresse.titre,
        ),
    );
  }
}

import { Adresse, AdresseRepo } from "../../_domain/Adresse";
import { gql, GraphQLClient } from "graphql-request";
import { AdresseType } from "../../_types/AdresseType";
import { getAllAdressesQuery } from "../Queries";

export class AdresseGateway implements AdresseRepo {
  async getAllAdresses(): Promise<Adresse[]> {
    if (!process.env.HYGRAPH_URL) throw new Error("Connexion au cms erroné");
    const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);
    const { adresses } = await hygraph.request<{ adresses: AdresseType[] }>(
      getAllAdressesQuery,
    );
    if (!adresses) return null;
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

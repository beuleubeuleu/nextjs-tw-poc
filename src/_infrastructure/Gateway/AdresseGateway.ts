import { Adresse, AdresseRepo } from "../../_domain/Adresse";
import { gql, GraphQLClient } from "graphql-request";
import { AdresseType } from "../../_types/AdresseType";
import { getAllAdressesQuery } from "../gqlQueries";
import { HygraphClient } from "../HygraphClient";

export class AdresseGateway implements AdresseRepo {
  async getAllAdresses(): Promise<Adresse[]> {
    const hygraph = new HygraphClient(process.env.HYGRAPH_URL);
    const { adresses } = await hygraph.get<{ adresses: AdresseType[] }>(
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

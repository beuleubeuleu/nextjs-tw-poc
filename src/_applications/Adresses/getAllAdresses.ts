import { gql } from "graphql-request";
import { Adresse } from "./Adresse";
import { AdresseType } from "../../_types/AdresseType";
import { hygraph } from "../../_infrastructure/hygraph";

const getAllAdressesQuery = gql`
  {
    adresses {
      id
      longitude
      lattitude
      description
      adresse
      telephone
      titre
    }
  }
`;

export async function getAllAdresses(): Promise<Adresse[]> {
  const { adresses } = await hygraph.request<{ adresses: AdresseType[] }>(
    getAllAdressesQuery,
  );
  if (adresses)
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
  return null;
}

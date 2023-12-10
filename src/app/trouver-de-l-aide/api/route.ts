import { gql } from "graphql-request";
import { hygraph } from "../../../infrastructure/hygraph";

const getAdressesQuery = gql`
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

type Adresses = {
  adresses: {
    id: string;
    longitude: number;
    lattitude: number;
    description: string;
    adresse: string;
    telephone: string;
    titre: string;
  }[];
};

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request): Promise<any> {
  const { adresses } = await hygraph.request<Adresses>(getAdressesQuery);
  if (adresses) return new Response(JSON.stringify(adresses));
  return null;
}

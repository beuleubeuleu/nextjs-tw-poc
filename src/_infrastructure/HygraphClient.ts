import { GraphQLClient, gql } from "graphql-request";
import { FicheTutoType } from "../_types/FicheTutoType";
import { AdresseType } from "../_types/AdresseType";

export class HygraphClient {
  private client: GraphQLClient;

  constructor(url: string | undefined) {
    if (!url) throw new Error("Connexion au cms erroné");
    this.client = new GraphQLClient(url);
  }

  private async get<T>(query: string): Promise<T> {
    return await this.client.request(query);
  }

  public async fetchAllAdresses(): Promise<{ adresses: AdresseType[] }> {
    return await this.get<{ adresses: AdresseType[] }>(allAdressesQuery);
  }

  public async fetchFeaturedFichesTutos(): Promise<{ posts: FicheTutoType[] }> {
    return await this.get<{ posts: FicheTutoType[] }>(featuredFicheTutoQuery);
  }

  public async fetchUnePageDeFichesTutos(
    page: number,
  ): Promise<pageDeFicheTutoResponseData> {
    return await this.get<pageDeFicheTutoResponseData>(
      unePageDeFichesTutosQuery(page),
    );
  }
}

const featuredFicheTutoQuery = gql`
  {
    posts(first: 3) {
      id
      title
    }
  }
`;

export const unePageDeFichesTutosQuery = (page: number) => gql`
  {
    postsConnection(first: 5, skip: ${page ? (page - 1) * 5 : 1}) {
      edges {
        node {
          title
          id
        }
      }
      aggregate {
        count
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

type pageDeFicheTutoResponseData = {
  postsConnection: {
    edges: {
      node: FicheTutoType;
    }[];
    aggregate: {
      count: number;
    };
    pageInfo: {
      hasNextPage: Boolean;
      hasPreviousPage: Boolean;
    };
  };
};

const allAdressesQuery = gql`
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

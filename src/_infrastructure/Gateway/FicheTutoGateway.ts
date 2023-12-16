import { FicheTuto, FicheTutoRepo } from "../../_domain/FicheTuto";
import { GraphQLClient } from "graphql-request";
import { FicheTutoType } from "../../_types/FicheTutoType";
import {
  featuredFicheTutoQuery,
  getUnePageDeFichesTutosQuery,
} from "../Queries";

export class FicheTutoGateway implements FicheTutoRepo {
  async getFeatured(): Promise<FicheTuto[]> {
    if (!process.env.HYGRAPH_URL) throw new Error("Connexion au cms erroné");
    const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);

    const { posts } = await hygraph.request<{ posts: FicheTutoType[] }>(
      featuredFicheTutoQuery,
    );
    if (!posts) return null;
    return posts.map((post) => new FicheTuto(post.id, post.title));
  }

  async getUnePageDeFichesTutos(page: number): Promise<{
    fichesTutos: FicheTuto[];
    nombreTotalDeFichesTutos: number;
    hasPreviousPage: Boolean;
    hasNextPage: Boolean;
  }> {
    if (!process.env.HYGRAPH_URL) throw new Error("Connexion au cms erroné");
    const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);

    type data = {
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

    const { postsConnection } = await hygraph.request<data>(
      getUnePageDeFichesTutosQuery(page),
    );
    if (!postsConnection) return null;

    const fichesTutos = postsConnection.edges.map(
      (item) => new FicheTuto(item.node.id, item.node.title),
    );
    const nombreTotalDeFichesTutos = postsConnection.aggregate.count;
    const hasPreviousPage = postsConnection.pageInfo.hasPreviousPage;
    const hasNextPage = postsConnection.pageInfo.hasNextPage;

    return {
      fichesTutos,
      nombreTotalDeFichesTutos,
      hasPreviousPage,
      hasNextPage,
    };
  }
}

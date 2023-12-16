import { FicheTuto, FicheTutoRepo } from "../../_domain/FicheTuto";
import { GraphQLClient } from "graphql-request";
import { FicheTutoType } from "../../_types/FicheTutoType";
import {
  featuredFicheTutoQuery,
  getUnePageDeFichesTutosQuery,
  pageDeFicheTutoResponseData,
} from "../gqlQueries";
import { HygraphClient } from "../HygraphClient";

export class FicheTutoGateway implements FicheTutoRepo {
  async getFeatured(): Promise<FicheTuto[]> {
    const hygraph = new HygraphClient(process.env.HYGRAPH_URL);

    const { posts } = await hygraph.get<{ posts: FicheTutoType[] }>(
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
    const hygraph = new HygraphClient(process.env.HYGRAPH_URL);

    const { postsConnection } = await hygraph.get<pageDeFicheTutoResponseData>(
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

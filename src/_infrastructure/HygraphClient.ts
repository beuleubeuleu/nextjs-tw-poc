import { GraphQLClient } from "graphql-request";

export class HygraphClient {
  private client: GraphQLClient;

  constructor(url: string) {
    if (!url) throw new Error("Connexion au cms erroné");
    this.client = new GraphQLClient(url);
  }

  public async get<T>(query: string): Promise<T> {
    return await this.client.request(query);
  }
}

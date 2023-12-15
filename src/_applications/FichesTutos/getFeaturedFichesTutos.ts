import { gql } from "graphql-request";
import { hygraph } from "../../_infrastructure/hygraph";
import { FicheTuto } from "./FicheTuto";
import { FicheTutoType } from "../../_types/FicheTutoType";

const featuredFicheTutoQuery = gql`
  {
    posts(first: 3) {
      id
      title
    }
  }
`;

export async function getFeaturedFichesTutos(): Promise<FicheTuto[]> {
  const { posts } = await hygraph.request<{ posts: FicheTutoType[] }>(
    featuredFicheTutoQuery,
  );
  if (posts) return posts.map((post) => new FicheTuto(post.id, post.title));
  return null;
}

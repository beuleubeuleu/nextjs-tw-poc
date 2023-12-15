import { gql } from "graphql-request";
import { hygraph } from "../../_infrastructure/hygraph";
import { Post } from "./Post";
import { PostType } from "../../_types/PostType";

const featuredPostsQuery = gql`
  {
    posts(first: 3) {
      id
      title
    }
  }
`;

export async function getFeaturedPosts(): Promise<Post[]> {
  const { posts } = await hygraph.request<{ posts: PostType[] }>(
    featuredPostsQuery,
  );
  if (posts) return posts.map((post) => new Post(post.id, post.title));
  return null;
}

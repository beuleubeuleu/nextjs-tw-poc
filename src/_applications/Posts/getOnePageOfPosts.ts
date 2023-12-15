import { gql } from "graphql-request";
import { hygraph } from "../../_infrastructure/hygraph";
import { Post } from "./Post";
import { PostType } from "../../_types/PostType";

const getPostsByPageQuery = (page: number) => gql`
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

type data = {
  postsConnection: {
    edges: {
      node: PostType;
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

export async function getOnePageOfPosts(page: number) {
  const { postsConnection } = await hygraph.request<data>(
    getPostsByPageQuery(page),
  );
  if (!postsConnection) return null;

  const posts = postsConnection.edges.map(
    (item) => new Post(item.node.id, item.node.title),
  );
  const totalPosts = postsConnection.aggregate.count;
  const hasPreviousPage = postsConnection.pageInfo.hasPreviousPage;
  const hasNextPage = postsConnection.pageInfo.hasNextPage;

  return { posts, totalPosts, hasPreviousPage, hasNextPage };
}

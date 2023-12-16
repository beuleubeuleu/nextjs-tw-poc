import { gql } from "graphql-request";
import { hygraph } from "../../_infrastructure/hygraph";
import { FicheTuto } from "../../_domain/FicheTuto";
import { FicheTutoType } from "../../_types/FicheTutoType";

const getUnePageDeFichesTutosQuery = (page: number) => gql`
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

export async function getUnePageDeFichesTutos(page: number) {
  const { postsConnection } = await hygraph.request<data>(
    getUnePageDeFichesTutosQuery(page),
  );
  if (!postsConnection) return null;

  const posts = postsConnection.edges.map(
    (item) => new FicheTuto(item.node.id, item.node.title),
  );
  const nombreTotalDeFichesTutos = postsConnection.aggregate.count;
  const hasPreviousPage = postsConnection.pageInfo.hasPreviousPage;
  const hasNextPage = postsConnection.pageInfo.hasNextPage;

  return {
    posts,
    nombreTotalDeFichesTutos,
    hasPreviousPage,
    hasNextPage,
  };
}

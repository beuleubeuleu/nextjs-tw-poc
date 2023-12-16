import { gql } from "graphql-request";

export const getAllAdressesQuery = gql`
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
export const featuredFicheTutoQuery = gql`
  {
    posts(first: 3) {
      id
      title
    }
  }
`;

export const getUnePageDeFichesTutosQuery = (page: number) => gql`
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

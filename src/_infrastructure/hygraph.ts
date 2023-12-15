import { GraphQLClient } from "graphql-request";

if (!process.env.HYGRAPH_URL) throw new Error("Connexion au cms erroné");
export const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);

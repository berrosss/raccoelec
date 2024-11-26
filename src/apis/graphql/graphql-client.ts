import { GraphQLClient } from "graphql-request";

const endpoint = `https://raccoelec.fr/graphql`;
export const client = new GraphQLClient(endpoint);
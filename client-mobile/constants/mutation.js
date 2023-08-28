import { gql } from "@apollo/client";

export const CREATE_RENTAL = gql`
  mutation Mutation($bicycleToken: String!) {
    createRental(bicycleToken: $bicycleToken)
  }
`;

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

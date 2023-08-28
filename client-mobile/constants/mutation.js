import { gql } from "@apollo/client";

export const CREATE_RENTAL = gql`
  mutation Mutation($bicycleToken: String!) {
    createRental(bicycleToken: $bicycleToken)
  }
`;

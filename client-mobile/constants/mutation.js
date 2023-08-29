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

export const CREATE_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password)
  }
`;

export const CHANGE_PASSWORD = gql`
mutation Mutation($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
`;

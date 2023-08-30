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

export const DONE_RENTAL = gql`
  mutation Mutation(
    $travelledDistance: Int!
    $totalPrice: Int!
    $rentalId: Int!
    $stationToken: String!
    $transaction: String!
  ) {
    doneRental(
      travelledDistance: $travelledDistance
      totalPrice: $totalPrice
      rentalId: $rentalId
      stationToken: $stationToken
      transaction: $transaction
    )
  }
`;

export const MUTATION_TOPUP_BALANCE = gql`
  mutation Mutation($amount: Int!) {
    topUpBalance(amount: $amount)
  }
`;

export const MUTATION_GENERATE_MIDTRANS_TOKEN = gql`
  mutation Mutation($amount: Int) {
    generateMidtranToken(amount: $amount) {
      redirect_url
      token
    }
  }
`;
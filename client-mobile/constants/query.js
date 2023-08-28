import { gql } from "@apollo/client";

export const GET_STATIONS = gql`
  query Query {
    getStations {
      id
      name
      address
      latitude
      longitude
      Bicycles {
        id
        name
        feature
        imageURL
        description
        price
        StationId
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query Query {
    getUsers {
    id
    username
    role
    email
    password
    balance
  }
}
`;

export const GET_USERS = gql`
  query Query {
    getUsers {
      id
      username
      role
      email
      password
      balance
    }
  }
`;

export const GET_USERS_DETAIL = gql`
query GetUsersDetails {
  getUsersDetails {
    id
    username
    role
    email
    password
    balance
    Rentals {
      travelledDistance
      BicycleId
      UserId
      id
      status
      totalPrice
      transaction
      createdAt
      updatedAt
    }
    Transactions {
      User {
        Transactions {
          UserId
          action
          amount
          id
        }
      }
    }
  }
}
`;


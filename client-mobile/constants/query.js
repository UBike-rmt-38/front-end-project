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
    upatedAt
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




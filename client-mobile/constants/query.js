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

export const GET_BICYCLES = gql`
  query GetBicycles {
    getBicycles {
      id
      name
      feature
      imageURL
      description
      price
      StationId
      CategoryId
      status
      Station {
        id
        name
        address
        latitude
        longitude
        createdAt
        updatedAt
      }
      Category {
        id
        name
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const GET_USERS_DETAILS = gql`
  query GetUsersDetails {
    getUsersDetails {
      id
      username
      role
      email
      password
      balance
      Rentals {
        id
        status
        travelledDistance
        totalPrice
        UserId
        BicycleId
        transaction
        createdAt
        updatedAt
      }
      Transactions {
        id
        action
        amount
        UserId
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_RENTALS = gql`
  query GetRentals {
    getRentals {
      id
      status
      travelledDistance
      totalPrice
      UserId
      BicycleId
      transaction
      createdAt
      updatedAt
    }
  }
`;

export const CHECK_RENTALS = gql`
  query GetUsersDetails {
    getUsersDetails {
      Rentals {
        id
        status
        travelledDistance
        totalPrice
        UserId
        BicycleId
        transaction
        createdAt
        updatedAt
      }
      balance
    }
  }
`;

export const GET_BICYCLE_BY_ID = gql`
  query GetBicycleById($bicycleId: Int) {
    getBicycleById(bicycleId: $bicycleId) {
      id
      price
      StationId
    }
  }
`;

export const GET_STATION_BY_ID = gql`
  query GetStationsById($stationId: Int) {
    getStationsById(stationId: $stationId) {
      id
      name
      address
      latitude
      longitude
    }
  }
`;

export const QUERY_BALANCE = gql`
  query Query {
    balance
  }
`;
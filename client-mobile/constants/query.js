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
`
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
    }
  }
}
`

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
`


import gql from "graphql-tag";

export const GET_STATIONS = gql`
query GetStations {
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
      upatedAt
    }
    createdAt
    upatedAt
  }
}
  
`;
export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
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
    status
    createdAt
    upatedAt
  }
}
`;

export const GET_BICYCLE_BY_ID = gql`
query GetBicycleById {
  getBicycleById {
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
      upatedAt
    }
    Category {
      id
      name
      description
      createdAt
      upatedAt
    }
    createdAt
    upatedAt
  }
}
`;

export const GET_RENTAL_REPORT = gql`
  query GetRentalReport {
    getRentalReport {
      id
      status
      travelledDistance
      totalPrice
      UserId
      BicycleId
      transaction
      createdAt
      upatedAt
    }
  }
`;

export const GET_USERS = gql`
query GetUsers {
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
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
      CategoryId
      status
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;
export const GET_CATEGORIES = gql`
query GetCategories {
  getCategories {
    id
    name
    description
    createdAt
    updatedAt
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
    createdAt
    updatedAt
  }
}
`;

export const GET_BICYCLE_BY_ID = gql`
query Query($bicycleId: Int) {
  getBicycleById(bicycleId: $bicycleId) {
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
      name
    }
    Category {
      name
    }
    createdAt
    updatedAt
  }
}
`;


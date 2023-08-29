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
    updatedAt
  }
}
`;

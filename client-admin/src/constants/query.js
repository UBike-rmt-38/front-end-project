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
export const ADD_BICYCLE = gql`
  mutation Mutation(
    $name: String!
    $feature: String!
    $imageUrl: String!
    $description: String!
    $price: Int!
    $stationId: Int!
    $categoryId: Int!
  ) {
    addBicycle(
      name: $name
      feature: $feature
      imageURL: $imageUrl
      description: $description
      price: $price
      StationId: $stationId
      CategoryId: $categoryId
    )
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

export const GET_STATION_DETAIL = gql`
  query GetStations($stationId: Int) {
  getStationsById(stationId: $stationId) {
    id
    name
    address
    latitude
    longitude
    Bicycles {
      id
      name
      imageURL
      status
    }
  }
}
`


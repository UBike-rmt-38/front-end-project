import { gql } from "@apollo/client";

export const ADD_STATIONS = gql`
  mutation Mutation(
    $name: String!
    $address: String!
    $latitude: String!
    $longtitude: String!
  ) {
    addStation(
      name: $name
      address: $address
      latitude: $latitude
      longtitude: $longtitude
    )
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

export const DELETE_BICYCLES = gql`
mutation DeleteBicycle($bicycleId: Int!) {
  deleteBicycle(bicycleId: $bicycleId)
}
`;

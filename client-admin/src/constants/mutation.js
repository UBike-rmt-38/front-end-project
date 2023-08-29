import { gql } from "@apollo/client";

export const ADD_STATIONS = gql`
  mutation AddStation(
    $name: String!
    $address: String!
    $latitude: String!
    $longitude: String!
  ) {
    addStation(
      name: $name
      address: $address
      latitude: $latitude
      longitude: $longitude
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

export const EDIT_BICYCLE = gql`
mutation EditBicycle(
  $bicycleId: Int!, 
  $name: String!, 
  $feature: String!, 
  $imageUrl: String!, 
  $description: String!, 
  $price: Int!, 
  $stationId: Int!
  ) {
  editBicycle(
    bicycleId: $bicycleId, 
    name: $name, 
    feature: $feature, 
    imageURL: $imageUrl, 
    description: $description, 
    price: $price, 
    StationId: $stationId)
}
`;

export const DELETE_BICYCLES = gql`
mutation DeleteBicycle($bicycleId: Int!) {
  deleteBicycle(bicycleId: $bicycleId)
}
`;
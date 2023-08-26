import { gql } from "@apollo/client";

export const ADD_STATIONS = gql`
  mutation Mutation(
    $name: String
    $address: String
    $latitude: String
    $longtitude: String
  ) {
    addStation(
      name: $name
      address: $address
      latitude: $latitude
      longtitude: $longtitude
    )
  }
`;

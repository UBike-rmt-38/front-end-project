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
      }
    }
  }
`;

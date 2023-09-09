import * as SecureStore from "expo-secure-store";

export async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

export async function saveAccessToken(access_token) {
  try {
    await SecureStore.setItemAsync("access_token", access_token);
    // console.log(access_token);
  } catch (error) {
    console.log(error);
  }
}

export async function saveRentingStatus(renting_status) {
  try {
    await SecureStore.setItemAsync("renting_status", renting_status);
    console.log(renting_status);
  } catch (error) {
    console.log(error);
  }
}
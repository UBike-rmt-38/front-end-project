import * as SecureStore from "expo-secure-store";

export async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

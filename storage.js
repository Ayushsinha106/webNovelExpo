import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving value:", error);
  }
};

export const retrieveValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error("Error retrieving value:", error);
  }
};

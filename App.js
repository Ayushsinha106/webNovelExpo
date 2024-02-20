// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar } from "react-native";
import HomePage from "./HomePage";
import ScrollWithFixedView from "./ScrollWithFixedView";
import ChapterRead from "./ChapterRead";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          detachPreviousScreen: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            title: "WebNovel",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={ScrollWithFixedView}
          options={{
            title: "Novel Detail",
            headerStyle: {
              backgroundColor: "#111",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="chapter"
          component={ChapterRead}
          options={({ route }) => ({
            title: route.params?.chapterTitle || "Chapter **",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 14,
            },
          })}
        />

        {/* <Stack.Screen name="Chapter" component={ChapterRead} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

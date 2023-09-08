import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import LogOutButton from "../components/LogOutButton";
import ComeBackButton from "../components/ComeBackButton";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let backgroundColor;

          if (route.name === "Posts") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "CreatePosts") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          backgroundColor = focused ? "tomato" : "transparent";

          return (
            <View
              style={[
                style.iconContainer,
                { backgroundColor: backgroundColor },
              ]}
            >
              <Ionicons name={iconName} size={24} color={color} />
            </View>
          );
        },

        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingBottom: 22,
        },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerRight: () => <LogOutButton /> }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{ headerLeft: () => <ComeBackButton /> }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerLeft: () => <ComeBackButton /> }}
      />
    </Tabs.Navigator>
  );
};

const style = StyleSheet.create({
  iconContainer: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default Home;

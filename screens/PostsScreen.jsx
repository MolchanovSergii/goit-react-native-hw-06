import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authReducer";

import { auth, db } from "../config";
import { collection, getDocs } from "firebase/firestore";
import { Feather, EvilIcons } from "@expo/vector-icons";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const userLocation = route.params?.userLocation;
  const photoUri = route.params?.photoUri;
  const photoName = route.params?.photoName;
  const locationName = route.params?.locationName;

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(logOut());
      navigation.navigate("Login");
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={handleLogOut}>
          <Feather name="log-out" size={24} color="black" />
        </TouchableOpacity>
      ),
    });

    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postList);
    };

    fetchPosts();
  }, [navigation, handleLogOut]);

  return (
    <ScrollView contentContainerStyle={style.container}>
      {posts.map((post) => (
        <View key={post.id} style={style.post_container}>
          <Image source={{ uri: post.photoUri }} style={style.photo} />
          <Text style={style.photoName}>{post.photoName}</Text>

          <View style={style.iconContainer}>
            <TouchableOpacity
              style={style.message_icon}
              onPress={() =>
                navigation.navigate("CommentsScreen", {
                  postId: post.id,
                  imageUrl: post.photoUri,
                })
              }
            >
              <Feather name="message-circle" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={style.location_icon}
              onPress={() =>
                navigation.navigate("MapScreen", {
                  location: post.userLocation,
                })
              }
            >
              <EvilIcons name="location" size={24} color="black" />
              <Text style={style.location_title}>{post.locationName}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomStyle: "solid",
  },

  post_container: {
    height: 299,
    width: "100%",
  },

  photo: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  photoName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 18.75,
    marginTop: 3,
    marginBottom: 3,
  },
  iconContainer: {
    height: 24,
    flexDirection: "row",
  },

  message_icon: {
    width: 39,
    marginRight: 15,
    alignItems: "center",
  },
  location_icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  location_title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 18.75,
  },
});

export default PostsScreen;

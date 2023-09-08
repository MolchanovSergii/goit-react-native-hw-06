import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { Feather, EvilIcons } from "@expo/vector-icons";

const PostsScreen = ({ route, navigation }) => {
  const userLocation = route.params?.userLocation;
  const photoUri = route.params?.photoUri;
  const photoName = route.params?.photoName;
  const locationName = route.params?.locationName;

  return (
    <View style={style.container}>
      <View style={style.post_container}>
        {photoUri && <Image source={{ uri: photoUri }} style={style.photo} />}
        <Text style={style.photoName}>{photoName}</Text>

        <View style={style.iconContainer}>
          <TouchableOpacity
            style={style.message_icon}
            onPress={() => navigation.navigate("CommentsScreen")}
          >
            <Feather name="message-circle" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={style.location_icon}
            onPress={() =>
              navigation.navigate("MapScreen", { location: userLocation })
            }
          >
            <EvilIcons name="location" size={24} color="black" />
            <Text style={style.location_title}>{locationName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

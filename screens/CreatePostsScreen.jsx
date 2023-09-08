import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [photoName, setPhotoName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (photoUri) {
      navigation.navigate("Posts", {
        userLocation,
        photoUri,
        photoName,
        locationName,
      });
    }
  }, [photoUri]);

  useFocusEffect(
    useCallback(() => {
      setPhotoUri("");
    }, [])
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleTakePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoUri(uri);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync(location.coords);

    const truncateAddress = (address, length = 25) => {
      return address.length > length
        ? address.substr(0, length - 1) + "…"
        : address;
    };

    if (address && address.length) {
      const fullAddress = `${address[0].country}, ${address[0].region}`;
      const truncatedAddress = truncateAddress(fullAddress);
      setLocationName(truncatedAddress);
    }

    setUserLocation(location);

    await handleTakePhoto();

    setLoading(false);
  };

  return (
    <View style={style.container}>
      {photoUri ? (
        <Image style={style.camera} source={{ uri: photoUri }} />
      ) : (
        <Camera style={style.camera} type={type} ref={setCameraRef}>
          <View style={style.photoView}>
            <TouchableOpacity
              style={style.flipContainer}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.button}
              onPress={async () => {
                if (cameraRef) {
                  handleTakePhoto();
                }
              }}
            >
              <View style={style.takePhotoOut}>
                <Feather name="camera" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <TextInput
        placeholder="Назва"
        style={style.input}
        value={photoName}
        onChangeText={setPhotoName}
      />
      <TextInput
        placeholder="Місцевість"
        style={style.input}
        value={locationName}
        onChangeText={setLocationName}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity onPress={handlePublish} style={style.publishButton}>
          <Text>Опублікувати</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomStyle: "solid",
  },
  camera: { height: 240, marginTop: 10, marginBottom: 10 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.2,
    alignSelf: "flex-end",
    paddingRight: 10,
  },

  button: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: 25 }],
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "transparent",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },

  publishButton: {
    height: 40,

    backgroundColor: "#FF6C00",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
  },
});

export default CreatePostsScreen;

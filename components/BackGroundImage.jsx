import { ImageBackground, StyleSheet } from "react-native";

const BackGroundImage = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/photo_bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default BackGroundImage;

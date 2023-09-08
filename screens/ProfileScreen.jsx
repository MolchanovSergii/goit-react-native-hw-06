import { Text, View, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={style.container}>
      <Text style={style.title}>ProfileScreen</Text>
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
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.41,
    textAlign: "center",
    marginBottom: 33,
  },
});

export default ProfileScreen;

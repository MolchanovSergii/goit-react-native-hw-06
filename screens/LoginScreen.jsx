import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackGroundImage from "../components/BackGroundImage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === "" || login === "") {
      Alert.alert(
        "!!Обратите внимание!!",
        "все поля формы регистрации должны быть заполнены"
      );
      return;
    }

    navigation.navigate("Home");
    setEmail("");
    setLogin("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackGroundImage>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={style.container}>
            <Text style={style.title}>Увійти</Text>
            <TextInput
              style={style.input}
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
            ></TextInput>
            <TextInput
              style={style.input}
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
            ></TextInput>
            <TouchableOpacity style={style.button} onPress={handleLogin}>
              <Text style={style.buttonText}>Увійти</Text>
            </TouchableOpacity>
            <Text
              style={style.titleQuestion}
              onPress={() => navigation.navigate("Registration")}
            >
              Немає акаунту? Зареєструватися
            </Text>
          </View>
        </KeyboardAvoidingView>
      </BackGroundImage>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35.16,
    textAlign: "center",
    marginBottom: 33,
  },
  titleQuestion: {
    color: "#1B4371",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: "100%",
    height: 50,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    width: "100%",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default LoginScreen;

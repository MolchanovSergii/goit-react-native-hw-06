import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackGroundImage from "../components/BackGroundImage";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === "" || login === "" || password === "") {
      Alert.alert(
        "!!Обратите внимание!!",
        "все поля формы регистрации должны быть заполнены"
      );
      return;
    }

    navigation.navigate("Home");
    setEmail("");
    setLogin("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackGroundImage>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={style.container}>
            <Image
              source={require("../assets/add_photo.png")}
              style={style.logoUser}
            />
            <Image
              style={style.addUser}
              source={require("../assets/add.png")}
            ></Image>
            <Text style={style.title}>Реєстрація</Text>
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
            <TextInput
              style={style.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
            ></TextInput>
            <TouchableOpacity style={style.button} onPress={handleLogin}>
              <Text style={style.buttonText}>Зареєстуватися</Text>
            </TouchableOpacity>
            <Text
              style={style.titleQuestion}
              onPress={() => navigation.navigate("Login")}
            >
              Вже є акаунт? Увійти
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 80,
    paddingBottom: 20,
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
    marginBottom: 15,
  },
  titleQuestion: {
    color: "#1B4371",
    textAlign: "center",
  },

  logoUser: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },

  addUser: {
    position: "absolute",
    top: 20,
    left: 203,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: "100%",
    height: 50,
    marginBottom: 12,
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
export default RegistrationScreen;

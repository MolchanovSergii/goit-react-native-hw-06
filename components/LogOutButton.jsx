import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const LogOutButton = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity style={{ marginRight: 15 }} onPress={handleLogOut}>
      <Ionicons name="log-out-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default LogOutButton;

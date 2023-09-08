import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const ComeBackButton = () => {
  const navigation = useNavigation();

  const handleComeBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={{ marginLeft: 15 }} onPress={handleComeBack}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ComeBackButton;

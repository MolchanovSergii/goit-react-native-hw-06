import { Image, View, Text } from "react-native";

const Comment = ({
  time,
  img,
  direction = "row-reverse",
  text,
  textAlign = "left",
}) => {
  return (
    <View style={{ flexDirection: direction, gap: 16, marginBottom: 24 }}>
      <Image source={img} />
      <View
        style={{
          width: "100%",
          backgroundColor: "#00000008",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 6,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          padding: 16,
          flexShrink: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 13,
            lineHeight: 18,
            color: "#212121",
            marginBottom: 8,
          }}
        >
          {text}
        </Text>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 10,
            lineHeight: 11.72,
            textAlign: textAlign,
            color: "#BDBDBD",
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

export default Comment;

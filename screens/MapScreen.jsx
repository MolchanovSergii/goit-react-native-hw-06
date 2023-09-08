import MapView, { Marker } from "react-native-maps";
import { Text, View, StyleSheet } from "react-native";

const MapScreen = ({ route }) => {
  const { location } = route.params;

  return (
    <View style={style.container}>
      <MapView
        style={style.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Photo Location"
        />
      </MapView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

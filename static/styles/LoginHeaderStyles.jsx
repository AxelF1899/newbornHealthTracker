import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const rem = 32; // 1 rem = 16 pixels
const distanceFromTop = 3 * rem; // 3 rem in pixels

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: distanceFromTop,
    alignItems: "center",
    width: screenWidth,
  },
  logoImage: {
    width: 140,
    maxWidth: "100%",
    aspectRatio: "1.21",
  },
});

export default styles;

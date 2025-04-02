import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: height * 0.05, // 5% de la altura de la pantalla
    alignItems: "center",
    width: "100%", // Ocupa todo el ancho de la pantalla
  },
  logoImage: {
    width: width * 0.35, // 35% del ancho de la pantalla
    aspectRatio: 1.21, // Mantiene la proporción de la imagen
    maxWidth: 140, // Límite máximo de ancho
  },
});

export default styles;

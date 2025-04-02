import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "Nunito, sans-serif",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: "#00A49B",
    borderRadius: 40,
    paddingVertical: height * 0.02, // 2% de la altura de la pantalla
    paddingHorizontal: width * 0.1, // 20% del ancho de la pantalla
    marginTop: height * 0.04,
    marginBottom: height * 0.04,
    marginHorizontal: width * 0.001,
  },
  startButton: {
    backgroundColor: "#00A49B",
    borderRadius: 40,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    marginTop: height * 0.8, // Ajustado dinámicamente
    marginBottom: height * 0.002,
    marginHorizontal: width * 0.05,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: width * 0.047, // 5% del ancho de la pantalla
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
  },
  signupPrompt: {
    marginTop: height * 0.05,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: width * 0.035,
    fontWeight: "400",
    letterSpacing: 1.5,
    color: "#FFFFFF",
  },
  signupLinkContainer: {
    padding: 0,
    margin: 0,
    height: 15,
  },
  signupLink: {
    fontSize: width * 0.035,
    fontWeight: "450",
    letterSpacing: 1.5,
    color: "#00A49B",
    textDecorationLine: "underline", // Corregido
    height: height * 0.03,
  },
  formContainer: {
    width: "100%", // Ajustado dinámicamente
    minWidth: 310,
    padding: width * 0.08,
    borderRadius: 37,
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    color: "#00A49B",
    fontSize: 15,
  },
  heading: {
    fontSize: width * 0.06,
    fontWeight: "700",
    color: "#00A49B",
    marginBottom: height * 0.05,
    marginTop: height * 0.03,
  },
  forgotPassword: {
    color: "#00A49B",
    fontSize: width * 0.04,
    marginVertical: height * 0.03,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
  },
  loaderText: {
    marginTop: height * 0.01,
    fontSize: width * 0.04,
    color: "#00A49B",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default styles;

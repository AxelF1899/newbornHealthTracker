import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    borderRadius: 37,
    backgroundColor: "rgb(255, 255, 255)",
    alignItems: "center",
    marginTop: 40,
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
    fontSize: 24,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 1)",
    marginBottom: 45,
  },
  forgotPassword: {
    color: "#00A49B",
    fontSize: 15,
    marginTop: 30,
  },
});

export default styles;

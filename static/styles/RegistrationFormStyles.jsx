import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 900,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginTop: 250,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 37,
    width: 400,
    padding: 48,
    paddingTop: 28,
    paddingBottom: 18,
    marginTop: 12,
    alignItems: "center",
    marginBottom: 220,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: "Nunito, sans-serif",
    fontWeight: "700",
    letterSpacing: 2.4,
    color: "#000000",
    marginBottom: 42,
  },
  registerButton: {
    backgroundColor: "#000",
    borderRadius: 40,
    paddingVertical: 16,
    paddingHorizontal: 70,
    marginTop: 0,
  },
  registerButtonText: {
    fontFamily: "Nunito, sans-serif",
    fontSize: 20,
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 2,
    backgroundColor: "#00A49B",
  },
  loginLink: {
    marginTop: 31,
  },
  loginLinkText: {
    color: "#E5E5E5",
    fontSize: 15,
    fontFamily: "Nunito, sans-serif",
    letterSpacing: 1.5,
  },
  loginLinkHighlight: {
    textDecorationLine: "underline",
  },
});

export default styles;

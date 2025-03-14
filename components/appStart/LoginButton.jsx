import * as React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function LoginButton() {
  const navigation = useNavigation();
  return (
    <View style={styles.formContainer}>
      
      <TouchableOpacity
        style={styles.loginButton}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Login button"
        accessibilityHint="Press to log in"
        onPressIn={() => navigation.navigate('LoginForm')}
      >
        <Text style={styles.loginButtonText}>Inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    marginTop: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#00A49B",
    borderRadius: 40,
    paddingVertical: 16,
    paddingHorizontal: 67,
    marginTop: 500,
    marginBottom: 25,
    marginHorizontal: 51,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
  },
});

export default LoginButton;
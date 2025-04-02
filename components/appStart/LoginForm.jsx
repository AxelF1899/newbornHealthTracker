
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import InputField from "../registerForm/InputField";
import styles from "../../static/styles/LoginScreenStyles";

export default function LoginForm({ email, setEmail, password, setPassword, handleLogin, isLoading }) {
  return (
    <>
      <Text style={styles.heading}>Bienvenido a NHT</Text>
      <InputField
        id="email"
        label="E-mail"
        type="email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        id="password"
        label="Contraseña"
        inputType="password"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Botón de inicio de sesión"
        accessibilityHint="Presiona para iniciar sesión"
      >
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
    </>
  );
}


import React from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "../../static/styles/LoginScreenStyles";

export default function AuthForm({
  formType,
  animationStyle,
  setFormType,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleRegister,
  isLoading,
  nombre,
  setNombre,
  apellido,
  setApellido,
  telefono,
  setTelefono,
  fechaNacimiento,
  setFechaNacimiento,
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 120,
          margin: 0,
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.formContainer, animationStyle]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setFormType(null)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Botón de volver"
            accessibilityHint="Presiona para volver"
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          {formType === "login" ? (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              isLoading={isLoading}
            />
          ) : (
            <RegisterForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              nombre={nombre}
              setNombre={setNombre}
              apellido={apellido}
              setApellido={setApellido}
              telefono={telefono}
              setTelefono={setTelefono}
              fechaNacimiento={fechaNacimiento}
              setFechaNacimiento={setFechaNacimiento}
              handleRegister={handleRegister}
              isLoading={isLoading}
            />
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// components/InitialButtons.js
import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "../../static/styles/LoginScreenStyles";

export default function InitialButtons({ setFormType, loginButtonOpacity, loginButtonTranslateY }) {
  return (
    <View>
      <Animated.View
        style={{
          opacity: loginButtonOpacity,
          transform: [{ translateY: loginButtonTranslateY }],
        }}
      >
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setFormType("login")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Login button"
          accessibilityHint="Presiona para iniciar sesión"
        >
          <Text style={styles.loginButtonText}>Inicio de sesión</Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.signupPrompt}>
        <Text style={styles.signupText}>
          ¿No tiene cuenta?{" "}
          <TouchableOpacity
            style={styles.signupLinkContainer}
            onPress={() => setFormType("register")}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Crear nueva cuenta"
            accessibilityHint="Presiona para crear una nueva cuenta"
          >
            <Text style={styles.signupLink}>¡cree una aquí!</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

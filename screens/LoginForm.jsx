import * as React from "react";
import { View, StyleSheet, Image, Text, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import FormInput from "../components/loginForm/FormInput";
import ActionButton from "../components/loginForm/ActionButton";

const inputFields = [
  { id: "email", label: "E-mail", type: "email" },
  { id: "password", label: "Contraseña", type: "password" }
];

function LoginForm() {
  return (
    <ImageBackground
      source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e9dea173558acc5307323f6ba2c1ed12a641bf30002bb406ff7e2008ae00a4a6?placeholderIfAbsent=true&apiKey=374ad6a310a543b0ae577aa7b0d0737e" }}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              accessibilityLabel="Company logo"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f5a0553aa9896f1ede9d5a5fd6ef98e27265183c44dc0af63340b40202a5b3f9?placeholderIfAbsent=true&apiKey=374ad6a310a543b0ae577aa7b0d0737e" }}
              style={styles.logo}
            />
          </View>
          
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.formContainer}>
              <Text style={styles.heading}>
                Bienvenido a NHT
              </Text>

              {inputFields.map((field) => (
                <FormInput
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.type}
                />
              ))}

              <ActionButton label="Iniciar sesión" />

              <Text style={styles.forgotPassword}>
                Olvidé mi contraseña
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default LoginForm;

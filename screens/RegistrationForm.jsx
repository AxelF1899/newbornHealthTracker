import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import InputField from "../components/registerForm/InputField";
import DatePicker from "../components/registerForm/DatePicker";
import AnimatedLoginForm from "../components/loginForm/AnimatedLoginForm";
import styles from "../static/styles/RegistrationFormStyles";

const RegistrationForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigation = useNavigation();

  const handleLoginPress = () => {
    setShowLoginForm(true);
  };

  const handleBackPress = () => {
    setShowLoginForm(false);
  };

  return (
    <ImageBackground
      accessibilityLabel="Background image"
      resizeMode="cover"
      source={{
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/e9dea173558acc5307323f6ba2c1ed12a641bf30002bb406ff7e2008ae00a4a6?placeholderIfAbsent=true&apiKey=374ad6a310a543b0ae577aa7b0d0737e",
      }}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, width: '100%' }}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formWrapper}>
              <Image
                accessibilityLabel="NHT Logo"
                resizeMode="contain"
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f5a0553aa9896f1ede9d5a5fd6ef98e27265183c44dc0af63340b40202a5b3f9?placeholderIfAbsent=true&apiKey=374ad6a310a543b0ae577aa7b0d0737e",
                }}
                style={styles.logo}
              />
              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Regístrate en NHT</Text>

                <InputField label="Nombre(s)" />
                <InputField label="Apellido(s)" />
                <InputField label="E-mail" inputType="email" />
                <InputField label="Contraseña" inputType="password" />
                <InputField label="Teléfono" inputType="tel" />

                <DatePicker label="Fecha de nacimiento" />

                <TouchableOpacity
                  style={styles.registerButton}
                  accessibilityRole="button"
                  accessibilityLabel="Registrarme"
                >
                  <Text style={styles.registerButtonText}>Registrarme</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginLink}
                  accessibilityRole="link"
                  onPress={handleLoginPress}
                >
                  <Text style={styles.loginLinkText}>
                    Ya tengo una cuenta{" "}
                    <Text style={styles.loginLinkHighlight}>Iniciar Sesión</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {showLoginForm && <AnimatedLoginForm onBackPress={handleBackPress} />}
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationForm;

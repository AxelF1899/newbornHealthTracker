import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
  BackHandler,
  Alert,
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import LoginHeader from "../components/appStart/LoginHeader";
import InputField from "../components/registerForm/InputField";
import DatePicker from "../components/registerForm/DatePicker";
import styles from "../static/styles/LoginScreenStyles";
import { ActivityIndicator } from "react-native";

export default function LoginScreen() {
  const [formType, setFormType] = useState(null); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const animation = useRef(new Animated.Value(0)).current; // Animación general
  const loginButtonOpacity = useRef(new Animated.Value(0)).current; // Animación de opacidad
  const loginButtonTranslateY = useRef(new Animated.Value(50)).current;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (formType) {
          setFormType(null);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [formType])
  );

  useEffect(() => {
    // Animación de opacidad y movimiento cuando el formulario regresa a null
    if (formType === null) {
      Animated.parallel([
        Animated.timing(loginButtonOpacity, {
          toValue: 1, // Opacidad final (completamente visible)
          duration: 1200, // Duración de la animación
          easing: Easing.ease, // Suavizado de la animación
          useNativeDriver: true, // Usa el driver nativo para mejor rendimiento
        }),
        Animated.timing(loginButtonTranslateY, {
          toValue: 0, // El botón se mueve a la posición original
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Si el formulario tiene un tipo distinto de null, aseguramos que la opacidad sea 0 y el botón esté abajo
      loginButtonOpacity.setValue(0);
      loginButtonTranslateY.setValue(50); // Esto mueve el botón fuera de la vista (hacia abajo)
    }
  }, [formType]); // Solo se ejecutará cuando formType cambie

  useEffect(() => {
    if (formType) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [formType]);

  // Registro
  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !nombre ||
      !apellido ||
      !telefono ||
      !fechaNacimiento
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true); // Activar el loader

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Guardar la información adicional del usuario en Firestore
      await setDoc(doc(db, "nbht_user", user.uid), {
        nombre,
        apellido,
        email,
        telefono,
        fechaNacimiento: fechaNacimiento.toISOString(),
      });

      // Registro exitoso
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false); // Desactivar el loader (se ejecuta siempre, haya error o no)
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true); // Activar el loader

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Verificar si el usuario existe en la colección nbht_user
      const userDoc = await getDoc(doc(db, "nbht_user", user.uid));
      if (!userDoc.exists()) {
        Alert.alert("Error", "El usuario no está registrado en nbht_user.");
        await auth.signOut();
        setIsLoading(false); // Desactivar el loader
        return;
      }

      // Inicio de sesión exitoso
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false); // Desactivar el loader (se ejecuta siempre, haya error o no)
    }
  };

  // Restablecimiento de contraseña
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor, introduce tu correo electrónico.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Éxito",
        "Se ha enviado un correo para restablecer la contraseña."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const formAnimationStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        resizeMode="cover"
        accessibilityRole="image"
        accessibilityLabel="Login background"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d2035885c4ac0ba5f77eb05f25b201ab5bd134543de1b5c6cb86ec8296cf1699?placeholderIfAbsent=true&apiKey=374ad6a310a543b0ae577aa7b0d0737e",
        }}
        style={styles.backgroundImage}
      >
        <LoginHeader />
        {!formType ? (
          <View>
            <Animated.View
              style={{
                opacity: loginButtonOpacity, // Animación de opacidad
                transform: [{ translateY: loginButtonTranslateY }], // Animación de movimiento desde abajo
              }}
            >
              <TouchableOpacity
                style={styles.startButton}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Login button"
                accessibilityHint="Press to log in"
                onPress={() => setFormType("login")} 
              >
                <Text style={styles.loginButtonText}>Inicio de sesión</Text>
              </TouchableOpacity>
            </Animated.View>
            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>
                ¿No tiene cuenta?{" "}
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Create new account"
                  accessibilityHint="Press to create a new account"
                  style={styles.signupLinkContainer}
                  onPress={() => setFormType("register")}
                >
                  <Text style={styles.signupLink}>¡cree una aquí!</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        ) : (
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
              <Animated.View style={[styles.formContainer, formAnimationStyle]}>
                <TouchableOpacity
                  style={styles.backButton}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Back button"
                  accessibilityHint="Press to go back"
                  onPress={() => setFormType(null)} // Vuelve al estado inicial (null)
                >
                  <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                {formType === "login" ? (
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
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel="Login button"
                      accessibilityHint="Press to log in"
                      onPress={handleLogin}
                      disabled={isLoading}
                    >
                      <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <Text style={styles.forgotPassword}>
                      Olvidé mi contraseña
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.heading}>Regístrate en NHT</Text>
                    <InputField
                      label="Nombre(s)"
                      value={nombre}
                      onChangeText={setNombre}
                    />
                    <InputField
                      label="Apellido(s)"
                      value={apellido}
                      onChangeText={setApellido}
                    />
                    <InputField
                      label="E-mail"
                      type="email"
                      value={email}
                      onChangeText={setEmail}
                    />
                    <InputField
                      label="Contraseña"
                      inputType="password"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <InputField
                      label="Confirmar Contraseña"
                      inputType="password"
                    />
                    <InputField
                      label="Teléfono"
                      inputType="tel"
                      value={telefono}
                      onChangeText={setTelefono}
                    />
                    <DatePicker
                      label="Fecha de nacimiento"
                      value={fechaNacimiento}
                      onChange={setFechaNacimiento}
                    />
                    <TouchableOpacity
                      style={styles.loginButton}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel="Register button"
                      accessibilityHint="Press to register"
                      onPress={handleRegister}
                      disabled={isLoading}
                    >
                      <Text style={styles.loginButtonText}>Registrarme</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}

        {/* Loader */}
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#00A49B" />
            <Text style={styles.loaderText}>Cargando...</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
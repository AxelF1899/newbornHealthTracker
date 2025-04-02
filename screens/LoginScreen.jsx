
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  ImageBackground,
  BackHandler,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import LoginHeader from "../components/appStart/LoginHeader";
import InitialButtons from "../components/appStart/InitialButtons";
import AuthForm from "../components/appStart/AuthForm";
import Loader from "../components/appStart/Loader";
import styles from "../static/styles/LoginScreenStyles";

export default function LoginScreen() {
  const [formType, setFormType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const loginButtonOpacity = useRef(new Animated.Value(0)).current;
  const loginButtonTranslateY = useRef(new Animated.Value(50)).current;
  const navigation = useNavigation();

  // Manejo del botón de retroceso en Android
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

  // Animación para mostrar/ocultar el botón inicial
  useEffect(() => {
    if (formType === null) {
      Animated.parallel([
        Animated.timing(loginButtonOpacity, {
          toValue: 1,
          duration: 1200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(loginButtonTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      loginButtonOpacity.setValue(0);
      loginButtonTranslateY.setValue(50);
    }
  }, [formType]);

  // Animación para el formulario
  useEffect(() => {
    Animated.timing(animation, {
      toValue: formType ? 1 : 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [formType]);

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

  // Función para registrar usuarios
  const handleRegister = async () => {
    if (!email || !password || !nombre || !apellido || !telefono || !fechaNacimiento) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "nbht_user", user.uid), {
        nombre,
        apellido,
        email,
        telefono,
        fechaNacimiento: fechaNacimiento.toISOString(),
      });
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para iniciar sesión
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "nbht_user", user.uid));
      if (!userDoc.exists()) {
        Alert.alert("Error", "El usuario no está registrado en nbht_user.");
        await auth.signOut();
        setIsLoading(false);
        return;
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        resizeMode="cover"
        accessibilityRole="image"
        accessibilityLabel="Fondo de Login"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d2035885c4ac0ba5f77eb05f25b201ab5bd134543de1b5c6cb86ec8296cf1699?placeholderIfAbsent=true&apiKey=374ad6a310a543b0ae577aa7b0d0737e",
        }}
        style={styles.backgroundImage}
      >
        <LoginHeader />
        {!formType ? (
          <InitialButtons
            setFormType={setFormType}
            loginButtonOpacity={loginButtonOpacity}
            loginButtonTranslateY={loginButtonTranslateY}
          />
        ) : (
          <AuthForm
            formType={formType}
            animationStyle={formAnimationStyle}
            setFormType={setFormType}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            isLoading={isLoading}
            nombre={nombre}
            setNombre={setNombre}
            apellido={apellido}
            setApellido={setApellido}
            telefono={telefono}
            setTelefono={setTelefono}
            fechaNacimiento={fechaNacimiento}
            setFechaNacimiento={setFechaNacimiento}
          />
        )}
        <Loader isLoading={isLoading} />
      </ImageBackground>
    </View>
  );
}

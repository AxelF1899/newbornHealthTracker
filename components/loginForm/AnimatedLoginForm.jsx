import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  BackHandler,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import FormInput from "../loginForm/FormInput";
import ActionButton from "../loginForm/ActionButton";
import styles from "../../static/styles/AnimatedLoginFormStyles";

const inputFields = [
  { id: "email", label: "E-mail", type: "email" },
  { id: "password", label: "Contraseña", type: "password" }
];

const AnimatedLoginForm = ({ onBackPress }) => {
  const [showForm, setShowForm] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateIn();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        if (showForm) {
          animateOut();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [showForm])
  );

  const animateIn = () => {
    setShowForm(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const animateOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setShowForm(false);
      if (onBackPress) {
        onBackPress();
      }
    });
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
    <Animated.View style={[styles.formContainer, formAnimationStyle]}>
      {showForm ? (
        <>
          <TouchableOpacity
            style={styles.backButton}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Back button"
            accessibilityHint="Press to go back"
            onPress={animateOut}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Bienvenido a NHT</Text>
          {inputFields.map((field) => (
            <FormInput key={field.id} id={field.id} label={field.label} type={field.type} />
          ))}
          <ActionButton label="Iniciar sesión" />
          <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
        </>
      ) : null}
    </Animated.View>
  );
};

export default AnimatedLoginForm;

import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Animated } from 'react-native';

export default function Loader({ isLoading }) {
  // Creamos referencias para las animaciones
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current; // Comienza desplazado hacia abajo

  useEffect(() => {
    if (isLoading) {
      // Animación cuando comienza la carga
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1, // Hacerlo completamente visible
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // Moverlo a su posición original
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animación cuando termina la carga
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0, // Hacerlo invisible
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50, // Moverlo hacia abajo nuevamente
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isLoading]);

  // Si no está cargando, no renderizamos nada
  if (!isLoading) return null;

  return (
    <Animated.View
      style={[
        styles.loaderContainer,
        { opacity: opacity, transform: [{ translateY: translateY }] },
      ]}
    >
      {/* Asegúrate de que el ActivityIndicator tenga la animación giratoria */}
      <ActivityIndicator
        size="large"
        color="#00A49B"
        //style={styles.spinner}
        animating={isLoading} // Asegúrate de que la animación esté habilitada
      />
      <Text style={styles.loaderText}>Cargando...</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
  spinner: {
    marginBottom: 10,
  },
  loaderText: {
    fontSize: 16,
    color: '#00A49B',
  },
});

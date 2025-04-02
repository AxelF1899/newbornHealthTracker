import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada esta librería

const { width, height } = Dimensions.get('window');

const InputField = ({ label, inputType, value, onChangeText, type }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          accessibilityLabel={label}
          textContentType={inputType}
          secureTextEntry={inputType === 'password' && !isPasswordVisible} // Oculta o muestra la contraseña
          keyboardType={
            type === 'email'
              ? 'email-address'
              : inputType === 'tel'
              ? 'phone-pad'
              : 'default'
          }
        />
        {inputType === 'password' && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.toggleButton}
            accessible={true}
            accessibilityLabel={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="#c1c1c1"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.02, // 2% de la altura de la pantalla
    marginHorizontal: width * 0.05, // 5% del ancho de la pantalla
  },
  label: {
    color: '#c1c1c1',
    fontSize: width * 0.035, // 3.5% del ancho de la pantalla
    fontFamily: 'Nunito, sans-serif',
    letterSpacing: 1.6,
    marginBottom: height * 0.015, // 1.5% de la altura de la pantalla
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c1c1c1',
  },
  input: {
    flex: 1,
    paddingBottom: height * 0.001, // 1% de la altura de la pantalla
    fontSize: width * 0.04, // 4% del ancho de la pantalla
    fontFamily: 'Nunito, sans-serif',
    color: '#00A49B',
  },
  toggleButton: {
    marginLeft: width * 0.02, // 2% del ancho de la pantalla
  },
});

export default InputField;
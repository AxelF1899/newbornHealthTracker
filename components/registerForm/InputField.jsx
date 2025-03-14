import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, inputType, value, onChangeText, type }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        textContentType={inputType}
        secureTextEntry={inputType === 'password'}
        keyboardType={type === 'email' ? 'email-address' : inputType === 'tel' ? 'phone-pad' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 14,
    marginHorizontal: 20,
  },
  label: {
    color: '#c1c1c1',
    fontSize: 14,
    fontFamily: 'Nunito, sans-serif',
    letterSpacing: 1.6,
    marginBottom: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#c1c1c1',
    paddingBottom: 8,
    fontSize: 14,
    fontFamily: 'Nunito, sans-serif',
    color: '#00A49B',
  },
});

export default InputField;
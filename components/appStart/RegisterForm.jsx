// components/RegisterForm.js
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import InputField from "../registerForm/InputField";
import DatePicker from "../registerForm/DatePicker";
import styles from "../../static/styles/LoginScreenStyles";

export default function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  nombre,
  setNombre,
  apellido,
  setApellido,
  telefono,
  setTelefono,
  fechaNacimiento,
  setFechaNacimiento,
  handleRegister,
  isLoading,
}) {
  return (
    <>
      <Text style={styles.heading}>Regístrate en NHT</Text>
      <InputField label="Nombre(s)" value={nombre} onChangeText={setNombre} />
      <InputField label="Apellido(s)" value={apellido} onChangeText={setApellido} />
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
      <InputField label="Confirmar Contraseña" inputType="password" />
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
        onPress={handleRegister}
        disabled={isLoading}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Botón de registro"
        accessibilityHint="Presiona para registrarte"
      >
        <Text style={styles.loginButtonText}>Registrarme</Text>
      </TouchableOpacity>
    </>
  );
}

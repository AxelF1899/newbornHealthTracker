import * as React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../../static/styles/FormInputStyles";

function FormInput({ id, label, type }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={type === "password"}
        keyboardType={type === "email" ? "email-address" : "default"}
        autoCapitalize="none"
      />
    </View>
  );
}

export default FormInput;

import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ActionButton({ label }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => navigation.navigate('Home')}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    alignSelf: "stretch",
    marginTop: 69,
    paddingLeft: 62,
    paddingRight: 62,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#00a49c",
    filter: "contrast(2) brightness(1))",
    
  },
  buttonText: {
    fontSize: 20,
    color: "rgb(255, 255, 255)",
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    
  },
});

export default ActionButton;
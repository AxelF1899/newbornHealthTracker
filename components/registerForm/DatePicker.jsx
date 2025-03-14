import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({ label }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor="#00A49B"
        accentColor="#00A49B"
        themeVariant="light" 
        confirmTextIOS="Confirmar" 
        cancelTextIOS="Cancelar" 
        locale="es_ES" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24,
  },
  label: {
    color: "#c1c1c1",
    fontSize: 14,
    fontFamily: "Nunito, sans-serif",
    letterSpacing: 1.6,
    marginBottom: 14,
  },
  dateButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#c1c1c1",
    paddingBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Nunito, sans-serif",
    color: "#00A49B",
  },
});

export default DatePicker;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DatePicker from "../components/registerForm/DatePicker";
import { auth, db } from "../firebaseConfig"; // Importa Firebase
import { collection, doc, addDoc, getDoc } from "firebase/firestore";

const BabyRegister = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [apgar, setApgar] = useState("");
  const [silverman, setSilverman] = useState("");
  const [capurro, setCapurro] = useState("");
  const [notes, setNotes] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const handleSave = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("Error", "Usuario no autenticado.");
      return;
    }
  
    // Validar campos obligatorios
    if (!name || !lastname || !birthDate) {
      Alert.alert("Error", "Por favor, completa los campos obligatorios.");
      return;
    }
  
    try {
      // Verificar que el usuario exista en nbht_user
      const userDoc = await getDoc(doc(db, "nbht_user", user.uid));
      if (!userDoc.exists()) {
        Alert.alert("Error", "El usuario no está registrado en nbht_user.");
        return;
      }
  
      // Crear el objeto con los datos del bebé
      const babyData = {
        nombre: name,
        apellido: lastname,
        fechaNacimiento: birthDate.toISOString(), // Guardar la fecha como string
        apgar: apgar || null, // Si no se ingresa, se guarda como null
        silverman: silverman || null,
        capurro: capurro || null,
        notas: notes || null,
        usuarioId: user.uid, // Vincular el bebé al usuario actual
      };
  
      // Guardar el bebé en Firestore
      const docRef = await addDoc(collection(db, "nbht_baby"), babyData);
      console.log("Bebé registrado con ID:", docRef.id);
  
      // Mostrar mensaje de éxito
      Alert.alert("Éxito", "Bebé registrado correctamente.");
  
      // Regresar a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar el bebé:", error);
      Alert.alert("Error", "No se pudo registrar el bebé. Inténtalo de nuevo.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Registrar Bebé</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre"
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
        placeholder="Ingrese el apellido"
      />

      <DatePicker
        label="Fecha de nacimiento"
        value={birthDate}
        onChange={setBirthDate} // Asegúrate de que DatePicker tenga esta prop
      />

      <Text style={styles.label}>Puntuación Apgar</Text>
      <TextInput
        style={styles.input}
        value={apgar}
        onChangeText={setApgar}
        keyboardType="numeric"
        placeholder="Ingrese la puntuación"
      />

      <Text style={styles.label}>Puntuación Silverman</Text>
      <TextInput
        style={styles.input}
        value={silverman}
        onChangeText={setSilverman}
        keyboardType="numeric"
        placeholder="Ingrese la puntuación"
      />

      <Text style={styles.label}>Puntuación Capurro</Text>
      <TextInput
        style={styles.input}
        value={capurro}
        onChangeText={setCapurro}
        keyboardType="numeric"
        placeholder="Ingrese la puntuación"
      />

      <Text style={styles.label}>Notas</Text>
      <TextInput
        style={styles.textarea}
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Notas adicionales"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={navigation.goBack}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 75,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00A49B",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#c1c1c1",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#00A49B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#00A49B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#00A49B",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BabyRegister;

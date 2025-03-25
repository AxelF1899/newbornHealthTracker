import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "../components/registerForm/DatePicker";
import { auth, db } from "../firebaseConfig";
import { collection, doc, addDoc, getDoc } from "firebase/firestore";

const BabyRegister = ({ navigation }) => {
  // Estados del formulario
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [circumference, setCircumference] = useState("");
  const [apgar1, setApgar1] = useState("");
  const [apgar5, setApgar5] = useState("");
  const [silverman, setSilverman] = useState("");
  const [gestationalAge, setGestationalAge] = useState("");

  const [birthType, setBirthType] = useState("");
  const [complications, setComplications] = useState("");

  const [motherAge, setMotherAge] = useState("");
  const [maternalDiseases, setMaternalDiseases] = useState("");
  const [maternalHabits, setMaternalHabits] = useState("");
  const [metabolicScreening, setMetabolicScreening] = useState("");
  const [hearingScreening, setHearingScreening] = useState("");
  const [vaccines, setVaccines] = useState("");
  const [nicuAdmission, setNicuAdmission] = useState("");
  const [hospitalStay, setHospitalStay] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Función para calcular el nivel de riesgo basado en algunos criterios
  // Función robusta para calcular el nivel de riesgo basado en varios criterios
const calculateRiskLevel = () => {
  let risk = 0;

  // Peso
  const parsedWeight = parseFloat(weight);
  if (!isNaN(parsedWeight)) {
    // Bajo peso: riesgo alto
    if (parsedWeight < 2500) {
      risk += 20;
    } else if (parsedWeight >= 4000) {
      // Sobrepeso o macrosomía también puede sumar riesgo (opcional)
      risk += 10;
    }
  }

  // Edad gestacional
  const parsedGestAge = parseFloat(gestationalAge);
  if (!isNaN(parsedGestAge)) {
    if (parsedGestAge < 37) {
      risk += 20; // Prematuridad
    } else if (parsedGestAge > 42) {
      risk += 10; // Riesgo asociado a posmadurez
    }
  }

  // Apgar a 1 minuto
  const parsedApgar1 = parseInt(apgar1);
  if (!isNaN(parsedApgar1)) {
    if (parsedApgar1 < 7) {
      risk += 15;
    }
  }

  // Apgar a 5 minutos
  const parsedApgar5 = parseInt(apgar5);
  if (!isNaN(parsedApgar5)) {
    if (parsedApgar5 < 7) {
      risk += 15;
    }
  }

  // Puntuación Silverman (donde valores altos indican dificultad respiratoria)
  const parsedSilverman = parseInt(silverman);
  if (!isNaN(parsedSilverman)) {
    if (parsedSilverman > 4) {
      risk += 10;
    }
  }

  // Complicaciones en el parto (si el valor es distinto de "Ninguna")
  if (complications && complications !== "Ninguna") {
    risk += 10;
  }

  // Enfermedades maternas (si el valor es distinto de "Ninguna")
  if (maternalDiseases && maternalDiseases !== "Ninguna") {
    risk += 10;
  }

  // Hábitos maternos (si no es "Ninguno", y especialmente si es tabaquismo, consumo de alcohol o sustancias ilícitas)
  if (maternalHabits && maternalHabits !== "Ninguno") {
    if (
      maternalHabits === "Tabaquismo" ||
      maternalHabits === "Consumo de alcohol" ||
      maternalHabits === "Sustancias ilícitas"
    ) {
      risk += 10;
    } else {
      // Otros hábitos pueden sumar menos riesgo
      risk += 5;
    }
  }

  // Ingreso a UCIN: si ya hubo ingreso, se suma riesgo
  if (nicuAdmission && nicuAdmission === "Sí") {
    risk += 10;
  }

  // Tipo de parto: en parto distócico o cesárea se considera un leve incremento en riesgo
  if (birthType) {
    if (birthType === "Distócico") {
      risk += 5;
    } else if (birthType === "Cesárea") {
      risk += 5;
    }
  }

  // Aseguramos que el riesgo no supere el 100%
  return Math.min(risk, 100);
};


  // Función para generar una lista de posibles enfermedades en función de los datos ingresados
  const getPossibleDiseases = () => {
    const diseases = [];
    
    if (weight && parseFloat(weight) < 2500) {
      diseases.push("Bajo peso y riesgo de complicaciones neonatales");
    }
    
    if (gestationalAge && parseFloat(gestationalAge) < 37) {
      diseases.push("Prematuridad y complicaciones asociadas");
    }
    
    if (apgar1 && parseInt(apgar1) < 7) {
      diseases.push("Riesgo de complicaciones neurológicas");
    }
    
    if (apgar5 && parseInt(apgar5) < 7) {
      diseases.push("Riesgo de problemas en la adaptación postnatal");
    }
    
    if (complications && complications !== "Ninguna") {
      diseases.push("Complicaciones relacionadas con el parto");
    }
    
    if (maternalDiseases && maternalDiseases !== "Ninguna") {
      diseases.push("Predisposición a enfermedades metabólicas o cardiovasculares");
    }
    
    if (maternalHabits && maternalHabits !== "Ninguno") {
      diseases.push("Riesgo asociado a hábitos maternos (p.ej., tabaquismo o consumo de alcohol)");
    }
    
    // Puedes seguir agregando criterios según sea necesario
    return diseases;
  };

  // Función para validar los campos del formulario
  const validateForm = () => {
    // Validación de campos obligatorios
    if (!name || !lastname || !birthDate || !sex || !birthType) {
      Alert.alert("Error", "Por favor, completa los campos obligatorios.");
      return false;
    }

    // Validar que los campos numéricos tengan valores numéricos y dentro de rangos razonables
    if (weight && (isNaN(parseFloat(weight)) || parseFloat(weight) <= 0)) {
      Alert.alert("Error", "El peso debe ser un número positivo válido.");
      return false;
    }

    if (length && (isNaN(parseFloat(length)) || parseFloat(length) <= 0)) {
      Alert.alert("Error", "La talla debe ser un número positivo válido.");
      return false;
    }

    if (circumference && (isNaN(parseFloat(circumference)) || parseFloat(circumference) <= 0)) {
      Alert.alert("Error", "La circunferencia debe ser un número positivo válido.");
      return false;
    }

    // Apgar: asumimos un rango de 0 a 10
    if (apgar1 && (isNaN(parseInt(apgar1)) || parseInt(apgar1) < 0 || parseInt(apgar1) > 10)) {
      Alert.alert("Error", "El Apgar al minuto debe estar entre 0 y 10.");
      return false;
    }

    if (apgar5 && (isNaN(parseInt(apgar5)) || parseInt(apgar5) < 0 || parseInt(apgar5) > 10)) {
      Alert.alert("Error", "El Apgar a los 5 minutos debe estar entre 0 y 10.");
      return false;
    }

    if (silverman && (isNaN(parseInt(silverman)) || parseInt(silverman) < 0)) {
      Alert.alert("Error", "La puntuación Silverman debe ser un número válido.");
      return false;
    }

    // Edad gestacional en semanas (rango típico entre 20 y 45)
    if (gestationalAge && (isNaN(parseFloat(gestationalAge)) || parseFloat(gestationalAge) < 20 || parseFloat(gestationalAge) > 45)) {
      Alert.alert("Error", "La edad gestacional debe estar entre 20 y 45 semanas.");
      return false;
    }

    // Edad de la madre (por ejemplo, entre 12 y 60)
    if (motherAge && (isNaN(parseInt(motherAge)) || parseInt(motherAge) < 12 || parseInt(motherAge) > 60)) {
      Alert.alert("Error", "La edad de la madre debe estar entre 12 y 60 años.");
      return false;
    }

    // Estancia hospitalaria (número de días, debe ser positivo)
    if (hospitalStay && (isNaN(parseInt(hospitalStay)) || parseInt(hospitalStay) < 0)) {
      Alert.alert("Error", "La estancia hospitalaria debe ser un número válido de días.");
      return false;
    }

    // Validar que la fecha de nacimiento no sea futura
    const today = new Date();
    if (birthDate > today) {
      Alert.alert("Error", "La fecha de nacimiento no puede ser una fecha futura.");
      return false;
    }

    // Si todas las validaciones pasan, se retorna true
    return true;
  };

  const handleSave = async () => {
    if (isLoading) return;

    // Se valida el formulario antes de continuar
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Usuario no autenticado.");
      setIsLoading(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "nbht_user", user.uid));
      if (!userDoc.exists()) {
        Alert.alert("Error", "El usuario no está registrado en nbht_user.");
        setIsLoading(false);
        return;
      }

      const formattedBirthDate = birthDate.toISOString().split("T")[0];

      // Calcular el nivel de riesgo y obtener la lista de posibles enfermedades
      const riskLevel = calculateRiskLevel();
      const diseasesList = getPossibleDiseases();

      const babyData = {
        nombre: name,
        apellido: lastname,
        fechaNacimiento: formattedBirthDate,
        sexo: sex,
        peso: weight || null,
        talla: length || null,
        circCabeza: circumference || null,
        apgar1: apgar1 || null,
        apgar5: apgar5 || null,
        silverman: silverman || null,
        edadGestacional: gestationalAge || null,
        tipoParto: birthType,
        complicacionesParto: complications || null,
        edadMadre: motherAge || null,
        enfermedadesMaternas: maternalDiseases || null,
        habitosMaternos: maternalHabits || null,
        tamizajeMetabolico: metabolicScreening || null,
        tamizajeAuditivo: hearingScreening || null,
        vacunas: vaccines || null,
        ingresoUCIN: nicuAdmission || null,
        estanciaHospitalaria: hospitalStay || null,
        notas: notes || null,
        usuarioId: user.uid,
        // Nuevos parámetros:
        nivel_riesgo: riskLevel,
        posibles_enfermedades: diseasesList,
      };

      const docRef = await addDoc(collection(db, "nbht_baby"), babyData);
      console.log("Bebé registrado con ID:", docRef.id);
      Alert.alert("Éxito", "Bebé registrado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar el bebé:", error);
      Alert.alert("Error", "No se pudo registrar el bebé. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
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
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
        placeholder="Ingrese el apellido"
        placeholderTextColor="#00A49B"
      />

      <DatePicker
        label="Fecha de nacimiento"
        value={birthDate}
        onChange={setBirthDate}
      />

      <Text style={styles.label}>Sexo</Text>
      <Picker
        selectedValue={sex}
        onValueChange={(itemValue) => setSex(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Masculino (M)" value="M" />
        <Picker.Item label="Femenino (F)" value="F" />
      </Picker>

      <Text style={styles.label}>Peso (g)</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Ingrese el peso"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Talla (cm)</Text>
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={setLength}
        keyboardType="numeric"
        placeholder="Ingrese la talla"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Circ. Cabeza (cm)</Text>
      <TextInput
        style={styles.input}
        value={circumference}
        onChangeText={setCircumference}
        keyboardType="numeric"
        placeholder="Ingrese la circunferencia de la cabeza"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Apgar 1</Text>
      <TextInput
        style={styles.input}
        value={apgar1}
        onChangeText={setApgar1}
        keyboardType="numeric"
        placeholder="Ingrese Apgar al minuto"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Apgar 5</Text>
      <TextInput
        style={styles.input}
        value={apgar5}
        onChangeText={setApgar5}
        keyboardType="numeric"
        placeholder="Ingrese Apgar a los 5 minutos"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Silverman</Text>
      <TextInput
        style={styles.input}
        value={silverman}
        onChangeText={setSilverman}
        keyboardType="numeric"
        placeholder="Ingrese la puntuación Silverman"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Edad Gest. (sem)</Text>
      <TextInput
        style={styles.input}
        value={gestationalAge}
        onChangeText={setGestationalAge}
        keyboardType="numeric"
        placeholder="Ingrese la edad gestacional en semanas"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Tipo de Parto</Text>
      <Picker
        selectedValue={birthType}
        onValueChange={(itemValue) => setBirthType(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Eutócico (parto vaginal sin complicaciones)" value="Eutócico" />
        <Picker.Item label="Distócico (parto vaginal con complicaciones)" value="Distócico" />
        <Picker.Item label="Cesárea" value="Cesárea" />
      </Picker>

      <Text style={styles.label}>Complicaciones Parto</Text>
      <Picker
        selectedValue={complications}
        onValueChange={(itemValue) => setComplications(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Ninguna" value="Ninguna" />
        <Picker.Item label="Sufrimiento fetal" value="Sufrimiento fetal" />
        <Picker.Item label="Prolapso de cordón umbilical" value="Prolapso de cordón umbilical" />
        <Picker.Item label="Desprendimiento de placenta" value="Desprendimiento de placenta" />
        <Picker.Item label="Hemorragia materna" value="Hemorragia materna" />
        <Picker.Item label="Trabajo de parto que no progresa" value="Trabajo de parto que no progresa" />
        <Picker.Item label="Ruptura prematura de membranas" value="Ruptura prematura de membranas" />
        <Picker.Item label="Presentación anómala del feto" value="Presentación anómala del feto" />
        <Picker.Item label="Distocia de hombros" value="Distocia de hombros" />
        <Picker.Item label="Infección intraamniótica" value="Infección intraamniótica" />
        <Picker.Item label="Embolia de líquido amniótico" value="Embolia de líquido amniótico" />
        <Picker.Item label="Rotura uterina" value="Rotura uterina" />
        <Picker.Item label="Placenta accreta" value="Placenta accreta" />
        <Picker.Item label="Otras" value="Otras" />
      </Picker>

      <Text style={styles.label}>Edad Madre</Text>
      <TextInput
        style={styles.input}
        value={motherAge}
        onChangeText={setMotherAge}
        keyboardType="numeric"
        placeholder="Ingrese la edad de la madre"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Enfermedades Maternas</Text>
      <Picker
        selectedValue={maternalDiseases}
        onValueChange={(itemValue) => setMaternalDiseases(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Ninguna" value="Ninguna" />
        <Picker.Item label="Hipertensión gestacional" value="Hipertensión gestacional" />
        <Picker.Item label="Preeclampsia" value="Preeclampsia" />
        <Picker.Item label="Diabetes gestacional" value="Diabetes gestacional" />
        <Picker.Item label="Infecciones (UTI, ITS, estreptococos grupo B)" value="Infecciones" />
        <Picker.Item label="Enfermedades autoinmunes (lupus, artritis)" value="Enfermedades autoinmunes" />
        <Picker.Item label="Enfermedades hematológicas (trombofilia)" value="Enfermedades hematológicas" />
        <Picker.Item label="Enfermedades endocrinas (hipotiroidismo)" value="Enfermedades endocrinas" />
        <Picker.Item label="Obesidad" value="Obesidad" />
        <Picker.Item label="Enfermedades cardíacas" value="Enfermedades cardíacas" />
        <Picker.Item label="Enfermedades renales" value="Enfermedades renales" />
        <Picker.Item label="Enfermedades pulmonares (asma)" value="Enfermedades pulmonares" />
        <Picker.Item label="Enfermedades infecciosas (hepatitis, VIH)" value="Enfermedades infecciosas" />
        <Picker.Item label="Otras" value="Otras" />
      </Picker>

      <Text style={styles.label}>Hábitos Maternos</Text>
      <Picker
        selectedValue={maternalHabits}
        onValueChange={(itemValue) => setMaternalHabits(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Ninguno" value="Ninguno" />
        <Picker.Item label="Tabaquismo" value="Tabaquismo" />
        <Picker.Item label="Consumo de alcohol" value="Consumo de alcohol" />
        <Picker.Item label="Consumo de sustancias ilícitas" value="Sustancias ilícitas" />
        <Picker.Item label="Uso de medicamentos sin prescripción" value="Medicamentos sin prescripción" />
        <Picker.Item label="Exposición a toxinas ambientales" value="Exposición a toxinas" />
        <Picker.Item label="Dieta inadecuada" value="Dieta inadecuada" />
        <Picker.Item label="Sedentarismo" value="Sedentarismo" />
        <Picker.Item label="Estrés crónico" value="Estrés crónico" />
        <Picker.Item label="Otras" value="Otras" />
      </Picker>

      <Text style={styles.label}>Tamizaje Metabólico</Text>
      <Picker
        selectedValue={metabolicScreening}
        onValueChange={(itemValue) => setMetabolicScreening(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="Anormal" value="Anormal" />
      </Picker>

      <Text style={styles.label}>Tamizaje Auditivo</Text>
      <Picker
        selectedValue={hearingScreening}
        onValueChange={(itemValue) => setHearingScreening(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="Referido" value="Referido" />
      </Picker>

      <Text style={styles.label}>Vacunas</Text>
      <Picker
        selectedValue={vaccines}
        onValueChange={(itemValue) => setVaccines(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="BCG" value="BCG" />
        <Picker.Item label="Hepatitis B" value="Hepatitis B" />
        <Picker.Item label="Polio" value="Polio" />
        <Picker.Item label="DTP" value="DTP" />{/* Difteria, Tétanos, Tos ferina */}
        <Picker.Item label="Hib" value="Hib" />{/* Haemophilus influenzae tipo b */}
        <Picker.Item label="Rotavirus" value="Rotavirus" />
        <Picker.Item label="Neumococo" value="Neumococo" />
        <Picker.Item label="Otras" value="Otras" />
      </Picker>

      <Text style={styles.label}>Ingreso UCIN</Text>
      <Picker
        selectedValue={nicuAdmission}
        onValueChange={(itemValue) => setNicuAdmission(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Sí" value="Sí" />
        <Picker.Item label="No" value="No" />
      </Picker>

      <Text style={styles.label}>Estancia Hosp. (días)</Text>
      <TextInput
        style={styles.input}
        value={hospitalStay}
        onChangeText={setHospitalStay}
        keyboardType="numeric"
        placeholder="Ingrese el número de días de estancia"
        placeholderTextColor="#00A49B"
      />

      <Text style={styles.label}>Notas adicionales</Text>
      <TextInput
        style={styles.textarea}
        value={notes}
        onChangeText={setNotes}
        multiline
        placeholder="Escriba datos adicionales del bebé"
        placeholderTextColor="#00A49B"
      />

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#00A49B"
          style={{ marginVertical: 20 }}
        />
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      )}

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
    color: "#00A49B",
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

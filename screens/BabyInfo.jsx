import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DashboardCard from '../components/homeComponents/DashboardCard';
import RiskCard from '../components/homeComponents/RiskCard';

const BabyInfo = ({ route }) => {
  const { baby } = route.params;

  const [expanded, setExpanded] = useState(false);

  // Usamos el valor almacenado en Firestore para el nivel de riesgo.
  // Se asume que baby.nivel_riesgo es un string, por ejemplo "80%"
  const firestoreRiskLevel = baby.nivel_riesgo || "N/A";

  // La recomendación puede derivarse de otros parámetros o simplemente mostrarse fija.
  // En este ejemplo se usa la recomendación basada en si hay enfermedades asociadas.
  const recommendation =
    baby.posibles_enfermedades && baby.posibles_enfermedades.length > 0
      ? "Se recomienda observación médica adicional."
      : "Los indicadores están dentro de lo esperado.";

  const data = [
    { title: "Peso", value: `${baby.peso || 'N/A'} g` },
    { title: "Talla", value: `${baby.talla || 'N/A'} cm` },
    { title: "Circunferencia de la cabeza", value: `${baby.circCabeza || 'N/A'} cm` },
    { title: "Puntuación Apgar al minuto", value: `${baby.apgar1 || 'N/A'}/10` },
    { title: "Puntuación Apgar a los 5 minutos", value: `${baby.apgar5 || 'N/A'}/10` },
    { title: "Semanas de gestación", value: `${baby.edadGestacional || 'N/A'}` },
    { title: "Puntuación Silverman", value: `${baby.silverman || 'N/A'}/10` },
    { title: "Sexo", value: `${baby.sexo || 'N/A'}` },
    { title: "Edad de la madre", value: `${baby.edadMadre || 'N/A'}` },
    { title: "Tipo de parto", value: `${baby.tipoParto || 'N/A'}` },
    { title: "Complicaciones en el parto", value: `${baby.complicacionesParto || 'N/A'}` },
    { title: "Enfermedades maternas", value: `${baby.enfermedadesMaternas || 'N/A'}` },
    { title: "Hábitos maternos", value: `${baby.habitosMaternos || 'N/A'}` },
    { title: "Ingreso a UCIN", value: `${baby.ingresoUCIN ? 'Sí' : 'No'}` },
    { title: "Estancia hospitalaria", value: `${baby.estanciaHospitalaria || 'N/A'} días` },
    { title: "Tamizaje auditivo", value: `${baby.tamizajeAuditivo || 'N/A'}` },
    { title: "Tamizaje metabólico", value: `${baby.tamizajeMetabolico || 'N/A'}` },
    { title: "Vacunas", value: `${baby.vacunas || 'N/A'}` },
  ];

  // Mostrar solo las primeras 6 tarjetas si no está expandido
  const displayedData = expanded ? data : data.slice(0, 6);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>Resumen del Recién Nacido</Text>
        <Text style={styles.babyName}>
          {baby.nombre} {baby.apellido}
        </Text>
        <Text style={styles.birthDate}>Fecha de Nacimiento: {baby.fechaNacimiento}</Text>

        <View style={styles.cardContainer}>
          {displayedData.map((item, index) => (
            <DashboardCard key={index} title={item.title} value={item.value} />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>
            {expanded ? "Mostrar menos" : "Mostrar más"}
          </Text>
        </TouchableOpacity>

        {baby.notas && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Notas:</Text>
            <Text style={styles.notes}>{baby.notas}</Text>
          </View>
        )}

        {/* Renderización del nivel de riesgo basado en los datos almacenados */}
        <View style={styles.riskContainer}>
          <Text style={styles.riskTitle}>Nivel de Riesgo</Text>
          
          <RiskCard riskLevel={firestoreRiskLevel} recommendation={recommendation} />
        </View>

        {/* Lista de posibles enfermedades */}
        {baby.posibles_enfermedades && baby.posibles_enfermedades.length > 0 && (
          <View style={styles.diseasesContainer}>
            <Text style={styles.diseasesTitle}>Posibles Enfermedades</Text>
            {baby.posibles_enfermedades.map((disease, index) => (
              <Text key={index} style={styles.diseaseItem}>
                - {disease}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#00A49B',
    textAlign: 'center',
  },
  babyName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  birthDate: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 1,
  },
  toggleButton: {
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#00A49B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notes: {
    fontSize: 14,
    color: '#555',
  },
  riskContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  riskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#00A49B',
  },
  riskValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  diseasesContainer: {
    marginVertical: 20,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
  },
  diseasesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#D32F2F',
  },
  diseaseItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default BabyInfo;

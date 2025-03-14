import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DashboardCard from '../components/homeComponents/DashboardCard';
import RiskCard from '../components/homeComponents/RiskCard';
import FloatingActionButton from '../components/homeComponents/FloatingActionButton';
import BottomNavigation from '../components/homeComponents/BottomNavigation';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>Resumen del Recién Nacido</Text>
        <View style={styles.cardContainer}>
          <DashboardCard title="Peso" value="3.2 kg" />
          <DashboardCard title="Longitud" value="50 cm" />
          <DashboardCard title="Circunferencia" value="35 cm" />
          <DashboardCard title="Puntuación Apgar" value="8/10" />
        </View>
        <RiskCard 
          riskLevel={0.3} 
          recommendation="Los indicadores están dentro de lo esperado" 
        />
      </ScrollView>
      <FloatingActionButton onPress={() => { console.log('Registrar nueva medición'); }} />
      <BottomNavigation />
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
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;

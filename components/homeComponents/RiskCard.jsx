import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RiskCard = ({ riskLevel, recommendation }) => {
  // riskLevel es un valor entre 0 y 1
  const riskPercentage = Math.round(riskLevel * 100);
  
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Nivel de Riesgo</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${riskPercentage}%` }]} />
      </View>
      <Text style={styles.riskText}>{riskPercentage}%</Text>
      <Text style={styles.recommendationText}>{recommendation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(197,197,197)',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A49B',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgb(197,197,197)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00A49B',
  },
  riskText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
    color: '#333333',
  },
  recommendationText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default RiskCard;

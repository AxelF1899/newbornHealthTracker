import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardCard = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgb(197,197,197)',
    padding: 16,
    marginBottom: 16,
    width: '40%', // dos tarjetas por fila
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A49B',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default DashboardCard;

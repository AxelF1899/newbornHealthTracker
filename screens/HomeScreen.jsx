import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import FloatingActionButton from '../components/homeComponents/FloatingActionButton';
import BottomNavigation from '../components/homeComponents/BottomNavigation';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [babies, setBabies] = useState([]); // Estado para almacenar los bebés
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener los bebés del usuario
  const fetchBabies = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Usuario no autenticado.");
      return;
    }

    try {
      // Consultar los bebés vinculados al usuario
      const babiesQuery = query(
        collection(db, "nbht_baby"),
        where("usuarioId", "==", user.uid)
      );
      const querySnapshot = await getDocs(babiesQuery);

      // Mapear los documentos a un array de bebés
      const babiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Actualizar el estado con los bebés
      setBabies(babiesData);
    } catch (error) {
      console.error("Error al obtener los bebés:", error);
      Alert.alert("Error", "No se pudieron cargar los bebés.");
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  // Cargar los bebés cuando la pantalla se monte
  useEffect(() => {
    fetchBabies();
  }, []);

  // Renderizar cada card de bebé
  const renderPatient = ({ item }) => (
    <TouchableOpacity style={styles.patientCard}>
      <Image source={require('../static/images/bebe.png')} style={styles.patientImage} />
      <Text style={styles.patientName}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lista de pacientes</Text>

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Cargando...</Text>
        </View>
      ) : babies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Aquí verá la lista de sus pacientes cuando los agregue.
          </Text>
        </View>
      ) : (
        <FlatList
          data={babies}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      )}

      <FloatingActionButton onPress={() => navigation.navigate('BabyRegister')} />
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 75,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00A49B',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  gridContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  patientCard: {
    backgroundColor: '#00A49B',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 120,
    height: 120,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  patientImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
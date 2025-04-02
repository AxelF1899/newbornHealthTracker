import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FloatingActionButton from "../components/homeComponents/FloatingActionButton";
import BottomNavigation from "../components/homeComponents/BottomNavigation";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [babies, setBabies] = useState([]);
  const [filteredBabies, setFilteredBabies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState("nameAsc");
  const [isFabLoading, setIsFabLoading] = useState(false); // Estado para el loader del FAB

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "nbht_baby"),
        where("usuarioId", "==", auth.currentUser?.uid)
      ),
      (snapshot) => {
        const babiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBabies(sortBabies(babiesData, sortCriteria));
        setFilteredBabies(sortBabies(babiesData, sortCriteria));
        setLoading(false);
      },
      (error) => {
        console.error("Error al obtener los bebés:", error);
        Alert.alert("Error", "No se pudieron cargar los bebés.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sortCriteria]);

  const sortBabies = (data, criteria) => {
    return [...data].sort((a, b) => {
      const nameA = String(a.nombre || "");
      const nameB = String(b.nombre || "");
      const riskA = Number(a.nivel_riesgo || 0);
      const riskB = Number(b.nivel_riesgo || 0);
      const dateA = a.fechaNacimiento
        ? new Date(a.fechaNacimiento)
        : new Date(0);
      const dateB = b.fechaNacimiento
        ? new Date(a.fechaNacimiento)
        : new Date(0);

      switch (criteria) {
        case "nameAsc":
          return nameA.localeCompare(nameB);
        case "nameDesc":
          return nameB.localeCompare(nameA);
        case "riskHighToLow":
          return riskB - riskA;
        case "riskLowToHigh":
          return riskA - riskB;
        case "dateNewest":
          return dateB - dateA;
        case "dateOldest":
          return dateA - dateB;
        default:
          return 0;
      }
    });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    let filteredData = babies.filter((baby) =>
      baby.nombre.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredBabies(sortBabies(filteredData, sortCriteria));
  };

  const handleFabPress = () => {
    setIsFabLoading(true); // Mostrar el loader
    setTimeout(() => {
      navigation.navigate("BabyRegister");
      setIsFabLoading(false); // Ocultar el loader después de navegar
    },); // Simular un pequeño retraso
  };

  const renderPatient = ({ item }) => (
    <TouchableOpacity
      style={styles.patientCard}
      onPress={() => !isFabLoading && navigation.navigate("BabyInfo", { baby: item })} // Deshabilitar si el loader está activo
      disabled={isFabLoading} // Deshabilitar el botón mientras el loader está activo
    >
      <Image
        source={require("../static/images/bebe.png")}
        style={styles.patientImage}
      />
      <Text style={styles.patientName}>
        {item.nombre
          ? `${item.nombre} ${item.apellido || ""}`
          : "Paciente sin nombre"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lista de pacientes</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar paciente..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleSearch}
        editable={!isFabLoading} // Deshabilitar el campo de búsqueda mientras el loader está activo
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Ordenar por:</Text>
        <Picker
          selectedValue={sortCriteria}
          style={styles.picker}
          onValueChange={(itemValue) => setSortCriteria(itemValue)}
          enabled={!isFabLoading} // Deshabilitar el Picker mientras el loader está activo
        >
          <Picker.Item label="Nombre A - Z" value="nameAsc" />
          <Picker.Item label="Nombre Z - A" value="nameDesc" />
          <Picker.Item label="Mayor riesgo primero" value="riskHighToLow" />
          <Picker.Item label="Menor riesgo primero" value="riskLowToHigh" />
          <Picker.Item label="Más reciente primero" value="dateNewest" />
          <Picker.Item label="Más antiguo primero" value="dateOldest" />
        </Picker>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00A49B" />
          <Text style={styles.loaderText}>Cargando pacientes...</Text>
        </View>
      ) : filteredBabies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontraron pacientes.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBabies}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          ListFooterComponent={<View style={{ height: 120 }} />}
          scrollEnabled={!isFabLoading} // Deshabilitar el scroll mientras el loader está activo
        />
      )}

      {isFabLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#00A49B" />
        </View>
      )}

      <FloatingActionButton onPress={handleFabPress} disabled={isFabLoading} />
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 75,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00A49B",
    textAlign: "center",
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#333",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  gridContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },
  patientCard: {
    backgroundColor: "#00A49B",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
    width: 120,
    height: 120,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
  },
  patientImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    fontSize: 16,
    color: "#888",
  },
  fabLoaderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco semitransparente
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Asegura que esté por encima de otros elementos
  },
});

export default HomeScreen;

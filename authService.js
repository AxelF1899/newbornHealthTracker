import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const registerUser = async (email, password, name) => {
  try {
    // Crear usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar información adicional en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      createdAt: new Date(),
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

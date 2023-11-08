import { db } from "./firebase-config"
import { collection, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { getFirestoreTimestamp } from "./firebase-config"

export const fetchOpeningById = async (openingId) => {
    const openingsCollectionRef = doc(db, "openings", openingId)

    try {
        const openingDoc = await getDoc(openingsCollectionRef)
        if (openingDoc.exists()) {
            // El documento existe, devolvemos los datos
            console.log("fetch de opening por id")
            return { ...openingDoc.data(), id: openingDoc.id }
        } else {
            // El documento no existe, devolvemos null o una respuesta apropiada
            return null
        }
    } catch (error) {
        // Maneja el error y devuelve una respuesta apropiada, como null
        console.error(error)
        return null
    }
}

export const addOpening = async (openingData) => {
    const openingsCollectionRef = collection(db, "openings");

    try {
        const dataToSave = {
            ...openingData,
            time: getFirestoreTimestamp(), // Agrega el timestamp al objeto principal
        };

        const newOpeningRef = await addDoc(openingsCollectionRef, dataToSave);
        console.log("proceso de creación de opening")
        return newOpeningRef.id;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateOpening = async (openingId, updatedData) => {
    try {
        const openingsCollectionRef = doc(db, "openings", openingId);
        const dataToUpdate = {
            ...updatedData,
            time: getFirestoreTimestamp(), // Actualiza el timestamp
        };

        await updateDoc(openingsCollectionRef, dataToUpdate);
        console.log("Proceso de actualización de opening");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const deleteElementInOpening = async (openingId) => {
    try {
        // Obtén una referencia al documento que deseas eliminar
        const openingDocRef = doc(db, "openings", openingId);

        // Elimina el documento en Firestore
        await deleteDoc(openingDocRef);

        console.log("Elemento eliminado exitosamente");
    } catch (error) {
        console.error("Error al eliminar el elemento:", error);
    }
}

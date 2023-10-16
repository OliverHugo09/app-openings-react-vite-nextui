import { db } from "../helpers/firebase-config"
import { doc, getDoc, collection } from "firebase/firestore"

export const fetchUsersById = async (userId) => {
    const userCollectionRef = doc(db, "users", userId)

    try {
        const userDoc = await getDoc(userCollectionRef)
        if (userDoc.exists()) {
            // El documento existe, devolvemos los datos
            return { ...userDoc.data(), id: userDoc.id }
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
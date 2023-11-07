import { useState, useEffect } from "react"
import { onSnapshot, collection } from "firebase/firestore"
import { db } from "../helpers/firebase-config"

export const useOpeningsData = () => {
    const [openings, setOpenings] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        // Crear una referencia a la colección de "openings" en Firestore
        const openingsCollectionRef = collection(db, "openings")

        // Escuchar los cambios en la colección usando onSnapshot
        const unsubscribe = onSnapshot(openingsCollectionRef, (snapshot) => {
            // Mapear los documentos de la colección a un array de objetos
            const updatedOpenings = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // Actualizar el estado "openings" con los datos actualizados
            setOpenings(updatedOpenings)
            // Limpiar el estado de errores, indicando que no hay errores
            setError(null)
        })

        // Función de limpieza para dejar de escuchar los cambios cuando el componente se desmonta
        return () => unsubscribe()
    }, [])  // El segundo argumento es un array de dependencias vacío, lo que significa que este efecto se ejecuta solo una vez al montar el componente

    return { openings, error }
}
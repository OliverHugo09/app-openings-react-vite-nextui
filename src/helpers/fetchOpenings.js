import { db } from "../helpers/firebase-config"
import { collection, getDocs } from "firebase/firestore"

export const fetchopenings = async () => {

    //const [openings, setOpenings] = useState([]);
    const openingsCollectionRef = collection(db, "openings")

    try {
        const data = await getDocs(openingsCollectionRef)
        if (data) {
            return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        } else {
            // Si no se encontraron datos, devuelve un arreglo vacío o null según corresponda
            return [];
        }
    } catch (error) {
        // Maneja el error y devuelve una respuesta apropiada, como un arreglo vacío o null
        console.error(error);
        return [];
    }
}
import { db } from "../helpers/firebase-config"
import { collection, getDocs } from "firebase/firestore"

export const fetchopenings = async (openings) => {

    const openingsCollectionRef = collection(db, "openings")
}
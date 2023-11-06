import { useState, useEffect } from "react"
import { fetchopenings } from "../helpers/crudOpenings"

export const useOpeningsData = () => {

    const [openings, setOpenings] = useState([]);
    const [error, setError] = useState(null);

    const fetchopening = async () => {
        try {
            const data = await fetchopenings();
            setOpenings(data);
            setError(null);
        } catch (error) {
            setError("No se pudieron encontrar los openings");
        }
    }

    // Store the fetched data in local state.
    useEffect(() => {
        fetchopening();
    }, [openings]);

    return { openings, error };
}

import { useState, useMemo } from "react"
import { fetchopenings } from "../helpers/fetchOpenings"

export const useOpeningsData = () => {

    const [openings, setOpenings] = useState([]);
    const [error, setError] = useState(null)

    const fetchopening = async () => {
        try {
            const data = await fetchopenings()
            setOpenings(data)
            setError(null);
        } catch (error) {
            setError("No se pudieron encontrar los openings")
        }
    }

    // Utiliza useMemo para memoizar la variable "openings"
    const memoizedOpenings = useMemo(() => openings, [openings])

    return { openings: memoizedOpenings, error, fetchopening }
}

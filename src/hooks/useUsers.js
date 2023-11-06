import { useEffect, useState } from "react"
import { fetchUsersById } from "../helpers/fetchUser"

export const useUsersData = () => {

    const [user, setUser] = useState([])
    const [error, setError] = useState(null)

    const fetchUser = async () => {
        try {
            const data = await fetchUsersById()
            setUser(data)
            setError(null);
        } catch (error) {
            setError("No se pudo encontrar el usuario")
        }
    }

    // Store the fetched data in local state.
    useEffect(() => {
        fetchUser();
    }, []);

    return { user, error, login }
}

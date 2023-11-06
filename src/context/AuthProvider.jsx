import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import { fetchUsersById } from "../helpers/fetchUser"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userValidation, setUserValidation] = useState(null)
    const userId = import.meta.env.VITE_USER_ID.toString()

    const navigate = useNavigate()

    useEffect(() => {
        // Utiliza el 'openingId' obtenido de la ruta en lugar de un valor estático
        const fetchUser = async () => {
            const userbyId = await fetchUsersById(userId)
            setUserValidation(userbyId)
            console.log("ejecución del usuario provider")
        }
        fetchUser()
    }, [userId])

    const login = (email, password) => {
        // Realiza la comprobación de credenciales aquí
        if (email === userValidation.email && password === userValidation.password) {
            setUser(userValidation)
            navigate("admin/dashboard")
            console.log("proceso de login")
        } else {
            setUser(null)
        }
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
import { OpeningsContext } from "./OpeningsContext"
import { useContext, useEffect } from "react"
import { useOpeningsData } from "../hooks/useOpeningsData"

export const useOpenings = () => {
    const context = useContext(OpeningsContext)
    return context
}

export const OpeningsProvider = ({ children }) => {

    const { openings, fetchopening } = useOpeningsData()

    useEffect(() => {
        fetchopening()
    }, [])

    return (
        <OpeningsContext.Provider value={{ openings }}>
            {children}
        </OpeningsContext.Provider>
    )

}
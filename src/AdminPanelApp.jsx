import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './guard/ProtectedRoute'
import { useContext } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { AuthContext } from './context/AuthContext'

export const AdminPanelApp = () => {

    const { user } = useContext(AuthContext)

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={!!user && user.role.includes("admin")} />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>

    )
}

import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './guard/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { useAuth } from './context/AuthProvider'
import { AddOpeningPage } from './pages/AddOpeningPage'

export const AdminPanelApp = () => {

    const { user } = useAuth()

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={!!user && user.role.includes("admin")} />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/add" element={<AddOpeningPage />} />
            </Route>
        </Routes>

    )
}

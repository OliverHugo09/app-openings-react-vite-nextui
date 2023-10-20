import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './guard/ProtectedRoute'
import { useContext } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { AuthContext } from './context/AuthContext'

export const AdminPanelApp = () => {

    const { user } = useContext(AuthContext)
    const userCommon = true

    return (
        <Routes>
            {/* <Route index element={<HomePage />} /> */}

            <Route element={<ProtectedRoute isAllowed={!!user && user.role.includes("admin")} />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>

            {/* <Route
                        path="/delete"
                        element={
                            <ProtectedRoute
                                redirectTo="/login"
                                isAllowed={!!user && user.roles.includes("admin")}
                            >
                                <Analytics />
                            </ProtectedRoute>
                        }
                    /> */}
        </Routes>

    )
}

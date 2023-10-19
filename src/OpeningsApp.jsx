import { Route, Routes, Outlet, Link, BrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { OpeningsPage } from './pages/OpeningsPage'
import { NavBar } from './components/NavBar'
import { LoginPage } from './pages/LoginPage'
import { OpeningsProvider } from './context/OpeningsProvider'
import { ProtectedRoute } from './guard/ProtectedRoute'
import { useContext } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { AuthContext } from './context/AuthContext'

export const OpeningsApp = () => {

    const { user } = useContext(AuthContext)

    return (
        <OpeningsProvider>
            <NavBar></NavBar>
            <main className="container mx-auto mb-5 mt-4">
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

                    <Route path="/" element={<HomePage />} />
                    <Route path="/opening/:openingId" element={<OpeningsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </OpeningsProvider>

    )
}

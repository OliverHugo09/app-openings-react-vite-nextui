import { Route, Routes, Outlet, Link, BrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoute from './guard/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { OpeningsPage } from './pages/OpeningsPage';
import { NavBar } from './components/NavBar'

export const OpeningsApp = () => {
    return (
        <>
            <NavBar></NavBar>
            <main className="container mx-auto mb-5 mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<PrivateRoute roles={['admin']} />}>
                        <Route index element={<DashboardPage />} />
                    </Route>
                    <Route path="/opening/:openingId" element={<OpeningsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>

    )
}

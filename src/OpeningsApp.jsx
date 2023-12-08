import { Route, Routes, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { OpeningsPage } from './pages/OpeningsPage'
import { NavBar } from './components/NavBar'
import { LoginPage } from './pages/LoginPage'
import { OpeningsProvider } from './context/OpeningsProvider'
import { AdminPanelApp } from './AdminPanelApp'

export const OpeningsApp = () => {

    return (
        <>
            <NavBar />
            <OpeningsProvider>
                <main className="container mx-auto mb-2 mt-1">
                    <Routes>
                        {/* <Route index element={<HomePage />} /> */}
                        <Route path="/admin/*" element={<AdminPanelApp />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/opening/:openingId" element={<OpeningsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </OpeningsProvider>
        </>
    )
}

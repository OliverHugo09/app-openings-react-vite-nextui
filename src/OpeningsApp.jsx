import { Route, Routes, Navigate } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { NavBar } from "./components/NavBar"
import { DashboardPage } from "./pages/DashboardPage"

export const OpeningsApp = () => {
    return (
        <>
            <NavBar></NavBar>
            <main className="container mx-auto mb-5 mt-4">
                <Routes>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route path="/dashboard" element={<DashboardPage></DashboardPage>}></Route>
                    <Route path="/*" element={<Navigate to='/' />}></Route>
                </Routes>
            </main>
        </>

    )
}

import { Navigate, Route, Routes } from "react-router-dom"
import { RecetasPage } from "../recetas/pages/RecetasPage"
import { LoginPage } from "../auth/pages/LoginPage"
import { Navbar } from "../ui/components/NavBar"
import { RegisterPage } from "../auth/pages/RegisterPage"


export const AppRouter = () => {
  return (
    <>

        <Navbar />
        <Routes>
            <Route path="recetas" element={ <RecetasPage />} />
            <Route path="login" element={ <LoginPage />} />
            <Route path="register" element={ <RegisterPage />} />

            {/* ruta por defaul cuando no está especificada ninguna: */}

            <Route path="/" element={ <Navigate to="/login"/>} />
        </Routes>
    </>
  )
}

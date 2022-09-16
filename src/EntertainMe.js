import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { NavBar } from "./components/navbar/Navbar"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { Authorized } from "./components/views/Authorized"

export const EntertainMe = () => {
    return <Routes>
        	<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

        <Route path="*" element={
			<Authorized>
				<>
				<NavBar />
				<ApplicationViews />
				</>
			</Authorized>

		} />
    </Routes>
}
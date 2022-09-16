import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/artists">Artists</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/venues">Venues</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/whyentertainme">Why Entertain Me?</Link>
            </li>
            {
                localStorage.getItem("entertain_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("entertain_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
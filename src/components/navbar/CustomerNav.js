import { Link, useNavigate } from "react-router-dom"
import { Nav } from "react-bootstrap"
import "./Navbar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return <>
    <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><a href="homepage" class="nav-link active"> Home</a></li>
        <li class="nav-item"><a href="profile" class="nav-link" >Profile</a></li>
        <li class="nav-item"><a href="artists" class="nav-link">Artists</a></li>
        <li class="nav-item"><a href="venues" class="nav-link">Venues</a></li>
        <li class="nav-item"><a href="nextplaylist" class="nav-link">Find Your Next Playlist</a></li>
        {
                localStorage.getItem("entertain_user")
                        ?<Nav.Link href ="/"className="navbar-link" to="" onClick={() => {
                            localStorage.removeItem("entertain_user")
                            navigate("/", {replace: true})
                        }}>Logout</Nav.Link>
                    : ""
            }

      </ul>
    </header>
  </div>
</>
}
import { ArtistNav } from "./ArtistNav"
import { CustomerNav } from "./CustomerNav"
import "./Navbar.css"

export const NavBar = () => {
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
	
    if (entertainUserObject.artist){
        return <ArtistNav/>

    }
    else {
        return <CustomerNav />
    }
}
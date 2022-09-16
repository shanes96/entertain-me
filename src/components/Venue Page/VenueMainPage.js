import { ArtistView } from "./ArtistView.js"
import { CustomerView } from "./CustomerView.js"


export const VenueMainPage = () => {
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
	
    if (entertainUserObject.artist){
        return <ArtistView />

    }
    else {
        return <CustomerView />
    }
}
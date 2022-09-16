import { ArtistPage } from "./ArtistPage"
import { CustomerPage } from "./CustomerPage"


export const ArtistMainPage = () => {
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
	
    if (entertainUserObject.artist){
        return <ArtistPage />

    }
    else {
        return <CustomerPage />
    }
}
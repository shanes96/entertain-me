import { ArtistProfile } from "./ArtistProfile"
import { CustomerProfile } from "./CustomerProfile"


export const Profile = () => {
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
	
    if (entertainUserObject.artist){
        return <ArtistProfile />

    }
    else {
        return <CustomerProfile />
    }
}

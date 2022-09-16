import { ArtistViews } from "./ArtistViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {

    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
	
    if (entertainUserObject.artist){
        return <ArtistViews/>

    }
    else {
        return <CustomerViews />
    }
}
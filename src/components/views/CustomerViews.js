import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistMainPage } from "../ArtistPage/ArtistMainPage"
import { TicketForm } from "../forms/TicketForm"
import { HomePage } from "../HomePage/HomePage"
import { GlobalArtistProfile } from "../Profile/GlobalArtistProfile"
import { Profile } from "../Profile/Profile"
import { Main } from "../Spotify/Main"
import { VenueMainPage } from "../Venue Page/VenueMainPage"


export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    
                    

                    <Outlet />
                </>
            }>
                <Route path="home" element={ <HomePage/> } />
                <Route path="nextplaylist" element={ <Main /> } />
                <Route path="homepage" element={ <HomePage/> } />
                <Route path="artists" element={ <ArtistMainPage /> } />
                <Route path="venues" element={ <VenueMainPage /> } />
                <Route path="profile" element={ <Profile /> } />
                <Route path="artists/:eventId/buytickets" element={<TicketForm /> } />
                <Route path="artists/:artistId/artistProfile" element={<GlobalArtistProfile /> } />
            </Route>
        </Routes>
    )
}
import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistMainPage } from "../ArtistPage/ArtistMainPage"
import { VenueMainPage } from "../Venue Page/VenueMainPage"


export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Entertain Me</h1>
                    

                    <Outlet />
                </>
            }>

                <Route path="artists" element={ <ArtistMainPage /> } />
                <Route path="venues" element={ <VenueMainPage /> } />
            </Route>
        </Routes>
    )
}
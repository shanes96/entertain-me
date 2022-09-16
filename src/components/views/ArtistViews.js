import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistMainPage } from "../ArtistPage/ArtistMainPage"
import { CreatEventForm } from "../forms/CreateEvent"
import { LeaveReviewForm } from "../forms/LeaveReview"
import { VenueMainPage } from "../Venue Page/VenueMainPage"
import { Profile } from "../Profile/Profile"
import { UpdateEventForm } from "../forms/UpdateEvent"


export const ArtistViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Entertain Me</h1>

                    <Outlet />
                </>
            }>
                <Route path="profile" element={ <Profile /> } />
                <Route path="artists" element={ <ArtistMainPage /> } />
                <Route path="venues" element={ <VenueMainPage /> } />
                <Route path="createvent" element={ <CreatEventForm /> } />
                <Route path="venue/leavereview" element={ <LeaveReviewForm /> } />
                <Route path="artists/:eventId/edit" element={<UpdateEventForm /> } />
            </Route>
        </Routes>
    )
}
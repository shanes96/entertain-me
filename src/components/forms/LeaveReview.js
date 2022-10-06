import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const LeaveReviewForm = () => {
    
    const [review, update] = useState({
        description:"",
        venue:"",
        artist:"",
        bookAgain:""
    })

    const navigate = useNavigate ()
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
    const [artists, setArtists] = useState([])
    const [venues, setVenues] = useState([])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const reviewToSendToAPI = {
            description:review.description,
            venueId:parseInt(review.venue),
            artistId: parseInt(review.artist),
            bookAgain:review.bookAgain
        }



        return fetch(`http://localhost:8088/reviews`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewToSendToAPI)
        })
        .then (res => res.json ())
        .then (() => {
            navigate("/venues")
        })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/artists?_expand=user`)
                .then(res => res.json())
                .then((artistData) => {
                    setArtists(artistData)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/venues`)
                .then(res => res.json())
                .then((venueData) => {
                    setVenues(venueData)
                })
        },
        []
    )


    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">What was your venue experience like?</h2>
            <fieldset>
                <div className="form-group">
                <label for="address" class="form-label">Event Description</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of event"
                        value={review.description}
                        onChange={
                            (evt) => {
                                const copy= {...review}
                                copy.description= evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label for="address" class="form-label">What Artist Are You?</label>
                        <select value={review.artist}
                        class="form-select" id="artist"
                        onChange={
                            (evt) => {
                                const copy= {...review}
                                copy.artist= evt.target.value
                                update(copy)
                            }
                        }>
                        <option value= {0}>Choose Artist</option>
                        {
                            artists.map(
                                artist => <option
                                value= {artist.id}>
                                    {artist?.user?.name}
                                </option>
                            )
                        }
                        {/* <option value= "1">Bruno Mars</option>
                        <option value= "2">Post Malone</option>
                        <option value= "3">The 1975</option> */}
                        </select>
                        </div>
                        </fieldset>
            <fieldset>
                <div className="form-group">
                <label for="address" class="form-label">What Venue Did You Peform At?</label>
                        <select value={review.venue}
                         class="form-select" id="venue"
                        onChange={
                            (evt) => {
                                const copy= {...review}
                                copy.venue= evt.target.value
                                update(copy)
                            }
                        }>
                        <option value= {0}>Choose Venue</option>
                         {
                            venues.map(
                                venue => <option
                                value= {venue.id}>
                                    {venue.name}
                                </option>
                            )
                        }
                        {/* <option value= "1">Mercy Lounge</option>
                        <option value= "2">The East Room</option>
                        <option value= "3">The Basement East</option> */}
                        </select>
                        </div>
                        </fieldset>
                        <fieldset>
                <div className="form-group">
                <label for="address" class="form-label">Book Again?</label>
                        <select value={review.bookAgain}
                        class="form-select" 
                        onChange={
                            (evt) => {
                                const copy= {...review}
                                copy.bookAgain= evt.target.value
                                update(copy)
                            }
                        }>
                        <option value= "0">Choose Decision</option>
                        <option value= "Yes">Yes</option>
                        <option value= "No">No</option>
                        </select>
                        </div>
                        </fieldset>
            <button 

            onClick = { (clickEvent)=> handleSaveButtonClick(clickEvent) }
            class="w-100 btn btn-primary btn-lg" type="submit">
                Leave Review
            </button>
        </form>
    )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const CreatEventForm = () => {

    const [newEvent, update] = useState({
        artist: "",
        venue: "",
        ticketPrice: "",
        date: "",
        time: "",
        description: ""
    })

    const navigate = useNavigate()
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
    const [artists, setArtists] = useState([])
    const [venues, setVenues] = useState([])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            description: newEvent.description,
            venueId: parseInt(newEvent.venue),
            artistId: parseInt(newEvent.artist),
            ticketPrice: parseInt(newEvent.ticketPrice),
            date: (newEvent.date),
            time: (newEvent.time),
            userId: entertainUserObject.id
        }



        return fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/artists")
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
            <h2 className="ticketForm__title">Create an Event!</h2>
            <fieldset>
                <div className="form-group">
                    <label for="address" class="form-label">Event Description</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of event"
                        value={newEvent.description}
                        onChange={
                            (evt) => {
                                const copy = { ...newEvent }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label for="address" class="form-label">What Artist Are You?</label>
                    <select value={newEvent.artist}
                        class="form-select" id="artist"
                        onChange={
                            (evt) => {
                                const copy = { ...newEvent }
                                copy.artist = evt.target.value
                                update(copy)
                            }
                        }>
                        <option value={0}>Choose Artist</option>
                        {
                            artists.map(
                                artist => <option
                                    value={artist.id}>
                                    {artist?.user?.name}
                                </option>
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="col-12">
                    <label for="address" class="form-label">Where Will You Be Playing At?</label>
                    <select value={newEvent.venue}
                        class="form-select" id="venue"
                        onChange={
                            (evt) => {
                                const copy = { ...newEvent }
                                copy.venue = evt.target.value
                                update(copy)
                            }
                        }>
                        <option value={0}>Choose Venue</option>
                        {
                            venues.map(
                                venue => <option
                                    value={venue.id}>
                                    {venue.name}
                                </option>
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>

                <div className="col-12">
                    <label for="address" class="form-label">Ticket Price</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="$20.00"
                        value={newEvent.ticketPrice}
                        onChange={
                            (evt) => {
                                const copy = { ...newEvent }
                                copy.ticketPrice = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label for="address" class="form-label">Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={newEvent.date}
                        onChange={
                            (evt) => {
                                const copy = { ...newEvent }
                                copy.date = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Time">Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        value={newEvent.time}
                        onChange={
                            (evt) => {
                                const copy = { ...newEvent }
                                copy.time = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                class="w-100 btn btn-primary btn-lg" type="submit">
                Create Event
            </button>
        </form>
    )
}
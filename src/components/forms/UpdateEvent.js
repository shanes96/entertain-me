import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export const UpdateEventForm = () => {
    const [artists, setArtists] = useState([])
    const [venues, setVenues] = useState([])

    const [newEvent, update] = useState({
        artistId: parseInt(""),
        venueId: parseInt(""),
        ticketPrice: "",
        date: "",
        time: "",
        description: ""
    })

    const { eventId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/events/${eventId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    }, [eventId])

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

    const navigate = useNavigate()
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/events/${newEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/profile")
            })
    }


    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Update Event!</h2>
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
                        class="form-select" id="venue"
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
                <div className="form-group">
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
                <div className="form-group">
                    <label for="address" class="form-label">Ticket Price</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
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
                    <label for="address" class="form-label">Time:</label>
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
                Update Event
            </button>
        </form>
    )
}
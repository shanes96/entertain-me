import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./TicketForm.css"

import { useParams } from "react-router-dom"

export const TicketForm = () => {
    const [venues, setVenues] = useState([])
    const [artists, setArtists] = useState([])


    const [ticket, ticketInformation] = useState({
        eventId: "",
        userId: "",
        purchaseTicketAmount: "",
    })

    const { eventId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/tickets?_expand=event&eventId=${eventId}`)
            .then(response => response.json())
            .then((data) => {
                const ticketObject = data[0]
                ticketInformation(ticketObject)
            })
    }, [eventId])


    useEffect(
        () => {
            fetch(`http://localhost:8088/venues`)
                .then(response => response.json())
                .then((eventArray) => {
                    setVenues(eventArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/artists?_expand=user`)
                .then(response => response.json())
                .then((eventArray) => {
                    setArtists(eventArray)
                })
        },
        []
    )

    const navigate = useNavigate()
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const ticketToSendToAPI = {
            eventId: parseInt(eventId),
            userId: entertainUserObject.id,
            purchaseTicketAmount: parseInt(ticket.purchaseTicketAmount)
        }

        return fetch(`http://localhost:8088/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/profile")
            })
    }







    return (
        <form className="ticketForm">
            <fieldset>
                <div className="col-sm-6">
                    {

                        artists.map(
                            (artist) => {
                                if (ticket?.event?.artistId == artist.id) {
                                    return <section className="ticket">
                                        <div>{venues.map(
                                            (venue) => {
                                                if (ticket?.event?.venueId == venue.id) {
                                                    return <section className="ticket" key={`venue -- ${venue.id}`}>

                                                        <label for="address" class="form-label">Artist:</label>
                                                        <header
                                                            type="text"
                                                            className="form-control">
                                                            {artist?.user?.name} </header>
                                                        <label for="address" class="form-label">Venue:</label>
                                                        <header
                                                            type="text"
                                                            className="form-control">
                                                            {venue.name} </header>
                                                        <label for="address" class="form-label">Venue Address:</label>
                                                        <header
                                                            type="text"
                                                            className="form-control">
                                                            {venue.address} </header>
                                                        <label for="address" class="form-label">Venue City:</label>
                                                        <header
                                                            type="text"
                                                            className="form-control">
                                                            {venue.cityName} </header>
                                                        <label for="address" class="form-label">Venue State:</label>
                                                        <header
                                                            type="text"
                                                            className="form-control">
                                                            {venue.stateName} </header>
                                                        <label for="address" class="form-label">Venue Date:</label>
                                                        <header
                                                            type="text"
                                                            className="form-control">
                                                            {ticket?.event?.date} </header>
                                                        <label for="address" class="form-label">Ticket Price:</label>
                                                        <header
                                                            type="number"
                                                            className="form-control">
                                                            ${ticket?.event?.ticketPrice} </header>
                                                        <label for="address" class="form-label">Time:</label>
                                                        <header
                                                            type="number"
                                                            className="form-control">
                                                            {ticket?.event?.time} </header>
                                                    </section>

                                                }
                                            }

                                        )}

                                        </div>
                                        <div id="cart" class="col-md-5 col-lg-4 order-md-last">
                                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                                <span class="text-primary">Your cart</span>
                                            </h4>
                                            <ul class="list-group mb-3">
                                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                                    <div>
                                                        <h6 class="my-0">Ticket Amount </h6>
                                                    </div>
                                                    <span class="text-muted">{ticket.purchaseTicketAmount}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                                    <div>
                                                        <h6 class="my-0">Tickets</h6>
                                                        <small class="text-muted">Post Malone</small>
                                                    </div>
                                                    <span class="text-muted">${ticket?.event?.ticketPrice * ticket.purchaseTicketAmount}</span>
                                                </li>
                                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                                    <div>
                                                        <h6 class="my-0">Tax</h6>
                                                        <small class="text-muted"></small>
                                                    </div>
                                                    <span class="text-muted"> ${ticket?.event?.ticketPrice * ticket.purchaseTicketAmount * .07} </span>
                                                </li>
                                                <div>

                                                </div>
                                                <li class="list-group-item d-flex justify-content-between">
                                                    <span>Total (USD)</span>
                                                    <strong>${ticket?.event?.ticketPrice * ticket.purchaseTicketAmount + ticket?.event?.ticketPrice * ticket.purchaseTicketAmount * .07} </strong>
                                                </li>
                                            </ul>


                                        </div>
                                    </section>

                                }

                            }
                        )
                    }

                    <label for="address" class="form-label">How Many Tickets Are You Buying?</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.purchaseTicketAmount = evt.target.value
                                ticketInformation(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button

                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                class="w-100 btn btn-primary btn-lg" type="submit">
                Buy Tickets!
            </button>

        </form>
    )
}

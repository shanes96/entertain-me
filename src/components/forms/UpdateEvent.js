import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export const UpdateEventForm = () => {
    
    const [newEvent, update] = useState({
        artist:"",
        venue:"",
        ticketPrice:"",
        date:"",
        time:"",
        description:""
    })

    const { eventId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/events/${eventId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    }, [eventId])

    const navigate = useNavigate ()
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
                navigate("/artists")
            })
    }


    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Create an Event!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of event"
                        value={newEvent.description}
                        onChange={
                            (evt) => {
                                const copy= {...newEvent}
                                copy.description= evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">What Artist Are You?</label>
                        <select value={newEvent.artist}
                        onChange={
                            (evt) => {
                                const copy= {...newEvent}
                                copy.artist= evt.target.value
                                update(copy)
                            }
                        }>
                        <option value= "0">Choose Artist</option>
                        <option value= "1">Bruno Mars</option>
                        <option value= "2">Post Malone</option>
                        <option value= "3">The 1975</option>
                        </select>
                        </div>
                        </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Where Will You Be Playing At?</label>
                        <select value={newEvent.venue}
                        onChange={
                            (evt) => {
                                const copy= {...newEvent}
                                copy.venue= evt.target.value
                                update(copy)
                            }
                        }>
                        <option value= "0">Choose Venue</option>
                        <option value= "1">Mercy Lounge</option>
                        <option value= "2">The East Room</option>
                        <option value= "3">The Basement East</option>
                        </select>
                        </div>
                        </fieldset>
                        <fieldset>
                <div className="form-group">
                    <label htmlFor="Ticket Price">Ticket Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        value={newEvent.ticketPrice}
                        onChange={
                            (evt) => {
                                const copy= {...newEvent}
                                copy.ticketPrice= evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={newEvent.date}
                        onChange={
                            (evt) => {
                                const copy= {...newEvent}
                                copy.date= evt.target.value
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
                                const copy= {...newEvent}
                                copy.time= evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 

            onClick = { (clickEvent)=> handleSaveButtonClick(clickEvent) }
            className="btn btn-primary">
                Update Event
            </button>
        </form>
    )
}
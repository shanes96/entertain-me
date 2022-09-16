import { useState } from "react"
import { useNavigate } from "react-router-dom"

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


    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">What was your venue experience like?</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event Description:</label>
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
                    <label htmlFor="description">What Artist Are You?</label>
                        <select value={review.artist}
                        onChange={
                            (evt) => {
                                const copy= {...review}
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
                    <label htmlFor="description">What venue did you perform at?</label>
                        <select value={review.venue}
                        onChange={
                            (evt) => {
                                const copy= {...review}
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
                    <label htmlFor="description">Book Again?</label>
                        <select value={review.bookAgain}
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
            className="btn btn-primary">
                Leave Review
            </button>
        </form>
    )
}
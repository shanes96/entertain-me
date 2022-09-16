import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ArtistView = () => {
    const [reviews, setReviews]= useState([])
    const [events, setEvents]=useState([])
    const navigate = useNavigate()

    const displayedReviews = ()=> {
        fetch (`http://localhost:8088/reviews`)
        .then (response => response.json())
        .then ((reviewArray)=> {
            setReviews(reviewArray)
        })
    }
    useEffect (
        () => {
            fetch (`http://localhost:8088/reviews`)
            .then (response => response.json())
            .then ((reviewArray)=> {
                setReviews(reviewArray)
            })
        },
        []
    )

    useEffect (
        () => {
            fetch (`http://localhost:8088/events?_expand=venue`)
            .then (response => response.json())
            .then ((eventArray)=> {
                setEvents(eventArray)
            })
        },
        []
    )

    return <>
    
    <h2>Venues</h2>
    <button onClick={() => navigate("/venue/leavereview")}>Leave Review</button>
    <article className= "artists">
                
                {   
                
                     events.map(
                         (event) => {
                            return <section className="ticket">                                
                            <header> Venue Name:{event?.venue?.name}</header>

                                <div>{reviews.map(
                                    (review)=>{
                                        if(review.venueId == event?.venueId){
                                        return <section className="ticket" key= {`review -- ${review.id}`}>
                                            <header> Review:{review.description}</header>
                                <button onClick={() => {
                                 fetch(`http://localhost:8088/reviews/${review.id}`,{
                                    method:"DELETE"
                                })
                                .then (() => {
                                    displayedReviews()
                                })
                                }}
                                
                                >Delete Review!</button>
                                    </section>
                                    }
                                }
                                )}</div>
                                    </section>
                        }
                    )
                }
               
            </article>
    
        
        </>
        
}
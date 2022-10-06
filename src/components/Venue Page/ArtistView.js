import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';


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
    <button class="w-60 btn btn-primary btn-lg"onClick={() => navigate("/venue/leavereview")}>Leave Review</button>
    <article className= "artists">
                
                {   
                
                     events.map(
                         (event) => {
                            return <section className="ticket"> 
                            <div class="card mb-3">
                             <div class="card-body"></div>   
                             <img src={event?.venue?.venuePagePicture} class="card-img-top" alt="artist-picture" width="750" height="280" />                            
                            <h5>{event?.venue?.name}</h5>
                                <div>{reviews.map(
                                    (review)=>{
                                        if(review.venueId == event?.venueId){
                                        return <section className="ticket" key= {`review -- ${review.id}`}>
                                            <header> What Other Artists Have Said About Playing Here: {review.description}</header>
                                <button 
                                class="w-60 btn btn-primary btn-lg"
                                onClick={() => {
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
                                </div>
                                    </section>
                        }
                    )
                }
               
            </article>
    
        
        </>
        
}
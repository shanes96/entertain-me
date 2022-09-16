import { useEffect, useState } from "react"

export const CustomerView = () => {
    const [events, setEvents]=useState([])

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

    <article className= "artists">
                
                {   
                
                     events.map(
                         (event) => {
                            return <section className="ticket">
                                <header> Venue Name:{event?.venue?.name}</header>
                                <header> Show Details:{event.description}</header>
                                <button>Buy Tickets!</button>
                                    </section>
                                    
                        }
                    )
                }
               
            </article>
    
        
        </>
        
}
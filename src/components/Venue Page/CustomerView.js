import { useEffect, useState } from "react"

export const CustomerView = () => {
    const [events, setEvents]=useState([])
    const [artists, setArtists] = useState([])

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

    useEffect(
        () => {
            fetch(`http://localhost:8088/artists?_expand=user`)
                .then(response => response.json())
                .then((artistArray) => {
                    setArtists(artistArray)
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
                                <div class="card mb-3">
                                <div class="card-body"></div>
                                <img src={event?.venue?.venuePagePicture} class="card-img-top" alt="artist-picture" width="750" height="280" />
                                <h5> {event?.venue?.name}</h5>
                                <header> {event.description} | {event.date}</header>
                                <header>Doors Open At {event.time}</header>
                                {artists.map(
                                            (artist) => {
                                                if (event.artistId == artist.id) {
                                                    return <section >
                                                        <a class="btn btn-primary" href={`/artists/${event.id}/buytickets`} role="button">Buy Tickets!</a>
                                                    </section>
                                                }
                                            }
                                        )}
                                    
                     
                                </div>
                                </section>
                                
                                
                        })
                }
               
            </article>
    
        
        </>
        
}
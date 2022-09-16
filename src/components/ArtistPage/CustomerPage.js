import { useEffect, useState } from "react"

export const CustomerPage = ()=> {
    const [artists, setArtists]= useState([])
    const [events, setEvents]=useState([])

    useEffect (
        () => {
            fetch (`http://localhost:8088/artists?_expand=user`)
            .then (response => response.json())
            .then ((artistArray)=> {
                setArtists(artistArray)
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
    
    <h2>Artists</h2>

    <article className= "artists">
                
                {   
                
                     artists.map(
                         (artist) => {
                            return <section className="ticket">
                                <header> {artist?.user?.name}</header>
                                <div>{events.map(
                                    (event)=>{
                                        if(event.artistId == artist.id){
                                        return <section className="ticket">
                                <header> Venue Name:{event?.venue?.name}</header>
                                <header> Venue Address:{event?.venue?.address}</header>
                                <header> Venue City:{event?.venue?.cityName}</header>
                                <header> Venue State:{event?.venue?.stateName}</header>
                                <button>Buy Tickets!</button>
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
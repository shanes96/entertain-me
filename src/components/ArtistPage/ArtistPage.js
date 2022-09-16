import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


export const ArtistPage = () => {
    const [artists, setArtists] = useState([])
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

const displayedEvents = ()=> {
    fetch(`http://localhost:8088/events?_expand=venue`)
                .then(response => response.json())
                .then((eventArray) => {
                    setEvents(eventArray)
                })
}
 
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

    useEffect(
        () => {
            fetch(`http://localhost:8088/events?_expand=venue`)
                .then(response => response.json())
                .then((eventArray) => {
                    setEvents(eventArray)
                })
        },
        []
    )

    return <>

        <h2>Artists</h2>

        <article className="artists">

            {

                artists.map(
                    (artist) => {
                        return <section className="ticket">
                            <header> {artist?.user?.name}</header>
                            <h4>List of Upcoming Shows!</h4>
                            <div>{events.map(
                                (event) => {
                                    if (event.artistId == artist.id) {
                                        return <section className="ticket" key={`event -- ${event.id}`}>

                                            <header> Date:{event.date}</header>
                                            <header> Time:{event.time}</header>
                                            <header> Ticket Price:${event.ticketPrice}</header>
                                            <header> Venue Name:{event?.venue?.name}</header>
                                            <header> Venue Address:{event?.venue?.address}</header>
                                            <header> Venue City:{event?.venue?.cityName}</header>
                                            <header> Venue State:{event?.venue?.stateName}</header>
                                            <button onClick={() => {
                                                fetch(`http://localhost:8088/events/${event.id}`, {
                                                    method: "DELETE"
                                                })
                                                    .then(() => {
                                                        displayedEvents()
                                                    })
                                            }}
                                            >Delete Event!</button>
                                            {/* <button onClick={() => navigate("/artists/updatevent")}>Update Event</button> */}
                                            <button>
                                                <Link to={`/artists/${event.id}/edit`}>Update Event</Link>
                                            </button>

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

// const DeleteButton = (event) => {
//     event.preventDefault ()

//     return fetch(`http://localhost:8088/events/${event.id}`,{
//         method:"DELETE",
//     })
//     .then (() => {
//         navigate("/artists")
//     })
// }

{/* <button
onClick={(clickEvent)=> DeleteButton(clickEvent)}
className="delete">
Delete Event
</button> */}
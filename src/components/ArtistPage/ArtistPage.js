import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


export const ArtistPage = () => {
    const [artists, setArtists] = useState([])
    const [events, setEvents] = useState([])
    const navigate = useNavigate()
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)

    const displayedEvents = () => {
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
            <div class="card mb-3">
                <div class="card-body">
                    {
                        artists.map(
                            (artist) => {
                                return <section className="artist">
                                    <section>
                                        <h4 className="artist-name"> <Link to={`/artists/${artist.id}/artistProfile`}> {artist?.user?.name}</Link> </h4>
                                        <img src={artist.artistPagePicture} class="card-img-top" alt="artist-picture" width="708" height="280" />
                                    </section>

                                    {events.map(
                                        (event) => {
                                            if (event.artistId === artist.id) {
                                                return <section key={`event -- ${event.id}`}>
                                                    <header className="information">{event?.venue?.name} | {event?.venue?.cityName},{event?.venue?.stateName} | {event.date}</header>

                                                    <button onClick={() => {

                                                        fetch(`http://localhost:8088/events/${event.id}`, {
                                                            method: "DELETE"
                                                        })
                                                            .then(() => {
                                                                displayedEvents()
                                                            })
                                                    }}
                                                        class="w-60 btn btn-primary btn-lg"
                                                    >Delete Event!</button>
                                                </section>
                                            }
                                        }
                                    )}

                                </section>
                            }
                        )
                    }

                </div>
            </div>
        </article>


    </>

}

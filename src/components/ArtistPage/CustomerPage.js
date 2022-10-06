import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./ArtistPage.css"

export const CustomerPage = () => {
    const [artists, setArtists] = useState([])
    const [events, setEvents] = useState([])


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
        {
            <article className="artists">

                {

                    artists.map(
                        (artist) => {
                            return <section className="artist">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        {/* <header className="name"> <Link to={`/artists/${artist.id}/artistProfile`}> {artist?.user?.name}</Link> </header> */}
                                        {events.map(
                                            (event) => {
                                                if (event.artistId == artist.id) {
                                                    return <section >
                                                        <img src={artist.artistPagePicture} class="card-img-top" alt="artist-picture" width="708" height="280" />
                                                        <h4 className="artist-name"> <Link to={`/artists/${artist.id}/artistProfile`}> {artist?.user?.name}</Link> </h4>
                                                        <header className="information">{event?.venue?.name} | {event?.venue?.cityName},{event?.venue?.stateName} | {event.date}</header>
                                                        {/* <button className="button"> <Link to={`/artists/${event.id}/buytickets`}>Buy Tickets!</Link> </button> */}
                                                        <a class="btn btn-primary" href={`/artists/${event.id}/buytickets`} role="button">Buy Tickets!</a>
                                                    </section>
                                                }
                                            }
                                        )}
                                    </div>
                                </div>
                            </section>
                        }
                    )
                }


            </article>}


    </>

}
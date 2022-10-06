import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GlobalArtistProfile = () => {

    const [artist, artistInformation] = useState({})

    const [events, userEvents] = useState([])
    const [artists, setArtists] = useState([])

    const { artistId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/artists/${artistId}?_expand=user`)
            .then(response => response.json())
            .then((data) => {
                artistInformation(data)
            })
    }, [artistId])


    useEffect(
        () => {
            fetch(`http://localhost:8088/events?artistId=${artistId}&_expand=venue`)
                .then(res => res.json())
                .then((data) => {
                    userEvents(data)
                })
        },
        [artistId]
    )

    return <>
        <section className="artists">
            <h2 className="artist_header">{artist?.user?.name}</h2>
            <img src={artist.profilePageImage} width="100%" height="600" />
            <iframe className="spotify" src={artist.spotifyLink}
                width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
            ></iframe>
            <h4>Upcoming Events</h4>
            <article className="artists">

                {
                    <div className="d-flex flex-row">{events.map(
                        (event) => {
                            return <section key={`event -- ${event.id}`}>
                                <div className="col-7">
                                    <div className="card shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={event?.venue?.venuePagePicture} role="img" aria-label="Placeholder: Thumbnail" />
                                        <div className="card-body">
                                            <p className="card-text">
                                                <h4 className="showInfo">{event?.venue?.name}</h4 >
                                                <header> Date:{event.date}</header>
                                                <header> Time:{event.time}</header>
                                                <header> Ticket Price:${event.ticketPrice}</header>
                                                <header> Venue Address:{event?.venue?.address}</header>
                                                <header> Venue City:{event?.venue?.cityName}</header>
                                                <header> Venue State:{event?.venue?.stateName}</header>
                                                <a class="btn btn-primary" href={`/artists/${event.id}/buytickets`} role="button">Buy Tickets!</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        }

                    )}</div>

                }

            </article>
        </section>
    </>
}
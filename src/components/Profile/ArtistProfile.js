import { useEffect, useState } from "react";
// import "./ArtistProfile.css"

export const ArtistProfile = () => {

    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)

    const [profile, updatedProfile] = useState({
        name: "",
    })

    const [events, userEvents] = useState([])
    const [artists, setArtists] = useState([])

    const displayedEvents = ()=> {
        fetch(`http://localhost:8088/events?_expand=venue`)
                    .then(response => response.json())
                    .then((eventArray) => {
                        userEvents(eventArray)
                    })
    }
    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${entertainUserObject.id}`)
                .then(res => res.json())
                .then((data) => {

                    updatedProfile(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/events?_expand=venue`)
                .then(res => res.json())
                .then((data) => {
                    userEvents(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/artists`)
                .then(res => res.json())
                .then((artistData) => {
                    setArtists(artistData)
                })
        },
        []
    )



    return <>
        <section className="artists">
            <h2 className="artist_header">{profile.name}</h2>

            <article className="artists">
                {
                    artists.map(
                        (artist) => {
                            if (artist.userId === entertainUserObject.id) {
                                return <section key={`artist--${artist.id}`}>
                                    <img src={artist.profilePageImage} width="100%" height="600" />
                                    <iframe className="spotify" src={artist.spotifyLink}
                                        width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
                                    ></iframe>
                                    <h4 className="showInfo">Upcoming Events</h4>

                                </section>
                            }
                        })}


                {
                    <div className="d-flex flex-row">{events.map(
                        (event) => {
                            if (event.userId === entertainUserObject.id) {
                                return <section className="" key={`event -- ${event.id}`}>
                                            <div className="col-7">
                                                    <div className="card shadow-sm">
                                                        <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={event?.venue?.venuePagePicture} role="img" aria-label="Placeholder: Thumbnail" />
                                                        <div className="card-body">
                                                            <p className="card-text">
                                                                <h4 className="showInfo">{event?.venue?.name}</h4 >
                                                                <header className="showInfo"> Date:{event.date}</header >
                                                                <header className="showInfo"> Time:{event.time}</header >
                                                                <header className="showInfo"> Ticket Price:${event.ticketPrice}</header >
                                                                <header className="showInfo"> Venue Address:{event?.venue?.address}</header >
                                                                <header className="showInfo"> Venue City:{event?.venue?.cityName}</header >
                                                                <header className="showInfo"> Venue State:{event?.venue?.stateName}</header >
                                                                <button id="artist-profile-button" class="w-60 btn btn-primary btn-md" onClick={() => {
                                                                    fetch(`http://localhost:8088/events/${event.id}`, {
                                                                        method: "DELETE"
                                                                    })
                                                                        .then(() => {
                                                                            displayedEvents()
                                                                        })

                                                                }}
                                                                >Delete Event!</button>
                                                                <a class="btn btn-primary" href={`/artists/${event.id}/edit`} role="button">Update Event</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                </section>
                            }
                        }
                    )}


                    </div>

                }

            </article>


        </section>
    </>
}


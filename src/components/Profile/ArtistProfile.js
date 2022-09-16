import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArtistProfile = () => {
    const [profile,updatedProfile]= useState ({
        name:""
        })

    const [events, userEvents]= useState ([])
    
    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)
	

    useEffect (
        ()=> {
            fetch(`http://localhost:8088/users/${entertainUserObject.id}`)
            .then(res => res.json())
            .then((data) => {
                
                updatedProfile(data)
            })
        },
        []
    )

    useEffect (
        ()=> {
            fetch(`http://localhost:8088/events?_expand=venue`)
            .then(res => res.json())
            .then((data) => {
                userEvents(data)
            })
        },
        []
    )

    return<>
     <section className="artists">
        <h2 className="artist_header">{profile.name}</h2>
        <h4>Upcoming Events</h4>
     

        <article className="artists">

    {
                    <div>{events.map(
                        (event) => {
                            if (event.userId == user.id) {
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
                                            })
                                    }}
                                    >Delete Event!</button>
                                    <button>
                                        <Link to={`/artists/${event.id}/edit`}>Update Event</Link>
                                    </button>

                                </section>
                            }
                        }
                    )}</div>
                    }

        </article>


</section>
           </>     
}

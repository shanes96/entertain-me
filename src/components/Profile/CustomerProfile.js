import { useEffect, useState } from "react";

export const CustomerProfile = () => {

    const localEntertainUser = localStorage.getItem("entertain_user")
    const entertainUserObject = JSON.parse(localEntertainUser)

    const [profile, updatedProfile] = useState({
        name: "",
    })

    const [events, userEvents] = useState([])
    const [tickets, setTickets] = useState([])
    const [artists, setArtists] = useState([])

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
            fetch(`http://localhost:8088/tickets?_expand=event`)
                .then(res => res.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)

             
        })},
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/artists?_expand=user`)
                .then(res => res.json())
                .then((artistArray) => {
                    setArtists(artistArray)

             
        })},
        []
    )



    return <>
       <section className="artists">
        <h2 className="profile_header">{profile.name}</h2>
        <img src="https://mspmag.com/downloads/51225/download/shutterstock_696332926.jpg?cb=5b21ba3e87f20324f36e2a2e13fe438c&w=1280" 
        className="d-block w-100"
         width="400" 
         height="700"
        />


<h4>Upcoming Events</h4>
<article className="artists">

{
   <div className="d-flex flex-row">{tickets.map(
        (ticket) => {
            if (ticket.userId === entertainUserObject.id){
                return events.map (
                    (event) => {
                        if (ticket.eventId === event.id){
                            return artists.map(
                                (artist)=> {
                                    if(event.artistId===artist.id){
                            return <section key={`event--${event.id}`}>
                            <div className="col-15"> 
                            <div className="card shadow-sm">
                                <img className="bd-placeholder-img card-img-top" width="100%" height="225" src= {artist.profilePageImage} role="img" aria-label="Placeholder: Thumbnail" />
                                <div className="card-body">
                                <p className="card-text">
                                    <h4>{artist?.user?.name}</h4>
                                        <header>Date:{event.date}</header>
                                       <header> Time:{event.time}</header>
                                       <header> Venue Name:{event?.venue?.name}</header>
                                    <header>Venue Address:{event?.venue?.address}</header>
                                       <header> Venue City:{event?.venue?.cityName}</header>
                                        <header>Venue State:{event?.venue?.stateName}</header>
                                       <header>Tickets Purchased:{ticket.purchaseTicketAmount}</header>
                                    </p>
                             </div>
                                 </div>
                                </div>                         
                            </section>
                                    }
                                }
                                )
                            }
                        }
                        )
                    }
                })
            }
            </div>
}   
</article>
</section>
    </>
}

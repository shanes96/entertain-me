import Carousel from 'react-bootstrap/Carousel';
import "./HomePage.css"

export const HomePage = () => {
  return <>
  
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          // width="400" 
          height="700"
          src="https://www.hollywoodreporter.com/wp-content/uploads/2022/06/Bruno-Mars-with-SelvaRey-Pina-Colada-H-PUBLICITY-MAIN-2022.jpg?w=1500"
          alt="Bruno Mars"
        
        />
        <Carousel.Caption>
          <div className="artist-container">
          <h3 id= "artist-name">Bruno Mars</h3>
          <p id= "artist-info">Tickets for Bruno Mars Are Now Avaiable!</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
            className="d-block w-100"
            // width="400" 
            height="700"
          src="https://www.highsnobiety.com/static-assets/thumbor/XBJkGTSkZafMuyDZufqyBWa5NrQ=/1200x720/www.highsnobiety.com/static-assets/wp-content/uploads/2019/09/06130920/post-malone-hollywoods-bleeding-reacts-00.jpg"
          alt="Post Malone"
        
        />

        <Carousel.Caption>
        <div className="artist-container">
          <h3 id= "artist-name">Post Malone</h3>
          <p id= "artist-info">Tickets For Post Malone Are Now Avaiable!</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          // width="400" 
          height="700"
          src="https://media.pitchfork.com/photos/62bc84cfb5e92adbfb503c85/3:2/w_2250,h_1500,c_limit/The-1975.jpg"
          alt="The 1975"
         
          />

        <Carousel.Caption>
        <div className="artist-container">
          <h3 id= "artist-name">The 1975</h3>
          <p id= "artist-info">
            Tickets For The 1975 Are Now Avaiable!
          </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <div id="container-marketing"className="container marketing">
<div className="row">
  <div className ="col-lg-4">
    <img className= "bd-placeholder-img rounded-circle" width="140" height="140"src="https://cdns-images.dzcdn.net/images/artist/7f3c0956357c326b2db2cf436f1dc8c5/500x500.jpg" alt="bruno" role="img"/> 

    <h2  className ="fw-normal">Bruno Mars</h2>
    <p>See Bruno and his boys live on the Evening with Silk Sonic Tour!</p>
    <p><a className ="btn btn-secondary" href="http://localhost:3000/artists/1/buytickets">Buy Tickets »</a></p>
  </div>
  <div className ="col-lg-4">
  <img className= "bd-placeholder-img rounded-circle" width="140" height="140"src="https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=425,format=auto/sites/default/files/styles/768x768/public/d8/images/methode/2020/02/21/edf6e522-52de-11ea-8948-c9a8d8f9b667_image_hires_045852.jpg?itok=MBGVfIH7&v=1582232343" alt="bruno" role="img"/> 

    <h2  className ="fw-normal">Post Malone</h2>
    <p>You don't want to miss Posty on his Twelve Carat Toothache Tour!</p>
    <p><a className ="btn btn-secondary" href="http://localhost:3000/artists/2/buytickets">Buy Tickets »</a></p>
  </div>
  <div className ="col-lg-4">
  <img className= "bd-placeholder-img rounded-circle" width="140" height="140"src="https://i.guim.co.uk/img/media/395192ee3f1028bc5c373a0d8b1a9e853274e019/0_0_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=09dd0b911e5b05d59d22c76e9913d748" alt="bruno" role="img"/> 

    <h2 className ="fw-normal">The 1975 </h2>
    <p>New Music, New Tour hear The 1975 live on the Complete Happiness Tour! </p>
    <p><a className ="btn btn-secondary" href="http://localhost:3000/artists/3/buytickets">Buy Tickets »</a></p>
  </div>
</div>




<div id="row-featurette"className ="row featurette">
  <div className ="col-md-7">
    <h2 className ="featurette-heading fw-normal lh-1">Designed by Artists.<span className ="text-muted">For Artists.</span></h2>
    <p className ="lead">Take care of the artists and they take care of you. That has always been our slogan. We create features to make artists lives easier such as ticketing services, event services and our very own Artist Venue Review Experience Feature.</p>
  </div>
  <div className ="col-md-5">
    <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHw%3D&w=1000&q=80" alt="the1975" width="450" height="400"/>
  </div>
</div>


<div className ="row featurette">
  <div className ="col-md-7 order-md-2">
    <h2 className ="featurette-heading fw-normal lh-1">We Create Events. <span className ="text-muted">You Create Memories.</span></h2>
    <p className ="lead">For us the only thing that matters is giving the fans the best concert experience ever. Which is why we partner with the best artists and venues to bring you that unforgettable experience.</p>
  </div>
  <div className ="col-md-5 order-md-1">
  <img src="https://i.pinimg.com/736x/d2/8f/7d/d28f7daf82b5654d5b7231c6aacfffdf.jpg" alt="the1975" width="400" height="400"/>

  </div>
</div>


<div className ="row featurette">
  <div className ="col-md-7">
    <h2 className ="featurette-heading fw-normal lh-1">New Tech Offers Better Ticketing Experience. <span className ="text-muted">Coming Soon.</span></h2>
    <p className ="lead">Using the Ethereum blockchain we will soon sell tickets as NFTS. NFTS are more then silly pictures of apes. The tech behind it will allow us to completely remove scaplers, remove high aftermarket ticket prices, and allow artists and promoters to make money for each aftermarket transaction. We cannot wait to offer this for our fans and artists!</p>
  </div>
  <div className ="col-md-5">
  <img src="https://preview.redd.it/4lpjqvr4jdv71.jpg?width=862&format=pjpg&auto=webp&s=093d94bcfc24923de19ea5c89d5556df13ef8ade" alt="the1975" width="450" height="400"/>

  </div>
</div>
</div>
<footer class="container">
    <p class="float-end"><a href="#">Back to top</a></p>
  </footer>
</>
}


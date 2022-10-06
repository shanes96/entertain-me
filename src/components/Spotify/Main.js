import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import Detail from './Details';
import { Credentials } from './Credentials';
import axios from 'axios';
import "./Playback.css"

export const Main = () => {

  const spotify = Credentials();

  console.log('RENDERING APP.JS');

  const data = [
    { value: 1, name: 'A' },
    { value: 2, name: 'B' },
    { value: 3, name: 'C' },
  ];

  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
  const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
  const [trackDetail, setTrackDetail] = useState(null);

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      // headers are used to pass in
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
      .then(tokenResponse => {
        console.log(tokenResponse)
        setToken(tokenResponse.data.access_token);
        // ^ this call is to recieve our token from spotify 

        axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        })
          .then(genreResponse => {
            setGenres({
              selectedGenre: genres.selectedGenre,
              listOfGenresFromAPI: genreResponse.data.categories.items
            })
          });

      });

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);
  // this call collects our genres

  const genreChanged = val => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(playlistResponse => {
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      });

    console.log(val);
  }
  // ^ this call collects playlists from the selected genre

  const playlistChanged = val => {

    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    });
  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(tracksResponse => {
        console.log(tracksResponse)
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items
        })
      });
  }
  // ^ this call collects the first 10 songs from that selected playlist

  const listboxClicked = val => {

    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter(t => t.track.id === val);
    setTrackDetail(trackInfo[0].track);
    console.log("this is track info", trackInfo[0])
    console.log("this is track detail", trackDetail)



  }


  return (
    <div className="container">
      <h3> Find Your Next Spotify Playlist!</h3>
      <p>There are tons of playlists on Spotify and it's hard to find one you would enjoy. By using our Find Your Next Spotify Playlist Feature you can find your new favorite playlist within seconds! Pick a genre,
        pick a playlist and click search! The first 10 songs from that playlist will appear and simply click on a song to hear a preview of that song!</p>
        <p> *Note: Some songs may not include the option to hear a preview of that song. If you do not see a preview for a song this is why.</p>
      <form onSubmit={buttonClicked}>
        <Dropdown label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
        <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
        <div className="col-sm-6 row form-group px-0">
          <button type='submit' className="w-60 btn btn-primary btn-lg">
            Search
          </button>
        </div>
        <div className="row">
          <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
          {trackDetail && <Detail {...trackDetail} />}
          <iframe id="spotify" className="spotify" src={trackDetail?.preview_url} loading="lazy">
          </iframe>          
          
        </div>
      </form>
    </div>
  );
}

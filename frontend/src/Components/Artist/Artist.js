import './Artist.css';
import NVbar from '../NVbar';
import axios from 'axios';
import profileImg from "../../assets/Shawn-Mendes.webp";
import { Card, Table } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { ReactComponent as PlayButton } from "../../assets/play-button.svg";

//import TrackDisplay(props)

export default function Artist() {
  const params = useParams();
  const artistId = params.id;
  const [artist, setArtist] = useState({});

// Getting the data from backend
  useEffect(() => {
    axios.get(`http://localhost:4000/api/artists/find/${artistId}`).then(
        (res) => {
            console.log(res.data)
            setArtist(res.data);
        }
    )
}, [artistId])

<<<<<<< HEAD:frontend/src/Components/Artist/ArtistProfile.js

export default function ArtistProfile() {
  const cardContentArray = [
    { title: "Song 1", text: "Find us on Facebook", link: profileImg },
    { title: "Song 2", text: "Find us on Instagram", link: profileImg },
    { title: "Song 3", text: "Find us on Youtube", link: profileImg },
    { title: "Song 4", text: "Find us on LinkedIn", link: profileImg }
  ];
  const albumList = [
    { album: "Album 1", releasedin: "2020", albumDuration: "120", link: profileImg },
    { album: "Album 2", releasedin: "2019", albumDuration: "150", link: profileImg },
    { album: "Album 3", releasedin: "2005", albumDuration: "10", link: profileImg },
    { album: "Album 4", releasedin: "1997", albumDuration: "90", link: profileImg }
  ];

  return (
    <div className='main'>
      <NVbar />

      <div class='imageContainer' style={{ width: "100%", height: "300px" }} >

        <img src={profileImg} alt="Logo" style={{ float: "left", width: "100%", height: "100%", objectFit: "cover" }} />

        <div class="bottom-left">Name of the Artist</div>

        <div class="top-played" >


        </div>



      </div>
      <h1 class='topPlayedTitle'>Top played songs</h1>
      <div style={{ display: "flex" }}>
=======
    const cardContentArray = [
        { title: "Song 1", text: "Find us on Facebook", link: profileImg},
        { title: "Song 2", text: "Find us on Instagram", link: profileImg },
        {title: "Song 3", text: "Find us on Youtube", link: profileImg},
        {title: "Song 4", text: "Find us on LinkedIn", link: profileImg}
      ];
    const albumList = [
        { album: "Album 1", releasedin: "2020",albumDuration: "120", link: profileImg},
        { album: "Album 2", releasedin: "2019",albumDuration: "150", link: profileImg },
        {album: "Album 3", releasedin: "2005",albumDuration: "10", link: profileImg},
        {album: "Album 4", releasedin: "1997",albumDuration: "90", link: profileImg}
      ];

 return (
          <div className='main'>
                        
                       
                        <div class='imageContainer' style={{width:"100%", height: "300px"}} >
                        
                        <img src={profileImg} alt="Logo"  style={{float:"left", width:"100%", height:"100%", objectFit:"cover" }}/>
                        
                        <div class="bottom-left">Name of the Artist</div>

                        <div class="top-played" >
                        
                        
                        </div>
                        
                        
    
                      </div>
                      <h1 class='topPlayedTitle'>Top played songs</h1>
                      <div style={{ display: "flex" }}>
>>>>>>> main:frontend/src/Components/Artist/Artist.js
        {cardContentArray.map((el, i) => (
          <span key={el.title + el.text}>
            <Card id='topSongCard'
              style={{ width: "18rem", alignItems: "center", margin: "2rem" }}
            >
              <Card.Img variant="top" src={el.link} />
              <PlayButton className="playButton" />
              <Card.Body>
                <Card.Title><b>{el.title}</b>  </Card.Title>
                <Card.Text> </Card.Text>
              </Card.Body>
            </Card>
          </span>
        ))}
      </div>
      <h1 class='topPlayedTitle'>Albums</h1>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Album art</th>
              <th><i>Album name</i></th>
              <th><i>Released on</i></th>
              <th><i>Duration</i></th>
            </tr>
          </thead>
          <tbody>
            {albumList.map((t, i) => {
              i = i + 1;
              return (
                <tr className='table_row'>
                  <td class="albumArtContainer"><img class="albumArt" src={t.link}></img></td>
                  <td>{t.album}</td>
                  <td>{t.releasedin}</td>
                  <td>{t.albumDuration} minutes</td>
                </tr>
              )
            }
            )}
          </tbody>
        </Table>

      </div>
    </div>

  );


}



import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { InputGroup, FormControl, Button, Table, Container } from 'react-bootstrap'


//Calculate the number of artists on the platform
// Total songs posted on the songs.


 function ArtistFact() {

    const params = useParams();
    const artistId = params.id;
    const [artist, setArtistList] = useState({});
    const [trackList, setTrackList] = useState([])
    const [totalTrackCount, settotalTrackCount] = useState([])
    const[searchTerm, setSearchTerm]= useState('');
//Get all artist
    useEffect(() => {
        fetch(`http://localhost:4000/api/artists/getAll`).then(res => {
          res.json().then(result => {
            let artists = result;
            setArtistList(artists)
            console.log(artists)
          })
        })
          .catch(err => {
            console.error("Weather fetch failed: ", err);
          })
      }, [])

      //Get all tracks
      useEffect(() => {
        fetch(`http://localhost:4000/api/tracks/getTracks`).then(res => {
            res.json().then(result => {
                let tracks = result;
                setTrackList(tracks)
                console.log(tracks)
                let count=0;
                trackList.forEach(element => {
                    count+=element.playCount;
                });
                settotalTrackCount(count);
            })
        })
            .catch(err => {
                console.error("Weather fetch failed: ", err);
            })
    }, [])


      const artistList = [
        { album: "Weeknd", releasedin: "2020",albumDuration: "120"},
        { album: "Kishore kumar", releasedin: "2019",albumDuration: "150"},
        {album: "Metallica", releasedin: "2005",albumDuration: "10"},
        {album: "Nirvana", releasedin: "1997",albumDuration: "90"}
      ];

      const totalPlays= () =>{

      }

    return (
        <div>
           
    <Container fluid>
           
           <Table striped bordered hover variant="dark">
               <thead>
                   <tr>
                       
                       <th><i>Artist</i></th>
                       <th><i>Albums</i></th>
                       <th><i>Plays</i></th>
                   </tr>
               </thead>
               <tbody>
               {artistList.filter((val) => {
                       if (searchTerm == '') {
                           return val
                       }
                       else if (val.album.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                           return val
                       }
                   }).map((t, i) => {
                       i = i + 1;
                       return (
                           <Link to={`/artist/${t._id}`} className="nav-link" key={t.id}>
                           <tr className='table_row'>
                            <td >123123</td>
                               <td >{artist.length}</td>
                               <td>{totalTrackCount}</td>
                              
                           </tr>
                           </Link>
                       )
                   }
                   )}
               </tbody>
           </Table>
          
           </Container>

    
        </div>
    )
}

export default ArtistFact;
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { InputGroup, FormControl, Button, Table, Container } from 'react-bootstrap'
import profileImg from "../../assets/Shawn-Mendes.webp";
import { Link } from 'react-router-dom'
import './Artist.css';


function AllArtist() {

    const params = useParams();
    const artistId = params.id;
    const [artist, setArtistList] = useState({});


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

const[searchTerm, setSearchTerm]= useState('');
const artistList = [
    { album: "Weeknd", releasedin: "2020",albumDuration: "120", link: profileImg},
    { album: "Kishore kumar", releasedin: "2019",albumDuration: "150", link: profileImg },
    {album: "Metallica", releasedin: "2005",albumDuration: "10", link: profileImg},
    {album: "Nirvana", releasedin: "1997",albumDuration: "90", link: profileImg}
  ];
   
    return (
        <div>

            <InputGroup className="mb-3" onChange={(event) => { setSearchTerm(event.target.value) }}>
                <FormControl placeholder="Search your favourite artist" />
                <Button variant="outline-secondary" id="button-addon2"> Find </Button>
            </InputGroup>
            <Container fluid>
           
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th><i>Artist name</i></th>
                        
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
                                <td class="albumArtContainer"><img class="albumArt" src={t.link}></img></td>
                                <td>{t.album}</td>
                               
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

export default AllArtist
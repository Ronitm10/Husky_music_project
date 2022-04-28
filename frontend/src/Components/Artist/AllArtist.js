import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap'
import profileImg from "../../assets/Shawn-Mendes.webp";
import './ArtistProfile.css';


function AllArtist() {
   
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
                            <tr className='table_row'>
                                <td class="albumArtContainer"><img class="albumArt" src={t.link}></img></td>
                                <td>{t.album}</td>
                               
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default AllArtist
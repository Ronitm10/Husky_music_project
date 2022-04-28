import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap'
import profileImg from "../../assets/Shawn-Mendes.webp";


function AllArtist() {
   
const[searchTerm, setSearchTerm]= useState('');
const artistList = [
    { album: "Album 1", releasedin: "2020",albumDuration: "120", link: profileImg},
    { album: "Album 2", releasedin: "2019",albumDuration: "150", link: profileImg },
    {album: "Album 3", releasedin: "2005",albumDuration: "10", link: profileImg},
    {album: "Album 4", releasedin: "1997",albumDuration: "90", link: profileImg}
  ];
   
    return (
        <div>

            <InputGroup className="mb-3" onChange={(event) => { setSearchTerm(event.target.value) }}>
                <FormControl placeholder="Search Song" />
                <Button variant="outline-secondary" id="button-addon2"> Search </Button>
            </InputGroup>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Album art</th>
                        <th><i>Album</i></th>
                        <th><i>Year</i></th>
                        <th><i>Duration</i></th>
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
                                <td>{i}</td>
                                <td>{t.album}</td>
                                <td>{t.releasedin}</td>
                                <td>{t.albumDuration}</td>
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
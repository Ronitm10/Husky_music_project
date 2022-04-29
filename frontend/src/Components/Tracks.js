import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap'
import MusicPlayer from './Player/MusicPlayer';

function Track() {
    const [trackList, setTrackList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetch(`http://localhost:4000/api/tracks/getTracks`).then(res => {
            res.json().then(result => {
                let tracks = result;
                setTrackList(tracks)
                console.log(tracks)
            })
        })
            .catch(err => {
                console.error("Weather fetch failed: ", err);
            })
    }, [])

    return (
        <Container>
            <InputGroup className="mb-3" onChange={(event) => { setSearchTerm(event.target.value) }}>
                <FormControl placeholder="Search Song" />
                <Button variant="outline-secondary" id="button-addon2"> Search </Button>
            </InputGroup>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th><i>TITLE</i></th>
                        <th><i>ALBUM</i></th>
                        <th><i>DURATION</i></th>
                    </tr>
                </thead>
                <tbody>
                    {trackList.filter((val) => {
                        if (searchTerm === '') {
                            return val
                        }
                        else if (val.trackName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                            return val
                        }
                    }).map((t, i) => {
                        i = i + 1;
                        return (
                            <tr className='table_row'>
                                <td>{i}</td>
                                <td>{t.trackName}</td>
                                <td>{t.album}</td>
                                <td>{t.trackDuration}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
            <footer>
                <MusicPlayer />
            </footer>

        </Container>
    )
}

export default Track

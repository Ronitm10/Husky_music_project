import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import NVbar from './NVbar'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import Player from './Player/Player';
import './Tracks.css'

function Track() {
    const [trackList, setTrackList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(0);

    const [songs] = useState([
        {
            title: "Forget me too ft. Halsey",
            artist: "Machine Gun Kelly",
            img_src: "./images/song-1.jpg",
            src: "./music/somebody-new.mp3"
        },
        {
            title: "Song 2",
            artist: "Artist 2",
            img_src: "./images/song-2.jpg",
            src: "./music/somebody-new.mp3"
        },
        {
            title: "Song 3",
            artist: "Artist 3",
            img_src: "./images/song-3.jpg",
            src: "./music/on-n-on.mp3"
        },
        {
            title: "Song 4",
            artist: "Artist 4",
            img_src: "./images/song-4.jpg",
            src: "./music/somebody-new.mp3"
        }
    ]);

    useEffect(() => {
        setNextSongIndex(() => {
            if (currentSongIndex + 1 > songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1;
            }
        });
    }, [currentSongIndex]);



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
        <div>
            <NVbar />
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
                        if (searchTerm == '') {
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
                <div className="App">
                    <Player
                        currentSongIndex={currentSongIndex}
                        setCurrentSongIndex={setCurrentSongIndex}
                        nextSongIndex={nextSongIndex}
                        songs={songs}
                    />
                </div>
            </footer>

        </div>
    )
}

export default Track

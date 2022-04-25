import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

function Track() {
    const [trackList, setTrackList] = useState([])

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
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {trackList.map((t) => {
                    return (
                        <tr>
                            <td>{t.trackName}</td>
                            <td>{t.album}</td>
                            <td>{t.trackDuration}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </Table>
    )
}

export default Track

import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import NVbar from './NVbar'

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
        <div>
            <NVbar />
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
                    {trackList.map((t, i) => {
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
        </div>
    )
}

export default Track

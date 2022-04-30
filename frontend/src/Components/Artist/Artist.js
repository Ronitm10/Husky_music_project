import './Artist.css';
import NVbar from '../NVbar';
import axios from 'axios';
import profileImg from "../../assets/Shawn-Mendes.webp";
import { Card, Table } from "react-bootstrap";
import { useEffect, useState } from 'react'
import { useParams, Link, Navigate, navigate, useNavigate } from "react-router-dom";

import { ReactComponent as PlayButton } from "../../assets/play-button.svg";

//import TrackDisplay(props)

export default function Artist() {
    const params = useParams();
    const artistId = params.id;
    const [artist, setArtist] = useState();
    const [albumList, setAlbumList] = useState();
    const navigate = useNavigate();

    // Getting the data from backend
    useEffect(() => {
        axios.get(`http://localhost:4000/api/albums/findByArtist/${artistId}`).then(
            (res) => {
                console.log('artist is', artistId)
                console.log('albums are', res.data)
                setAlbumList(res.data);
            }
        )
            .catch(err => {
                console.error('Failed to get artist', err);
            })
    }, [artistId])

    useEffect(() => {
        if (artistId) {
            axios.get(`http://localhost:4000/api/artists/find/${artistId}`)
                .then(res => {
                    console.log('artist found', res);
                    setArtist(res.data);
                })
        }
    }, [artistId])

    return albumList ? (
        <div className='main'>
            <div className='imageContainer' style={{ width: "100%", height: "300px" }} >
                {
                    artist ? <img src={artist.pic} alt="Logo" style={{ float: "left", width: "100%", height: "100%", objectFit: "cover" }} /> : <></>
                }

                <div className="bottom-left"></div>
                <div className="top-played" >
                </div>
            </div>
            <h1 className='topPlayedTitle'>Albums</h1>
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Album art</th>
                            <th><i>Album name</i></th>
                            <th><i>Released on</i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {albumList.map((album, i) => {
                            i = i + 1;
                            return (

                                <tr onClick={(e) => navigate(`/albums/${album._id}`)} className='table_row'>
                                    <td className="albumArtContainer"><img className="albumArt" src={album.albumArtURL}></img></td>
                                    <td>{album.name}</td>
                                    <td>2022</td>
                                </tr>

                            )
                        }
                        )}
                    </tbody>
                </Table>

            </div>
        </div>
    ) : (
        <div className='message'>Stay tuned for updates!</div>
    )


}



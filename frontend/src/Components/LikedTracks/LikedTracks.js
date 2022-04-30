import React from 'react'
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { Container, Table } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '../../helpers'
import likedImg from "../../assets/liked-song.jpeg"
const LikedTracks = () => {

    const [likedTracks, setLikedTracks] = useState([]);
    const [update, setUpdate] = useState(false);
    const userToken = getToken();
    const likeSong = async (trackId) => {
        console.log('clicked', trackId);
        const userRes = await axios.get(`http://localhost:4000/api/users/find/${userToken.user.id}`)
        const user = userRes.data;
        console.log("track id is", trackId);
        console.log(user.likedTracks)
        const trackIds = user.likedTracks.map(t => t._id);
        let payload = [];
        if (trackIds.includes(trackId)) {
            console.log('Have to remove the track now')
            payload = trackIds.filter(id => id !== trackId)
        }
        else {
            console.log("doesnt include?")
            payload = payload.concat(trackIds);
            payload.push(trackId);
        }
        console.log(payload)
        axios.post(`http://localhost:4000/api/users/updateLikes/${userToken.user.id}`,
            {
                likedTracks: payload
            })
            .then(res => {
                console.log('added song to user likes', res);
                setUpdate(true);
            })
            .catch(err => {
                console.error('Adding to likes failed', err)
            })

    }
    useEffect(() => {
        const userRes = axios.get(`http://localhost:4000/api/users/find/${userToken.user.id}`)
            .then(res => {
                setLikedTracks(res.data.likedTracks)
                setUpdate(false)
            })
    }, [userToken.user.id, update])

    if (!userToken) <Navigate to="/" />
    return likedTracks.length > 0 ? (
        <Container>
            <div class='imageContainer' style={{ width: "100%", height: "300px" }} >
                <img src={likedImg} alt="Logo" style={{ float: "left", width: "100%", height: "100%", objectFit: "cover" }} />
                
            </div>
            <h2 style={{ color: "white", width: "100%" }}>Your Likes</h2>
            <Table striped hover variant="dark" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Runtime</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        likedTracks.map((track, idx) => {
                            return (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{track.trackName.split('.')[0]}</td>
                                    <td>3:34</td>
                                    <td><FontAwesomeIcon icon={faPlayCircle} /></td>
                                    <td style={{ textAlign: 'center' }}>
                                        <FontAwesomeIcon
                                            onClick={() => likeSong(track._id)}
                                            icon={faThumbsUp} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    ) : (<div>No Track found</div>)
}

export default LikedTracks
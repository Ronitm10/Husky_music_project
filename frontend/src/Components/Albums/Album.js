import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { Container, Table, Card } from 'react-bootstrap'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '../../helpers'
import './Album.css';

const Album = () => {
    const params = useParams();
    const albumId = params.id;
    const [album, setAlbum] = useState({});
    const userToken = getToken();

    if (!userToken) <Navigate to="/" />

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
            })
            .catch(err => {
                console.error('Adding to likes failed', err)
            })

    }


    useEffect(() => {
        axios.get(`http://localhost:4000/api/albums/find/${albumId}`).then(
            (res) => {
                console.log(res.data)
                setAlbum(res.data);
            }
        ).catch((error) => {
            console.error("Error fetching tracks for this album", error);
        })
    }, [albumId])


    return album.tracks ? (
        <Container className='tracksContainer'>
            <div class='imageContainer' style={{ width: "100%", height: "300px" }} >
                <img src={album.albumArtURL} alt="Logo" style={{ float: "left", width: "100%", height: "100%", objectFit: "cover" }} />
                <Card className="bg-dark text-white">
                    <Card.ImgOverlay className='cardDetails'>
                        <Card.Title><h1>{album.name}</h1></Card.Title>
                        <Card.Text>
                            “If I had my life to live over again, I would have made a rule to read some poetry and listen to some music at least once every week.” “Music is the universal language of mankind.” “Where words fail, music speaks.”
                            “Life is like a beautiful melody, only the lyrics are messed up.”
                        </Card.Text>
                        <Card.Text>{album.genre}</Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </div>
            <Table striped hover variant="dark" className="trackTable" >
                <thead className='tableHead'>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>Runtime</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    album.tracks.map((track, idx) => {
                        return (
                            <tr className='tableRow'>
                                <td>{idx + 1}</td>
                                <td><FontAwesomeIcon icon={faPlayCircle} /></td>
                                <td>{track.trackName.split('.')[0]}</td>
                                <td>3:34</td>
                                <td style={{ textAlign: 'center' }}>
                                    <FontAwesomeIcon
                                        onClick={() => likeSong(track._id)}
                                        icon={faThumbsUp} />
                                </td>
                            </tr>
                        )
                    })
                }
            </Table>
        </Container>
    ) : (<div>No Track found</div>)
}

export default Album
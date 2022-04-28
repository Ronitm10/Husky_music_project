import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Album = () => {
    const params = useParams();
    const albumId = params.id;
    const [album, setAlbum] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4000/api/albums/find/${albumId}`).then(
            (res) => {
                console.log(res.data)
                setAlbum(res.data);
            }
        )
    }, [albumId])
    return album.tracks ? (
        <div>TrackList
            {
                album.tracks.map((track) => {
                    return (
                        <div>
                            {track.trackName}
                        </div>)
                })
            }
        </div>
    ) : (<div>No Track found</div>)
}

export default Album
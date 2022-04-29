import React, { useState, useEffect } from 'react'
import { Container, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../helpers';

const axios = require('axios');
const token = getToken();
const ArtistDash = () => {
    const [albums, setAlbums] = useState([]);
    const [genre, setGenre] = useState("")
    const [albumName, setAlbumName] = useState("");
    const [show, setShow] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Invalid audio file");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/albums/findByArtist/${token.user.id}`)
            .then(res => {
                setAlbums(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch albums for artist");
            })
    }, [update])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        var formData = new FormData();
        for (const key of Object.keys(tracks)) {
            formData.append('tracks', tracks[key])
        }
        console.log('in handle submit')

        let trackres;
        try {
            trackres = await axios.post("http://localhost:4000/api/tracks/create", formData);
        }
        catch (error) {
            setHasError(true)
            setLoading(false)
            return;
        }
        let trackIds = trackres.data.map(track => track._id);
        try {
            let albumRes = await axios.post("http://localhost:4000/api/albums/create", {
                artist: token.user.id,
                tracks: trackIds,
                name: albumName,
                genre: genre
            })
            console.log("album successfully created", albumRes);
            setUpdate(true);
            setLoading(false);
            setShow(false);
            navigate("/artistDash")
        }
        catch (error) {
            setHasError(true);
            console.error('Error creating album', error);
        }

    }

    const onFileChange = (e => {
        setTracks(e.target.files)
    })
    return (
        <Container>
            <Button variant="primary" onClick={() => setShow(true)}>
                Add Albums
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        Add Album
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="albumName">
                            <Form.Label>Album Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter Album name"
                                onChange={e => setAlbumName(e.target.value)} required />
                            <Form.Control type="text"
                                placeholder="Enter Genre"
                                onChange={e => setGenre(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="tracks" className="mb-3">
                            <Form.Label>Upload Album Tracks</Form.Label>
                            <Form.Control onChange={onFileChange} type="file" multiple required />
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                            Create Album
                        </Button>
                        {
                            hasError ?
                                <Alert style={{ margin: "5%" }} variant='danger'>
                                    {errorMsg}
                                </Alert> : <></>
                        }
                    </Form>
                    {loading ?
                        <Spinner animation="border" variant="warning" /> :
                        <></>
                    }
                </Modal.Body>
            </Modal>
            {albums ? albums.map(album => <div>{album.name}</div>) : <div>You have no albums</div>
            }
        </Container>
    );
}

export default ArtistDash
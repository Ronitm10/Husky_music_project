import React, { useState, useEffect } from 'react'
import { Container, Button, Modal, Form, Alert, Spinner, Card } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import { getToken } from '../../helpers';

const axios = require('axios');

const ArtistDash = () => {
    const [albums, setAlbums] = useState();
    const [genre, setGenre] = useState("")
    const [token, setToken] = useState();
    const [albumName, setAlbumName] = useState("");
    const [show, setShow] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [errorMsg, setErrorMsg] = useState("Invalid audio file");
    const [artistId, setArtistId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) setToken(getToken());
    })
    useEffect(() => {
        if (token)
            axios.get(`http://localhost:4000/api/artists/findByUser/${token._id}`)
                .then(res => {
                    console.log("artist id is", res.data._id);
                    setArtistId(res.data._id)
                });
    }, [token])


    useEffect(() => {
        if (artistId)
            axios.get(`http://localhost:4000/api/albums/findByArtist/${artistId}`)
                .then(res => {
                    console.log("got the albums for this user");
                    setAlbums(res.data)
                });
    }, [artistId, update])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        var formData = new FormData();
        console.log('tracks in form are ', tracks)
        console.log('image in form is', image)
        for (const key of Object.keys(tracks)) {
            formData.append('tracks', tracks[key])
        }
        //formData.append('cover', image);
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
        formData = new FormData();
        console.log('image is ', image);
        formData.append('cover', image)
        let coverres;
        console.log('can i post a image?')
        try {
            coverres = await axios.post('http://localhost:4000/api/albums/albumCover', formData);
            coverres = coverres.data.url;
        }
        catch (error) {
            setHasError(true)
            setLoading(false)
            return;
        }
        let trackIds = trackres.data.map(track => track._id);
        try {
            console.log('gonna create a album, whats my id now?', artistId)
            let albumRes = await axios.post("http://localhost:4000/api/albums/create", {
                artist: artistId,
                tracks: trackIds,
                name: albumName,
                genre: genre,
                albumArtURL: coverres
            })
            console.log("album successfully created", albumRes);
            setLoading(false);
            setShow(false);
            setHasError(false);
            setUpdate(true);
        }
        catch (error) {
            setHasError(true);
            setLoading(false);
            console.error('Error creating album', error);
        }

    }

    const onFileChange = (e => {
        setTracks(e.target.files)
    })

    const onCoverChange = (e => {
        setImage(e.target.files[0])
    })
    return (
        <>
            <Button variant="primary" style={{ textAlign: "center", marginLeft: "50%", marginTop: "5%" }} onClick={() => setShow(true)}>
                Add Albums
            </Button>
            <Container className="album-container">

                {albums ? albums.map((al, idx) => {
                    console.log('entering map ?', al.artist)
                    return (
                        <Link to={`/albums/${al._id}`} className="nav-link" key={al._id}>
                            <Card key={idx} style={{
                                width: '12rem',
                                height: '13rem',
                                backgroundColor: "black",
                                borderStyle: "solid",
                                borderColor: "white",
                                borderRadius: "5%"
                            }}>
                                <Card.Img variant="top" src={al.albumArtURL} />
                                <Card.Body>
                                    <Card.Title className='title'>{al.name}</Card.Title>
                                    <Card.Text className='text'>by {al.artist.name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    )
                }
                ) : <></>}
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

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="genreName">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter Genre"
                                    onChange={e => setGenre(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="tracks" className="mb-3">
                                <Form.Label>Upload Album Tracks</Form.Label>
                                <Form.Control onChange={onFileChange}
                                    type="file"
                                    accept="audio/*" multiple required />
                            </Form.Group>
                            <Form.Group controlId="cover" className="mb-3">
                                <Form.Label>Upload a Cover Image</Form.Label>
                                <Form.Control onChange={onCoverChange}
                                    type="file"
                                    accept="image/*" required />
                            </Form.Group>
                            <Button variant="outline-success" type="submit">
                                Create Album
                                {loading ?
                                    <Spinner as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true" /> :
                                    <></>
                                }
                            </Button>

                            {
                                hasError ?
                                    <Alert style={{ margin: "5%" }} variant='danger'>
                                        {errorMsg}
                                    </Alert> : <></>
                            }
                        </Form>

                    </Modal.Body>
                </Modal>

            </Container>
        </>
    );
}

export default ArtistDash
import "./Playlist.css";
import React, { useState, useEffect } from "react";
import { Alert, Card, Button, Container, CardGroup, Modal, Form, Spinner, ListGroup, ListGroupItem } from "react-bootstrap";
import add from "../../assets/add.png";
import husky from "../../assets/playlist.jpg"
import { Link } from "react-router-dom";
import axios from "axios";
import { Multiselect } from 'multiselect-react-dropdown';
import { getToken } from "../../helpers";

function Playlists() {
  const [playlistList, setPlaylistList] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [seltracks, setSeltracks] = useState([]);
  const [playListName, setPlayListName] = useState();
  const [added, setAdded] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [msg, setMsg] = useState("");
  const token = getToken();
  useEffect(() => {
    axios.get(`http://localhost:4000/api/tracks/getAll`)
      .then(res => {
        console.log('all tracks', res.data)
        setTracks(res.data)
      })
      .catch(err => {
        console.error('Failed to get all tracks', err);
      })
  }, [])

  useEffect(() => {
    if (token)
      axios.get(`http://localhost:4000/api/playlists/findByUser/${token._id}`)
        .then(res => {
          console.log('found plists', res.data);
          setPlaylistList(res.data);
        })
        .catch(err => {
          console.error('failed to get palylsits', err);
        })
  }, [added]);

  const handleClose = e => {
    setShow(false);
  }

  const onSelect = (selectedList, selectedItem) => {
    console.log('selected items are', selectedList);
    setSeltracks(selectedList);
  }
  const onRemove = (selectedList, removedItem) => {
    console.log('selected items are', selectedList);
    setSeltracks(selectedList);
  }

  const handleSubmit = async (e) => {
    setHasError(false);
    e.preventDefault();
    setLoading(true);
    try {
      console.log('selected tracks are', seltracks);
      const res = await axios.post('http://localhost:4000/api/playlists/createPlaylist', {
        name: playListName,
        tracks: seltracks.map(t => t._id),
        user: token._id
      })
      console.log('playlist?', res);
      setSeltracks([]);
      setLoading(false);
      setShow(false);
      setAdded(added + 1);
    }
    catch (err) {
      setSeltracks([]);
      setHasError(true);
      setLoading(false);
      setMsg(err.response.data.error);
    }
  }

  return playlistList?.length >= 1 ? (
    <Container className="playlist-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="albumName">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control type="text"
                placeholder="Enter Playlist name"
                onChange={e => setPlayListName(e.target.value)} required />
            </Form.Group>
            {tracks ?
              <Multiselect
                options={tracks}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="trackName" /> : <></>
            }
            <Button variant="outline-success" type="submit">
              Create playlist
              {loading ?
                <Spinner as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true" /> :
                <></>
              }
            </Button>
          </Form>
          {hasError ? <Alert variant='danger'>
            {msg}
          </Alert> : <></>}
        </Modal.Body>

      </Modal>
      <Card
        onClick={() => setShow(true)}
        className="nav-link"
        style={{
          width: "14rem",
          backgroundColor: "black",
          borderStyle: "solid",
          borderColor: "purple",
          borderRadius: "5%",
          marginTop: "5%"
        }}
      >
        <Card.Img variant="top" src={add} />
        <Card.Body>
          <Card.Title className="title">Add</Card.Title>
        </Card.Body>
      </Card>
      {playlistList.map((playlist, idx) => {
        return (
          <Link
            to={`/playlists/${playlist._id}`}
            className="nav-link"
            key={playlist.id}
          >
            <Card
              key={idx}
              style={{
                width: "14rem",
                backgroundColor: "black",
                borderStyle: "solid",
                borderColor: "purple",
                borderRadius: "5%",
                marginTop: "25%"
              }}
            >
              <Card.Img variant="top" src={husky} />
              <Card.Body>
                <Card.Title className="title">{playlist.name}</Card.Title>
                <Card.Text className="text">by {playlist.name}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </Container>
  ) : (

    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="albumName">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control type="text"
                placeholder="Enter Paylist name"
                onChange={e => setPlayListName(e.target.value)} required />
            </Form.Group>
            {tracks ?
              <Multiselect
                options={tracks}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="trackName" /> : <></>
            }
            <Button variant="outline-success" type="submit">
              Create playlist
              {loading ?
                <Spinner as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true" /> :
                <></>
              }
            </Button>
          </Form>
        </Modal.Body>
        {hasError ? <Alert variant='danger'>
          {msg}
        </Alert> : <></>}
      </Modal>
      <Card
        onClick={() => setShow(true)}
        style={{
          width: "14rem",
          backgroundColor: "black",
          borderStyle: "solid",
          borderColor: "purple",
          borderRadius: "5%",
          marginTop: "5%"
        }}
      >
        <Card.Img variant="top" src={add} />
        <Card.Body>
          <Card.Title className="title">Add</Card.Title>
        </Card.Body>
      </Card>
    </Container>

  );
}

export default Playlists;

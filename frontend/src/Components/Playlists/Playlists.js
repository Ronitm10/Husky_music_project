import "./Playlist.css";
import React, { useState, useEffect } from "react";
import { Card, Button, Container, CardGroup } from "react-bootstrap";
import husky from "../../assets/huskybrand.svg";
import { Link } from "react-router-dom";

function Playlists() {
  const [playlistList, setPlaylistList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/playlists/getAll`)
      .then((res) => {
        res.json().then((result) => {
          let playlists = result;
          setPlaylistList(playlists);
          console.log(playlists);
        });
      })
      .catch((err) => {
        setPlaylistList([]);
        console.error("Playlists fetch failed:", err);
      });
  }, []);

  return playlistList.length >= 1 ? (
    <Container className="playlist-container">
      <h2 style={{ color: "white", width: "100%" }}>Playlists</h2>
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
      <div className="message">Looks like you havent created any playlists yet!</div>
    </Container>

  );
}

export default Playlists;

import "./Album.css";
import React, { useState, useEffect } from "react";
import { Card, Button, Container, CardGroup } from "react-bootstrap";
import husky from "../../assets/huskybrand.svg";
import { Link } from "react-router-dom";
function Album() {
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/albums/getAll`).then(res => {
      let albums = res;
      setAlbumList(albums)
      console.log(albums)
    })
      .catch((err) => {
        setAlbumList([]);
        console.error("Albums fetch failed: ", err);
      });
  }, []);

  return albumList ? (
    <Container className="album-container">
      <h2 style={{ color: "white", width: "100%" }}>Albums</h2>
      {albumList.map((album, idx) => {
        return (
          <Link to={`/albums/${album._id}`} className="nav-link" key={album.id}>
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
                <Card.Title className="title">{album.name}</Card.Title>
                <Card.Text className="text">by {album.artist.name}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </Container>
  ) : (
    <div>No albums found</div>
  );
}

export default Album;

import '../Albums/Album.css'
import React, { useState, useEffect } from 'react'
import { Card, Button, Container, CardGroup } from 'react-bootstrap'
import husky from '../../assets/huskybrand.svg'
import { Link } from 'react-router-dom'
function AllArtist() {

    const [artistList, setArtistList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/albums/getAll`).then(res => {
            res.json().then(result => {
                let artist = result;
                setArtistList(artist)
                console.log(artist)
            })
        })
            .catch(err => {
                setArtistList([])
                console.error("Albums fetch failed: ", err);
            })
    }, [])

    return artistList ? (
        <Container className="album-container">
            <h2 style={{ color: "white", width: "100%" }}>Artists</h2>
            {artistList.map((artist, idx) => {
                return (
                    <Link to={`/albums/${artist._id}`} className="nav-link" key={artist.id}>
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
                            <Card.Img variant="top" src={husky} alt={husky} />
                            <Card.Body>
                                <Card.Title className="title">{artist.name}</Card.Title>
                                {/* <Card.Text className="text">{artist.name}</Card.Text> */}
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

export default AllArtist

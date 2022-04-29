import React, { useState, useEffect } from 'react';
import { Card, Container, InputGroup, FormControl, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import profileImg from "../../assets/Shawn-Mendes.webp";
import './ArtistProfile.css';
import husky from '../../assets/huskybrand.svg'

function Artists() {

    const [artistList, setArtistList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/artists/getAll`).then(res => {
            res.json().then(result => {
                let artists = result;
                setArtistList(artists)
                console.log(artists)
            })
        })
            .catch(err => {
                setArtistList([])
                console.error("Artist fetch failed: ", err);
            })
    }, [])

    return artistList ? (
        <Container className="artist-container">
            <h2 style={{ color: "white", width: "100%" }}>Artists</h2>
            {artistList.map((artist, idx) => {
                return (
                    <Link to={`/artists/${artist._id}`} className="nav-link" key={artist.id}>
                        <Card key={idx} style={{
                            width: '12rem',
                            backgroundColor: "black",
                            borderStyle: "solid",
                            borderColor: "white",
                            borderRadius: "5%"
                        }}>
                            <Card.Img variant="top" src={husky} />
                            <Card.Body>
                                <Card.Title className='title'>{artist.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                )
            }
            )}
        </Container>
    ) : (<div>No Artists found</div>)
}

export default Artists
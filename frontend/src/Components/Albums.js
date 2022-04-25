import './Album.css'
import React, { useState, useEffect } from 'react'
import { Card,Button,Container, CardGroup } from 'react-bootstrap'
import  Image from "../Components/Shakira.png"
function Album() {
    
const [albumList, setAlbumList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/albums/getAll`).then(res => {
            res.json().then(result => {
                let albums = result;
                setAlbumList(albums)
                console.log(albums)
            })
        })
            .catch(err => {
                console.error("Weather fetch failed: ", err);
            })
    }, [])

            return (
                albumList.map((t) => {
                    return (
                        <div class='outer'>
                        <Container fluid>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={Image} />
                                <Card.Body>
                                    <Card.Title class='title'>{t.albumName}</Card.Title>
                                    <Card.Text class='text'>{t.genre}</Card.Text>
                                    <Button variant="primary">Click here to view Tracks</Button>
                                </Card.Body>
                            </Card>
                            </Container>
                            
                        </div>
                    )
                }
                )
            )
            }

export default Album

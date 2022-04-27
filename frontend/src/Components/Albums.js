import './Album.css'
import React, { useState, useEffect } from 'react'
import { Card, Button, Container, CardGroup } from 'react-bootstrap'
import Image from "../Components/Shakira.png"
import { Link } from 'react-router-dom'
function Album() {

  const [albumList, setAlbumList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/api/albums/getAll`).then(res => {
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

  return albumList ? (
    albumList.map((t) => {
      return (
        <div className='outer'>
          <Container fluid>
            <Link to={`/albums/${t._id}`} className="nav-link" key={t.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Image} />
                <Card.Body>
                  <Card.Title className='title'>{t.albumName}</Card.Title>
                  <Card.Text className='text'>{t.genre}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Container>

        </div>
      )
    }
    )
  ) : (<div>No albums found</div>)
}

export default Album

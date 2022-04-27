import "./Album.css";
import React, { useState, useEffect } from "react";
import NVbar from "./NVbar";
import { Card, Container, InputGroup, FormControl, Button } from "react-bootstrap";
import Image from "../Components/Shakira.png";
import Track from "./Tracks";

function Album() {
  const [albumList, setAlbumList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")


  useEffect(() => {
    fetch(`http://localhost:4000/api/albums/getAll`)
      .then((res) => {
        res.json().then((result) => {
          let albums = result;
          setAlbumList(albums);
          console.log(albums);
        });
      })
      .catch((err) => {
        console.error("Weather fetch failed: ", err);
      });
  }, []);


  return (
    <div>
      <NVbar />
      <InputGroup className="mb-3" onChange={(event) => { setSearchTerm(event.target.value) }}>
        <FormControl placeholder="Search Album" />
        <Button variant="outline-secondary" id="button-addon2"> Search </Button>
      </InputGroup>

      {albumList.filter((val) => {
        if (searchTerm == '') {
          return val
        }
        else if (val.albumName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
          return val
        }
      }).map((t, i) => {
        i = i + 1;
        return (

          <div class="outer">
            <Container fluid>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={Image} />
                <Card.Body>
                  <Card.Title class="title">{t.albumName}</Card.Title>
                  <Card.Text class="text">{t.genre}</Card.Text>
                  <Button variant="primary" onClick={() => Track(
                    <Track
                      alName={t.albumName}
                    />
                  )}>Click here to view Tracks</Button>
                </Card.Body>
              </Card>
            </Container>
          </div>
        )
      }
      )}
    </div>
  )

}

export default Album;

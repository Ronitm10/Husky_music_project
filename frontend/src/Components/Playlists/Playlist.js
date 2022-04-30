import "./Playlist.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faThumbsUp,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getToken } from "../../helpers";

const Playlist = () => {
  const params = useParams();
  const playlistId = params.id;
  const [playlist, setPlaylist] = useState({});
  const userToken = getToken();

  if (!userToken) <Navigate to="/" />;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/albums/find/${playlistId}`)
      .then((res) => {
        console.log(res.data);
        setPlaylist(res.data);
      });
  }, [playlistId]);
  return playlist.tracks ? (
    <Container>
      <h2 style={{ color: "white", width: "100%" }}>{playlist.name}</h2>
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Runtime</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {playlist.tracks.map((track, idx) => {
          return (
            <tr>
              <td>{idx + 1}</td>
              <td>{track.trackName.split(".")[0]}</td>
              <td>3:34</td>
              <td>
                <FontAwesomeIcon icon={faPlayCircle} />
              </td>
              <td style={{ textAlign: "center" }}></td>
            </tr>
          );
        })}
      </Table>
    </Container>
  ) : (
    <div>No Track Found</div>
  );
};

export default Playlist;

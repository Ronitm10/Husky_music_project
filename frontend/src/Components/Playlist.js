import "./Playlist.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";

const Playlist = () => {
  const params = useParams();
  const playlistId = params.id;
  const [playlist, setPlaylist] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/albums/find/${playlistId}`)
      .then((res) => {
        console.log(res.data);
        setPlaylist(res.data);
      });
  }, [playlistId]);
  return playlist.tracks ? (
    <div>
      Playlist
      {playlist.tracks.map((track) => {
        return <div>{track.trackName}</div>;
      })}
    </div>
  ) : (
    <div>No Track Found</div>
  );
};

export default Playlist;

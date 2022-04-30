import React, { useEffect, useState } from "react";
import "./HuskyPlayer.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// https://static.hanzluo.com/react-h5-audio-player-storybook/index.html?path=/docs/layouts-advanced--custom-progress-bar-section
export function HuskyPlayer({
  src
}) {
  const [song, setSong] = useState("");
  useEffect(() => {
    console.log('Song is', src);
    setSong(src);
  }, [src]);
  return (
    <div>
      <div className="footer">
        <AudioPlayer
          src={song}
          onPlay={() => console.log("pla")}
          layout=""
        />
      </div>
    </div>
  );
}

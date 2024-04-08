import React, { useState } from 'react'
import AudioPlayer from "react-h5-audio-player";

import "react-h5-audio-player/lib/styles.css";
import './css/playercontroler.css'


export const PlayerControler = ({player}) => {

    const [trackIndex, setTrackIndex] = useState(0);

    // const musicTracks = [
    //     {
    //         name: "Memories",
    //         src: "https://www.bensound.com/bensound-music/bensound-memories.mp3"
    //     },
    //     {
    //         name: "Creative Minds",
    //         src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
    //     },
    //     {
    //         name: "Acoustic Breeze",
    //         src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
    //     }
    // ];


    const handleClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack === 0 ? player.length - 1 : currentTrack - 1
        );
    };


    const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < player.length - 1 ? currentTrack + 1 : 0
        );
    };


    return (
        <>
            <nav className="navbar fixed-bottom bottom-bar">
                <div className="container-fluid d-flex justify-content-center align-items-center">
                    <AudioPlayer
                        style={{
                            width: "1350px",
                            backgroundColor: "#e1bee7",
                            color: "#121212",
                        }}
                        autoPlay
                        src={player[trackIndex].src}
                        // onPlay={(e) => console.log("onPlay")}
                        showSkipControls={true}
                        showJumpControls={false}
                        header={player[trackIndex].name}
                        // footer="All music from: www.bensound.com"
                        onClickPrevious={handleClickPrevious}
                        onClickNext={handleClickNext}
                        onEnded={handleClickNext}
                    />
                </div>
            </nav>
        </>
    )
}

import { Typography } from "@mui/material";
import React from "react";
import parse from 'html-react-parser';

import './index.scss';

const EpisodeCard = ({ activeEpisode }) => {
    return (
        <div className="episode-card">
            <Typography className='episode-card__trackname'>{activeEpisode?.trackName}</Typography>
            <div
                className="episode-card__description"
            >
                {parse(activeEpisode?.description || '')}
            </div>
            {activeEpisode?.episodeUrl && (
                <audio className='episode-card__audioBar' controls>
                    <source src={activeEpisode.episodeUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    )
}

export default EpisodeCard;

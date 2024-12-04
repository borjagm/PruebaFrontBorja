import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const PodcastDescriptionCard = ({ activePodcast , clickable }) => {
    const navigate = useNavigate();

    const podcastImage = activePodcast['im:image'].find(img => img.attributes.height === '170').label;
    const podcastName = activePodcast['im:name'].label;
    const podcastArtist = activePodcast['im:artist'].label;
    const podcastSummary = activePodcast['summary'].label;

    const handleClick = () => {
        if (clickable) {
            navigate('/podcast/' + activePodcast.id.attributes['im:id']);
        }
    };

    return (
        <Box 
            className={`podcast-resume-box ${clickable ? 'clickable' : ''}`} 
            onClick={handleClick}
        >       
            <img className='podcast-resume-box__image' src={podcastImage} alt={podcastName} />
            <div className="podcast-resume-box__separator"></div>  {/* Clase corregida */}
            <Typography className='podcast-resume-box__name'>{podcastName}</Typography>
            <Typography className='podcast-resume-box__author'>by {podcastArtist}</Typography>
            <div className="podcast-resume-box__separator"></div>  {/* Clase corregida */}
            <Typography className='podcast-resume-box__desctitle' variant="h6">Description:</Typography>
            <Typography className='podcast-resume-box__desc' variant="body2">{podcastSummary}</Typography>
        </Box>
    );
};

export default PodcastDescriptionCard;

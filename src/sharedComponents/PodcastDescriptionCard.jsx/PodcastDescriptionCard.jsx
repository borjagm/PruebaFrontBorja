import React from 'react';
import { Box, Typography } from '@mui/material';
import './index.scss';

const PodcastDescriptionBox = ({ activePodcast }) => {
    const podcastImage = activePodcast['im:image'].find(img => img.attributes.height === '170').label;
    const podcastName = activePodcast['im:name'].label;
    const podcastArtist = activePodcast['im:artist'].label;
    const podcastSummary = activePodcast['summary'].label;

    return (
        <Box className="podcast-resume-box">
            <img className='podcast-resume-box-image' src={podcastImage} alt={podcastName} />
            <div className="separator"></div>
            <Typography className='podcast-resume-box-name'>{podcastName}</Typography>
            <Typography className='podcast-resume-box-author'>by {podcastArtist}</Typography>
            <div className="separator"></div>
            <Typography className='podcast-resume-box-desctitle' variant="h6">Description:</Typography>
            <Typography className='podcast-resume-box-desc' variant="body2">{podcastSummary}</Typography>
        </Box>
    );
};

export default PodcastDescriptionBox;
import React from 'react';
import { Box, Typography } from '@mui/material';

const PodcastDescriptionBox = ({ activePodcast }) => {
    const podcastImage = activePodcast['im:image'].find(img => img.attributes.height === '170').label;
    const podcastName = activePodcast['im:name'].label;
    const podcastArtist = activePodcast['im:artist'].label;
    const podcastSummary = activePodcast['summary'].label;

    return (
        <Box className="podcast-resume-box">
            <img src={podcastImage} alt={podcastName} />
            <Typography variant="h5">{podcastName}</Typography>
            <Typography variant="body2" color="text.secondary">by {podcastArtist}</Typography>
            <Typography variant="h6">Description:</Typography>
            <Typography variant="body2">{podcastSummary}</Typography>
        </Box>
    );
};

export default PodcastDescriptionBox;
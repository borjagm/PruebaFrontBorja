import React from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const HomePodcastCard = (props) => {
    const { index, podcast, selectPodcast } = props;
    const navigate = useNavigate();

    //Controlamos el click en el card para navegar a la página del podcast
    const handleClick = () => {
      selectPodcast(podcast);
      const podcastId = podcast.id.attributes['im:id'];
      navigate(`/podcast/${podcastId}`);
    };

  return (
      <Grid item xs={12} sm={6} md={4} key={index} className="podcast-card-grid-item">
        <Box className="podcast-card-box" onClick={handleClick}>
          <Card className="podcast-card-card">
            <CardMedia
              component="img"
              height="170"
              image={podcast['im:image'].find(img => img.attributes.height === '170').label}
              alt={podcast['im:name'].label}
              className="podcast-card-image"
            />
            <CardContent className="podcast-card-card-content">
              <Typography variant="h5" component="div" className="podcast-card-title">
                {podcast['im:name'].label}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="podcast-card-author">
                Author: {podcast['im:artist'].label}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
  )
};

export default HomePodcastCard;

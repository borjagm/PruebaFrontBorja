import React from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import './index.scss';

export const HomePodcastCard = (props) => {
    const { podcasts } = props;

  return (
    <Grid container spacing={2} className="podcast-card-grid">
    {podcasts.map((podcast, index) => (
      <Grid item xs={12} sm={6} md={4} key={index} className="podcast-card-grid-item">
        <Box className="podcast-card-box">
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
    ))}
  </Grid>
  )
};

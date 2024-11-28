import React, { useContext } from 'react';
import { PodcastContext } from '@context/PodcastContext';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const Home = () => {
  const { podcasts, loading, error } = useContext(PodcastContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(podcasts);

  return (
    <div>
      <h1>Podcasts</h1>
      <Grid container spacing={2}>
        {podcasts.map((podcast, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="170"
                image={podcast['im:image'].find(img => img.attributes.height === '170').label}
                alt={podcast['im:name'].label}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {podcast['im:name'].label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {podcast['im:artist'].label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
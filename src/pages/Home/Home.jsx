import React, { useContext } from 'react';
import { PodcastContext } from '@context/PodcastContext';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

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
            <Box sx={{ position: 'relative', paddingTop: '85px' }}>
              <Card sx={{ marginTop: '85px' }}>
                <CardMedia
                  component="img"
                  height="170"
                  image={podcast['im:image'].find(img => img.attributes.height === '170').label}
                  alt={podcast['im:name'].label}
                  sx={{
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '5vh',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '170px',
                    height: '170px'
                  }}
                />
                <CardContent sx={{ paddingTop: '85px' }}>
                  <Typography variant="h5" component="div">
                    {podcast['im:name'].label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {podcast['im:artist'].label}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
import React, { useContext, lazy, Suspense } from 'react';
import { PodcastContext } from '@context/PodcastContext';
import { Grid, Grid2 } from '@mui/material';

const HomePodcastCard = lazy(() => import('@pages/Home/components/HomePodcastCard/HomePodcastCard'));

const Home = () => {
  const { podcasts, loading, error, selectPodcast } = useContext(PodcastContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(podcasts);

  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
      <Grid2 container spacing={2} className="podcast-card-grid">
      {podcasts.map((podcast, index) => (
        
        <HomePodcastCard
          key={index}
          podcast={podcast}
          selectPodcast={selectPodcast}
        />
        
      ))}
      </Grid2>
      </Suspense>
    </div>
  );
};

export default Home;
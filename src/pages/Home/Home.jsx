import React, { useContext, lazy, Suspense, useEffect } from 'react';
import { PodcastContext } from '@context/PodcastContext';
import { Grid2 } from '@mui/material';

const HomePodcastCard = lazy(() => import('@pages/Home/components/HomePodcastCard/HomePodcastCard'));

const Home = () => {
  const { podcasts, loading, error, selectPodcast } = useContext(PodcastContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() =>{
    console.log(podcasts);
  }), [podcasts];
  
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
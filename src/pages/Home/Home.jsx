import React, { useContext, lazy, Suspense, useEffect, useState } from 'react';
import { PodcastContext } from '@context/PodcastContext';
import { Grid2 } from '@mui/material';

import './index.scss';

const HomePodcastCard = lazy(() => import('@pages/Home/components/HomePodcastCard/HomePodcastCard'));
const HomePodcastSearch = lazy(() => import('@pages/Home/components/HomePodcastSearch/HomePodcastSearch'));

const Home = () => {
  const { podcasts, loading, error, selectPodcast } = useContext(PodcastContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  useEffect(() => {
    setFilteredPodcasts(
      podcasts.filter(
        (podcast) =>
          podcast['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          podcast['im:artist'].label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, podcasts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }
  
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
        <HomePodcastSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} resultCount={filteredPodcasts.length} />
        <Grid2 className="podcast-card-grid" container spacing={2} >
          {filteredPodcasts.map((podcast, index) => (
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

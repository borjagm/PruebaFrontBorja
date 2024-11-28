import React, { useContext } from 'react';
import { PodcastContext } from '@context/PodcastContext';
import { HomePodcastCard } from '@pages/Home/components/HomePodcastCard/HomePodcastCard';

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
      <HomePodcastCard podcasts={podcasts}></HomePodcastCard>
    </div>
  );
};

export default Home;
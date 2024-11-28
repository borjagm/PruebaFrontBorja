import React, { useContext } from 'react';
import { PodcastContext } from '@context/PodcastContext';

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
      <h1>Probando</h1>
      {/* Renderiza la lista de podcasts aquí */}
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '@services/ApiServices';
import { Typography } from '@mui/material';

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcastDetail, setPodcastDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        setLoading(true);
        const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
        const data = await fetchData(url);
        setPodcastDetail(data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to load podcast details');
        setLoading(false);
      }
    };

    fetchPodcastDetail();
  }, [podcastId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(podcastDetail);

  const episodes = podcastDetail.filter(item => item.wrapperType === 'podcastEpisode');

  return (
    <div>
      <h1>{podcastDetail[0]?.collectionName}</h1>
      <p>{podcastDetail[0]?.description}</p>
      <Typography variant="h6">Episodes: {episodes.length}</Typography>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.trackId}>
            <h3>{episode.trackName}</h3>
            <p>Release Date: {new Date(episode.releaseDate).toLocaleDateString()}</p>
            <p>Duration: {Math.floor(episode.trackTimeMillis / 60000)} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastDetail;
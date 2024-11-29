import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '@services/ApiServices';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { PodcastContext } from '@context/PodcastContext';
import PodcastDescriptionBox from '@sharedComponents/PodcastDescriptionBox';

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcastDetail, setPodcastDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { podcasts } = useContext(PodcastContext);
  const activePodcast = podcasts.find(podcast => podcast.id.attributes['im:id'] === podcastId);

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

  if(!activePodcast) return <div>Podcast not found, Click on APP Title to go home</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(podcastDetail);
  console.log(activePodcast);

  const episodes = podcastDetail.filter(item => item.wrapperType === 'podcastEpisode');

  return (
    <div>
      <PodcastDescriptionBox activePodcast={activePodcast}/>
      <Typography variant="h6">Episodes: {episodes.length}</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Title" />
          <ListItemText primary="Date" />
          <ListItemText primary="Duration" />
        </ListItem>
        {episodes.map((episode) => (
          <ListItem key={episode.trackId}>
            <ListItemText primary={episode.trackName} />
            <ListItemText primary={new Date(episode.releaseDate).toLocaleDateString()} />
            <ListItemText primary={`${Math.floor(episode.trackTimeMillis / 60000)} minutes`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PodcastDetail;
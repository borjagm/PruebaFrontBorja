import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { fetchData } from '@services/ApiServices';
import { PodcastContext } from '@context/PodcastContext';
import PodcastDescriptionBox from '@sharedComponents/PodcastDescriptionCard.jsx/PodcastDescriptionCard';

import './index.scss';

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
    <div className='podcast-detail'>
      <div className='podcast-detail__container'>
        <PodcastDescriptionBox activePodcast={activePodcast} />
        <div className="podcast-detail__content">
          <Typography className="podcast-detail__episodes" variant="h6">Episodes: {episodes.length}</Typography>
          <List className='podcast-detail__list'>
          <ListSubheader className='podcast-detail__list-titles'>
            <ListItem>
              <ListItemText primary="Title" className="podcast-detail__list-titles__text" />
              <ListItemText primary="Date" className="podcast-detail__list-titles__text" />
              <ListItemText primary="Duration" className="podcast-detail__list-titles__text"/>
            </ListItem>
          </ListSubheader>
            {episodes.map((episode) => (
              <ListItem className='podcast-detail__list-content' key={episode.trackId}>
              <ListItemText
                className='podcast-detail__list-content__text'
                primary={
                  <Link 
                    to={`/podcast/${podcastId}/episode/${episode.trackId}`} 
                    className='podcast-detail__link'
                  >
                    {episode.trackName}
                  </Link>
                }
              />
              <ListItemText 
                className='podcast-detail__list-content__text' 
                primary={new Date(episode.releaseDate).toLocaleDateString()} 
              />
              <ListItemText 
                className='podcast-detail__list-content__text' 
                primary={`${Math.floor(episode.trackTimeMillis / 60000)} minutes`} 
              />
            </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
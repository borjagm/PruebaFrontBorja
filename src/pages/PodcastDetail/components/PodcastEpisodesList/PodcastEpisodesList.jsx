import React from 'react';
import { List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime } from '@utils/formatTime';

import './index.scss';

const PodcastEpisodesList = ({ podcastId, episodes, selectEpisode }) => {

  const navigate = useNavigate();

  const handleClick = (podcastId, episode) => {
    selectEpisode(episode);
    navigate(`/podcast/${podcastId}/episode/${episode.trackId}`);
  };

  return (
    <div className="podcast-detail__content">
      <Typography className="podcast-detail__episodes" variant="h6">
        Episodes: {episodes.length}
      </Typography>
      <List className="podcast-detail__list">
        <ListSubheader className="podcast-detail__list-titles">
          <div className="podcast-detail__list-titles__text">Title</div>
          <div className="podcast-detail__list-titles__text">Date</div>
          <div className="podcast-detail__list-titles__text">Duration</div>
        </ListSubheader>
        {episodes.map((episode) => (
          <ListItem className="podcast-detail__list-content" key={episode.trackId}>
            <ListItemText
                className='podcast-detail__list-content__text'
                primary={
                  <span 
                    onClick={() => handleClick(podcastId, episode)} 
                    className='podcast-detail__link'
                  >
                    {episode.trackName}
                  </span>
                }
              />
            <ListItemText
              className="podcast-detail__list-content__text"
              primary={new Date(episode.releaseDate).toLocaleDateString()}
            />
            <ListItemText
              className="podcast-detail__list-content__text"
              primary={formatTime(episode.trackTimeMillis)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PodcastEpisodesList;

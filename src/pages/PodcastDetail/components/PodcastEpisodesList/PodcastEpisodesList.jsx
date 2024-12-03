import React from 'react';
import { List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatTime } from '@utils/formatTime';

import './index.scss';

const PodcastEpisodesList = ({ podcastId, episodes }) => {
  return (
    <div className="podcast-detail__content">
      <Typography className="podcast-detail__episodes" variant="h6">
        Episodes: {episodes.length}
      </Typography>
      <List className="podcast-detail__list">
        <ListSubheader className="podcast-detail__list-titles">
          <ListItem>
            <ListItemText primary="Title" className="podcast-detail__list-titles__text" />
            <ListItemText primary="Date" className="podcast-detail__list-titles__text" />
            <ListItemText primary="Duration" className="podcast-detail__list-titles__text" />
          </ListItem>
        </ListSubheader>
        {episodes.map((episode) => (
          <ListItem className="podcast-detail__list-content" key={episode.trackId}>
            <ListItemText
              className="podcast-detail__list-content__text"
              primary={
                <Link
                  to={`/podcast/${podcastId}/episode/${episode.trackId}`}
                  className="podcast-detail__link"
                >
                  {episode.trackName}
                </Link>
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
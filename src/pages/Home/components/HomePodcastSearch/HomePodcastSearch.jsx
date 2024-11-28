import React from 'react'
import { TextField } from '@mui/material';
import './index.scss';

const HomePodcastCard = (props) => {
    const { searchTerm, setSearchTerm } = props;

  return (
    <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Filter podcasts..."
    />
  )
};

export default HomePodcastCard;

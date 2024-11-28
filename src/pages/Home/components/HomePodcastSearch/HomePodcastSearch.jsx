import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import './index.scss';

const HomePodcastSearch = (props) => {
  const { searchTerm, setSearchTerm, resultCount } = props;

  return (
    <Box className="podcast-search-container" display="flex" alignItems="center" >
      <Typography className="podcast-search-result-count" variant="body1" >
        {resultCount}
      </Typography>
      <TextField
        className="podcast-search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Filter podcasts..."
      />
    </Box>
  );
};

export default HomePodcastSearch;

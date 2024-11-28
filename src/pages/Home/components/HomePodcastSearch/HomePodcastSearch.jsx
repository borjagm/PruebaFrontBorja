import React from 'react'
import { Box, TextField, Typography } from '@mui/material';
import './index.scss';

const HomePodcastCard = (props) => {
    const { searchTerm, setSearchTerm, resultCount } = props;

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" style={{ marginRight: '10px' }}>
        {resultCount}
      </Typography>
      <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Filter podcasts..."
      />
    </Box>
  )
};

export default HomePodcastCard;

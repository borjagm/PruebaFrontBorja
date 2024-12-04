import { AppBar, Box, CircularProgress, Toolbar, Typography } from '@mui/material';
import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import { PodcastContext } from '@context/PodcastContext';

// Cargar los componentes de manera diferida con React.lazy
const Home = lazy(() => import('./pages/Home/Home.jsx'));
const PodcastDetail = lazy(() => import('./pages/PodcastDetail/PodcastDetail.jsx'));
const PodcastCapDetail = lazy(() => import('./pages/PodcastCapDetail/PodcastCapDetail.jsx'));

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor:"transparent", boxShadow:"none"}}>
        <AppBarContent />
      </AppBar>
      {/* Suspense permite definir un fallback mientras se cargan los componentes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastCapDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

function AppBarContent() {
  const { loading } = useContext(PodcastContext); // Usar el estado de carga

  return (
    <Toolbar>
      <Typography
        variant="h5"
        component={Link}
        to="/"
        sx={{ textDecoration: 'none', color: '#FF4081', display: 'flex', alignItems: 'center' }}
      >
        <PodcastsIcon sx={{ marginRight: '8px', color: '#FF4081' }} />
        Podcaster
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {loading && (
        <CircularProgress
          size={18}
          sx={{ color: '#2196F3', marginRight: '12px' }}
        />
      )}
    </Toolbar>
  );
};

export default App;
import { AppBar, Toolbar, Typography } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PodcastsIcon from '@mui/icons-material/Podcasts';

// Cargar los componentes de manera diferida con React.lazy
const Home = lazy(() => import('./pages/Home/Home.jsx'));
const PodcastDetail = lazy(() => import('./pages/PodcastDetail/PodcastDetail.jsx'));
const PodcastCapDetail = lazy(() => import('./pages/PodcastCapDetail/PodcastCapDetail.jsx'));

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor:"transparent", boxShadow:"none"}}>
        <Toolbar>
          <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', color: '#FF4081', display: 'flex', alignItems: 'center' }}>
            <PodcastsIcon sx={{ marginRight: '8px', color: '#FF4081' }} />
            Podcaster
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Suspense permite definir un fallback mientras se cargan los componentes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:id" element={<PodcastDetail />} />
          <Route path="/podcast/:id/cap/:capId" element={<PodcastCapDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
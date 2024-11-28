import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Cargar los componentes de manera diferida con React.lazy
const Home = lazy(() => import('./pages/Home/Home.jsx'));
const PodcastDetail = lazy(() => import('./pages/PodcastDetail/PodcastDetail.jsx'));
const PodcastCapDetail = lazy(() => import('./pages/PodcastCapDetail/PodcastCapDetail.jsx'));

function App() {
  return (
    <Router>
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
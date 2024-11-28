import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { PodcastProvider } from './context/PodcastContext.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <PodcastProvider>
        <App />
    </PodcastProvider>
);
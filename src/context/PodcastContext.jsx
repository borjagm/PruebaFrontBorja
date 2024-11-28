import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '@services/ApiServices';

export const PodcastContext = createContext();

export const PodcastProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const data = await fetchData(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );
        setPodcasts(data.feed.entry || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load podcasts');
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <PodcastContext.Provider value={{ podcasts, loading, error }}>
      {children}
    </PodcastContext.Provider>
  );
};
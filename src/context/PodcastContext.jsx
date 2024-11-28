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
        const lastFetch = localStorage.getItem('lastFetch');
        const now = new Date().getTime();
        
        //Controlamos que la última vez que se hizo la petición no haya sido hace más de 24 horas
        if (lastFetch && now - lastFetch < (24*60*60*1000)) {
          const cachedPodcasts = JSON.parse(localStorage.getItem('podcasts'));
          if (cachedPodcasts) {
            setPodcasts(cachedPodcasts);
            setLoading(false);
            return;
          }
        }

        const data = await fetchData(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );

        const podcastsList = data.feed.entry || [];
        setPodcasts(podcastsList);
        // Guardamos los podcasts en el almacenamiento local
        localStorage.setItem('podcasts', JSON.stringify(podcastsList));
        localStorage.setItem('lastFetch', now);
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
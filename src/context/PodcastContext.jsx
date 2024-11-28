import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '@services/ApiServices';
import { PODCASTS_URL } from '@SiteConfig';

export const PodcastContext = createContext();

export const PodcastProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePodcast, setActivePodcast] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const lastFetch = localStorage.getItem('lastFetch');
        const now = new Date().getTime();
        
        // Controlamos que la última vez que se hizo la petición no haya sido hace más de 24 horas
        if (lastFetch && now - lastFetch < (24*60*60*1000)) {
          const cachedPodcasts = JSON.parse(localStorage.getItem('podcasts'));
          if (cachedPodcasts) {
            setPodcasts(cachedPodcasts);
            setLoading(false);
            return;
          }
        }

        const data = await fetchData(PODCASTS_URL);

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

  // Función para seleccionar un podcast como activo
  const selectPodcast = (podcast) => {
    setActivePodcast(podcast);
  };

  return (
    <PodcastContext.Provider value={{ podcasts, loading, error, activePodcast, selectPodcast }}>
      {children}
    </PodcastContext.Provider>
  );
};
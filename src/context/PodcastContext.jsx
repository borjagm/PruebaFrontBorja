import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '@services/ApiServices';
import { getPodcastDetailUrl, PODCASTS_URL } from '@SiteConfig';

export const PodcastContext = createContext();

export const PodcastProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePodcast, setActivePodcast] = useState(null);
  const [activeEpisode, setActiveEpisode] = useState(null);

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

  // Función para obtener los detalles de un podcast, guardando los datos en localStorage por cada podcast que se solicite
  const fetchPodcastDetail = async (podcastId) => {
    try {
      const now = new Date().getTime();
      const cacheKey = `podcast_${podcastId}`;
      const cachedPodcast = JSON.parse(localStorage.getItem(cacheKey));
      const lastFetch = localStorage.getItem(`${cacheKey}_lastFetch`);

      /* Si el podcast está guardado en localStorage y
       * la última vez que se hizo la petición no fue hace más de 24 horas,
       * retornamos los datos guardados */
      if (cachedPodcast && lastFetch && now - lastFetch < 24 * 60 * 60 * 1000) {
        return cachedPodcast;
      }

      // Si no, hacemos la solicitud y guardamos los datos en localStorage
      const url = getPodcastDetailUrl(podcastId);
      const data = await fetchData(url);
      const results = data.results;

      localStorage.setItem(cacheKey, JSON.stringify(results));
      localStorage.setItem(`${cacheKey}_lastFetch`, now);

      return results;
    } catch (err) {
      throw new Error('Failed to fetch podcast details');
    }
  };

  // Función para seleccionar un podcast como activo
  const selectPodcast = (podcast) => {
    setActivePodcast(podcast);
  };

  // Función para seleccionar un episodio como activo
  const selectEpisode = (episode) => {
    setActiveEpisode(episode);
  };

  return (
    <PodcastContext.Provider value={{ podcasts, loading, error, activePodcast, selectPodcast, activeEpisode, selectEpisode, fetchPodcastDetail }}>
      {children}
    </PodcastContext.Provider>
  );
};
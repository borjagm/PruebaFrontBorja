import React , { useState, useEffect } from 'react';
import ApiService from '../../services/ApiServices';
import { fetchData } from '../../services/ApiServices';

const Home = () => {
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

    if (loading) {
        return <div>Loading...</div>;
      }
    
    if (error) {
        return <div>{error}</div>;
    }

    console.log(podcasts);

    return (
        <div>
            <h1>Probando</h1>
        </div>
    );
};

export default Home;
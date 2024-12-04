import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastContext } from '@context/PodcastContext';
import PodcastDescriptionCard from '@sharedComponents/PodcastDescriptionCard.jsx/PodcastDescriptionCard';
import EpisodeCard from '@pages/PodcastCapDetail/components/EpisodeCard/EpisodeCard';

import './index.scss';

const PodcastCapDetail = () => {

    const { podcastId, episodeId } = useParams();

    const { activePodcast, activeEpisode, selectPodcast, fetchEpisodeDetail, searchPodcastById} = useContext(PodcastContext);

    useEffect(() => {
        const loadPodcastDetail = async () => {
          try {
            if (!activePodcast) {
              const cachedPodcast = localStorage.getItem('activePodcast');
              if (cachedPodcast) {
                selectPodcast(JSON.parse(cachedPodcast));
              } else {
                const data = await searchPodcastById(podcastId);
                selectPodcast(data);
              }
            }
          } catch (err) {
            console.error('Failed to load podcast detail : ', err);
          }
        };
      
        loadPodcastDetail();
      }, []);

      useEffect(() => {
        const loadEpisodeDetail = async () => {
          try {
            if (!activeEpisode || activeEpisode.trackId.toString() !== episodeId) {
              await fetchEpisodeDetail(podcastId, episodeId);
            }
          } catch (err) {
            console.error('Failed to load episode detail:', err);
          }
        };
      
        loadEpisodeDetail();
      }, [podcastId, episodeId, activeEpisode]);

    return (
        <div className='episode-detail'>  
            {activePodcast &&
            <PodcastDescriptionCard activePodcast={activePodcast} clickable={true}/>
            }
            {activeEpisode &&
            <EpisodeCard activeEpisode={activeEpisode}/>
            }  
        </div>
    );
};

export default PodcastCapDetail;
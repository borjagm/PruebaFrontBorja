import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastContext } from '@context/PodcastContext';
import PodcastDescriptionCard from '@sharedComponents/PodcastDescriptionCard.jsx/PodcastDescriptionCard';

import './index.scss';
import { Typography } from '@mui/material';

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

            <div className="episode-detail__box">
                <Typography className='episode-detail__trackname'>{activeEpisode?.trackName}</Typography>
                {/* Interpretar la descripción con HTML */}
                <div
                    className="episode-detail__description"
                    dangerouslySetInnerHTML={{ __html: activeEpisode?.description || '' }}
                ></div>
                {/* Reproductor de audio básico */}
                {activeEpisode?.episodeUrl && (
                    <audio className='episode-detail__audioBar' controls>
                        <source src={activeEpisode.episodeUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        </div>
    );
};

export default PodcastCapDetail;
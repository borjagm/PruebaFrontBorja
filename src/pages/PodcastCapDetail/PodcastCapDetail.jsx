import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastContext } from '@context/PodcastContext';
import PodcastDescriptionCard from '@sharedComponents/PodcastDescriptionCard.jsx/PodcastDescriptionCard';

import './index.scss';

const PodcastCapDetail = () => {

    const { podcastId, episodeId } = useParams();

    const { activePodcast, activeEpisode, selectPodcast, fetchPodcastDetail} = useContext(PodcastContext);

    useEffect(() => {
        const loadPodcastDetail = async () => {
          try {
            if (!activePodcast) {
              const cachedPodcast = localStorage.getItem('activePodcast');
              if (cachedPodcast) {
                selectPodcast(JSON.parse(cachedPodcast));
              } else {
                const data = await fetchPodcastDetail(podcastId);
                selectPodcast(data);
              }
            }
          } catch (err) {
            console.error('Failed to load podcast detail : ', err);
          }
        };
      
        loadPodcastDetail();
      }, []);

    return (
        <div className='episode-detail'>  
            {activePodcast &&
            <PodcastDescriptionCard activePodcast={activePodcast} clickable={true}/>
            }

            <div className="episode-info-box">
                <h2>{activeEpisode?.trackName}</h2>
                {/* Interpretar la descripción con HTML */}
                <div
                    className="episode-description"
                    dangerouslySetInnerHTML={{ __html: activeEpisode?.description || '' }}
                ></div>
                {/* Reproductor de audio básico */}
                {activeEpisode?.episodeUrl && (
                    <audio controls>
                        <source src={activeEpisode.episodeUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        </div>
    );
};

export default PodcastCapDetail;
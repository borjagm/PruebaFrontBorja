import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PodcastEpisodesList from '@pages/PodcastDetail/components/PodcastEpisodesList/PodcastEpisodesList';
import { fetchData } from '@services/ApiServices';
import { PodcastContext } from '@context/PodcastContext';
import PodcastDescriptionCard from '@sharedComponents/PodcastDescriptionCard.jsx/PodcastDescriptionCard';

import './index.scss';

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcastDetail, setPodcastDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { podcasts, selectEpisode, fetchPodcastDetail } = useContext(PodcastContext);
  const activePodcast = podcasts.find(podcast => podcast.id.attributes['im:id'] === podcastId);

  useEffect(() => {
    const loadPodcastDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchPodcastDetail(podcastId);
        setPodcastDetail(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load podcast detail');
        setLoading(false);
      }
    };

    loadPodcastDetail();
  }, [podcastId, fetchPodcastDetail]);

  if(!activePodcast) return <div>Podcast not found, Click on APP Title to go home</div>;
  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  console.log(podcastDetail);
  console.log(activePodcast);

  const episodes = podcastDetail.filter(item => item.wrapperType === 'podcastEpisode');

  return (
    <div className='podcast-detail'>
      <div className='podcast-detail__container'>
        <PodcastDescriptionCard activePodcast={activePodcast} clickable={false} />
        <PodcastEpisodesList podcastId={podcastId} episodes={episodes} selectEpisode={selectEpisode} />
      </div>
    </div>
  );
};

export default PodcastDetail;
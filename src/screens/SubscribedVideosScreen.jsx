import React, { useState, useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard.jsx';
import Loader from '../components/Loader';
import '../stylesheets/SubscribedVideosScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionFeed } from '../actions/subscriptionsActions';

const SubscribedVideosScreen = ({ subscriptions }) => {
  const [latestVideos, setLatestVideos] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.latestVideos);
  const { loading, error, videos } = data;

  useEffect(() => {
    if (subscriptions) {
      dispatch(fetchSubscriptionFeed());
    }
  }, [subscriptions, dispatch]);

  return (
    <>
      <h2>Recent Uploads -- Subscriptions</h2>
      {loading && <Loader />}
      <div className='subscribedVideosScreen'>
        {videos.map((video) => (
          <VideoCard
            key={video.videoId}
            channelId={video.channelId}
            channelThumbnail={video.channelThumbnail}
            videoTitle={video.videoTitle}
            videoDescription={video.videoDescription}
            videoId={video.videoId}
            publishedAt={video.publishedAt}
            thumbnail={video.thumbnail}
            statistics={video.statistics}
            channelTitle={video.channelTitle}
          />
        ))}
      </div>
    </>
  );
};

export default SubscribedVideosScreen;

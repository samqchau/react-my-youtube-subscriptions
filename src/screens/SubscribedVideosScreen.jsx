import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard.jsx';

const SubscribedVideosScreen = ({ subscriptions }) => {
  const [latestVideos, setLatestVideos] = useState([
    {
      channelTitle: 'Daily Dose of Internet',
      videoTitle: 'Hello Everyone',
      videoDescription: 'This is your daily dose of internet',
      videoId: '1234564',
      publishedAt: 'march 5th',
      thumbnail: 'lheh',
    },
  ]);
  function fetchChannelUploadedPlaylist(channelId) {
    let request = window.gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/channels',
      params: {
        part: 'contentDetails',
        id: channelId,
        maxResults: 1,
      },
    });
    request.execute(getChannelVideos);
  }

  //gets a single channels uploaded recently playlist items
  function getChannelVideos(playlists) {
    let playlistId = playlists.items[0].contentDetails.relatedPlaylists.uploads;
    window.gapi.client
      .request({
        method: 'GET',
        path: '/youtube/v3/playlistItems',
        params: {
          part: 'snippet',
          maxResults: 10,
          playlistId: playlistId,
        },
      })
      .exec(mergeSortVideos);
  }

  function mergeSortVideos(channelVideos) {
    let videos = channelVideos.items;
    videos.forEach((video, i) => {
      let vi = video.snippet;
      let videoInfo = {
        channelTitle: vi.channelTitle,
        videoTitle: vi.title,
        videoDescription: vi.description,
        videoId: vi.resourceId.videoId,
        publishedAt: vi.publishedAt,
        thumbnail: vi.thumbnails.default.url,
      };
      setLatestVideos(latestVideos.push(videoInfo));
      if (i === videos.length - 1) {
        latestVideos.sort((a, b) => {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });
      }
    });
  }

  useEffect(() => {
    if (subscriptions) {
      subscriptions.forEach((subscription) => {
        let channelId = subscription.snippet.resourceId.channelId;
        fetchChannelUploadedPlaylist(channelId);
      });
    }
  }, []);

  return (
    <div className='subscribedVideosScreen'>
      <h2>Recent Uploads -- Subscriptions</h2>
      {latestVideos.map((video) => (
        <VideoCard
          key={video.videoId}
          channelTitle={video.channelTitle}
          videoTitle={video.videoTitle}
          videoDescription={video.videoDescription}
          videoId={video.videoId}
          publishedAt={video.publishedAt}
          thumbnail={video.thumbnail}
        />
      ))}
    </div>
  );
};

export default SubscribedVideosScreen;

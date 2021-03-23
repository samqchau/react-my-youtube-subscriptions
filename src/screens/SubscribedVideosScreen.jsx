import React, { useState, useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard.jsx';

const SubscribedVideosScreen = ({ subscriptions }) => {
  const [latestVideos, setLatestVideos] = useState([]);
  let myArr = useRef([]);

  useEffect(() => {
    let batchedRequests = window.gapi.client.newBatch();
    subscriptions.forEach((subscription) => {
      let channelId = subscription.snippet.resourceId.channelId;
      let request = window.gapi.client.request({
        method: 'GET',
        path: '/youtube/v3/channels',
        params: {
          part: 'contentDetails',
          id: channelId,
          maxResults: 1,
        },
      });
      batchedRequests.add(request);
    });
    batchedRequests.execute((response) => {
      let nextBatch = window.gapi.client.newBatch();
      for (let key in response) {
        let playlistId =
          response[key].result.items[0].contentDetails.relatedPlaylists.uploads;
        let playlistItemsRequest = window.gapi.client.request({
          method: 'GET',
          path: '/youtube/v3/playlistItems',
          params: {
            part: 'snippet',
            maxResults: 10,
            playlistId: playlistId,
          },
        });
        nextBatch.add(playlistItemsRequest);
      }
      nextBatch.execute((res) => {
        for (let key in res) {
          let videos = res[key].result.items.map((item) => {
            let snippet = item.snippet;
            return {
              channelTitle: snippet.channelId,
              videoTitle: snippet.title,
              videoDescription: snippet.description,
              videoId: snippet.resourceId.videoId,
              publishedAt: snippet.publishedAt,
              thumbnail: snippet.thumbnails.default.url,
            };
          });
          myArr.current = myArr.current.concat(videos);
        }
        myArr.current.sort((a, b) => {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });
        setLatestVideos(myArr.current);
      });
    });
  }, [subscriptions]);

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

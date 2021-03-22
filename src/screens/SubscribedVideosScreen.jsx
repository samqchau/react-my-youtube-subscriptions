import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from 'react';
import VideoCard from '../components/VideoCard.jsx';

const SubscribedVideosScreen = ({ subscriptions }) => {
  const [latestVideos, setLatestVideos] = useState([]);
  let myArr = useRef([]);
  const [, setState] = useState();
  function forceUpdate() {
    setState({});
  }
  //takes a single playlist's Id and makes a request to get the playlist's items
  const getChannelVideos = useCallback((playlistId) => {
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
      .execute((channelVideos) => {
        mergeSortVideos(channelVideos);
      });
  }, []);

  //Takes channelId and makes a request that returns channel's data, we access playlists

  const fetchChannelUploadedPlaylist = useCallback(
    (channelId) => {
      let request = window.gapi.client.request({
        method: 'GET',
        path: '/youtube/v3/channels',
        params: {
          part: 'contentDetails',
          id: channelId,
          maxResults: 1,
        },
      });
      request.execute((playlists) => {
        let playlistId =
          playlists.items[0].contentDetails.relatedPlaylists.uploads;
        getChannelVideos(playlistId);
      });
    },
    [getChannelVideos]
  );

  //takes an array of videos and puts video info into array
  function mergeSortVideos(channelVideos) {
    let videos = channelVideos.items;
    let newVideoCollection = videos.map((video) => {
      let vi = video.snippet;
      let videoInfo = {
        channelTitle: vi.channelTitle,
        videoTitle: vi.title,
        videoDescription: vi.description,
        videoId: vi.resourceId.videoId,
        publishedAt: vi.publishedAt,
        thumbnail: vi.thumbnails.default.url,
      };
      myArr.current.push(videoInfo);
      return videoInfo;
    });
  }

  /*
  useEffect(() => {
    if (subscriptions) {
      subscriptions.forEach((subscription) => {
        let channelId = subscription.snippet.resourceId.channelId;
        fetchChannelUploadedPlaylist(channelId);
      });
    }
  }, []);
  */

  const handleTestClick = () => {
    subscriptions.forEach((subscription) => {
      fetchChannelUploadedPlaylist(subscription.snippet.resourceId.channelId);
    });
    setLatestVideos(myArr.current);
  };
  /*
  useEffect(() => {
    subscriptions.forEach((subscription) => {
      fetchChannelUploadedPlaylist(subscription.snippet.resourceId.channelId);
    });
    setLatestVideos(myArr.current);
    setTimeout(forceUpdate, 300);
  }, [subscriptions, fetchChannelUploadedPlaylist]);
* */
  return (
    <div className='subscribedVideosScreen'>
      <h2>Recent Uploads -- Subscriptions</h2>
      <button onClick={handleTestClick}>SubscribedVideosScreenTest</button>
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

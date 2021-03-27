import {
  SUBSCRIPTIONS_FETCH_FAIL,
  SUBSCRIPTIONS_FETCH_REQUEST,
  SUBSCRIPTIONS_FETCH_SUCCESS,
  SUBSCRIPTIONS_FEED_REQUEST,
  SUBSCRIPTIONS_FEED_SUCCESS,
  SUBSCRIPTIONS_FEED_FAIL,
} from '../constants/subscriptionsConstants';

export const fetchUserSubscriptions = () => (dispatch, getState) => {
  console.log('hello');
  try {
    dispatch({ type: SUBSCRIPTIONS_FETCH_REQUEST });
    if (window.gapi.client) {
      let request = window.gapi.client.request({
        method: 'GET',
        path: '/youtube/v3/subscriptions',
        params: {
          part: 'snippet',
          mine: 'true',
          maxResults: 50,
        },
      });
      request.execute((response) => {
        let payload = {
          subscriptions: response.items,
          lastFetched: Date.now(),
        };
        dispatch({
          type: SUBSCRIPTIONS_FETCH_SUCCESS,
          payload: payload,
        });

        localStorage.setItem(
          'userSubscriptions',
          JSON.stringify({
            payload,
          })
        );
      });
    }
  } catch (error) {
    dispatch({
      type: SUBSCRIPTIONS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchSubscriptionFeed = () => (dispatch, getState) => {
  try {
    dispatch({ type: SUBSCRIPTIONS_FEED_REQUEST });
    let myArr = [];
    const subscriptions = getState().subscriptions.subscriptions;
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
              channelId: snippet.channelId,
              videoTitle: snippet.title,
              videoDescription: snippet.description,
              videoId: snippet.resourceId.videoId,
              publishedAt: snippet.publishedAt,
              thumbnail: snippet.thumbnails.medium.url,
            };
          });
          myArr = myArr.concat(videos);
        }
        myArr.sort((a, b) => {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });

        let videoStatsRequest = window.gapi.client.newBatch();
        myArr.forEach((video) => {
          let request = window.gapi.client.request({
            method: 'GET',
            path: '/youtube/v3/videos',
            params: {
              part: 'statistics',
              id: video.videoId,
              maxResults: 1,
            },
          });
          videoStatsRequest.add(request);
        });
        videoStatsRequest.execute((data) => {
          for (let k in data) {
            let item = data[k].result.items[0];
            let id = item.id;
            let statistics = item.statistics;
            let video = myArr.find((x) => x.videoId === id);
            video.statistics = statistics;
          }
          myArr = myArr.map((vid) => {
            let channel = subscriptions.find(
              (x) => x.snippet.resourceId.channelId === vid.channelId
            );
            vid.channelThumbnail = channel.snippet.thumbnails.medium.url;
            vid.channelTitle = channel.snippet.title;
            return vid;
          });
          dispatch({ type: SUBSCRIPTIONS_FEED_SUCCESS, payload: myArr });
        });
      });
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTIONS_FEED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

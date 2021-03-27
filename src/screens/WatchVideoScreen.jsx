import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';

const WatchVideoScreen = ({ match }) => {
  const videoId = match.params.videoId;
  const data = useSelector((state) => state.latestVideos);
  const { videos } = data;
  const videoData = videos.filter((video) => video.videoId === videoId)[0];
  const {
    channelId,
    channelThumbnail,
    channelTitle,
    publishedAt,
    statistics,
    thumbnail,
    videoDescription,
    videoTitle,
  } = videoData;
  const {
    viewCount,
    likeCount,
    dislikeCount,
    favoriteCount,
    commentCount,
  } = statistics;
  function handleTest(e) {}

  return (
    <>
      {/*
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={true}
        muted={true}
        controls={true}
        onReady={handleOnReady}
      />
    */}
      <button onClick={handleTest}>Test</button>
      <div>Video ID: {videoId}</div>
      <div>Channel ID: {channelId}</div>
      <div>Channel Thumbnail URL: {channelThumbnail}</div>
      <div>Channel Name: {channelTitle}</div>
      <div>Date Uploaded: {publishedAt}</div>
      <div>Video Thumbnail URL: {thumbnail}</div>
      <div>Video Description: {videoDescription}</div>
      <div>Video Title: {videoTitle}</div>
    </>
  );
};

export default WatchVideoScreen;

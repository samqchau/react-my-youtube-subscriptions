import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../stylesheets/VideoCard.css';

const VideoCard = ({
  channelTitle,
  videoTitle,
  videoDescription,
  videoId,
  publishedAt,
  thumbnail,
  channelThumbnail,
  statistics,
}) => {
  //statistics.viewCount ,likeCount, dislikeCount, favoriteCount, commentCount
  return (
    <div className='videoCard'>
      <img className='videoCard__image' src={thumbnail} alt={videoTitle} />
      <div className='videoCard__info'>
        <div className='videoCard__info__left'>
          <Avatar src={channelThumbnail} />
        </div>
        <div className='videoCard__info__right'>
          <p>{channelTitle}</p>
          <h2>{videoTitle}</h2>
          <p>{publishedAt}</p>
          <p>{videoDescription}</p>
          <p>{videoId}</p>
          <p>{statistics.viewCount}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

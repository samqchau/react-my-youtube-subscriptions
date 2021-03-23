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
  channelThumbnail = '',
}) => {
  return (
    <div className='videoCard'>
      <img className='videoCard__image' src={thumbnail} alt={videoTitle} />
      <div className='videoCard__info'>
        <div className='videoCard__info__left'>
          <Avatar src={channelThumbnail} />
        </div>
        <div className='videoCard__info__right'>
          <h2>{videoTitle}</h2>
          <p>{publishedAt}</p>
          <p>{videoDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

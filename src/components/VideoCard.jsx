import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../stylesheets/VideoCard.css';
import UTCtoTimeAgo from '../helpers/UTCtoTimeAgo.js';
import { Link } from 'react-router-dom';

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
    <Link to={`/watch/${videoId}`}>
      <div className='videoCard'>
        <img className='videoCard__image' src={thumbnail} alt={videoTitle} />
        <div className='videoCard__info'>
          <Avatar
            className='videoCard__info__channelThumbnail'
            src={channelThumbnail}
          />
          <div className='videoCard__info__right'>
            <div
              className='videoCard__info__right__title'
              aria-label={videoTitle}
            >
              <h4 title={videoTitle}>
                {videoTitle.slice(0, 25)}
                <span>{videoTitle.slice(25)}</span>
              </h4>
            </div>
            <h6 title={channelTitle}>{channelTitle}</h6>
            <p>
              {UTCtoTimeAgo(publishedAt)} • {statistics.viewCount} views
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

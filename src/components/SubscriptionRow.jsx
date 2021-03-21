import React from 'react';
import '../stylesheets/SubscriptionRow.css';

const SubscriptionRow = ({ title, thumbnail }) => {
  return (
    <div className='subscriptionRow'>
      <img src={thumbnail} alt={title} className='subscriptionRow__thumbnail' />
      <p className='subscriptionRow__title'>{title}</p>
    </div>
  );
};

export default SubscriptionRow;

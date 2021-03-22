import React from 'react';
import '../stylesheets/Sidebar.css';
import SubscriptionRow from './SubscriptionRow.jsx';

const Sidebar = ({ subscriptions }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar__section'>
        {subscriptions &&
          subscriptions.map((subscription, i) => (
            <SubscriptionRow
              key={i}
              title={subscription.snippet.title}
              thumbnail={subscription.snippet.thumbnails.default.url}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;

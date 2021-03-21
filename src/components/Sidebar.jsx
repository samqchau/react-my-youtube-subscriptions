import React, { useEffect, useCallback, useState } from 'react';
import '../stylesheets/Sidebar.css';
import SubscriptionRow from './SubscriptionRow.jsx';

const Sidebar = () => {
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  let gapi = window.gapi;
  const fetchUserSubscriptions = useCallback(() => {
    let request = gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/subscriptions',
      params: {
        part: 'snippet',
        mine: 'true',
        maxResults: 50,
      },
    });
    request.execute((response) => {
      console.log('sidebarrequest');
      console.log(response);
      console.log(response.items);
      setUserSubscriptions(response.items);
      console.log(response.nextPageToken);
    });
  }, [gapi.client]);

  /*
  What data do we want from a single subscription?
  -Title - subscription.snippet.title
  -Thumbnail - subscription.snippet.thumbnails.default.url

  userSubscriptions.map((subscription, i) => {
    
  })
  */

  useEffect(() => {
    if (window.gapi) {
      fetchUserSubscriptions();
    }
  }, [fetchUserSubscriptions]);

  return (
    <div className='sidebar'>
      <div className='sidebar__section'>
        <h2 className='sidebar__section__title'>Subscriptions</h2>
        {userSubscriptions.map((subscription, i) => (
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

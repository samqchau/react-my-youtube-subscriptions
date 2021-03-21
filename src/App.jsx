import React, { useRef, useEffect, useCallback } from 'react';
import './stylesheets/App.css';
import Header from './components/Header.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';

const App = () => {
  const CLIENT_ID =
    '550582466779-u3o2aen16bi1151kkrf2h9464p6iiuja.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
  const discoveryUrl =
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
  const defaultChannel = 'techguyweb';

  const updateSigninStatus = useCallback((isSignedIn) => {
    if (isSignedIn) {
      getChannel(defaultChannel);
    } else {
    }
  }, []);

  const initClient = useCallback(() => {
    window.gapi.client
      .init({
        discoverDocs: discoveryUrl,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(() => {
        //Listen for sign in state changes
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSigninStatus);
        //Handle initial sign in state
        updateSigninStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      });
  }, [updateSigninStatus]);

  const handleClientLoad = useCallback(() => {
    window.gapi.load('client:auth2', initClient);
  }, [initClient]);

  useEffect(() => {
    handleClientLoad();
  }, [handleClientLoad]);

  const loginButton = useRef();
  const logoutButton = useRef();

  //Handle login
  function handleAuthClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  //Handle logout
  function handleLogoutClick() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  //Get channel from API
  function getChannel(channel) {
    // Example 2: Use gapi.client.request(args) function
    let request = window.gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/subscriptions',
      params: {
        part: 'snippet',
        mine: 'true',
        maxResults: 3,
      },
    });

    // Execute the API request.
    request.execute(function (response) {
      console.log(response);
      response.items.forEach((item) => {
        let channelId = document.createElement('p');
        channelId.innerText = item.snippet.channelId;
        let thumbnail = document.createElement('img');
        thumbnail.src = item.snippet.thumbnails.default.url;
        let channelName = document.createElement('p');
        channelName.innerText = item.snippet.title;
        //document.body.append(channelId, channelName, thumbnail);
      });
    });
  }

  return (
    <div className='app'>
      <Router>
        <Header />
        <div className='app__page'>
          <Sidebar />
          <div className='app__main'></div>
          <button
            ref={loginButton}
            onClick={handleAuthClick}
            style={{ height: '1.5rem' }}
          >
            Log In
          </button>
          <button
            ref={logoutButton}
            onClick={handleLogoutClick}
            style={{ height: '1.5rem' }}
          >
            Log Out
          </button>
        </div>
      </Router>
    </div>
  );
};

export default App;

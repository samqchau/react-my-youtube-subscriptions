import React, { useState, useRef, useEffect, useCallback } from 'react';
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

  const updateSigninStatus = useCallback((isSignedIn) => {
    if (isSignedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);

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

  return (
    <div className='app'>
      {!loggedIn ? (
        <button
          ref={loginButton}
          onClick={handleAuthClick}
          style={{ height: '1.5rem' }}
        >
          Log In
        </button>
      ) : (
        <Router>
          <Header />
          <div className='app__page'>
            <Sidebar />
            <div className='app__main'>
              <button
                ref={logoutButton}
                onClick={handleLogoutClick}
                style={{ height: '1.5rem' }}
              >
                Log Out
              </button>
            </div>
          </div>
        </Router>
      )}
    </div>
  );
};

export default App;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import './stylesheets/App.css';
import Header from './components/Header.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import SubscribedVideosScreen from './screens/SubscribedVideosScreen';
import SearchScreen from './screens/SearchScreen';
import AuthenticationScreen from './screens/AuthenticationScreen.jsx';
import WatchVideoScreen from './screens/WatchVideoScreen.jsx';
import { fetchUserSubscriptions } from './actions/subscriptionsActions';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const CLIENT_ID =
    '550582466779-u3o2aen16bi1151kkrf2h9464p6iiuja.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
  const discoveryUrl =
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

  const dispatch = useDispatch();
  const data = useSelector((state) => state.subscriptions);
  const { subscriptions, lastFetched, loading } = data;

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
        dispatch(fetchUserSubscriptions());
      });
  }, [updateSigninStatus, dispatch]);

  const handleClientLoad = useCallback(() => {
    window.gapi.load('client:auth2', initClient);
  }, [initClient]);

  useEffect(() => {
    handleClientLoad();
  }, [handleClientLoad]);

  const logoutButton = useRef();

  //Handle logout
  function handleLogoutClick() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div className='app'>
      <Router>
        <Switch>
          {!loggedIn ? (
            <AuthenticationScreen />
          ) : (
            <>
              <Header />
              <div className='app__page'>
                <Sidebar subscriptions={subscriptions} />
                <div className='app__main'>
                  <Route path='/watch/:videoId' component={WatchVideoScreen} />
                  <Route
                    path='/search/:keyword'
                    component={SearchScreen}
                    exact
                  />
                  <Route
                    path='/'
                    exact
                    render={(props) => (
                      <SubscribedVideosScreen
                        {...props}
                        subscriptions={subscriptions}
                      />
                    )}
                  />
                  <button
                    ref={logoutButton}
                    onClick={handleLogoutClick}
                    style={{ height: '1.5rem' }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;

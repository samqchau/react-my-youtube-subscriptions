import React from 'react';
import '../stylesheets/AuthenticationScreen.css';
const AuthenticationScreen = ({ children }) => {
  //Handle login
  function handleAuthClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  return (
    <div className='authenticationScreen'>
      <button onClick={handleAuthClick}>Login Button V2</button>
      <h2>MyYouTube TV</h2>
      {children}
    </div>
  );
};

export default AuthenticationScreen;

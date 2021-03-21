import React, { useState } from 'react';
import '../stylesheets/Header.css';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallSharpIcon from '@material-ui/icons/VideoCallSharp';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const Header = () => {
  const [inputSearch, setInputSearch] = useState('');
  return (
    <div className='header'>
      <div className='header__left'>
        <MenuRoundedIcon />
        <Link to='/'>
          <img
            className='header__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg'
            alt=''
          />
        </Link>
      </div>
      <div className='header__input'>
        <input
          type='text'
          placeholder='Search'
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
        />
        <Link to={`/search/${inputSearch}`}>
          <SearchIcon className='header__inputButton' />
        </Link>
      </div>
      <div className='header__icons'>
        <VideoCallSharpIcon className='header__icon' />
        <AppsIcon className='header__icon' />
        <NotificationsIcon className='header__icon' />
        <Avatar alt='username goes here' src='' />
      </div>
    </div>
  );
};

export default Header;

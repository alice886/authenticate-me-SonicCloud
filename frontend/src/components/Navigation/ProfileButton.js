import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="user-dropdown">{user.username}</li>
          <li className="user-dropdown">{user.email}</li>
          {/* <li className="user-dropdown">
            <Link to='/songs/mysongs'>
              My Songs
            </Link>
          </li>
          <li className="user-dropdown">
            <Link to='/albums/myalbums'>
              My Albums
            </Link>
          </li> */}
          {/* <li className="user-dropdown">
            <Link to='/playlists/myplaylists'>
              My Playlists
            </Link>
          </li> */}
          <li>
            <button onClick={logout} className='logout-button'>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

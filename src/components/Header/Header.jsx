import React, { useEffect } from 'react';
import './Header.css';

function Header({ isAuthenticated, userName, handleLogout, showRegistrationForm, toggleRegistrationForm, showLoginForm, toggleLoginForm }) {
  const menuItems = isAuthenticated
    ? [
        { label: 'Shop', path: '/' },
        { label: 'Abmelden', action: handleLogout },
      ]
    : [
        { label: 'Shop', path: '/' },
        { label: 'Registrieren', action: () => { toggleRegistrationForm(); toggleLoginForm(false); } },
        { label: 'Anmelden', action: () => { toggleLoginForm(); toggleRegistrationForm(false); } },
      ];

      

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>B-One-Record Shop</h1>
        </div>
        <div className="header-right">
          <nav>
            <ul className="nav-list">
              {menuItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <a href={item.path} onClick={item.action}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {isAuthenticated && (
            <div className="user-info">
              <span>Sie sind eingeloggt als: {userName}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;







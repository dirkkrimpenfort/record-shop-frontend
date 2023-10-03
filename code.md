- package.json

```javascript
{
  "name": "record-shop-frontend",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "jsonwebtoken": "^9.0.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.16.7"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

- public/
  - index.html

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

  - manifest.json

```javascript
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

  - robots.txt

```javascript
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```

- src/
  - App.css

```javascript
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

  - App.js

```javascript
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import UserForm from './components/UserForm/UserForm';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); // Zustand für das Anmeldeformular

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setIsAuthenticated(true);
    setUserName(`${data.user.firstName} ${data.user.lastName}`);
    // Nach der Anmeldung das Anmeldeformular ausblenden
    setShowLoginForm(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserName('');
    // Nach der Abmeldung das Anmeldeformular ausblenden
    setShowLoginForm(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const user = JSON.parse(localStorage.getItem('user'));
      setUserName(`${user.firstName} ${user.lastName}`);
    }
  }, []);

  return (
    <div className="App">
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        handleLogout={handleLogout}
        showRegistrationForm={showRegistrationForm}
        toggleRegistrationForm={() => {
          setShowRegistrationForm(false);
          setShowLoginForm(true); // Das Anmeldeformular ausblenden, wenn auf "Registrieren" geklickt wird
        }}
        showLoginForm={showLoginForm} // Übergeben Sie showLoginForm an den Header
        toggleLoginForm={() => {
          setShowLoginForm(false);
          setShowRegistrationForm(true); // Das Registrierungsformular ausblenden, wenn auf "Anmelden" geklickt wird
        }}
      />
      {!showRegistrationForm ? (
        isAuthenticated ? (
          // Wenn der Benutzer angemeldet ist, kann hier der Hauptinhalt angezeigt werden
          // Hier könnten z.B. Produktlisten, Profilinformationen usw. angezeigt werden
          null // Hier wird kein Body-Inhalt angezeigt
        ) : (
          // Wenn kein Benutzer angemeldet ist, zeige das LoginForm
          showLoginForm ? <LoginForm handleLogin={handleLogin} /> : null
        )
      ) : (
        // Ansonsten zeige das UserForm zur Registrierung
        <UserForm setShowRegistrationForm={setShowRegistrationForm} />
      )}
    </div>
  );
}

export default App;




```

  - App.test.js

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

  - components/
    - Header/
      - Header.css

```javascript


.header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .header-left h1 {
    margin: 0;
  }
  
  .nav-list {
    list-style: none;
    padding: 0;
    display: flex;
  }
  
  .nav-item {
    margin-right: 20px;
  }
  
  .nav-item:last-child {
    margin-right: 0;
  }
  
  .nav-item a {
    color: #fff;
    text-decoration: none;
  }
  
  .nav-item a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  
.activeMenuItem {
    text-decoration: underline;
  }
  
  
  
```

      - Header.jsx

```javascript
import React from 'react';
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
              <span>Sie sind angemeldet als: {userName}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;







```

    - LoginForm/
      - LoginForm.css

```javascript
.login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #87ceeb; /* Himmelblau */
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
```

      - LoginForm.jsx

```javascript
import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        handleLogin(data);
      } else {
        console.log('Anmeldung fehlgeschlagen');
        // Hier könntest du eine Fehlermeldung anzeigen
      }
    } catch (error) {
      console.error('Fehler bei der Anmeldung:', error);
      // Hier könntest du eine Fehlermeldung anzeigen
    }
  };

  return (
    <div className="login-form">
      <h2>Anmelden</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Benutzername:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Anmelden</button>
      </form>
    </div>
  );
}

export default LoginForm;

```

    - UserForm/
      - UserForm.css

```javascript
/* UserForm.css */
/* UserForm.css */
.registration-form {
    width: 50%;
    margin: 0 auto;
    background-color: yellow;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  
  .registration-form label {
    display: block;
    margin-bottom: 10px;
    color: black;
  }
  
  .registration-form input[type="text"],
  .registration-form input[type="email"],
  .registration-form input[type="password"] {
    width: calc(100% - 20px); /* Abzüglich 20px für den rechten Abstand */
    padding: 10px;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
    background-color: gray;
    color: white;
    text-align: center;
  }
  
  .registration-form button {
    background-color: gray;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .registration-form button:hover {
    background-color: darkgray;
  }
  
```

      - UserForm.jsx

```javascript
import React, { useState } from 'react';
import './UserForm.css';

function UserForm({ setShowRegistrationForm }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;
        setMessage(`Benutzer erstellt: ${user.firstName} ${user.lastName}`);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setShowRegistrationForm(false);
        console.log('showRegistrationForm wurde auf false gesetzt');
        
      } 
      else {
        setMessage(`Fehler: ${data.error}`);
      }
    } catch (error) {
      console.error('Fehler beim Erstellen des Benutzers:', error);
      setMessage('Ein Fehler ist aufgetreten.');
    }
  };

  return (
    <div className="registration-form">
      <h1>Benutzer erstellen</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-label" htmlFor="firstName">
          Vorname:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <label className="input-label" htmlFor="lastName">
          Nachname:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <label className="input-label" htmlFor="email">
          E-Mail:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <label className="input-label" htmlFor="password">
          Passwort:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Benutzer erstellen
        </button>
      </form>

      <div id="message">{message}</div>
    </div>
  );
}

export default UserForm;



```

  - index.css

```javascript
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

  - index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



```

  - reportWebVitals.js

```javascript
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

  - setupTests.js

```javascript
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```


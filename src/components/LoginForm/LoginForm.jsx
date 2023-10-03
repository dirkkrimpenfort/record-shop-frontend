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
      // hier localhost verwenden statt 127.0.0.1-sonst kommt Fehlermeldung 
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

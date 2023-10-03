import React, { useState } from 'react';
import './UserForm.css';

function UserForm({ setShowRegistrationForm , handleLogin}) {
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
      // hier localhost verwenden statt 127.0.0.1-sonst kommt Fehlermeldung
      const response = await fetch('http://localhost:3000/api/users', {
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
        window.location.reload();
        console.log('showRegistrationForm wurde auf false gesetzt');
        //handleLogin(data);
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



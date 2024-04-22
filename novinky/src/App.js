import React, { useState } from 'react';
import './Login.css';
import Login from './Login'; // Import komponenty Login
import News from './News';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="App">
      {!loggedIn && <Login onLogin={handleLogin} />}
      {loggedIn && <News />}
    </div>
  );
};

export default App;
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'
// import App from './App';



// const domNode = document.getElementById('root');
// const root = ReactDOM.createRoot(domNode);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wywołaj funkcję onLogin przekazując dane logowania
    onLogin(email, password);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

const LogoutPage = ({ onLogout }) => {
  return (
    <div className="logout-page">
      <App />
    </div>
  );
};

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

const MainApp = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Wywołaj żądanie logowania do serwera
    // Na podstawie odpowiedzi serwera ustaw stan loggedIn
    // np. jeśli logowanie powiedzie się, ustaw loggedIn na true
    // Jeśli logowanie nie powiedzie się, pokaż odpowiednie komunikaty dla użytkownika

    // Przykładowa logika logowania (zawsze udane)
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Wywołaj żądanie wylogowania do serwera
    // Na podstawie odpowiedzi serwera ustaw stan loggedIn
    // np. jeśli wylogowanie powiedzie się, ustaw loggedIn na false
    // Jeśli wylogowanie nie powiedzie się, pokaż odpowiednie komunikaty dla użytkownika

    // Przykładowa logika wylogowania
    setLoggedIn(false);
  };

  return (
    <React.StrictMode>
      {loggedIn ? (
        <LogoutPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </React.StrictMode>
  );
};

root.render(<MainApp />);

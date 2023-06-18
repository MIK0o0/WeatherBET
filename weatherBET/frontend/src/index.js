import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './LoggingPage.css';
import './index.css';
import App from './App';
import axiosInstance from './axiosInstance';

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

const MainApp = () => {
  //Funckje logowania i wylogowania
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axiosInstance.get("/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      setRegistrationToggle(false);
    } else {
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    axiosInstance.post(
      "/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      axiosInstance.post(
        "/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    axiosInstance.post(
      "/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    axiosInstance.post(
      "/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  return (
    <React.StrictMode>
      {currentUser ? (
        <App loggOut={e => submitLogout(e)} />
      ) : (
        <div className="login-page">
          <h2>{registrationToggle ? 'Registration' : 'Login'}</h2>
          {registrationToggle ? (
            <form onSubmit={e => submitRegistration(e)}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="submit">Register</button>
            </form>
          ) : (
            <form onSubmit={e => submitLogin(e)}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="submit">Log in</button>
            </form>
          )}
          <button onClick={update_form_btn}>
            {registrationToggle ? 'Switch to Login' : 'Switch to Registration'}
          </button>
        </div>
      )}
    </React.StrictMode>
  );
};

root.render(<MainApp />);

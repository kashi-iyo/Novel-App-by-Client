import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    loginStatus()
  }, [])

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(resposne)
        } else {
          handleLogout()
        }
      }).catch(error => console.log('apiエラー: ', error))
  }

  handleLogin = (data) => {
    setIsLoggedIn(true)
    setUser(data.user)
  }

  handleLogout = () => {
    setIsLoggedIn(faluse)
    setUser({})
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={} />
          <Route exact path="/login" component={} />
          <Route exact path="/signup" component={} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

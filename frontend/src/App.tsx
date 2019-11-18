import React from 'react'
import { Route, Switch } from 'react-router'
import { LoginView } from './views'
import { MainNavbar } from './components/Navbar'
import HomePage from './components/HomePage/HomePage'

const App = () => (
  <Switch>
    <Route path="/login">
      <LoginView />
    </Route>
    <Route path="/">
      <MainNavbar />
      <HomePage />
    </Route>
  </Switch>
)

export default App

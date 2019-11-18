import React from 'react'
import { Route, Switch } from 'react-router'
import { LoginView } from './views'
import { MainNavbar } from './components/Navbar'

const App = () => (
  <Switch>
    <Route path="/login">
      <LoginView />
    </Route>
    <Route path="/">
      <MainNavbar />
    </Route>
  </Switch>
)

export default App

import React from 'react'
import { Route, Switch } from 'react-router'
import { LoginView, DashboardView } from './views'
import EnsureLoginStatus from './components/EnsureLoginStatus'
import { RouteBuilder } from './views/routes'
import { RestfulProvider } from 'restful-react'
import { AppState } from './store/types'
import { connect } from 'react-redux'

const mapStateToProps = (state: AppState) => ({
  loggedInUser: state.user.loggedInUser,
})

type Props = ReturnType<typeof mapStateToProps>

const App = ({ loggedInUser }: Props) => (
  <RestfulProvider
    base={process.env.REACT_APP_API_ENDPOINT as string}
    requestOptions={() =>
      loggedInUser
        ? { headers: { Authorization: `Bearer ${loggedInUser.token}` } }
        : {}
    }>
    <Switch>
      <Route path="/login">
        <EnsureLoginStatus
          needsToBeLoggedIn={false}
          redirectRoute={{
            pathname: RouteBuilder.toDashboard(),
          }}>
          <LoginView />
        </EnsureLoginStatus>
      </Route>
      <Route path="/">
        <EnsureLoginStatus
          needsToBeLoggedIn={true}
          redirectRoute={{
            pathname: RouteBuilder.toLogin(),
          }}>
          <DashboardView />
        </EnsureLoginStatus>
      </Route>
    </Switch>
  </RestfulProvider>
)

export default connect(mapStateToProps)(App)

import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as H from 'history'
import { AppState } from 'src/store/types'

const mapStateToProps = (state: AppState) => ({
  loggedInUser: state.user.loggedInUser,
})

type Props = {
  needsToBeLoggedIn: boolean
  redirectRoute: H.LocationDescriptor
  children?: ReactNode
} & ReturnType<typeof mapStateToProps>

const EnsureLoginStatus = ({
  loggedInUser,
  redirectRoute,
  needsToBeLoggedIn,
  children,
}: Props) =>
  Boolean(loggedInUser) === needsToBeLoggedIn ? (
    <>{children}</>
  ) : (
    <Redirect to={redirectRoute} />
  )

export default connect(mapStateToProps)(EnsureLoginStatus)

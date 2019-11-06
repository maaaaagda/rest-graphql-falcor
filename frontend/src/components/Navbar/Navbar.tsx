import React from 'react'
import { Navbar } from '@blueprintjs/core'
import styles from './styles.module.scss'

type Props = {}

export const MainNavbar = ({  }: Props) => (
  <header className="App-header">
    <Navbar className="bp3-navbar bp3-dark" fixedToTop>
      <div className="navbar-content">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">Blueprint</div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <button className="bp3-button bp3-minimal bp3-icon-home">Home</button>
          <button className="bp3-button bp3-minimal bp3-icon-document">
            Files
          </button>
          <span className="bp3-navbar-divider"></span>
          <button className="bp3-button bp3-minimal bp3-icon-user"></button>
          <button className="bp3-button bp3-minimal bp3-icon-notifications"></button>
          <button className="bp3-button bp3-minimal bp3-icon-cog"></button>
        </div>
      </div>
    </Navbar>
  </header>
)

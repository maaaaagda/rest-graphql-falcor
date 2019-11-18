import { Navbar } from '@blueprintjs/core'
import React from 'react'
import styles from './styles.module.scss'

type Props = {}

export const MainNavbar = (props: Props) => (
  <Navbar className={styles.appHeader} fixedToTop>
    <div className={styles.navbarContent}>
      <div className="bp3-navbar-group bp3-align-left">
        <img className={styles.navbarLogo} src="logo200.png" alt="logo" />
      </div>
      <div className="bp3-navbar-group bp3-align-right">
        <a className={styles.headerButton} href="/">
          DIETY
        </a>
        <span className="bp3-navbar-divider"></span>
        <a className={styles.headerButton} href="/">
          MENU
        </a>
        <span className="bp3-navbar-divider"></span>
        <a className={styles.headerButton} href="/">
          GDZIE DOWOZIMY
        </a>
        <span className="bp3-navbar-divider"></span>
        <a className={styles.headerCTAButton} href="/">
          ZAMÓW
        </a>
      </div>
    </div>
  </Navbar>
)

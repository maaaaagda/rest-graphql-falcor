import { Navbar } from '@blueprintjs/core'
import React from 'react'
import { PALETTE } from '../../common/styles/_constants'
import styles from './styles.module.scss'

type Props = {}

export const MainNavbar = ({  }: Props) => (
  <Navbar
    className={styles.appHeader}
    style={{ backgroundColor: PALETTE.Background }}
    fixedToTop>
    <div className={styles.navbarContent}>
      <div className="bp3-navbar-group bp3-align-left">
        <img className={styles.navbarLogo} src="logo200.png"></img>
      </div>
      <div className="bp3-navbar-group bp3-align-right">
        <button className={styles.headerButton}>DIETY</button>
        <span className="bp3-navbar-divider"></span>
        <button className={styles.headerButton}>MENU</button>
        <span className="bp3-navbar-divider"></span>
        <button className={styles.headerButton}>GDZIE DOWOZIMY</button>
        <span className="bp3-navbar-divider"></span>
        <button
          className={styles.headerCTAButton}
          style={{
            backgroundColor: PALETTE.CallToAction,
            color: PALETTE.Background,
          }}>
          ZAMÓW
        </button>
      </div>
    </div>
  </Navbar>
)

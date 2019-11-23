import React from 'react'
import { MainNavbar } from 'src/components/Navbar'
import HomePage from '../components/HomePage/HomePage'

const DashboardView = () => (
  <React.Fragment>
    <MainNavbar />
    <HomePage />
  </React.Fragment>
)

export { DashboardView }

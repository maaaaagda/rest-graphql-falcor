import React from 'react'
import { MainNavbar } from 'src/components/Navbar'
import HomePage from '../components/HomePage/HomePage'
import { Route } from 'react-router-dom'
import { DietListView } from './DietListView'
import { DietView } from './DietView'
import { AdminPanelView } from './AdminPanelView'

const DashboardView = () => (
  <>
    <MainNavbar />
    <Route path="/panel" exact={true} component={HomePage} />
    <Route path="/panel/admin" component={AdminPanelView} />
    <Route path="/panel/diets" exact={true} component={DietListView} />
    <Route path="/panel/diets/:dietId" exact={true} component={DietView} />
  </>
)

export { DashboardView }

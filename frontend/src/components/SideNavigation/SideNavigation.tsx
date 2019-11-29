import React from 'react'
import { Nav } from 'react-bootstrap'
import { RouteBuilder } from 'src/views/routes'
import { Link } from 'react-router-dom'

type Props = {}

export const SideNavigation = (_: Props) => (
  <Nav className="flex-column">
      <Link to={RouteBuilder.toFoodListAdmin()} className="nav-link" role="button">Produkty</Link>
      <Link to={RouteBuilder.toDietListAdmin()} className="nav-link" role="button">Diety</Link>
  </Nav>
)
import React from 'react'
import { Nav } from 'react-bootstrap'
import { RouteBuilder } from 'src/views/routes'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import styles from './SideNavigation.module.scss'

type LinkComponentProps = {
  href: string
  id: string
}

const LinkComponent: React.FC<LinkComponentProps> = ({
  href,
  id,
  children,
}) => {
  const { pathname } = useLocation()
  const isActive = pathname.startsWith(href)

  return (
    <Link
      to={href}
      id={id}
      className={classnames(
        'nav-link',
        styles.navLink,
        isActive && styles.navLink_active
      )}
      role="button">
      {children}
    </Link>
  )
}

type Props = {}

export const SideNavigation = (_: Props) => (
  <Nav className={`flex-column ${styles.navbar}`}>
    <LinkComponent
      id="dietitian-panel-diets"
      href={RouteBuilder.toDietListAdmin()}>
      Diety
    </LinkComponent>
    <LinkComponent
      id="dietitian-panel-meals"
      href={RouteBuilder.toMealListAdmin()}>
      Posiłki
    </LinkComponent>
  </Nav>
)

import React from 'react'
import { LoginForm } from 'src/components/LoginForm'
import { Container, Row, Col } from 'react-bootstrap'
import logo from 'src/media/logo200.png'
import styles from './LoginView.module.scss'

const LoginView = () => (
  <Container fluid={true}>
    <div className={styles.logo}>
      <img src={logo} className={styles.logoImage} alt="logo" />
    </div>
    <Row>
      <Col md="3" className="px-0" />
      <Col md="6" className="px-0">
        <LoginForm />
      </Col>
      <Col md="3" className="px-0" />
    </Row>
  </Container>
)

export { LoginView }

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { SideNavigation } from "src/components/SideNavigation"
import { Route, useRouteMatch } from 'react-router-dom'
import { DietListView } from './DietListView'
import { DietCard } from 'src/components/DietCard'

const AdminPanelView = () => {
    const { url } = useRouteMatch() as any

    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <SideNavigation />
                </Col>
                <Col md={8}>
                    <Route path={`${url}/diets`} exact={true} component={() => <DietListView DietCard={props => <DietCard {...props} editable />} />} />
                </Col>
            </Row>
        </Container>
    )
}

export { AdminPanelView }

import React, { useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { DietOrder } from 'src/models'
import { useKcalOptionsQuery } from 'src/rest/kcalOptionsQuery'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import { useDietOrdersQuery } from 'src/rest/detOrdersQuery'
import moment from 'moment'

export enum OrderStatusMapped {
  paid = "ZAPŁACONO",
  in_realisation = "W TRAKCIE REALIZACJI",
  cancelled = "ANULOWANO",
  waiting_for_payment = "OCZEKUJE NA PŁATNOŚĆ",
}


type Props = {}

const DietOrdersView = (props: Props) => {
  const dietsQueryResponse = useDietOrdersQuery()
  const dietOrders: DietOrder[] = (dietsQueryResponse.loading || !dietsQueryResponse.data) ? [] : dietsQueryResponse.data
  console.log(dietOrders);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Kaloryczność</th>
          <th>Koszt</th>
          <th>Adres dostawy</th>
          <th>Godzina dostawy</th>
          <th>Daty dostaw</th>
        </tr>
      </thead>
      <tbody>
        {dietOrders.map((dietOrder: DietOrder, idx: number) => (
          <tr>
            <td>{idx}</td>
            <td>{OrderStatusMapped[dietOrder.status]}</td>
            <td>{dietOrder.kcal}</td>
            <td>{dietOrder.cost}</td>
            <td>{dietOrder.deliveryAddress}</td>
            <td>{dietOrder.deliveryTime}</td>
            <td>{dietOrder.dates.reduce((date: string, acc: string) =>
              `${moment(acc).format('YYYY-MM-DD')}, ${date}`, '')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export { DietOrdersView }

import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'

const WhoAreWe: React.FC = props => {
  return (
    <div className={'row'}>
      <div className={classNames('col-lg-7', 'col-sm-12')}>
        <img className={s.mealImage} src={'home_meal_1.jpg'} alt={''} />
      </div>
      <div className={classNames('col-lg-5', 'col-sm-12')}>
        <div>
          <h1>Kim jesteśmy?</h1>
          <p>
            W Diet In A Box zajmujemy się przyrządzaniem pysznych i zdrowych
            posiłków oraz dostarczaniem ich do Twojego domu
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhoAreWe

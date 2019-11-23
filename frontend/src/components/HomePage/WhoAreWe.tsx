import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'

const WhoAreWe: React.FC = () => {
  return (
    <div className={'row'}>
      <div className={classNames('col-lg-7', 'col-sm-12', 'p-0')}>
        <img className={s.mealImage} src={'home_meal_1.jpg'} alt={''} />
      </div>
      <div className={classNames('col-lg-5', 'col-sm-12', 'p-0')}>
        <div>
          <h1 className={s.titleFont}>Kim jesteśmy?</h1>
          <p className={s.description}>
            W Diet In A Box zajmujemy się przyrządzaniem pysznych i zdrowych
            posiłków oraz dostarczaniem ich do Twojego domu
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhoAreWe

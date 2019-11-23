import React from 'react'
import classNames from 'classnames'
import s from './styles.module.scss'

const ReallyEko: React.FC = () => {
  return (
    <React.Fragment>
      <div className={'row mt-5'}>
        <div>
          <p className={s.secondaryTitle}>Prawdziwie EKO</p>
        </div>
      </div>
      <div className={'row d-flex justify-content-around'}>
        <div className={classNames('col-lg-5', 'col-sm-12', 'p-0')}>
          <div>
            <p className={s.description}>
              Pojemniki, w których dostarczamy jedzenie są z wykonane z
              cienkiego, wytrzymałego szkła. Jedzenie w nich przetrzymywane ma
              inną jakość smaku. Są one również wielokrotnego użytku, co sprawia
              ze żyjemy w zgodzie z naturą!
            </p>
          </div>
        </div>
        <div className={classNames('col-lg-7', 'col-sm-12', 'p-0')}>
          <img src={'glass_boxes.jpg'} alt={''} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ReallyEko

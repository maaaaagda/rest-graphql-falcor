import React from 'react'
import s from './styles.module.scss'
import Attribute from './Attribute'

const WhyWe: React.FC = () => {
  return (
    <React.Fragment>
      <div className={'row mt-5'}>
        <div className={'mx-auto'}>
          <p className={s.secondaryTitle}>Dlaczego my?</p>
        </div>
      </div>
      <div className={'row mt-2 d-flex justify-content-around'}>
        <Attribute
          title={'Dostawy'}
          description={
            'Dostwy o wybranej godzinie pod dowolną lokalizację na terenie miasta'
          }
        />
        <Attribute
          title={'Smacznie'}
          description={
            'Dostwy o wybranej godzinie pod dowolną lokalizację na terenie miasta'
          }
        />
        <Attribute
          title={'Zdrowo'}
          description={
            'Dostwy o wybranej godzinie pod dowolną lokalizację na terenie miasta. ' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        />
        <Attribute
          title={'Ekologicznie'}
          description={
            'Dostwy o wybranej godzinie pod dowolną lokalizację na terenie miasta.' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sunt in culpa qui officia deserunt mollit anim id est laborum. hguyvgyug'
          }
        />
        <Attribute
          title={'Jakość'}
          description={
            'Dostwy o wybranej godzinie pod dowolną lokalizację na terenie miasta'
          }
        />
        <Attribute
          title={'Ranking dań'}
          description={
            'Dostwy o wybranej godzinie pod dowolną lokalizację na terenie miasta. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          }
        />
      </div>
    </React.Fragment>
  )
}

export default WhyWe

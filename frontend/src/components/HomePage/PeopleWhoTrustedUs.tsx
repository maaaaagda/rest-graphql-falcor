import React from 'react'
import s from './styles.module.scss'
import Opinion from './Opinion'

const PeopleWhoTrustedUs: React.FC = () => {
  return (
    <React.Fragment>
      <div className={'row mt-5'}>
        <div className={'mx-auto'}>
          <p className={s.secondaryTitle}>Ludzie, którzy nam zaufali</p>
        </div>
      </div>
      <div
        className={
          'row mt-2 d-flex justify-content-between align-items-center'
        }>
        <Opinion
          name={'Anna Kowalik'}
          opinion={'Przepyszne jedzenie! W sam raz dla zapracownych ludzi'}
          photoPath={'./customers/anna_kowalik.jpg'}
        />
        <Opinion
          name={'Jola Woźniak'}
          opinion={'Przepyszne jedzenie! W sam raz dla zapracownych ludzi'}
          photoPath={'./customers/jola_wozniak.jpg'}
        />
        <Opinion
          name={'Piotr Wójcik'}
          opinion={'Przepyszne jedzenie! W sam raz dla zapracownych ludzi'}
          photoPath={'./customers/piotr_wojcik.jpg'}
        />
      </div>
    </React.Fragment>
  )
}

export default PeopleWhoTrustedUs

import React from 'react'
import { Diet } from 'src/models'
import { DietCard } from 'src/components/DietCard'
import classnames from "classnames"
import style from './DietList.module.scss'

type Props = {
  diets: Diet[]
  isLoading?: boolean
}

const DietList = ({ diets, isLoading }: Props) => (
  <div className={style.dietContainer}>
    {diets.map(diet => (
      <DietCard data={diet} key={diet._id} className={classnames(style.dietCard, isLoading && "bp3-skeleton")} />
    ))}
  </div>
)

export { DietList }

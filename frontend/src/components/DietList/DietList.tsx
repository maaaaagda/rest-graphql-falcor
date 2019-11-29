import React from 'react'
import { Diet } from 'src/models'
import { DietCardProps } from 'src/components/DietCard'
import classnames from "classnames"
import style from './DietList.module.scss'

type Props = {
  diets: Diet[]
  isLoading?: boolean
  DietCard: (props: DietCardProps) => JSX.Element
}

const DietList = ({ diets, isLoading, DietCard }: Props) => (
  <div className={style.dietContainer}>
    {diets.map(diet => (
      <DietCard data={diet} key={diet._id} className={classnames(style.dietCard, isLoading && "bp3-skeleton")} />
    ))}
  </div>
)

export { DietList }

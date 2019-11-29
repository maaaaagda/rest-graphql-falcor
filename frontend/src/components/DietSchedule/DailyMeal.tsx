import React from 'react'
import { ID } from 'src/models'
import styles from "./DailyMeal.module.scss"
import classnames from "classnames"
import { Icon } from '@blueprintjs/core'

type Props = {
  mealId: Nullable<ID>
  editable?: boolean
}

export type DietMealProps = Props

const DailyMeal = ({ mealId, editable }: Props) => (
    <div className={classnames(styles.dailyMeal, editable && styles.dailyMeal_editable)}>
        {mealId ? (
            mealId
        ) : (
            <div className={styles.editButton}>
                <Icon icon={"add"} iconSize={Icon.SIZE_STANDARD} className={styles.editButtonIcon} />
            </div>
        )}
    </div>
)

export { DailyMeal }

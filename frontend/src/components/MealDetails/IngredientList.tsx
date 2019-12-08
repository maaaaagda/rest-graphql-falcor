import React from 'react'
import { MealProduct } from 'src/models'
import styles from './IngredientList.module.scss'
import { Icon } from '@blueprintjs/core'

type IngredientListProps = {
  ingredients: MealProduct[]
  disabled: boolean
  setIngredients: (ingredients: MealProduct[]) => void
}

const IngredientList = (props: IngredientListProps) => {
  return (
    <ul className={styles.productList}>
      <li className={styles.product}>Jakiś produkt</li>
      <li className={styles.product}>Jakiś produkt</li>
      <li className={styles.product}>Jakiś produkt</li>
      <li className={styles.addProduct}>
        <Icon
          icon={'add'}
          iconSize={Icon.SIZE_STANDARD}
          className={styles.addProductIcon}
        />
      </li>
    </ul>
  )
}

export { IngredientList }

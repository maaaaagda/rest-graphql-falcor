import React from 'react'
import { MealProduct } from 'src/models'
import styles from './IngredientList.module.scss'
import { Select, ItemRenderer } from '@blueprintjs/select'
import classnames from 'classnames'
import { MenuItem } from '@blueprintjs/core'

type IngredientListProps = {
  ingredients: MealProduct[]
  disabled: boolean
  setIngredients: (ingredients: MealProduct[]) => void
} & React.HTMLAttributes<HTMLUListElement>

const renderIngredient: ItemRenderer<MealProduct> = (
  ingredient,
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={ingredient.productId}
      label={'lol nie ma title'}
      onClick={handleClick}
      text={'lol nie ma title'}
    />
  )
}

const IngredientSelect = Select.ofType<MealProduct>()

const IngredientList = ({
  ingredients,
  disabled,
  setIngredients,
  className,
  ...rest
}: IngredientListProps) => {
  return (
    <ul className={classnames(styles.productList, className)} {...rest}>
      <li className={styles.product}>Jakiś produkt</li>
      <li className={styles.product}>Jakiś produkt</li>
      <li className={styles.product}>Jakiś produkt</li>
      <li className={styles.product}>
        <IngredientSelect
          items={ingredients}
          itemRenderer={renderIngredient}
          noResults={<MenuItem disabled={true} text="Brak wyników." />}
          onItemSelect={item => setIngredients([...ingredients, item])}
          className={styles.addProductBtn}
        />
      </li>
    </ul>
  )
}

export { IngredientList }

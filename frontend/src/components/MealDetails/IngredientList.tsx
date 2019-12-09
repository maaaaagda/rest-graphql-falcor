import React, { useState } from 'react'
import { MealProduct } from 'src/models'
import styles from './IngredientList.module.scss'
import { Select, ItemRenderer } from '@blueprintjs/select'
import classnames from 'classnames'
import { MenuItem, Button } from '@blueprintjs/core'
import { useSearchProductQuery } from 'src/rest'

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
      onClick={handleClick}
      label={ingredient.productId}
    />
  )
}

const IngredientSelect = Select.ofType<MealProduct>()

type IngredientSelectQueryingProps = {
  addIngredient: (product: MealProduct) => void
  query: string
  setQuery: (query: string) => void
}
const IngredientSelectQuerying = ({
  addIngredient,
  query,
  setQuery,
}: IngredientSelectQueryingProps) => {
  const { data } = useSearchProductQuery({ name: query })

  return (
    <IngredientSelect
      items={(data as Nullable<MealProduct[]>) || []}
      itemRenderer={renderIngredient}
      noResults={<MenuItem disabled={true} text="Brak wyników." />}
      onItemSelect={item => addIngredient(item)}
      query={query}
      onQueryChange={setQuery}>
      <Button text="Dodaj produkt" rightIcon="double-caret-vertical" />
    </IngredientSelect>
  )
}

const IngredientList = ({
  ingredients,
  disabled,
  setIngredients,
  className,
  ...rest
}: IngredientListProps) => {
  const removeIngredient = (product: MealProduct) => {
    setIngredients(ingredients.filter(p => p.productId !== product.productId))
  }

  const addIngredient = (product: MealProduct) => {
    setIngredients([...ingredients, product])
  }

  const [query, setQuery] = useState('')

  return (
    <ul className={classnames(styles.productList, className)} {...rest}>
      {ingredients.map(p => (
        <li className={styles.product}>
          <span className={styles.productText}>{p.productId}</span>
          <Button
            icon="delete"
            intent="danger"
            className={styles.productDelete}
            onClick={() => removeIngredient(p)}
          />
        </li>
      ))}
      <li className={classnames(styles.product, styles.addProductBtn)}>
        <IngredientSelectQuerying
          query={query}
          setQuery={setQuery}
          addIngredient={addIngredient}
        />
      </li>
    </ul>
  )
}

export { IngredientList }

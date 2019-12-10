import React, { useState } from 'react'
import { MealProduct } from 'src/models'
import styles from './IngredientList.module.scss'
import { Select, ItemRenderer } from '@blueprintjs/select'
import classnames from 'classnames'
import { MenuItem, Button, NumericInput } from '@blueprintjs/core'
import { useSearchProductQuery } from 'src/rest'
import { Product } from 'src/models/product'

type IngredientListProps = {
  ingredients: MealProduct[]
  disabled: boolean
  setIngredients: (ingredients: MealProduct[]) => void
} & React.HTMLAttributes<HTMLUListElement>

const renderIngredient: ItemRenderer<Product> = (
  ingredient,
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={ingredient.name}
      onClick={handleClick}
      text={ingredient.name}
      label={`${Math.round(ingredient.kcal)} kcal/100g`}
    />
  )
}

const IngredientSelect = Select.ofType<Product>()

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
      items={data || []}
      itemRenderer={renderIngredient}
      noResults={<MenuItem disabled={true} text="Brak wyników." />}
      onItemSelect={item =>
        addIngredient({ productId: item._id, weight: 1, name: item.name })
      }
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

  const setIngredientWeight = (weight: number, idx: number) => {
    const ingredientsCopy = [...ingredients]
    ingredientsCopy[idx].weight = weight
    setIngredients(ingredientsCopy)
  }

  const [query, setQuery] = useState('')

  return (
    <ul className={classnames(styles.productList, className)} {...rest}>
      {ingredients.map((p, idx) => (
        <li className={styles.product}>
          <span className={styles.productText}>{p.name}</span>
          <NumericInput
            placeholder="waga (g)"
            onValueChange={v => setIngredientWeight(v, idx)}
            value={p.weight}
            className={styles.weight}
            min={1}
            buttonPosition="none"
          />{' '}
          gram
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

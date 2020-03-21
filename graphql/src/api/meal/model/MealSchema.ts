import mongoose from "mongoose";
import uuidv1 from "uuid/v1";
import { Ingredient } from "./IngredientSchema";

export const mealSchema: mongoose.Schema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv1
  },
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [Ingredient],
    default: []
  },
  recipe: {
    type: String
  },
  rating: {
    type: Number,
    default: undefined
  },
  authorId: {
    type: String
  },
  kcal: {
    type: Number
  },
  protein: {
    type: Number
  },
  carbohydrate: {
    type: Number
  },
  fat: {
    type: Number
  },
  fibre: {
    type: Number
  },
  photo: {
    type: Buffer
  }
});

import { IResolver } from "../../../core/graphql/IResolver";
import { MealController } from "../controller/MealController";
const mealController = new MealController();

export const MealResolvers: IResolver = {
  Query: {
    meals: mealController.getMeals,
    meal: mealController.getMealById
  },
  Mutation: {
    addMeal: mealController.addMeal,
    updateMeal: mealController.updateMeal,
    removeMeal: mealController.removeMeal
  }
};

import { IMeal } from "./../model/Meal";
import { MealController } from "../controller/MealController";

const mealController = new MealController();

export const mealRoutes: any = [
    {
        route: "meals[{ranges:indexRanges}][\"name\", \"kcal\", \"description\", \"_id\"]",
        get: async (pathSet) => {
            const meals: IMeal[] = (await mealController.getMeals()).slice(0, pathSet.indexRanges[0].to + 1);
            const mealsRoute: object = {};
            meals.forEach((meal, i) => {
            mealsRoute[i] = {};
            pathSet[2].forEach((key) => {
                mealsRoute[i][key] = meal[key];
            });
            });
            return { jsonGraph: {meals: mealsRoute} };
        }
    },
    {
        route: "mealsByIds[{keys:ids}][\"name\", \"kcal\", \"recipe\", \"_id\", \"photoUrl\", \"protein\", \"fat\", \"fibre\", \"carbohydrate\"]",
        get: async (pathSet) => {
            const mealsRoute: object = {};
            for (const id of pathSet.ids) {
                const meal: IMeal = await mealController.getMealById(id);
                mealsRoute[id] = {};
                pathSet[2].forEach((key) => {
                    mealsRoute[id][key] = meal[key];
                });
            }
            return { jsonGraph: {mealsByIds: mealsRoute} };
        }
    },
    {
        route: "meals[{keys:ids}].ingredients[{ranges:indexRanges}][\"productName\", \"weight\"]",
        get: async (pathSet) => {
          const mealRoute: object = {};
          for (const id of pathSet.ids) {
            const meal: IMeal = await mealController.getMealById(id);
            mealRoute[id] = { ingredients: {}};
            if (meal.ingredients.length) {
                let ingredientNr: number = 0;
                while (ingredientNr <= pathSet.indexRanges[0].to) {
                    mealRoute[id].ingredients[ingredientNr] = {};
                    pathSet[4].forEach((key) => {
                        if (meal.ingredients[ingredientNr]) {
                            mealRoute[id].ingredients[ingredientNr][key] = meal.ingredients[ingredientNr][key];
                        } else {
                            mealRoute[id].ingredients[ingredientNr][key] = null;
                        }
                    });
                    ingredientNr++;
                }                   
            } else {
                mealRoute[id].ingredients = null;
            }
          }
          return { jsonGraph: { meals: mealRoute } };    
        }
      },
    {
        route: "meal.add",
        async call(callPath, args, pathSet, paths) {
        const meal: IMeal = await mealController.addMeal(args, this.token);
        return pathSet.map((key) => {
                return { path: ["meal", key], value: meal[key]};
            });
        }
    },
    {
        route: "meal.update",
        async call(callPath, args, pathSet, paths) {
        const {id, ...meal} = args;
        const updatedMeal: IMeal = await mealController.updateMeal(id, meal, this.token);
        return pathSet.map((key) => {
                return { path: ["meal", key], value: updatedMeal[key]};
            });
        }
    },
    {
        route: "meal[{keys:ids}].delete",
        async call(callPath, args, pathSet, paths) {
            const mealPaths: any = [];
            for (const mealId of callPath.ids) {
                await mealController.removeMeal(mealId, this.token);
                mealPaths.push({path: ["meal", mealId], value: true});
            }

            return mealPaths;    
        }
    }
];

import { IResolver } from "../../../core/graphql/IResolver";
import { DietController } from "../controller/DietController";
const dietController = new DietController();

export const DietResolvers: IResolver = {
  Query: {
    diets: dietController.getDiets,
    diet: dietController.getDietById,
    kcalOptions: dietController.getDietKcalOptions
  },
  Mutation: {
    addDiet: dietController.addDiet,
    updateDiet: dietController.updateDiet
  }
};

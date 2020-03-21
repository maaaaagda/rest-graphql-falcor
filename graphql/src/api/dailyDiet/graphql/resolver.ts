import { IResolver } from "../../../core/graphql/IResolver";
import { DailyDietController } from "../controller/DailyDietController";
const dailyDietController = new DailyDietController();

export const DailyDietResolvers: IResolver = {
  Query: {
    dailyDiets: dailyDietController.getDailyDiets,
    dailyDiet: dailyDietController.getDailyDietById
  },
  Mutation: {
    addDailyDiet: dailyDietController.addDailyDiet,
    updateDailyDiet: dailyDietController.updateDailyDiet
  }
};

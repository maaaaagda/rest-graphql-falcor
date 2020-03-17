import { IDailyDiet } from "../model/DailyDiet";
import { DailyDietController } from "../controller/DailyDietController";

const dailyDietController = new DailyDietController();

export const dailyDietRoutes: any = [
    {
        route: "dailyDiets[{ranges:indexRanges}][\"date\", \"dietId\", \"_id\"]",
        get: async (pathSet) => {
            const dailyDiets: IDailyDiet[] = 
            (await dailyDietController.getDailyDiets()).slice(0, pathSet.indexRanges[0].to + 1);
            const dailyDietsRoute: object = {};
            dailyDiets.forEach((dailyDiet, i) => {
            dailyDietsRoute[i] = {};
            pathSet[2].forEach((key) => {
                if (key === "date") {
                    dailyDietsRoute[i][key] = dailyDiet[key].toISOString();
                } else {
                    dailyDietsRoute[i][key] = dailyDiet[key];
                }
            });
            });
            return { jsonGraph: {dailyDiets: dailyDietsRoute} };
        }
    },
    {
        route: "dailyDiets[{keys:ids}].dailyMeals[{keys:dailyMealNames}][\"name\", \"kcal\"]",
        get: async (pathSet) => {
            const dailyDietRoute: object = {};
            for (const id of pathSet.ids) {
                const dailyDiet: IDailyDiet = await dailyDietController.getDailyDietById(id);
                dailyDietRoute[id] = { dailyMeals: {}};
                pathSet.dailyMealNames.forEach((dailyMealName) => {
                    dailyDietRoute[id].dailyMeals[dailyMealName] = {};
                    pathSet[4].forEach((key) => {
                        dailyDietRoute[id].dailyMeals[dailyMealName][key] = dailyDiet.dailyMeals[dailyMealName][key];
                    });
                });
            }
            return { jsonGraph: { dailyDiets: dailyDietRoute } };    
        }
    },
    {
        route: "dailyDiet.add",
        async call(callPath, args, pathSet, paths) {
        const dailyDiet: IDailyDiet = await dailyDietController.addDailyDiet(args, this.token);
        return pathSet.map((key) => {
                return { path: ["dailyDiet", key], value: dailyDiet[key]};
            });
        }
    },
    {
        route: "dailyDiet.update",
        async call(callPath, args, pathSet, paths) {
        const {id, ...dailyDiet} = args;
        const updatedDailyDiet: IDailyDiet = await dailyDietController.updateDailyDiet(id, dailyDiet, this.token);
        return pathSet.map((key) => {
                return { path: ["dailyDiet", key], value: updatedDailyDiet[key]};
            });
        }
    }
];

import { IDiet } from "./../model/Diet";
import { DietController } from "../controller/DietController";

const dietController = new DietController();

export const dietRoutes: any = [
    {
        route: "diets[{ranges:indexRanges}][\"name\", \"dailyCost\", \"photoUrl\", \"_id\"]",
        get: async (pathSet) => {
            const diets: IDiet[] = (await dietController.getDiets()).slice(0, pathSet.indexRanges[0].to + 1);
            const dietsRoute: object = {};
            diets.forEach((diet, i) => {
            dietsRoute[i] = {};
            pathSet[2].forEach((key) => {
                dietsRoute[i][key] = diet[key];
                });
            });
            return { jsonGraph: {diets: dietsRoute} };
        }
    },
    {
        route: "dietsByIds[{keys:ids}][\"name\", \"dailyCost\", \"photoUrl\", \"_id\"]",
        get: async (pathSet) => {
            const dietRoute: object = {};
            for (const id of pathSet.ids) {
                const diet: IDiet = await dietController.getDietById(id);
                dietRoute[id] = {};
                pathSet[2].forEach((key) => {
                    dietRoute[id][key] = diet[key];
                });
            }
            return { jsonGraph: {dietsByIds: dietRoute} };
        }
    },
    {
        route: "diet.add",
        async call(callPath, args, pathSet, paths) {
        const diet: IDiet = await dietController.addDiet(args, this.token);
        return pathSet.map((key) => {
                return { path: ["diet", key], value: diet[key]};
            });
        }
    },
    {
        route: "diet.update",
        async call(callPath, args, pathSet, paths) {
        const {id, ...diet} = args;
        const updatedDiet: IDiet = await dietController.updateDiet(id, diet, this.token);
        return pathSet.map((key) => {
                return { path: ["diet", key], value: updatedDiet[key]};
            });
        }
    }
];

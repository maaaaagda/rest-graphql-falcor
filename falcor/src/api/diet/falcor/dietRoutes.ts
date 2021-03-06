import { IDiet } from "./../model/Diet";
import { DietController } from "../controller/DietController";
import * as falcor from "falcor";
const $ref = falcor.Model.ref;

const dietController = new DietController();

export const dietRoutes: any = [
    {
        route: "diets[{ranges:indexRanges}]",
        get: async (pathSet) => {
            const diets: IDiet[] = (await dietController.getDiets()).slice(0, pathSet.indexRanges[0].to + 1);
            const dietsRoute: object = {};
            diets.forEach((diet, i) => {
                dietsRoute[i] = $ref([ "dietsByIds", diet._id]);
            });
            return { jsonGraph: { diets: dietsRoute} };
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
        route: "dietsAll[{ranges:indexRanges}][\"name\", \"dailyCost\", \"photoUrl\", \"_id\"]",
        get: async (pathSet) => {
            const diets: IDiet[] = (await dietController.getDiets()).slice(0, pathSet.indexRanges[0].to + 1);
            const dietsRoute: object = {};
            diets.forEach((diet, i) => {
                dietsRoute[i] = {};
                pathSet[2].forEach((key) => {
                    dietsRoute[i][key] = diet[key];
                });
            });
            return { jsonGraph: { diets: dietsRoute} };
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
    },
    {
        route: "diet[{keys:ids}].delete",
        async call(callPath, args, pathSet, paths) {
            const mealPaths: any = [];
            for (const dietId of callPath.ids) {
                await dietController.removeDiet(dietId, this.token);
                mealPaths.push({path: ["diet", dietId], value: true});
            }

            return mealPaths;    
        }
    },
    {
        route: "diets.all",
        async call(callPath, args, pathSet, paths) {
        const diets: IDiet[] = await dietController.getDiets();
        for (const diet of diets) {
            const dietPaths: any = {};
            pathSet.map((key) => {
                dietPaths.push({ path: ["diet", key], value: diet[key]});
                });
            }
        }
    }
];

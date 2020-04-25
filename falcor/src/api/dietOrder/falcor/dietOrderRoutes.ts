import { IDietOrder } from "./../model/DietOrder";
import { DietOrderController } from "../controller/DietOrderController";

const dietOrderController = new DietOrderController();

export const dietOrderRoutes: any = [
    {
        route: "dietOrders[{ranges:indexRanges}][\"_id\", \"dietId\", \"cost\", \"kcal\", \"status\"]",
        async get(pathSet) {
            const dietOrders: Array<IDietOrder<Date>> = 
            (await dietOrderController.getDietOrders(this.token)).slice(0, pathSet.indexRanges[0].to + 1);
            const dietOrdersRoute: object = {};
            dietOrders.forEach((dietOrder, i) => {
            dietOrdersRoute[i] = {};
            pathSet[2].forEach((key) => {
                dietOrdersRoute[i][key] = dietOrder[key];
            });
            });
            return { jsonGraph: {dietOrders: dietOrdersRoute} };
        }
    },
    {
        route: "allDietOrders[{ranges:indexRanges}][\"_id\", \"dietId\", \"cost\", \"kcal\", \"status\"]",
        async get(pathSet) {
            const dietOrders: Array<IDietOrder<Date>> = 
            (await dietOrderController.getDietOrders(this.token)).slice(0, pathSet.indexRanges[0].to + 1);
            const allDietOrdersRoute: object = {};
            dietOrders.forEach((dietOrder, i) => {
                allDietOrdersRoute[i] = {};
                pathSet[2].forEach((key) => {
                allDietOrdersRoute[i][key] = dietOrder[key];
            });
            });
            return { jsonGraph: {allDietOrders: allDietOrdersRoute} };
        }
    },
    {
        route: "dietOrders[{keys:ids}].dates[{ranges:indexRanges}].date",
        async get(pathSet) {
          const dietOrderRoute: object = {};
          for (const id of pathSet.ids) {
            const dietOrder: IDietOrder<Date> = 
            (await dietOrderController.getDietOrders(this.token)).find((diet) => diet._id === id);
            dietOrderRoute[id] = { dates: {}};
            let dateNr: number = 0;
            while (dateNr <= pathSet.indexRanges[0].to) {
                dietOrderRoute[id].dates[dateNr] = {};
                pathSet[4].forEach(() => {
                    if (dietOrder.dates[dateNr]) {
                        dietOrderRoute[id].dates[dateNr].date = dietOrder.dates[dateNr].toISOString();
                    } else {
                        dietOrderRoute[id].dates[dateNr].date = null;
                    }
                });
                dateNr++;
            }
          }
          return { jsonGraph: { dietOrders: dietOrderRoute } };    
        }
    },
    {
        route: "allDietOrders[{keys:ids}].dates[{ranges:indexRanges}].date",
        async get(pathSet) {
          const dietOrderRoute: object = {};
          for (const id of pathSet.ids) {
            const dietOrder: IDietOrder<Date> = 
            (await dietOrderController.getDietOrders(this.token)).find((diet) => diet._id === id);
            dietOrderRoute[id] = { dates: {}};
            let dateNr: number = 0;
            while (dateNr <= pathSet.indexRanges[0].to) {
                dietOrderRoute[id].dates[dateNr] = {};
                pathSet[4].forEach(() => {
                    if (dietOrder.dates[dateNr]) {
                        dietOrderRoute[id].dates[dateNr].date = dietOrder.dates[dateNr].toISOString();
                    } else {
                        dietOrderRoute[id].dates[dateNr].date = null;
                    }
                });
                dateNr++;
            }
          }
          return { jsonGraph: { allDietOrders: dietOrderRoute } };    
        }
    },
    {
        route: "dietOrder.add",
        async call(callPath, args, pathSet, paths) {
        const dietOrder: IDietOrder<Date> = await dietOrderController.addDietOrder(args, this.token);
        return pathSet.map((key) => {
            if (key === "date") {
                return { path: ["dietOrder", key], value: dietOrder[key].toISOString()};
            } else {
                return { path: ["dietOrder", key], value: dietOrder[key]};
            }
            });
        }
    },
    {
        route: "dietOrder.update",
        async call(callPath, args, pathSet, paths) {
        const {id, ...dietOrder} = args;
        const updatedDietOrder: IDietOrder<Date> 
        = await dietOrderController.updateDietOrder(id, dietOrder, this.token);
        return pathSet.map((key) => {
            if (key === "date") {
                return { path: ["dietOrder", key], value: updatedDietOrder[key].toISOString()};
            } else {
                return { path: ["dietOrder", key], value: updatedDietOrder[key]};
            }
            });
        }
    },
    {
        route: "dietOrders.all",
        async call(callPath, args, pathSet, paths) {
            const dietOrders: Array<IDietOrder<Date>> = 
            (await dietOrderController.getAllDietOrders(this.token));
            const pathsToReturn: object[] = [];
            dietOrders.forEach((dietOrder, i) => {
                pathSet.forEach((key) => {
                    pathsToReturn.push({ path: ["allDietOrders", i, key], value: dietOrder[key]});
                });
            });
            return pathsToReturn;
        }
    },
    {
        route: "dietOrders.user",
        async call(callPath, args, pathSet, paths) {
            const dietOrders: Array<IDietOrder<Date>> = 
            (await dietOrderController.getDietOrders(this.token));
            const pathsToReturn: object[] = [];
            dietOrders.forEach((dietOrder, i) => {
                pathSet.forEach((key) => {
                    pathsToReturn.push({ path: ["dietOrders", i, key], value: dietOrder[key]});
                });
            });
            return pathsToReturn;
        }
    }
];

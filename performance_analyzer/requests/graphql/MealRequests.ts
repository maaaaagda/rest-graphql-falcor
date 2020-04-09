import { Options } from "got";
import { IMealRequests } from "../IMealRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { GraphQLRequestsBase } from "./GraphQLRequestsBase";
import { IMeal } from "../../generate_data/meals/IMeal";

export class GraphQLMealRequests extends GraphQLRequestsBase implements IMealRequests {
    
    public getMeals = async (): Promise<Response<string>> => {
        const query = `
            query {
                meals {
                    name
                    _id
                }
            }
        `;
        const options: Options = {
            url: this.apiUrl + "meals",
            body: JSON.stringify({query}),
            method: "POST"
        };
        
        return got(options);
    }
    
    public getMealById = async (id: string): Promise<Response<string>> => {
        const query = `
            query ($id: String!) {
                    meal(id: $id) { 
                        name
                        _id
                        kcal
                        protein
                        carbohydrate
                        fat
                        fibre
                        photo
                    }
                }
        `;
        const variables = {
            id
        };
        const options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };
        return got(options);
    }

    public addMeal(meal: IMeal): Promise<Response<string>> {
        const query = `
            mutation ($meal: ModifyMeal!) {
                addMeal(meal: $meal) { 
                    _id
                }
            }
        `;
        const variables = {
            meal
        };
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }

    public updateMeal(id: string, meal: IMeal): Promise<Response<string>> {
        const query = `
            mutation ($id: String!, $meal: ModifyMeal!) {
                updateMeal(id: $id, meal: $meal) { 
                    _id
                }
            }
        `;
        const variables = {
            id,
            meal
        };
                
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }
}

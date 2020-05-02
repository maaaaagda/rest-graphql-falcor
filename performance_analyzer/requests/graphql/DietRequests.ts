import { Options } from "got";
import { IDietRequests } from "../IDietRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { GraphQLRequestsBase } from "./GraphQLRequestsBase";
import { IDiet } from "../../generate_data/diets/IDiet";

export class GraphQLDietRequests extends GraphQLRequestsBase implements IDietRequests {
    
    public getAllDiets = async (): Promise<Response<string>> => {
        const query = `
            query {
                diets {
                    name
                    _id
                    photoUrl
                    dailyCost
                }
            }
        `;
        const options: Options = {
            url: this.apiUrl + "diets",
            body: JSON.stringify({query}),
            method: "POST"
        };
        
        return got(options);
    }
    
    public getDietById = async (id: string): Promise<Response<string>> => {
        const query = `
            query ($id: String!) {
                    diet(id: $id) { 
                        name
                        _id
                        photoUrl
                        dailyCost
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
    
    public getKcalOptions = async () => {
        const query = `
            query {
                kcalOptions {
                    value
                }
            }
        `;
        const options = {
            url: this.apiUrl,
            body: JSON.stringify({query}),
            method: "POST"
        };
        return await got(options);
    }

    public addDiet(diet: IDiet): Promise<Response<string>> {
        const query = `
            mutation ($diet: ModifyDiet!) {
                addDiet(diet: $diet) { 
                    _id
                }
            }
        `;
        const variables = {
            diet
        };
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }

    public updateDiet(id: string, diet: IDiet): Promise<Response<string>> {
        const query = `
            mutation ($id: String!, $diet: ModifyDiet!) {
                updateDiet(id: $id, diet: $diet) { 
                    _id
                }
            }
        `;
        const variables = {
            id,
            diet
        };
                
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }

    public removeDiet(id: string): Promise<Response<string>> {
        const query = `
            mutation ($id: String!) {
                removeDiet(id: $id)
            }
        `;
        const variables = {
            id
        };
                
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }
}

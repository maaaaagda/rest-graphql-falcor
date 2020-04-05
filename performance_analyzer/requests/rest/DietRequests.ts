import { IDietRequests } from "../IDietRequests";
import { API_URL } from "../../common";
import got from "../got";
import { Response } from "got/dist/source";
import { IDiet } from "../../generate_data/diets/IDiet";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class DietRequests extends RESTRequestsBase implements IDietRequests {
    
    public getAllDiets = async (): Promise<Response<string>> => {
        const options = {
            url: API_URL + "diets"
        };
        return got(options);
    }
    
    public getDietById = async (id: string): Promise<Response> => {
        const options = {
            url: `${API_URL}diets/${id}`
        };
        return got(options);
    }
    
    public getKcalOptions = async () => {
        const options = {
            url: API_URL + "diets/kcal-options"
        };
        return await got(options);
    }

    public addUser(diet: IDiet): Promise<Response<string>> {
        const options = {
            url: this.apiUrl + "diets",
            method: "POST",
            body: JSON.stringify(diet)
        };
        return got(options);
    }
}

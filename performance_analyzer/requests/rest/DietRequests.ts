import { IDietRequests } from "../IDietRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { IDiet } from "../../generate_data/diets/IDiet";
import { RESTRequestsBase } from "./RESTRequestsBase";

export class RESTDietRequests extends RESTRequestsBase implements IDietRequests {
    
    public getAllDiets = async (): Promise<Response<string>> => {
        const options = {
            url: this.apiUrl + "diets"
        };
        return got(options);
    }
    
    public getDietById = async (id: string): Promise<Response<string>> => {
        const options = {
            url: `${this.apiUrl}diets/${id}`
        };
        return got(options);
    }
    
    public getKcalOptions = async () => {
        const options = {
            url: this.apiUrl + "diets/kcal-options"
        };
        return await got(options);
    }

    public addDiet(diet: IDiet): Promise<Response<string>> {
        const options = {
            url: this.apiUrl + "diets",
            method: "POST",
            body: JSON.stringify(diet)
        };
        return got(options);
    }

    public updateDiet(id: string, diet: IDiet): Promise<Response<string>> {
        const options = {
            url: `${this.apiUrl}diets/${id}`,
            method: "PUT",
            body: JSON.stringify(diet)
        };
        return got(options);
    }

    public removeDiet(id: string): Promise<Response<string>> {
        const options = {
            url: `${this.apiUrl}diets/${id}`,
            method: "DELETE"
        };
        return got(options);
    }
}

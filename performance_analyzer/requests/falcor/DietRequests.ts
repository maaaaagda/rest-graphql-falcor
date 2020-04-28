import { Options } from "got";
import { IDietRequests } from "../IDietRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { FalcorRequestsBase } from "./FalcorRequestsBase";
import { IDiet } from "../../generate_data/diets/IDiet";

export class FalcorDietRequests extends FalcorRequestsBase implements IDietRequests {
    
    public getAllDiets = async (nrOfDiets: number): Promise<Response<string>> => {
        const options: Options = {
            url: `${this.apiUrl}?paths=[["dietsAll",[{"length": ${nrOfDiets}}],["name", "photoUrl", "dailyCost", "_id"]]]&method=get`
        };

        return got(options);
    }
    
    public getDietById = async (id: string): Promise<Response<string>> => {
        const options = {
            url: `${this.apiUrl}?paths=[["dietsByIds",["${id}"],["name","_id", "photoUrl", "dailyCost"]]]&method=get`
        };
        return got(options);
    }

    public addDiet(diet: IDiet): Promise<Response<string>> {
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["diet", "add"]),
                    arguments: JSON.stringify(diet),
                    pathSuffixes: JSON.stringify(["_id"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }

    public updateDiet(id: string, diet: IDiet): Promise<Response<string>> {
        const dietWithId: any = {...diet, id};
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["diet", "update"]),
                    arguments: JSON.stringify(dietWithId),
                    pathSuffixes: JSON.stringify(["_id"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }

    public removeDiet(id: string): Promise<Response<string>> {
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify(
                {
                    method: "call",
                    callPath: JSON.stringify(["diet", [id], "delete"]),
                    pathSuffixes: JSON.stringify(["delete"])
                }
            ),
            method: "POST"
        };

        return got(options);
    }
}

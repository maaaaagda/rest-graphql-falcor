import { Options } from "got";
import { IDailyDietRequests } from "../IDailyDietRequests";
import got from "../got";
import { Response } from "got/dist/source";
import { GraphQLRequestsBase } from "./GraphQLRequestsBase";
import { IDailyDiet } from "../../generate_data/dailyDiets/IDailyDiet";

export class GraphQLDailyDietRequests extends GraphQLRequestsBase implements IDailyDietRequests {
    
    public async getDailyDiets(date: string, dietId: string): Promise<Response<string>> {
        const query = `
            query ($date: String, $dietId: String) {
                    dailyDiets(date: $date, dietId: $dietId) {
                        dailyMeals {
                            breakfast {
                                name
                                photoUrl
                                _id
                            }
                            morningSnack {
                                name
                                photoUrl
                                _id
                            }
                            lunch {
                                name
                                photoUrl
                                _id
                            }
                            afternoonSnack {
                                name
                                photoUrl
                                _id
                            }
                            dinner {
                                name
                                photoUrl
                                _id
                            }
                        }                        
                    }
                }
        `;
        const variables = {
            date,
            dietId
        };
        const options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };
        return got(options);
    }

    public addDailyDiet(dailyDiet: IDailyDiet): Promise<Response<string>> {
        const query = `
            mutation ($dailyDiet: ModifyDailyDiet!) {
                addDailyDiet(dailyDiet: $dailyDiet) { 
                    _id
                }
            }
        `;
        const variables = {
            dailyDiet
        };
        
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }

    public updateDailyDiet(id: string, dailyDiet: IDailyDiet): Promise<Response<string>> {
        const query = `
            mutation ($id: String!, $dailyDiet: ModifyDailyDiet!) {
                updateDailyDiet(id: $id, dailyDiet: $dailyDiet) { 
                    _id
                }
            }
        `;
        const variables = {
            id,
            dailyDiet
        };
                
        const options: Options = {
            url: this.apiUrl,
            body: JSON.stringify({query, variables}),
            method: "POST"
        };

        return got(options);
    }
}

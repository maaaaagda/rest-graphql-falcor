import { FalcorDietRequests } from "./../requests/falcor/DietRequests";
import { DietGenerator } from "./../generate_data/diets/DietGenerator";
import { GraphQLDietRequests } from "./../requests/graphql/DietRequests";
import { FalcorUserRequests } from "./../requests/falcor/UserRequests";
import { UserGenerator } from "../generate_data/users/UserGenerator";
import { GraphQLUserRequests } from "./../requests/graphql/UserRequests";

async function run() {
    try {
        // const diet: any = new DietGenerator().generateRandomDiet();
        // diet.id = "de5b2ba0-71ce-11ea-9daa-8b79823ef638"
        // console.log(await new FalcorDietRequests().updateDiet(diet));
        // console.log(await new FalcorDietRequests().getAllDiets())
        console.log(await new FalcorDietRequests().getDietById("de5b2ba0-71ce-11ea-9daa-8b79823ef638"));
        // console.log(await new FalcorDietRequests().getDietById("0883dc10-775b-11ea-bb1e-d79a29b02ff9"))

    } catch (err) {
        console.log(err);
        console.log(err?.response?.body);
    }
}

run();

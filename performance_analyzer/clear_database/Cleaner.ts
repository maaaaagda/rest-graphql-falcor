import { ICleaner } from "./ICleaner";
import { RESTRequestsBase } from "../requests/rest/RESTRequestsBase";
import got from "../requests/got";

export class Cleaner extends RESTRequestsBase implements ICleaner {
    public async clean(): Promise<void> {
        const options = {
            url: this.apiUrl + "utils/clear-database",
            method: "POST"
        };

        await got(options);            
    }
}

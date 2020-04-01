
export abstract class RESTRequestsBase {

    protected apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:5000/api/";
    }
}

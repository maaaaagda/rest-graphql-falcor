
export abstract class FalcorRequestsBase {

    protected apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:5002/model.json";
    }
}

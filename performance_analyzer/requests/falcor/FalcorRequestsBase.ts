
export abstract class FalcorRequestsBase {

    protected apiUrl: string;

    constructor() {
        this.apiUrl = "http://192.168.1.1:5002/model.json";
    }
}

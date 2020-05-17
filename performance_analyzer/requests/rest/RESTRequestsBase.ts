
export abstract class RESTRequestsBase {

    protected apiUrl: string;

    constructor() {
        this.apiUrl = "http://192.168.1.1:5000/api/";
    }
}

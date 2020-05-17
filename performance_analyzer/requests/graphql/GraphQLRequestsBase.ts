
export abstract class GraphQLRequestsBase {

    protected apiUrl: string;

    constructor() {
        this.apiUrl = "http://192.168.1.1:5001/api/";
    }
}

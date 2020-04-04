
export abstract class GraphQLRequestsBase {

    protected apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:5001/api/";
    }
}

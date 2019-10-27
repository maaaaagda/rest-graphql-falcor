export class SuccessResponse {
    public status: number;
    public message: any;

    constructor(status: number, message: any) {
        this.status = status;
        this.message = message;
    }

    static Ok(message: any = "Ok") {
        return new this(200, message)
    }
}

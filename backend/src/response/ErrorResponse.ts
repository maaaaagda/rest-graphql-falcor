export class ErrorResponse extends Error {
    public status: number;
    public message: string;

    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static NotFound(message = "Not found"): ErrorResponse {
        return new this(404, message)
    }

    static BadRequest(message = "Bad request"): ErrorResponse {
        return new this(400, message);
    }

    static Internal(message = "Internal server error"): ErrorResponse {
        return new this(500, message);
    }

    static Unauthorized(message = "Unauthorized"): ErrorResponse {
        return new this(403, message);
    }
};

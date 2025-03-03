export default class ApiResponse {
    constructor(statusCode, data, message = "success", redirect = null) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        this.redirect = redirect;
    }
}

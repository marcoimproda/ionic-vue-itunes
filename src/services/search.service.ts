import ApiService from "./api.service";

class ResponseError extends Error {
    errorCode: any;
    errorMessage: any;
    constructor(errorCode: any, message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
    }
}

const SearchService = {
    userSearch: async function(payload: any) {
        try {            
            const url = `https://itunes.apple.com/search?term=${payload}`;
                return ApiService.get(url);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
    userTrack: async function(id: any) {
        try {            
            const url = `https://itunes.apple.com/lookup?id=${id}`;
                return ApiService.get(url);
        } catch (error) {
            throw new ResponseError(
                error.status,
                error.error.message
            );
        }
    },
}

export { SearchService, ResponseError };
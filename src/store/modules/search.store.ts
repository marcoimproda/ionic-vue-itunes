import { SearchService, ResponseError } from "@/services/search.service";

const state = {
    responseData: "",
    responseErrorCode: 0,
    responseError: "",
    responseDataTrack: "",
    responseErrorCodeTrack: 0,
    responseErrorTrack: ""
};

const getters = {
    responseErrorCode: (state: { responseErrorCode: any }) => {
        return state.responseErrorCode;
    },
    responseError: (state: { responseError: any }) => {
        return state.responseError;
    },
    responseErrorCodeDistrict: (state: { responseErrorCodeDistrict: any }) => {
        return state.responseErrorCodeDistrict;
    },
    responseErrorDistrict: (state: { responseErrorDistrict: any }) => {
        return state.responseErrorDistrict;
    },
    music: (state: { responseData: any }) => {
        return state.responseData;
    },
    track: (state: { responseDataTrack: any }) => {
        return state.responseDataTrack;
    }
};

const actions = {
    async musicSearch(context: any, payload: any) {
        context.commit("dataRequest");
        try {
            const resp = await SearchService.userSearch(payload);
            context.commit("dataSuccess", resp.data);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataError", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    },
    async trackSearch(context: any, id: any) {
        context.commit("dataRequestTrack");
        try {
            console.log(id);
            const resp = await SearchService.userTrack(id);
            context.commit("dataSuccessTrack", resp.data);
            return resp;
        } catch (e) {
            if (e instanceof ResponseError) {
                context.commit("dataErrorTrack", {
                    errorMessage: e.errorMessage,
                    responseErrorCode: e.errorCode
                });
            }
            return e.message;
        }
    }
};

const mutations = {
    dataRequest(state: {
        responseError: string;
        responseErrorCode: number;
    }) {
        state.responseError = "";
        state.responseErrorCode = 0;
    },
    dataSuccess(state: { responseData: string }, payload: any) {
        state.responseData = payload;
    },
    dataError(state: {
        responseError: any;
        responseErrorCode: any;
        }, {errorCode, errorMessage}: any) {
        state.responseError = errorMessage;
        state.responseErrorCode = errorCode;
    },
    dataRequestTrack(state: {
        responseErrorTrack: string;
        responseErrorCodeTrack: number;
    }) {
        state.responseErrorTrack = "";
        state.responseErrorCodeTrack = 0;
    },
    dataSuccessTrack(state: { responseDataTrack: string }, payload: any) {
        state.responseDataTrack = payload;
    },
    dataErrorTrack(state: {
        responseErrorTrack: any;
        responseErrorCodeTrack: any;
        }, {errorCode, errorMessage}: any) {
        state.responseErrorTrack = errorMessage;
        state.responseErrorCodeTrack = errorCode;
    }
}

export const search = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
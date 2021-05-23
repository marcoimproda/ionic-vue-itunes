import { SearchService, ResponseError } from "@/services/search.service";

const state = {
    responseData: "",
    responseErrorCode: 0,
    responseError: ""
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
    }
}

export const search = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
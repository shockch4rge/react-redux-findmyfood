import { createAction, Middleware, PayloadAction } from "@reduxjs/toolkit";
import axios, { Method } from "axios";
import config from "../../config.json"

//#region types
export type ApiCall = {
    url: string;
    method: Method;
    data?: any;
    params?: any;
    onSuccess?: string;
    onError?: string;
};
// #endregion

export const apiCallBegan = createAction<ApiCall>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<string>("api/callFailed");

const endpointTester: Middleware<{}> = store => next => async (action: PayloadAction<ApiCall>) => {
    // pass this action to the next middleware available
    if (action.type !== apiCallBegan.type) return next(action);

    next(action);

    const { url, method, data, params, onSuccess, onError } = action.payload;

    try {
        const response = await axios.request({
            baseURL: config.api.baseUrl,
            url,
            method,
            params,
            data,
        });

        // General message for both success and error
        store.dispatch(apiCallSuccess(response.data));

        // Show a specified message if included
        if (onSuccess) {
            store.dispatch({ type: onSuccess, payload: response.data });
        }
    }
    catch (err) {
        const error = (err as Error).message;
        store.dispatch(apiCallFailed(error));

        if (onError) {
            store.dispatch({ type: onError, payload: error });
        }
    }
};

export default endpointTester

import {
    ActionCreatorWithPayload,
    createAction,
    Middleware,
    PayloadAction,
} from "@reduxjs/toolkit";
import axios, { Method } from "axios";
import { AppDispatch, AppState, Store } from "..";
import { ReviewData } from "../../models/Review";
import config from "../../../config.json";
import { Dispatch } from "react";

//#region action and types
export async function getApiReview() {
    const response = await axios.get("http://localhost:8080/review/review-id");
    return response.data as ReviewData;
}

export async function getRestaurantReviews() {
    const response = await axios.get("http://localhost:8080/restaurant/id");
}

export type ApiCall = {
    url: string;
    method?: Method;
    data?: any;
    onSuccess?: string;
    onError?: string;
};
// #endregion

export const apiCallBegan = createAction<ApiCall>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");

const api: Middleware<{}> = store => next => async (action: PayloadAction<ApiCall>) => {
    // pass this action to the next middleware available
    if (action.type !== apiCallBegan.type) return next(action);

    next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
        const response = await axios.request({
            baseURL: config.api.baseUrl,
            url,
            method,
            data,
        });

        // General message for both success and error
        store.dispatch(apiCallSuccess(response.data));

        // Show a specified message if included
        if (onSuccess) {
            store.dispatch({ type: onSuccess, payload: response.data });
        }
    } catch (err) {
        store.dispatch(apiCallFailed(err));

        if (onError) {
            store.dispatch({ type: onError, payload: err });
        }
    }
};

export default api;

import { createAction } from "@reduxjs/toolkit";

//#region testing
interface ExamplePayload {
    id: string,
    value: string
}

export const apiRequestBegan = createAction<ExamplePayload>("api/requestBegan");
export const apiRequestSuccess = createAction<unknown>("api/requestSuccess");
export const apiRequestFailed = createAction<string>("api/requestFailed");
// #endregion

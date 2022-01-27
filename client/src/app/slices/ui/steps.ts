import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../../models/User";

type StepKey = "profile" | "account" | "finish" | null;

type SetProfileStepPayload = Pick<
    UserData,
    "firstName" | "lastName" | "username" | "gender" | "avatarPath"
>;

type SetAccountStepPayload = Pick<UserData, "email" | "password" | "address" | "telephone">;

const steps = createSlice({
    name: "steps",

    initialState: {
        currentStep: null as StepKey,

        profile: {
            payload: {} as Pick<
                UserData,
                "firstName" | "lastName" | "username" | "gender" | "avatarPath"
            >,
        },

        account: {
            payload: {} as Pick<UserData, "email" | "password" | "address" | "telephone">,
        },
    },

    reducers: {
        setCurrentStep: (state, action: PayloadAction<StepKey>) => {
            state.currentStep = action.payload;
        },

        setProfileStepPayload: (state, action: PayloadAction<SetProfileStepPayload>) => {
            state.profile.payload = { ...action.payload };
        },

        setAccountStepPayload: (state, action: PayloadAction<SetAccountStepPayload>) => {
            state.account.payload = { ...action.payload };
        },
    },
});

export const { setCurrentStep, setProfileStepPayload, setAccountStepPayload } = steps.actions;
export default steps.reducer;

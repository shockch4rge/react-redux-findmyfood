import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../app";

/**
 * An enhanced selector configured for the app's state.
 * @param state The state.
 * @returns A non-unknown type inferred from the return type of the callback.
 */
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

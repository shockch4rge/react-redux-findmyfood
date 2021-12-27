import { useSelector } from "react-redux";
import { AppState } from "../store";

/**
 * An enhanced selector configured for the app's state.
 * @param state The state.
 * @returns A non-unknown type inferred from the return type of the callback.
 */
export const useAppSelector = <T = unknown>(state: (state: AppState, ...args: any[]) => T,): T => {
    return useSelector<AppState>(state) as T 
}
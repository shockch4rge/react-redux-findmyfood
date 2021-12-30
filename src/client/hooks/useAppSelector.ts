import { useSelector } from "react-redux";
import { AppState } from "../store/store";

/**
 * An enhanced selector configured for the app's state.
 * @param state The state.
 * @returns A non-unknown type inferred from the return type of the callback.
 */
export const useAppSelector = <T = unknown>(selector: (state: AppState) => T) =>
    useSelector<AppState>(selector) as T;

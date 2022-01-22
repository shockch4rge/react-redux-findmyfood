import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../app/store";

/**
 * An enhanced selector configured for the app's state.
 */
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

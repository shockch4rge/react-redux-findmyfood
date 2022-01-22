import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

/**
 * The useDispatch() hook configured with the app's dispatch type
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
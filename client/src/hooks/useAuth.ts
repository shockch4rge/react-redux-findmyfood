import store from "../store/index"

export const useAuth = () => {
    return store.getState().auth.loggedIn
}
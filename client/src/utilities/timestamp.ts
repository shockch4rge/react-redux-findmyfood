import moment from "moment"

export const timestamp = () => {
    return moment().format("YYYY-MM-DD")
}
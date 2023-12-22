import axios from "../axios";

export function CreateYearService(data) {
    return axios.post("/year", data, {
        withCredentials: true,
    });
}

export function GetAllYearService() {
    return axios.get("/year", {
        withCredentials: true,
    });
}

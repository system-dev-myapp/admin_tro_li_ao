import axios from "../axios";

export function createIntentsService(data) {
    return axios.post("/info", data, {
        withCredentials: true,
    });
}

export function getModelsService() {
    return axios.get("/model-wit", {
        withCredentials: true,
    });
}

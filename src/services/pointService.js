import axios from "../axios";

export function CreatePointService(data) {
    return axios.post("/point", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

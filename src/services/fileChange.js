import { baseUrl } from "./baseUrl";
import axios from "axios";




export const fileChange = (e) => {

    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    return axios.post(baseUrl + '/users/update-photo', uploadData)

}
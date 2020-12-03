import config from "../config";
import {httpRequest} from "../../sdk/http/request";

export const GetListUserQueryParameters = async ( userId,parameter,section,page,role,fullResponse = false) => {
    const options = {
        url: `${config.BASE_URL}/search/users/${userId}/?q=${parameter}&section=${section}&page=${page}&role=${role}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const GetListUserId = async ( userId,fullResponse = false) => {
    const options = {
        url: `${config.BASE_URL}/search/users/${userId}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};
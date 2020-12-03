import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export const PostCreateMessage = async (front_id,to_id,body, fullResponse = false) => {
    const options = {
        url: `${config.BASE_URL}/message/from/${front_id}/to/${to_id}`,
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    //console.log(options.url)
    return httpRequest(options);
};

export const GetReturnsListConversations = async (
    front_id,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/message/from/${front_id}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const GetListTotalUnreadMessages = async (
    from_id,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/message/from/${from_id}/unread`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const PatchResetCounter = async (
    from_id,
    to_id,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/message/from/${from_id}/to/${to_id}/reset-count`,
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const GetFilterMessage = async (
    front_id,
    filter,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/message/from/${front_id}/?filter=${filter}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const GetReturnsConversations = async (
    front_id,
    to_id,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/message/from/${front_id}/to/${to_id}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const PatchTotalMessagesNotSeen = async (
    from_id,
    to_id,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/message/from/${from_id}/to/${to_id}/reset-count`,
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

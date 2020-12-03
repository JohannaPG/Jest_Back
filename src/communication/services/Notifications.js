import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export const GetReturnsListCNotifications = async (
    userId,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/notifications/search/user/${userId}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};
// Para que se envie como nuevo anuncio uno programado
export const GetChangeStatusNotification = async (
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/notifications/cron/real-time`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const PatchSwitchToSeen= async (
    notificationId,
    fullResponse = false
) => {
    const options = {
        url: `${config.BASE_URL}/notifications/${notificationId}/to-seen`,
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};
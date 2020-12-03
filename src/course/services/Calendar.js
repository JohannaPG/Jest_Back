import config from "../config";
import {httpRequest} from "../../sdk/http/request";

//List of calendar by student o teacher in range of startAt and finishAt
export const GetCalendar = async ( authorId,startAt,finishAt,fullResponse = false) => {
    const options = {
        url: `${config.BASE_URL}/calendars/?authorId=${authorId}&startAt=${startAt}&finishAt=${finishAt}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};

export const GetPendingCalendar = async ( authorId,fullResponse = false) => {
    const options = {
        url: `${config.BASE_URL}/calendars/pending/?authorId=${authorId}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    return httpRequest(options);
};
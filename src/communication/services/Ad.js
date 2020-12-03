import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export const PostCreateBanner = async (body, fullResponse = false) => {
    const options = {
        url: `${config.BASE_URL}/ad/banners`,
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
   // console.log(options.url)
    return httpRequest(options);
};

export const PostCreateNews = async (body, fullResponse = false) => {
    const options = {
        url: `${config.BASE_URL}/ad/news`,
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json"
        },
        fullResponse
    };
    console.log(options.url)
    return httpRequest(options);
};
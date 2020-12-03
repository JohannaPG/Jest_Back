import Query from "../../sdk/db/postgress";
import config from "../config";

const makeBdConfig = () => {
    return {
        user: config.BD_USER,
        password: config.BD_PASSWORD,
        host: config.BD_HOST,
        database: config.BD_NAME
    };
};

export const SelectListBanner = async id_banner => {
    return Query(
        `select * from banner
        where id='${id_banner}'`,
        makeBdConfig()
    );
};

export const SelectListNews = async id_banner => {
    return Query(
        `select * from news
        where id='${id_banner}'`,
        makeBdConfig()
    );
};
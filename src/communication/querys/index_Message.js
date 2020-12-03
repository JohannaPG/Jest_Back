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

export const SelectListConversations = async id_from => {
    return Query(
        `select * from message
        where user_id_from='${id_from}' order by last_received_at desc limit 20`,
        makeBdConfig()
    );
};

export const SelectListUnreadMessages= async id_from => {
    return Query(
        `select  sum(count_unread) as total from message 
                where user_id_from= '${id_from}'`,
        makeBdConfig()
    );
};

export const SelectFilterUnread= async id_from => {
    return Query(
        `select * from message
 where user_id_from= '${id_from}' and message.count_unread >= 1
 order by last_received_at desc
 limit 20`,
        makeBdConfig()
    );
};

export const SelectFilterRead= async id_from => {
    return Query(
        `select * from message
 where user_id_from= '${id_from}' and message.count_unread =0
 order by last_received_at desc
 limit 20`,
        makeBdConfig()
    );
};
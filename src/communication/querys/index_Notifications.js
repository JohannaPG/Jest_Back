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

export const SelectNotifications = async user_id => {
    return Query(
        `select * from notification
        where user_id='${user_id}' and start_at<= current_timestamp order by start_at desc limit 20`,
        makeBdConfig()
    );
};

export const SelectNotificationsNotSeen = async => {
    return Query(
        `select * from notification where seen=false;`,
        makeBdConfig()
    );
};
export const SelectNotificationsSeen = async id_notification => {
    return Query(
        `select * from notification where id='${id_notification}';`,
        makeBdConfig()
    );
};
export const SelectLastNotification = async => {
    return Query(
        `select * from notification order by start_at desc;`,
        makeBdConfig()
    );
};

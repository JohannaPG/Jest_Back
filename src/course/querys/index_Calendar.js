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

export const SelectCalendar = async forumId => {
    return Query(
        `select  *
    from calendar where event_id = '${forumId}'`,
        makeBdConfig()
    );
};

export const SelectCalendarDate = async (author_id,start_at,finish_at) => {
    return Query(
        `Select * from calendar  where
        author_id='${author_id}'
        and start_at<=current_timestamp
        and (
            start_at between '${start_at}' and '${finish_at}'
            or finish_at between '${start_at}' and '${finish_at}'
        ) and start_at<=current_timestamp`,
        makeBdConfig()
    );
};

export const SelectPendingCalendar = async (author_id) => {
    return Query(
        `select * from calendar where author_id='${author_id}'
and start_at<=current_timestamp
and status='CREATED'
and (finish_at between current_timestamp and (current_timestamp+ CAST('2 days' AS INTERVAL)))`,
        makeBdConfig()
    );
};
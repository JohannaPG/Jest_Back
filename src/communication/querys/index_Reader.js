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

export const SelectAnnouncementReader = async id_alumno => {
  return Query(
    `select * from announcement_reader where announcement_publish_at < current_timestamp
    and reader_id='${id_alumno}'
    and status='created'
    order by announcement_publish_at desc limit 20`,
    makeBdConfig()
  );
};
export const SelectTotAnnouNotSeen = async id_alumno => {
  return Query(
    `select COUNT (*) as total from announcement_reader where reader_id='${id_alumno}' and seen=false`,
    makeBdConfig()
  );
};
export const SelectAnnouNotSeen = async () => {
  return Query(
    "select id,reader_id,seen,announcement_id from announcement_reader where seen=false ORDER BY updated desc",
    makeBdConfig()
  );
};

export const SelectAnnouNotSeenIdDifferent = async id_alumno => {
  return Query(
    `select id,reader_id,seen,announcement_id from announcement_reader where seen=false and reader_id <> '${id_alumno}' ORDER BY updated desc`,
    makeBdConfig()
  );
};

export const SelectAnnouSeen = async announcementReaderId => {
  return Query(
    `select id,reader_id,seen from announcement_reader where id='${announcementReaderId}' and seen=true`,
    makeBdConfig()
  );
};

export const SelectAdSearch = async titulo => {
  return Query(
    `select * from announcement_reader where
      announcement_publish_at< current_timestamp and
      reader_id='94d088b4-7d96-5e3c-8e3d-65faf67d36d0' and
      status='created'  and
      (announcement_title like '%${titulo}%')
    order by announcement_publish_at desc
    limit 20`,
    makeBdConfig()
  );
};

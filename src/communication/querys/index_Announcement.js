import config from "../config";
import Query from "../../sdk/db/postgress";

const makeBdConfig = () => {
  return {
    user: config.BD_USER,
    password: config.BD_PASSWORD,
    host: config.BD_HOST,
    database: config.BD_NAME
  };
};
export const SelectAnnouncement = async (id_anuncio) => {
  return Query(
      `select * from announcement WHERE id='${id_anuncio}'`,
    makeBdConfig()
  );
};

export const SelectAnnouNotSeen = async () => {
  return Query(
      `select id,reader_id,seen,announcement_id from announcement_reader where seen=false ORDER BY updated desc`,
    makeBdConfig()
  );
};

export const SelectIdAnnou = async () => {
  return Query(
      `select * from announcement a where a.status='created' and course_id<>'' order by publish_at ASC`,
    makeBdConfig()
  );
};
export const SelectAnnouCancel = async announcementId => {
  return Query(
    `select * from announcement  where id='${announcementId}'`,
    makeBdConfig()
  );
};

export const SelectAnnouPublish = async () => {
  return Query(
      `select * from announcement where status='created' and publish_at < current_timestamp order by  publish_at DESC`,
    makeBdConfig()
  );
};
export const SelectAnnouPublishAuthor = async authorId => {
  return Query(
    `select * from announcement where status='created' and publish_at < current_timestamp and author_id='${authorId}' order by  publish_at DESC FETCH FIRST 20 ROWS ONLY`,
    makeBdConfig()
  );
};

export const SelectAnnouScheduled = async () => {
  return Query(
      `select * from announcement where status='created' and publish_at > current_timestamp order by  publish_at DESC`,
    makeBdConfig()
  );
};
export const SelectAnnouScheduledAuthor = async authorId => {
  return Query(
    `select * from announcement where status='created' and publish_at > current_timestamp and author_id='${authorId}' order by  publish_at DESC FETCH FIRST 20 ROWS ONLY`,
    makeBdConfig()
  );
};

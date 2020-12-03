import Query from "../../sdk/db/postgress";
import config from "../../course/config";

const makeBdConfig = () => {
  return {
    user: config.BD_USER,
    password: config.BD_PASSWORD,
    host: config.BD_HOST,
    database: config.BD_NAME
  };
};
export const SelectForumId = async forum_id => {
  return Query(`select * from forum where id='${forum_id}'`, makeBdConfig());
};
export const SelectForumIdSave = async (author_id) => {
  return Query(
    `Select * from forum where status='SAVED' and author_id='${author_id}' order by  publish_at DESC`,
    makeBdConfig()
  );
};

export const SelectForumSaved = async (
  status,
  authorId,
  courseId,
  sectionId
) => {
  return Query(
    `select * from forum where status='${status}' and author_id='${authorId}' and
                          course_id='${courseId}' and  str_section_ids like '%${sectionId}%'
order by  publish_at DESC limit 20`,
    makeBdConfig()
  );
};

export const SelectForumPUBLISHED = async (
  status,
  authorId,
  courseId,
  sectionId
) => {
  return Query(
    `select * from forum where status='${status}' and author_id='${authorId}' and
                          course_id='${courseId}'  and publish_at < current_timestamp and  str_section_ids like '%${sectionId}%'
order by  publish_at DESC limit 20`,
    makeBdConfig()
  );
};

export const SelectForumPROGRAMMED = async (authorId, courseId, sectionId) => {
  return Query(
    `select * from forum where   author_id='${authorId}' and
                          course_id='${courseId}'  and publish_at > current_timestamp and  str_section_ids like '%${sectionId}%'
order by  publish_at DESC limit 20`,
    makeBdConfig()
  );
};

export const SelectForumStudent = async (authorId, courseId) => {
  return Query(
    `select * from forum_reader fr cross
    join forum f where
        fr.forum_id=f.id
        and fr.user_id='${authorId}' 
        and fr.forum_course_id='${courseId}' 
        and f.status= 'PUBLISHED'
        and f.publish_at< current_timestamp
    order by f.publish_at desc limit 20;`,
    makeBdConfig()
  );
};

export const SelectForumNotSeen = async () => {
  return Query(
      "select * from forum_reader where seen=false ORDER BY updated DESC",
      makeBdConfig()
  );
};

export const SelectForumSeen = async forumReaderId => {
  return Query(
      `select * from forum_reader where id='${forumReaderId}' and seen=true`,
      makeBdConfig()
  );
};

export const SelectForoNotSeenIdDifferent = async id_alumno => {
  return Query(
      `select * from forum_reader where seen=false and user_id <> '${id_alumno}' ORDER BY updated desc`,
      makeBdConfig()
  );
};
export const SelectForumComment= async id => {
  return Query(
      `select * from forum_comment where id='${id}'`,
      makeBdConfig()
  );
};

export const SelectForumIdCurrent = async (publish_before,status,sectionId,course_id) => {
  return Query(
      `select * from forum where finish_at>current_timestamp and publish_before='${publish_before}' and status='${status}' 
        and section_ids='["${sectionId}"]' and course_id='${course_id}'`,
      makeBdConfig()
  );
};

export const SelectForumFilterCount= async (title,course_id,sectionId) => {
  return Query(
      `select COUNT(*) as total from forum where title like '%${title}%' and course_id='${course_id}'
        and section_ids='["${sectionId}"]' and publish_before=false`,
      makeBdConfig()
  );
};

export const SelectForumStr_section_ids = async (sectionId) => {
  return Query(
      `select * from forum where  str_section_ids like '%${sectionId}%'`,
      makeBdConfig()
  );
};
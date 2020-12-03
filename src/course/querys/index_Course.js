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
export const SelectCourseByCourseId = async courseId => {
  return Query(
    `select  course_id, name , code, content_types, description, introduction, language, level,created, updated
    from course where course_id = '${courseId}'`,
    makeBdConfig()
  );
};

export const SelectCourseByCourseCode = async codeCourse => {
  return Query(
    `select  course_id, name , code, content_types, description, introduction, language, level,created, updated
    from course where code = '${codeCourse}'`,
    makeBdConfig()
  );
};

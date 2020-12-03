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
export const SelectSectionEvaluation = async idteacher => {
  return Query(
    `select s.section_id,section_code,course_id,teacher_id,campus,program,modality,period,classroom,turn,module,capacity,start,"end",active,se.evaluation_id,se.evaluation_type,se.student_limit_time,se.feedback_limit_time,se.question_types from section s inner join section_evaluation se on s.section_id = se.section_id WHERE s.teacher_id='${idteacher}'`,
    makeBdConfig()
  );
};
export const SelectEnrollment = async (idsection, idcourse) => {
  return Query(
    `Select *  from enrollment where section_id='${idsection}' and course_id='${idcourse}'`,
    makeBdConfig()
  );
};

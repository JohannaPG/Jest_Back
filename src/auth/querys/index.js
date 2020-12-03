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

export const SelectAuthByUserId = async id => {
  return Query(`SELECT * FROM auth where user_id= '${id}'`, makeBdConfig());
};

export const SelectAuthByLogin = async id => {
  return Query(`SELECT * FROM auth where user_id= '${id}'`, makeBdConfig());
};

export const Selectprofile = async user_id => {
  return Query(
    `SELECT * FROM profile where user_id= '${user_id}'`,
    makeBdConfig()
  );
};

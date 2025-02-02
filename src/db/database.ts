import knex from "knex";
import config from "../../knexfile";
import dotenv from "dotenv";

dotenv.config();
const environment = process.env.ENVIRONMENT || "development";

const db = knex(config[environment]);

export default db;
import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });

export const {
  PORT,
  PROTO,
  DB_HOST,
  DB_TYPE,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

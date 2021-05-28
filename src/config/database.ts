import { ConnectionOptions } from "typeorm";
import {User} from '../models'

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgis",
  password: process.env.POSTGRES_PASSWORD || "postgis",
  database: process.env.POSTGRES_DB || "gis",
  entities: [User],
  synchronize: true,
};

export default config;
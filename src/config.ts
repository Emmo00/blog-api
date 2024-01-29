import { Config } from './types';
import 'dotenv/config';

const config: Config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  secret: process.env.SECRET,
} as any as Config;

export default config;

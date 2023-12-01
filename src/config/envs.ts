import 'dotenv/config';
import { get } from 'env-var';


/**
 * Configuration object for environment variables.
 */
export const envs = {

  /**
   * The port number for the server.
   */
  PORT: get('PORT').required().asPortNumber(),

  /**
   * The base URL for the application.
   */
  BASE_URL: get('BASE_URL').required().asString(),

  /**
   * The name of the database.
   */
  DB_NAME: get('DB_NAME').required().asString(),

  JWT_SECRET : get('JWT_SECRET').required().asString(),

 

}




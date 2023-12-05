import 'dotenv/config';
import { get } from 'env-var';


/**
 * Configuration object for environment variables.
 */
/**
 * Configuration options for the application environment.
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

  /**
   * The secret key for JSON Web Token (JWT) encryption.
   */
  JWT_SECRET: get('JWT_SECRET').required().asString(),

  /**
   * The URL for logging in with Google.
   */
  GOOGLECLIENTE: get('GOOGLECLIENTE').required().asString(),
  
  /**
   * The secret key for Google API authentication.
   */
  GOOGLESECRECT: get('GOOGLESECRECT').required().asString(),

}




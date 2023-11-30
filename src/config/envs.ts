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

  /**
   * The mailer service to be used.
   */
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),

  /**
   * The email address for the mailer.
   */
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),

  /**
   * The secret key for the mailer.
   */
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),

  /**
   * The host for the mailer.
   */
  MAILER_HOST: get('MAILER_HOST').required().asString(),

  /**
   * Flag indicating whether to send emails or not.
   * Default value is false.
   */
  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool()

}




import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { envs } from './envs';

export class GoogleAuthenticator {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(envs.GOOGLECLIENTE);
  }

  public async verifyCredencial(token: string = ''): Promise<{ nombre: string; correo: string }> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLECLIENTE,
      });

      const { name, email } = ticket.getPayload() as TokenPayload;

      return {
        nombre: name ?? '',
        correo: email ?? '',

      };
    } catch (error) {
      throw new Error(`Error al verificar el token de Google: ${error}`);
    }
  }
}


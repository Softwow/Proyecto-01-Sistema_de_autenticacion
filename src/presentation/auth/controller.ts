import { Response, Request } from "express";
import { CustomError } from "../../domain/error/custom.error";
import { jwtAdapter } from "../../config/jwt.adapter";
import {GoogleAuthenticator} from "../../config/google.adaptert";
import { UserModel } from "../../data/mongo/models/user-model";




export  class authGoogleController{

    registerUserGoogle = async (req: Request, res: Response) => {
        
        const { id_token } = req.body;
        const credencialGoogle = new GoogleAuthenticator();
    
        try {
          const { nombre, correo } = await credencialGoogle.verifyCredencial(id_token)
    
          // Buscar usuario en la base de datos
          let usuario = await UserModel.findOne({ correo: correo });
    
          // Validar si el usuario existe
          if (!usuario) {
            // Si no existe, crear el usuario con los datos de Google
            const data = {
              nombre,
              correo,
              password: ':P',
              
              
            };
    
            // Guardar en la base de datos
            usuario = new UserModel(data);
            await usuario.save();
            console.log(usuario);
          }
    
    
          // Generar el JWT
          const token = await  jwtAdapter.generateToken(usuario.id);
          res.json({
            msg: 'Login exitoso',
            usuario,
            token,
          });
        } catch (err) {
          res.status(400).json({
            msg: 'Token de Google no válido',
            err,
          });
        }
      };

}
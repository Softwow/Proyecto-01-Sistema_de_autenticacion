import { Response, Request } from "express";
import { AuthService } from "../services/auth.service";
import { RegisteruserDto } from "../../domain/dtos/users/register-user-dto";
import { LoginuserDto } from "../../domain/dtos/users/login-user-dto";
import { CustomError } from "../../domain/error/custom.error";
import { jwtAdapter } from "../../config/jwt.adapter";
import {GoogleAuthenticator} from "../../config/google.adaptert";
import { UserModel } from "../../data/mongo/models/user-model";




export class AuthController {
    constructor(
        public readonly authService: AuthService
    ) { }
    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return res.status(500).json({ error: "Error interno" })

    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerDto] = RegisteruserDto.create(req.body)
        if (error) return res.status(400).json(error)


        this.authService.registerUser(registerDto!).then((user) => {
            res.status(200).json(user)
        }).catch((error) => {
            this.handleError(error, res)
        }
        )
    }
    loginUser = (req: Request, res: Response) => {
        const [error, loginDto] = LoginuserDto.create(req.body)
        if (error) return res.status(400).json(error)

        this.authService.loginUser(loginDto!)
            .then((user) => res.json(user))
            .catch((error) => { this.handleError(error, res) })



    }

    registerUserGoogle = async (req: Request, res: Response) => {
        
            const { id_token } = req.body;
            const credencialGoogle = new GoogleAuthenticator();
        
            try {
              const { nombre, correo } = await credencialGoogle.verifyCredencial(id_token)
        
              // Buscar usuario en la base de datos
              let usuario = await UserModel.findOne({ correo });
        
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
      };


 
    
      
    
   


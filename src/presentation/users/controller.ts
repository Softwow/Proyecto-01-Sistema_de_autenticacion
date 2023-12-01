import { Response, Request } from "express";
import { AuthService } from "../services/auth.service";
import { RegisteruserDto } from "../../domain/dtos/users/register-user-dto";
import { LoginuserDto } from "../../domain/dtos/users/login-user-dto";
import { CustomError } from "../../domain/error/custom.error";




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
   

}
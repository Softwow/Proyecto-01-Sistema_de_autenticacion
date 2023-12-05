import { jwtAdapter } from "../../config/jwt.adapter";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { RegisteruserDto } from "../../domain/dtos/users/register-user-dto";
import { UserModel } from "../../data/mongo/models/user-model";
import { UserEntity } from "../../domain/entities/user.entity";
import { LoginuserDto } from "../../domain/dtos/users/login-user-dto";
import { CustomError } from "../../domain/error/custom.error";
/**
 * Clase que representa el servicio de autenticación.
 */
export class AuthService {
 
  constructor() {}
   

  public async registerUser(registeruserDto: RegisteruserDto) {
    const existeUser = await UserModel.findOne({
      correo: registeruserDto.correo,
    });
    if(existeUser)  throw CustomError.badRequest("El usuario ya existe",)

    try {
      const user = await UserModel.create(registeruserDto);
      user.password = bcryptAdapter.hash(registeruserDto.password);

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await jwtAdapter.generateToken({
        id: user.id,
        correo: user.correo,
      });
      if (!token) throw CustomError.internalServerError("Error al generar el token")

      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      console.log(error);
      throw CustomError.badRequest(`${error}`)

    }
  }

  public async loginUser(loginuserDto: LoginuserDto) {
    const user = await UserModel.findOne({ correo: loginuserDto.correo });
    if (!user)   throw CustomError.badRequest("El usuario no existe")

    const passwordValid = bcryptAdapter.compare(
      loginuserDto.password,
      user.password
    );
    if (!passwordValid) throw CustomError.badRequest("Contraseña incorrecta")

    const { password, ...userEntity } = UserEntity.fromObject(user);
    const token = await jwtAdapter.generateToken({
      id: user.id,
      correo: user.correo,
    });
    if (!token) throw CustomError.internalServerError("Error al generar el token")

    return {
      user: userEntity,
      token: token,
    };
  }

  public async registerGoogle(registerUserDto: RegisteruserDto) {
    const existeUser = await UserModel.findOne({ correo: registerUserDto.correo });
    if (existeUser) throw CustomError.badRequest("El usuario ya existe");

    try {
      const user = await UserModel.create(registerUserDto);
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await jwtAdapter.generateToken({
        id: user.id,
        correo: user.correo,
      });
      if (!token) throw CustomError.internalServerError("Error al generar el token");

      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw CustomError.badRequest(`${error}`);
    }
  }
}

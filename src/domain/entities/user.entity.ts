// modelo de datos para el usuario del modelo para la base de datos


export class UserEntity {
  constructor(
    public id: string,
    public nombre: string,
    public  correo: string,   
    public password: string,
    public role: string,
  
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, nombre, correo, password, role } = object;

    if (!id && !_id) throw Error("Id is required");
    if (!nombre) throw Error("Name is required");
    if (!correo) throw Error("Email is required");

    if (!password) throw Error("Password is required");
    if (!role) throw Error("Role is required");

    return new UserEntity(
      id || _id,
      nombre,
      correo,
      password,
      role
    );
  }
}

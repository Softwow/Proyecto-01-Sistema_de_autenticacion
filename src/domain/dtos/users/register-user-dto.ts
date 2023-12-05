import { regularExps } from "../../../config/regular";

export class RegisteruserDto{

    private constructor(
        public nombre: string,
        public correo: string,
        public password: string,
       
    ) {}

    static create(object:{[key:string]:any}): [string?, RegisteruserDto?]{
        const { nombre, correo, password } = object;
        if (!nombre) return ['nombre is required',undefined];
        if (!correo) return ['correo is required',undefined];
        if (!regularExps.correo.test(correo)) return ['correo is invalid',undefined];
        if (!password) return ['password is required',undefined];
        return [undefined, new RegisteruserDto(nombre,correo,password)]
    }
}
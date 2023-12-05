import { regularExps } from "../../../config/regular";

export class LoginuserDto{

    private constructor(
        public correo: string,
        public password: string,
       
    ) {}

    static create(object:{[key:string]:any}): [string?, LoginuserDto?]{
        const {  correo, password } = object;
       
        if (!correo) return ['correo is required',undefined];
        if (!regularExps.correo.test(correo)) return ['correo is invalid',undefined];
        if (!password) return ['password is required',undefined];
        return [undefined, new LoginuserDto(correo,password)]
    }
}
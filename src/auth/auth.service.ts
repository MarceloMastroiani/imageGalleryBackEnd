import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    //Instanciamos los servicios
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //Validacion
  async validateUser(email: string, pass: string): Promise<any> {
    //Buscamos el usuario
    const user = await this.userService.findOneByEmail(email);
    //Validamos el usuario
    if (user && user.password === pass) {
      //Decestructuramos el usuario, separando el password y guardando el resto en result
      const { password, ...result } = user;
      return result;
    }
    //Si no es valido, devolvemos null
    return null;
  }

  //aca se obtiene el payload y lo mandamos a la funcion sign del jwtService para obtener el token
  async login(user: any) {
    const payload = { email: user._doc.email, sub: user._doc._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

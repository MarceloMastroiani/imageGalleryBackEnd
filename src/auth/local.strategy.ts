import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    //Esto es para que el passport sepa que el campo de email es el email del usuario.(por defecto es username)
    super({ usernameField: 'email' });
  }

  //Validamos el usuario y su contraseña que nos llego del cliente y lo mandamos a la funcion validaUser del AuthService
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    //Si el usuario existe, devolvemos el usuario
    return user;
  }
}

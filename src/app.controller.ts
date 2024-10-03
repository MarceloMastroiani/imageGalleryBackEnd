import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  //le llega el email y la contraseña mandandolos a la strategia local
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  //aca mandamos el usuario obtenido a la funcion login del AuthService
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //le llega el token y lo validamos
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

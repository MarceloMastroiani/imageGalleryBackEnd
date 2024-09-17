import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../utils/config.hash';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    const user = await this.userService.findOneByName(name);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No se encontro el usuario',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      //Hasheamos la contraseña
      createUserDto.password = hashPassword(createUserDto.password);
      //Se lo mandamos a la clase de servicio para crear el usuario
      return await this.userService.create(createUserDto);
    } catch (error) {
      return { status: 'error', error };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      //Hasheamos la contraseña
      //Si se cambia la contraseña, se debe hacer hash
      if (updateUserDto.password) {
        updateUserDto.password = hashPassword(updateUserDto.password);
      }
      //Se lo mandamos a la clase de servicio para actualizar el usuario
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      return { status: 'error', error };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Busca todos los usuarios
  async findAll() {
    return this.userModel.find();
  }

  //Busca un usuario por nombre
  async findOneByName(name: string) {
    return this.userModel.findOne({ name });
  }

  //Busca un usuario por id
  async findOne(id: number) {
    return this.userModel.findById(id);
  }

  //Crea un nuevo usuario
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return newUser.save();
    } catch (error) {
      return { status: 'error', error };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    return updatedUser;
  }

  async remove(id: number) {
    try {
      const userRemoved = await this.userModel.findByIdAndDelete(id);
      return userRemoved;
    } catch (error) {
      return { status: 'error', error };
    }
  }
}

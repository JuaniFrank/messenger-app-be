import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { ValidateIdDto } from './dto/validate-id.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {

    const emailExists = await this.userModel.findOne({ email: createUserDto.email })

    if (emailExists) throw new ConflictException('Email already exists')

    const user = new this.userModel({...createUserDto, createdAt: new Date()})

    try {
      await user.save()
    } catch (error) {
      return error
    }
    return user
  }

  findAll() {
    return this.userModel.find()
  }

  async update(id: string, updateUserDto: CreateUserDto) {

    const user = await this.userModel.findById(id)

    try {
      user.set(updateUserDto)
      await user.save()
      return user
    } catch (error) {
      return error
    }

  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)

    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async delete(id: string) {
    console.log(id)
    return await this.userModel.findByIdAndDelete(id)

  }
}

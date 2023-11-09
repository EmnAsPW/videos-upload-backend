import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      _id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<UserDocument> {
    const newUser = await this.userModel.create({
      username,
      email,
      password,
      confirmPassword,
    });
    //const res = await newUser.save();
    //console.log(newUser);
    return newUser.save();
  }
}

//  ): Promise<User> {
//     const newUser = await this.userModel.create({
//       username,
//       email,
//       password,
//       confirmPassword,
//     });
//     //const res = await newUser.save();
//     //console.log(newUser);
//     return newUser;
//   }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './entities/user.entity';
import { updateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  // updateuser: any;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      _id: user.id,
      username: user.username,
      email: user.email,
      // password: user.password,
      // confirmPassword: user.confirmPassword,
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
    // Address: string,
    // Age: string,
    // Bio: string,
    // image: string,
  ): Promise<UserDocument> {
    const newUser = await this.userModel.create({
      username,
      email,
      password,
      confirmPassword,
      // Address,
      // Age,
      // Bio,
      // image,
    });
    //const res = await newUser.save();
    //console.log(newUser);
    return newUser.save();
  }

  async updateuser(
    _id: string,
    data: UpdateQuery<UserDocument> | updateUserInput,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(_id, data, { new: true });
  }

  async deleteUser(_id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(_id);
  }

  async deleteOneUserInfo(
    _id: string,
    fieldToDelete: string,
  ) {
    try {
      const user = await this.userModel.findById(_id).exec();

      if (!user) {
        return 'User Not Found';
      }

      if (user[fieldToDelete] !== undefined) {
        const updateQuery = { $unset: { [fieldToDelete]: 1 } };

        await this.userModel
          .findByIdAndUpdate(_id, updateQuery, { new: true })
          .exec();
        return `Successfully deleted ${fieldToDelete} from user`;
      } else {
        return `${fieldToDelete} not found in user`;
      }
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  async updateOneUserInfo(
    _id: string,
    fieldToUpdate: string,
    newValue: string,
  ) {
    try {
      const video = await this.userModel.findById(_id).exec();
  
      if (!video) {
        return 'User Not Found';
      }
  
      if (video[fieldToUpdate] !== undefined) {
        const updateQuery = { [fieldToUpdate]: newValue };
  
        const updatedUser = await this.userModel
          .findByIdAndUpdate(_id, updateQuery, { new: true })
          .exec();
  
        return `Successfully updated ${fieldToUpdate} in User. New value: ${updatedUser[fieldToUpdate]}`;
      } else {
        return `${fieldToUpdate} not found in User`;
      }
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }
}

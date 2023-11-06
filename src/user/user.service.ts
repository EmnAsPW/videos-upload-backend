import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { Model, UpdateQuery } from 'mongoose';
import { join, normalize } from 'path';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, age, title, image } = createUserInput;
    //console.log(image);
    const { filename, mimetype, encoding, createReadStream } = await image;
    //console.log(filename, mimetype, encoding, createReadStream);

    const ReadStream = createReadStream();
    console.log(__dirname);
    const newFilename = `${Date.now()}-${filename}`;
    let savePath = join(__dirname, '..', '..', 'upload', newFilename);
    console.log(savePath);
    const writeStream = await createWriteStream(savePath);
    await ReadStream.pipe(writeStream);
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    savePath = `${baseUrl}${port}\\${newFilename}`;
    return await this.userModel.create({ name, age, title, image: savePath });
  }

  async findAllUser(): Promise<User[]> {
    return await this.userModel.find({});
  }

  async findUser(data: string): Promise<User[]> {
    return await this.userModel
      .find({ $text: { $search: data } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } });
  }
  async updateUser(
    _id: string,
    data: UpdateQuery<UserDocument> | UpdateUserInput,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(_id, data, { new: true });
  }

  async deleteUser(_id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(_id);
  }
}

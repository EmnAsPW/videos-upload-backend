import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { Model, UpdateQuery } from 'mongoose';
import { join, normalize } from 'path';
import { Profile, ProfileDocument } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private userModel: Model<ProfileDocument>,
  ) {}
  async createProfile(
    createProfileInput: CreateProfileInput,
  ): Promise<Profile> {
    const { First_Name, Last_Name, Address, Age, Bio, image } =
      createProfileInput;
    //console.log(image);
    const { filename, mimetype, encoding, createReadStream } = await image;
    //console.log(filename, mimetype, encoding, createReadStream);

    // console.log('....................', mimetype);

    if (
      mimetype !== 'image/jpg' &&
      mimetype !== 'image/PNG' &&
      mimetype !== 'image/JPEG' &&
      mimetype !== 'application/octet-stream'
    ) {
      throw new Error('Only jpg & PNG video files are allowed.');
    }
    const ReadStream = createReadStream();
    //console.log(__dirname);
    const newFilename = `${Date.now()}-${filename}`;
    let savePath = join(__dirname, '..', '..', 'upload', newFilename);
    console.log(savePath);
    const writeStream = await createWriteStream(savePath);
    await ReadStream.pipe(writeStream);
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    savePath = `${baseUrl}${port}\\${newFilename}`;
    return await this.userModel.create({
      First_Name,
      Last_Name,
      Address,
      Age,
      Bio,
      image: savePath,
    });
  }

  async findAllProfile(): Promise<Profile[]> {
    return await this.userModel.find({});
  }

  async findProfile(data: string): Promise<Profile[]> {
    return await this.userModel
      .find({ $text: { $search: data } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } });
  }
  async updateProfile(
    _id: string,
    data: UpdateQuery<ProfileDocument> | UpdateProfileInput,
  ): Promise<Profile> {
    return await this.userModel.findByIdAndUpdate(_id, data, { new: true });
  }

  async deleteProfile(_id: string): Promise<Profile> {
    return await this.userModel.findByIdAndDelete(_id);
  }
}

//  async deleteProfile(_id: string, image: string): Promise<Profile> {
//     return await this.userModel.findByIdAndDelete(_id, image);
//   }

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserDocument } from './entities/user.entity';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import { updateUserInput } from './dto/update-user.input';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDetails)
  //@UseGuards(JwtGuard)
  async getUser(@Args('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
  @Mutation(() => User, { name: 'updateUser' })
  //@UseGuards(JwtGuard)
  async updateUser(
    @Args('_id') _id: string,
    @Args('updateUserInput') updateUserInput: updateUserInput,
  ): Promise<User> {
    const {
      Username,
      email,
      password,
      confirmPassword,
      Address,
      Age,
      Bio,
      image,
    } = updateUserInput;
    //console.log(image);
    const { filename, mimetype, encoding, createReadStream } = await image;
    //console.log(filename, mimetype, encoding, createReadStream);

    // const validImageTypes = [
    //   'image/jpg',
    //   'image/png',
    //   'image/jpeg',
    //   'application/octet-stream',
    // ];
    // if (!validImageTypes.includes(image.mimetype.toLowerCase())) {
    //   throw new Error('Only jpg, PNG, and JPEG image files are allowed.');
    // }

    if (
      mimetype !== 'image/jpg' &&
      mimetype !== 'image/PNG' &&
      mimetype !== 'image/JPEG' &&
      mimetype !== 'application/octet-stream'
    ) {
      throw new Error('Only jpg & PNG video files are allowed.');
    }

    const ReadStream = createReadStream();
    // console.log(__dirname);
    const newFilename = `${Date.now()}-${filename}`;
    let savePath = join(__dirname, '..', '..', 'upload', newFilename);
    console.log(savePath);
    const writeStream = await createWriteStream(savePath);
    await ReadStream.pipe(writeStream);
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    savePath = `${baseUrl}${port}\\${newFilename}`;
    return await this.userService.updateuser(_id, {
      Username,
      email,
      password,
      confirmPassword,
      Address,
      Age,
      Bio,
      image: savePath,
    });
  }

  @Mutation(() => User, { name: 'deleteUser' })
  //@UseGuards(JwtGuard)
  async deleteUser(@Args('_id') _id: string): Promise<User> {
    return await this.userService.deleteUser(_id);
  }

  @Mutation(() => String, { name: 'deleteOneUserInfo' })
  //@UseGuards(JwtGuard)
  async deleteOneField(
    @Args('userId', { type: () => String }) _id: string,
    @Args('fieldToDelete') fieldToDelete: string,
  ) {
    try {
      const result = await this.userService.deleteOneUserInfo(_id, fieldToDelete);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete field');
    }
  }

  
  @Mutation(() => String, { name: 'updateOneUserInfo' })
  //@UseGuards(JwtGuard)
  async updateOneField(
  @Args('userId', { type: () => String }) _id: string,
  @Args('fieldToUpdate') fieldToUpdate: string,
  @Args('newValue') newValue: string,
) {
  try {
    const result = await this.userService.updateOneUserInfo(_id, fieldToUpdate, newValue);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update field');
  }
}
}

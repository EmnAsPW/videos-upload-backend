import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { join, normalize } from 'path';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAllUser() {
    return this.userService.findAllUser();
  }

  @Query(() => [User])
  async usersbyname(@Args('data') data: string): Promise<User[]> {
    return await this.userService.findUser(data);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('_id') _id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const { name, age, title, image } = updateUserInput;
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
    return await this.userService.updateUser(_id, {
      name,
      age,
      title,
      image: savePath,
    });
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(@Args('_id') _id: string): Promise<User> {
    return await this.userService.deleteUser(_id);
  }
  @Mutation(() => Boolean, { name: 'uplodaFile' })
  async upload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    const { filename, mimetype, encoding, createReadStream } = file;

    const readStream = createReadStream();
    console.log(__dirname);
    const savePath = normalize(
      `${__dirname}/../../upload/${Date.now()}-${filename}`,
    );
    const writeStream = createWriteStream(savePath);

    readStream.pipe(writeStream);

    return true;
  }
}

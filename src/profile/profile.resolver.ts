import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { join, normalize } from 'path';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CreateProfileInput } from './dto/create-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('createProfile') createProfileInput: CreateProfileInput,
  ) {
    return await this.profileService.createProfile(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  findAllProfile() {
    return this.profileService.findAllProfile();
  }

  @Query(() => [Profile])
  async profilebyname(@Args('data') data: string): Promise<Profile[]> {
    return await this.profileService.findProfile(data);
  }

  @Mutation(() => Profile, { name: 'updateProfile' })
  async updateProfile(
    @Args('_id') _id: string,
    @Args('updateprofileInput') updateprofileInput: UpdateProfileInput,
  ): Promise<Profile> {
    const { name, age, Bio, image } = updateprofileInput;
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
    return await this.profileService.updateProfile(_id, {
      name,
      age,
      Bio,
      image: savePath,
    });
  }

  @Mutation(() => Profile, { name: 'deleteProfile' })
  async deleteUser(@Args('_id') _id: string): Promise<Profile> {
    return await this.profileService.deleteProfile(_id);
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

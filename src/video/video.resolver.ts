import { FileUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.input';
import { Video } from './video.schema';
import { join, normalize } from 'path';
import path from 'path';
import * as fs from 'fs';
import { updateVideoDto } from './dto/update-video.input';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Query(() => [Video], { name: 'videos' })
  async getAllvideos() {
    return this.videoService.findAllVideos();
  }

  @Query(() => [Video])
  async getvideobytitle(@Args('data') data: string): Promise<Video[]> {
    return this.videoService.findVideo(data);
  }

  @Mutation(() => Video)
  async createVideo(@Args('createVideoDto') createVideoDto: CreateVideoDto) {
    return await this.videoService.createVideo(createVideoDto);
  }

  @Mutation(() => Video, { name: 'updateVideo' })
  async updateVideo(
    @Args('_id') _id: string,
    @Args('updateVideoDto') updateVideoDto: updateVideoDto,
  ): Promise<Video> {
    const { title, description, tags, video } = updateVideoDto;
    //console.log(image);
    const { filename, mimetype, encoding, createReadStream } = await video;
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
    return await this.videoService.updateVideo(_id, {
      title,
      description,
      tags,
      video: savePath,
    });
  }

  @Mutation(() => Video, { name: 'deleteVideo' })
  async deleteVideo(@Args('_id') _id: string): Promise<Video> {
    return await this.videoService.deleteVideo(_id);
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

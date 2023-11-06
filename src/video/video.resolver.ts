import { FileUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.input';
import { Video } from './video.schema';
import path from 'path';
import * as fs from 'fs';
import { updateVideoDto } from './dto/update-video.input';

@Resolver()
export class VideoResolver {
  constructor(private videoService: VideoService) {}

  @Query(() => [Video])
  async getAllvideos() {
    return this.videoService.findAllVideos();
  }

  @Query(() => Video)
  async getvideo(@Args('id', { type: () => ID }) id: string) {
    return this.videoService.findVideoById(id);
  }

  @Mutation(() => Video)
  async createVideo(
    @Args('createVideoDto') createVideoDto: CreateVideoDto,
    @Args('video', { type: () => GraphQLUpload }) videoFile: FileUpload,
  ) {
    const videoUrl = await this.videoService.handleFileUploadPublic(
      videoFile,
      createVideoDto.filename,
    );
    //createVideoDto.videoUrl = videoUrl;
    return await this.videoService.createVideo(createVideoDto);
  }

  @Mutation(() => Video)
  async updateVideo(@Args('updateVideoDto') updateVideoDto: updateVideoDto) {
    return this.videoService.updateVideo(updateVideoDto);
  }

  @Mutation(() => Boolean)
  async deleteVideo(@Args('id', { type: () => ID }) id: string) {
    return this.videoService.deleteVideo(id);
  }

  // private async handleFileUpload(
  //   file: FileUpload,
  //   filename: string,
  // ): Promise<string> {
  //   const uploadDir = path.join(process.cwd(), 'src/uploads');

  //   if (!fs.existsSync(uploadDir)) {
  //     fs.mkdirSync(uploadDir, { recursive: true });
  //   }

  //   const filePath = path.join(uploadDir, filename);
  //   const writeStream = fs.createWriteStream(filePath);

  //   await new Promise((resolve, reject) => {
  //     file
  //       .createReadStream()
  //       .pipe(writeStream)
  //       .on('finish', resolve)
  //       .on('error', reject);
  //   });

  //   return `http://localhost:3001/graphql/uploads/${filename}`;
  // }
}

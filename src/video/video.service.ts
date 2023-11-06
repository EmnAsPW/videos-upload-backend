import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './video.schema';
import { CreateVideoDto } from './dto/create-video.input';
import { FileUpload } from 'graphql-upload';
import path from 'path';
import * as fs from 'fs';
import { updateVideoDto } from './dto/update-video.input';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async createVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    console.log('1');
    const createdVideo = new this.videoModel(createVideoDto);
    return createdVideo.save();
  }

  async findAllVideos(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findVideoById(id: string): Promise<Video | null> {
    return this.videoModel.findById(id).exec();
  }

  async updateVideo(updateVideoDto: updateVideoDto): Promise<Video | null> {
    const { id, title, description, tags } = updateVideoDto;
    return this.videoModel
      .findByIdAndUpdate(id, { title, description, tags }, { new: true })
      .exec();
  }

  async deleteVideo(id: string): Promise<boolean> {
    const result = await this.videoModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  public async handleFileUploadPublic(
    file: FileUpload,
    filename: string,
  ): Promise<string> {
    return this.handleFileUpload(file, filename);
  }

  private async handleFileUpload(
    file: FileUpload,
    filename: string,
  ): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'src/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    const writeStream = fs.createWriteStream(filePath);

    await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    return `http://localhost:3001/graphql/uploads/${filename}`;
  }
}

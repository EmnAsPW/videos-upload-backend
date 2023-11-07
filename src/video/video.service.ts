import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createWriteStream } from 'fs';
import { Model, UpdateQuery } from 'mongoose';
import { join, normalize } from 'path';
import { Video, VideoDocument } from './video.schema';
import { CreateVideoDto } from './dto/create-video.input';
import { FileUpload } from 'graphql-upload';
import { updateVideoDto } from './dto/update-video.input';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async createVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    const { title, description, tags, video } = createVideoDto;
    //console.log(image);
    const { filename, mimetype, encoding, createReadStream } = await video;
    //console.log(filename, mimetype, encoding, createReadStream);

    //console.log('*************', mimetype);
    if (mimetype !== 'video/mp4') {
      throw new Error('Only MP4 video files are allowed.');
    }

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
    return await this.videoModel.create({
      title,
      description,
      tags,
      video: savePath,
    });
  }

  async findAllVideos(): Promise<Video[]> {
    return await this.videoModel.find({});
  }

  async findVideo(data: string): Promise<Video[]> {
    return await this.videoModel
      .find({ $text: { $search: data } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } });
  }

  async updateVideo(
    _id: string,
    data: UpdateQuery<VideoDocument> | updateVideoDto,
  ): Promise<Video> {
    return await this.videoModel.findByIdAndUpdate(_id, data, { new: true });
  }

  async deleteVideo(_id: string): Promise<Video> {
    return await this.videoModel.findByIdAndDelete(_id);
  }
}

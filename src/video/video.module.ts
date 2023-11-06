import { Module } from '@nestjs/common';
//import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './video.schema';
import { VideoResolver } from './video.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
  controllers: [],
  providers: [VideoService, VideoResolver],
})
export class VideoModule {}

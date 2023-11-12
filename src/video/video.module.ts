import { forwardRef, Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video.schema';
import { VideoResolver } from './video.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    forwardRef(() => UserModule), // Use forwardRef here
  ],
  controllers: [],
  providers: [VideoService, VideoResolver],
  exports: [MongooseModule, VideoService],
})
export class VideoModule {}

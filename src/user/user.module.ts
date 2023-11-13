import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
//import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { VideoModule } from 'src/video/video.module';
import { Video, VideoSchema } from 'src/video/entities/video.entity';
import { FindSchema, UserVideo } from './entities/Uservideo.entity';

@Module({
  imports: [
    //VideoModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Video.name, schema: VideoSchema },
      { name: UserVideo.name, schema: FindSchema },
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
//import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [
    //VideoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

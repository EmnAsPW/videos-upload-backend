import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {}

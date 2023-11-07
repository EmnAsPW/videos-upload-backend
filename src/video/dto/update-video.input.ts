import { CreateVideoDto } from './create-video.input';
//import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
//import { CreateUserInput } from './create-user.input';

@InputType()
export class updateVideoDto extends PartialType(CreateVideoDto) {}

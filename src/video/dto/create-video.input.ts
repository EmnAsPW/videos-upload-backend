import { GraphQLUpload } from 'graphql-upload';

import { InputType, Field, ID, Int } from '@nestjs/graphql';
import mongoose, { Types } from 'mongoose';

@InputType()
export class CreateVideoDto {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => GraphQLUpload, { nullable: true })
  videoUrl?: string;

  @Field(() => String, { nullable: true })
  filename: string;

  @Field(() => [String], { nullable: true })
  tags: string[];
}

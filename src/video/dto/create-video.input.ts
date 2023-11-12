import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { InputType, Field, ID, Int } from '@nestjs/graphql';
import mongoose, { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateVideoDto {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => GraphQLUpload, { nullable: true })
  video?: FileUpload | string;

  // @Field(() => ID)
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // _id: string;

  // @Field(() => ID)
  // userId: string;
}

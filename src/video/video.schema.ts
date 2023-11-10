import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type VideoDocument = Video & Document;

@ObjectType()
@Schema()
export class Video {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description: string;

  @Field(() => [String], { nullable: true })
  @Prop()
  tags: string[];

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  video: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  thumbnail: string;
}
export const VideoSchema = SchemaFactory.createForClass(Video);

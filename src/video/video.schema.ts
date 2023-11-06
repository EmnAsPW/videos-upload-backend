import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Video {
  @Field(() => ID, { nullable: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description: string;

  @Field(() => [String], { nullable: true })
  @Prop()
  tags: string[];

  @Field(() => String, { nullable: true })
  @Prop()
  filename: string;

  // @Field(() => String, { nullable: true })
  // @Prop()
  // videoUrl: string;
}
export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);

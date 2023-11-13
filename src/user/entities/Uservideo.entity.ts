import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Video } from 'src/video/entities/video.entity';

@ObjectType()
export class UserVideo {
  @Field(() => ID)
  // @Prop(() => String)  //No need Always
  _id?: string;

  @Field(() => String, { nullable: true })
  //   @Prop({ required: true })//NO NEED
  username: string;

  @Field(() => String)
  //   @Prop({ required: true, unique: true }) //NO NEED
  email: string;

  @Field(() => String)
  //   @Prop({ required: true }) //NO NEED
  password: string;

  @Field(() => String)
  //   @Prop({ required: true })  //NO NEED
  confirmPassword: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  Address: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  Age: number;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  Bio: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  image?: string;

  @Field(() => [Video], { nullable: true })
  //   @Prop({ type: [{ type: Types.ObjectId, ref: 'Video' }] }) //NO NEED
  videos?: Video[];
}

export const FindSchema = SchemaFactory.createForClass(UserVideo);

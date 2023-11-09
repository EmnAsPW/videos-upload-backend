import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@ObjectType()
@Schema()
export class Profile {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  First_Name?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  Last_Name?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  Address?: string;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number })
  Age?: number;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  Bio?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  image?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

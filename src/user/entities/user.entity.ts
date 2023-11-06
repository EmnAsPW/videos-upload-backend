import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  name?: string;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number })
  age?: number;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  title?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

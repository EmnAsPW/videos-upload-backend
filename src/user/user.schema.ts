import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  password: string;

  @Field(() => String)
  @Prop({ required: true })
  confirmPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

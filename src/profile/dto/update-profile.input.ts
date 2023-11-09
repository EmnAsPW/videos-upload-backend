import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
//import { CreateProfileInput } from './create-profile.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  First_Name: string;

  @Field(() => String, { nullable: true })
  Last_Name: string;

  @Field(() => String, { nullable: true })
  Address: string;

  @Field(() => Number, { nullable: true })
  Age: number;

  @Field(() => String, { nullable: true })
  Bio: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}

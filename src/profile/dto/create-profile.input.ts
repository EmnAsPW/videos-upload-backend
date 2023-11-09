import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  age: number;

  @Field(() => String)
  Bio: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}

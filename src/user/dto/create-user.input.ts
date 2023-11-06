import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  age: number;

  @Field(() => String)
  title: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}

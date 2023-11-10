import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class updateUserInput {
  @Field(() => String, { nullable: true })
  Username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  confirmPassword: string;

  @Field(() => String, { nullable: true })
  Address: string;

  @Field(() => Number, { nullable: true })
  Age: number;

  @Field(() => String, { nullable: true })
  Bio: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}

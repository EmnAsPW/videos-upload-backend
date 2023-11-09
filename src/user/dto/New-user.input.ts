import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewUserInput {
  @Field()
  Username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

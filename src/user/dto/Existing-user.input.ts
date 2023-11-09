import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ExistingUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

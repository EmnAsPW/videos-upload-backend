import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { UpdateUserInput } from './update-user.input';

@InputType()
export class DeleteUserInput extends PartialType(UpdateUserInput) {
  @Field(() => ID)
  _id?: string;
}

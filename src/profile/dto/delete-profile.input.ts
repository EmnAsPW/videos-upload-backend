import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { UpdateProfileInput } from './update-profile.input';

@InputType()
export class DeleteProfileInput extends PartialType(UpdateProfileInput) {
  @Field(() => ID)
  _id?: string;

  // @Field(() => String)
  // image?: string;
}

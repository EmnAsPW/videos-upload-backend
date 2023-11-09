import { Field, ObjectType, InterfaceType } from '@nestjs/graphql';

@ObjectType()
export class UserDetails {
  @Field()
  _id: string;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

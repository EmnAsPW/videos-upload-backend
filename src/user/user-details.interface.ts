import { Field, ObjectType, InterfaceType } from '@nestjs/graphql';

@ObjectType()
export class UserDetails {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

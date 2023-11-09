import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class token {
  @Field()
  token?: string;
}

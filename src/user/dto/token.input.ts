import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class jwttoken {
  @Field()
  token: string;
}

import { CreateVideoDto } from './create-video.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class updateVideoDto extends PartialType(CreateVideoDto) {
  @Field(() => Int)
  id: number;
}

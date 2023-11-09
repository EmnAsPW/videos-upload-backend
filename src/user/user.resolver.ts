import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserDocument } from './entities/user.entity';
import { UserService } from './user.service';
// import { NewUserInput } from './dto/New-user.input';
// import { ExistingUserInput } from './dto/Existing-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }
}

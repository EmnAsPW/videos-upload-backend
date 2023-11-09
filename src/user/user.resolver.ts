import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserDocument } from './entities/user.entity';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
// import { NewUserInput } from './dto/New-user.input';
// import { ExistingUserInput } from './dto/Existing-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDetails)
  async getUser(@Args('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
}

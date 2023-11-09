import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserDetails } from 'src/user/user-details.interface';
// import {
//   TokenResponse,
//   JwtVerification} from './auth.types';
import { NewUserInput } from 'src/user/dto/New-user.input';
import { ExistingUserInput } from 'src/user/dto/Existing-user.input';
import { token } from 'src/user/user-token.interface';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserDetails, { name: 'signup' })
  async signup(
    @Args('newUserInput') newUserInput: NewUserInput,
  ): Promise<UserDetails | null> {
    try {
      return this.authService.signup(newUserInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => token, { name: 'login' })
  async login(
    @Args('existingUserInput') existingUserInput: ExistingUserInput,
  ): Promise<token | null> {
    try {
      return this.authService.login(existingUserInput);
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  @Mutation(() => UserDetails, { name: 'verifyJwt' })
  async verifyJwt(@Args('jwt') jwt: string): Promise<{ exp: number }> {
    try {
      return this.authService.verifyJwt(jwt);
    } catch (error) {
      throw new Error('JWT verification failed: ' + error.message);
    }
  }
}

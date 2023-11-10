import { JwtService } from '@nestjs/jwt';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  BooleanType,
  ExpireIn,
  UserDetails,
} from 'src/user/user-details.interface';
// import {
//   TokenResponse,
//   JwtVerification} from './auth.types';
import { NewUserInput } from 'src/user/dto/New-user.input';
import { ExistingUserInput } from 'src/user/dto/Existing-user.input';
import { token } from 'src/user/user-token.interface';
import { jwttoken } from 'src/user/dto/token.input';
import { log } from 'console';
//import { jwtConstants } from './constants';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

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

  // @Mutation(() => ExpireIn, { name: 'verifyJwt' })
  // async verifyJwt(@Args('jwt') jwt: string): Promise<{ exp: number }> {
  //   try {
  //     return this.authService.verifyJwt(jwt);
  //   } catch (error) {
  //     throw new Error('JWT verification failed: ' + error.message);
  //   }
  // }

  @Mutation(() => UserDetails, { name: 'verifyJwt' })
  async verifyJwt(@Args('jwt') jwt: jwttoken): Promise<UserDetails | null> {
    try {
      const { token } = jwt;
      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: jwtConstants.secret, //jwtConstants
      // });
      const userDetails = await this.authService.verifyJwt(token);
      console.log('..........', userDetails);
      if (userDetails) {
        return userDetails;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('JWT verification failed: ' + error.message);
    }
  }

  @Mutation(() => BooleanType, { name: 'signout' })
  async signout(@Args('jwt') jwt: string): Promise<BooleanType> {
    try {
      const success = await this.authService.signout(jwt);
      if (success) {
        return { value: true };
      } else {
        return { value: false };
      }
    } catch (error) {
      throw new Error('Signout failed: ' + error.message);
    }
  }
}

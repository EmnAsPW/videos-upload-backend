import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDetails } from './../user/user-details.interface';
import { JwtService } from '@nestjs/jwt';
import { NewUserInput } from 'src/user/dto/New-user.input';
import { ExistingUserInput } from 'src/user/dto/Existing-user.input';
import { UserService } from 'src/user/user.service';
import { token } from 'src/user/user-token.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async signup(
    newUserInput: Readonly<NewUserInput>,
  ): Promise<UserDetails | any> {
    const { Username, email, password, confirmPassword } = newUserInput;

    if (!email.endsWith('@gmail.com')) {
      throw new HttpException(
        'Only Gmail addresses are allowed for registration',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password !== confirmPassword) {
      throw new HttpException(
        'Password and Confirm Password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await this.hashPassword(password);
    const hashedPassworded = await this.hashPassword(confirmPassword); //
    try {
      const newUser = await this.userService.create(
        Username,
        email,
        hashedPassword,
        hashedPassworded, //
      );
      return this.userService._getUserDetails(newUser);
    } catch (error) {
      this.logger.error(`Error during user registration: ${error.message}`);
      throw new HttpException(
        'User registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) {
      return null;
    }
    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistingUserInput): Promise<token | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException(
        'Check Again Email & Password!!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const jwt = await this.jwtService.signAsync({ user });
      return { token: jwt };
    } catch (error) {
      this.logger.error(`Error during JWT generation: ${error.message}`);
      throw new HttpException(
        'JWT generation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      this.logger.error(`Invalid JWT: ${error.message}`);
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }

  async signout(jwt: string): Promise<boolean> {
    try {
      this.jwtService.verify(jwt);
      //const payload = this.jwtService.verify(jwt);

      //const invalidToken = this.jwtService.sign({ exp: 0 });

      return true;
    } catch (error) {
      this.logger.error(`Error during signout: ${error.message}`);
      throw new HttpException(
        'Signout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

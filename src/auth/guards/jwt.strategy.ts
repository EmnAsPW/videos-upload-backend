import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
//import { jwtConstants } from './constants';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    //console.log('JwtStrategy instantiated');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any) {
    // console.log('JWT Validation Payload:', payload);
    return { ...payload.user };
  }
}

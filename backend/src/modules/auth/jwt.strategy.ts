import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ICurrentUser } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { AuthError, NOT_AUTHORIZED } from './auth.error';
import { JwtPayload } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      logging: true,
    });
  }

  async validate(payload: JwtPayload): Promise<ICurrentUser> {
    const { sub } = payload;
    const userFounded = await this.usersService.getUserById(sub);

    if (!userFounded) {
      throw new AuthError(NOT_AUTHORIZED);
    }

    // user prop will be attached to req obj
    const user: ICurrentUser = {
      sub: userFounded.id,
      email: userFounded.email,
    };

    return user;
  }
}

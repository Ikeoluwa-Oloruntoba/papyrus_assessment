import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/drizzle-repositories/user.repository';


type JwtPayload = {
  sub: number;
  email: string;
};

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private readonly userRepo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'user-secret',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepo.findUserByAny(payload.sub);
    if (!user) throw new UnauthorizedException('Invalid token');

    return payload;
  }
}

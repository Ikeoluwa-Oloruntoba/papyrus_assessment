import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserAccessTokenRepository } from 'src/drizzle-repositories/user-token.repository';



@Injectable()
export class RevokedTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly userTokenRepo: UserAccessTokenRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      
      const userToken = await this.userTokenRepo.findUserAccessToken(
        accessToken,
      );
     
      const token = userToken;

      if (!token || token.revoked) throw new UnauthorizedException();
      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

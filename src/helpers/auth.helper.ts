import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "src/common/model.type";
import { UserAccessTokenRepository } from "src/drizzle-repositories/user-token.repository";


@Injectable()
export class AuthHelper{

    constructor(
        private jwtService: JwtService,
        private userTokenRepo: UserAccessTokenRepository,

    ){}

    async comparePasswords(args: { password: string; hash: string }) {
        const isMatch = await bcrypt.compare(args.password, args.hash);
    
        if (!isMatch) {
          throw new BadRequestException('Invalid Credentials');
        }
      }

    async generateUserToken(userId: number, email: string) {
        const [at] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: userId,
              email,
            },
            {
              secret: 'user-secret', 
              expiresIn: 60 * 240,
            },
          ),
        ]);
    
        await this.userTokenRepo.storeUserAccessToken(userId, at);
    
        return at;
      }


      async checkStatus(data:User) {
        if (data.status === false) {
          throw new BadRequestException('Your Account Has been Disabled, Please Contact Support');
        }

      }
    
}
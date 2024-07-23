import { BadRequestException, Injectable } from '@nestjs/common';
import { loginUserDto } from './dto/loginUser.dto';
import { AuthHelper } from 'src/helpers/auth.helper';
import { UserAccessTokenRepository } from 'src/drizzle-repositories/user-token.repository';
import { UserRepository } from 'src/drizzle-repositories/user.repository';
import { LoginUserZod } from './dto/loginUser.zod';

@Injectable()
export class AuthService {

    constructor(
        private userTokenRepo: UserAccessTokenRepository,
        private userRepo: UserRepository,
        private authHelper: AuthHelper,
    ){}

    async signinUser(data: LoginUserZod) {
        const { email, password } = data;
    
        const findUser = await this.userRepo.findUserByEmail(email);
        if(!findUser){
          throw new BadRequestException('User Not Found')
        }
    
        await this.authHelper.comparePasswords({password: password, hash: findUser.password});
        await this.authHelper.checkStatus(findUser);
    
        //sign jwt and return user to sign in
        const token = await this.authHelper.generateUserToken(findUser.id, findUser.email);
        return {
          message: 'Login Successful',
          user: findUser,
          access_token: token,
        };
      }


      async signoutUser(accessToken: string) {
        await this.userTokenRepo.revokeUserAccessToken(accessToken);
    
        return {
          message: 'signout succcessful',
        };
      }




}

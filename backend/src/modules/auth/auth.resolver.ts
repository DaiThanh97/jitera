import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './auth.dto';
import { UserService } from '../user/user.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('userByToken')
  userByToken(@Args('token') token: string) {
    return this.authService.getUserByToken(token);
  }

  @Mutation('logIn')
  login(@Args('input') loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Mutation('signUp')
  signUp(@Args('input') signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}

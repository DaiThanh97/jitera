import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { ICurrentUser } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { DepositDto } from './wallet.dto';

@Resolver('Wallet')
@UseGuards(JwtGuard)
export class WalletResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('deposit')
  deposit(
    @Args('input') depositDto: DepositDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.userService.deposit(depositDto, user.sub);
  }
}

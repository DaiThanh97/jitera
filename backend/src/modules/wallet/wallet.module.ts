import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { WalletResolver } from './wallet.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [WalletResolver],
})
export class WalletModule {}

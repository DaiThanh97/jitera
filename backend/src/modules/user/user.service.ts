import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepositResponse, SignUpInput } from '../../graphql';
import { DepositDto } from '../wallet/wallet.dto';
import { UserError, USER_NOT_EXIST } from './user.error';
import { UserDocument, USERS_MODEL_NAME } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USERS_MODEL_NAME) private userModel: Model<UserDocument>,
  ) {}

  async createUser(signupInput: SignUpInput): Promise<boolean> {
    const user = await this.userModel.create(signupInput);
    return !!user;
  }

  async getUserById(userId: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(userId);
  }

  async getUserByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }

  async deposit(
    depositDto: DepositDto,
    userId: string,
  ): Promise<DepositResponse> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UserError(USER_NOT_EXIST);
    }

    const { balance } = depositDto;
    user.balance += balance;
    await user.save();

    return {
      balance: user.balance,
    };
  }
}

import { ToNumber } from '../../utils/transform';
import { DepositInput } from '../../graphql';

export class DepositDto implements DepositInput {
  @ToNumber()
  balance: number;
}

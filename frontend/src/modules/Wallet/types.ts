export interface IDepositInput {
  balance: number;
}

export interface IDepositVars {
  input: IDepositInput;
}

export interface IDepositResult {
  deposit: {
    balance: number;
  };
}

import { gql } from "@apollo/client";

export const DEPOSIT = gql`
  mutation Deposit($input: DepositInput!) {
    deposit(input: $input) {
      balance
    }
  }
`;

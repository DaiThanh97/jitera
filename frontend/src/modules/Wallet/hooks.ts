import { useMutation } from "@apollo/client";
import { DEPOSIT } from "./graphql";
import { IDepositResult, IDepositVars } from "./types";

export const useCreateItem = () =>
  useMutation<IDepositResult, IDepositVars>(DEPOSIT);

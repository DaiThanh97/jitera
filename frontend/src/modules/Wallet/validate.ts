import * as Yup from "yup";

export const DepositSchema = Yup.object().shape({
  balance: Yup.number().min(1).required("Balance is required!"),
});

import { QueryHookOptions, useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN, LOGIN, SIGNUP } from "./graphql";
import {
  ILoginVars,
  ILoginResult,
  ISignUpResult,
  ISignUpVars,
  IUserResponse,
} from "./types";

export const useLogin = () => useMutation<ILoginResult, ILoginVars>(LOGIN);
export const useSignUp = () => useMutation<ISignUpResult, ISignUpVars>(SIGNUP);
export const useGetUserByToken = (options: QueryHookOptions<IUserResponse>) =>
  useQuery<IUserResponse>(GET_USER_BY_TOKEN, options);

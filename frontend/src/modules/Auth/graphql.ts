import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation LogIn($input: LoginInput!) {
    logIn(input: $input) {
      id
      email
      nickname
      accessToken
      balance
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`;

export const GET_USER_BY_TOKEN = gql`
  query Query($token: ID!) {
    userByToken(token: $token) {
      id
      email
      nickname
      balance
    }
  }
`;

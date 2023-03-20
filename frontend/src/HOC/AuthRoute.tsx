import { ReactElement } from "react";
import { Navigate, Route } from "react-router-dom";
import decode from "jwt-decode";
import { ROUTES } from "../routes";
import { STORAGE_KEY } from "../utils/constants";
import { useGetUserByToken } from "../modules/Auth/hooks";
import authReducer from "../modules/Auth/reducer";
import { useAppDispatch } from "../store/store";

interface IAuthRoute {
  component: ReactElement;
}

const isTokenExpired = (token?: string) => {
  if (!token) {
    return true;
  }

  try {
    const decoded: any = decode(token);
    return Date.now() >= decoded.exp * 1000;
  } catch (err) {
    return true;
  }
};

export const AuthRoute: React.FC<IAuthRoute> = ({ component }) => {
  const userToken = localStorage.getItem(STORAGE_KEY.USER_TOKEN);
  const dispatch = useAppDispatch();
  const { data, error } = useGetUserByToken({
    variables: {
      token: userToken,
    },
  });

  const expired = isTokenExpired(userToken ?? "");
  if (expired) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  try {
    if (error) {
      throw new Error();
    }

    if (data?.userByToken) {
      dispatch(
        authReducer.actions.user({
          id: data.userByToken.id,
          email: data.userByToken.email,
          nickname: data.userByToken.nickname,
          balance: data.userByToken.balance,
        })
      );
    }
  } catch (err) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return component;
};

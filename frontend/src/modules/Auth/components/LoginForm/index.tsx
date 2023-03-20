import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { showErrorToast, showSuccessToast } from "../../../../libs/toast";
import { useAppDispatch } from "../../../../store/store";
import { ILoginInput } from "../../types";
import { LoginSchema } from "../../validate";
import { useLogin } from "../../hooks";
import { ButtonHolder, Title, RegisterHolder } from "./styledComponents";
import { ROUTES } from "../../../../routes";
import authReducer from "../../reducer";

const initialValues: ILoginInput = {
  email: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { loading }] = useLogin();
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values: ILoginInput) => {
      try {
        const result = await login({
          variables: {
            input: {
              email: values.email,
              password: values.password,
            },
          },
        });

        const [error] = result.errors ?? [];
        if (error) {
          throw error;
        }

        const response = result.data?.logIn;
        if (response) {
          await dispatch(
            authReducer.actions.login({
              id: response.id,
              email: response.email,
              nickname: response.nickname,
              balance: response.balance,
              accessToken: response.accessToken,
            })
          );
          showSuccessToast(`Login successfully!`);
          navigate(ROUTES.HOME);
        }
      } catch (err: any) {
        console.log(err);
        showErrorToast(err.message);
      }
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          value={values.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonHolder>
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="w-100"
        >
          {loading ? <Spinner animation="border" variant="light" /> : "Login"}
        </Button>
      </ButtonHolder>
      <RegisterHolder>
        <span>You don't have an account?</span>
        <Link to={ROUTES.SIGNUP}>Register</Link>
      </RegisterHolder>
    </Form>
  );
};

export default LoginForm;

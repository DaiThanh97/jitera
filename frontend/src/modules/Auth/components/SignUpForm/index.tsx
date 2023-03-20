import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { showErrorToast, showSuccessToast } from "../../../../libs/toast";
import { ISignUpInput } from "../../types";
import { SignUpSchema } from "../../validate";
import { useSignUp } from "../../hooks";
import { ButtonHolder, Title, RegisterHolder } from "./styledComponents";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";

const initialValues: ISignUpInput = {
  email: "",
  nickname: "",
  password: "",
  rePassword: "",
};

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [signUp, { loading }] = useSignUp();
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values: ISignUpInput) => {
      try {
        const result = await signUp({
          variables: {
            input: {
              email: values.email,
              nickname: values.nickname,
              password: values.password,
            },
          },
        });

        const [error] = result.errors ?? [];
        if (error) {
          showErrorToast(error.message);
          return;
        }

        const response = result.data?.signUp;
        if (response) {
          showSuccessToast(
            `Sign up successfully! Please log in with registered account.`
          );
          navigate(ROUTES.LOGIN);
        }
      } catch (err: any) {
        console.log(err);
        showErrorToast(err.message);
      }
    },
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
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
          <Form.Label>Nick Name</Form.Label>
          <Form.Control
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            isInvalid={!!errors.nickname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nickname}
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
        <Form.Group>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            name="rePassword"
            value={values.rePassword}
            onChange={handleChange}
            isInvalid={!!errors.rePassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.rePassword}
          </Form.Control.Feedback>
        </Form.Group>
        <ButtonHolder>
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-100"
          >
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </ButtonHolder>
        <RegisterHolder>
          <span>You already had an account?</span>
          <Link to={ROUTES.LOGIN}>Log In</Link>
        </RegisterHolder>
      </Form>
    </>
  );
};

export default SignUpForm;

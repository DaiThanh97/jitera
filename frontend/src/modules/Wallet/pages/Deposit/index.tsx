import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { showErrorToast, showSuccessToast } from "../../../../libs/toast";
import { ROUTES } from "../../../../routes";
import { useCreateItem } from "../../hooks";
import { DepositSchema } from "../../validate";
import { ButtonHolder, Title } from "./styledComponents";
import { IDepositInput } from "../../types";
import { useAppDispatch } from "../../../../store/store";
import authReducer from "../../../Auth/reducer";

const initialValues: IDepositInput = {
  balance: 0,
};

const DepositForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createItem, { loading }] = useCreateItem();
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: DepositSchema,
    onSubmit: async (values: IDepositInput) => {
      try {
        const result = await createItem({
          variables: {
            input: {
              balance: Number(values.balance),
            },
          },
        });

        const [error] = result.errors ?? [];
        if (error) {
          throw error;
        }

        const response = result.data?.deposit;
        if (response) {
          await dispatch(
            authReducer.actions.deposit({
              balance: response.balance,
            })
          );
          showSuccessToast(`Deposit successfully!`);
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
      <Title>Deposit</Title>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="balance"
          value={values.balance}
          onChange={handleChange}
          isInvalid={!!errors.balance}
        />
        <Form.Control.Feedback type="invalid">
          {errors.balance}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonHolder>
        <Button
          variant="secondary"
          className="w-100  mx-2"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="w-100"
        >
          {loading ? <Spinner animation="border" variant="light" /> : "Deposit"}
        </Button>
      </ButtonHolder>
    </Form>
  );
};

export default DepositForm;

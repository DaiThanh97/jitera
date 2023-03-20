import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { showErrorToast, showSuccessToast } from "../../../../libs/toast";
import { ROUTES } from "../../../../routes";
import { useCreateItem } from "../../hooks";
import { CreateItemSchema } from "../../validate";
import { ICreateItemInput } from "../../types";
import { ButtonHolder, Title } from "./styledComponents";

const initialValues: ICreateItemInput = {
  name: "",
  startedPrice: 0,
  duration: 0,
};

const CreateItemForm: React.FC = () => {
  const navigate = useNavigate();
  const [createItem, { loading }] = useCreateItem();
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: CreateItemSchema,
    onSubmit: async (values: ICreateItemInput) => {
      try {
        const result = await createItem({
          variables: {
            input: {
              name: values.name,
              startedPrice: Number(values.startedPrice),
              duration: Number(values.duration),
            },
          },
        });

        const [error] = result.errors ?? [];
        if (error) {
          throw error;
        }

        const response = result.data?.createItem;
        if (response) {
          showSuccessToast(`Create item successfully!`);
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
      <Title>Create Item</Title>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={values.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Price</Form.Label>
        <Form.Control
          type="number"
          name="startedPrice"
          value={values.startedPrice}
          onChange={handleChange}
          isInvalid={!!errors.startedPrice}
        />
        <Form.Control.Feedback type="invalid">
          {errors.startedPrice}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Time Window</Form.Label>
        <Form.Control
          type="number"
          name="duration"
          value={values.duration}
          onChange={handleChange}
          isInvalid={!!errors.duration}
        />
        <Form.Control.Feedback type="invalid">
          {errors.duration}
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
          {loading ? <Spinner animation="border" variant="light" /> : "Create"}
        </Button>
      </ButtonHolder>
    </Form>
  );
};

export default CreateItemForm;

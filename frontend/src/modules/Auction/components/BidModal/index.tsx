import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { memo, useCallback } from "react";
import { useFormik } from "formik";
import { IBidInput, IItem } from "../../types";
import { BidSchema } from "../../validate";
import { useBidItem } from "../../hooks";
import { showErrorToast, showSuccessToast } from "../../../../libs/toast";

interface IBidModal {
  item?: IItem;
  show: boolean;
  closeBidModal: () => void;
  onSuccess: () => void;
}

const BidModal: React.FC<IBidModal> = ({
  item,
  show,
  closeBidModal,
  onSuccess,
}) => {
  const [bidItem, { loading }] = useBidItem();
  const { values, errors, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      id: "",
      price: 0,
    },
    validationSchema: BidSchema,
    onSubmit: async (values: IBidInput) => {
      try {
        const result = await bidItem({
          variables: {
            input: {
              id: item?.id ?? "",
              price: Number(values.price),
            },
          },
        });

        const [error] = result.errors ?? [];
        if (error) {
          throw error;
        }

        const response = result.data?.bidItem;
        if (response) {
          onSuccess();
          showSuccessToast(`Bid item ${item?.name} successfully!`);
        }
      } catch (err: any) {
        console.log(err);
        showErrorToast(err.message);
      }
    },
  });

  const onCloseModal = useCallback(() => {
    resetForm();
    closeBidModal();
  }, [resetForm, closeBidModal]);

  return (
    <Modal show={show} onHide={onCloseModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Bid Item {item?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Bid Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={values.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default memo(BidModal);

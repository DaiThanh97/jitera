import * as Yup from "yup";

export const BidSchema = Yup.object().shape({
  price: Yup.number().min(0).required("Price is required!"),
});

export const CreateItemSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  startedPrice: Yup.number().min(1).required("Price is required!"),
  duration: Yup.number().min(1).required("Duration is required!"),
});

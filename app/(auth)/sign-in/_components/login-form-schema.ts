import * as Yup from "yup";

export const loginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const loginInitialValues = {
  email: "",
  password: "",
};

export type LoginFormValues = Yup.InferType<typeof loginFormSchema>;

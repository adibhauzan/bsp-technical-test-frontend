import * as Yup from "yup";

const LEVEL = {
  ADMIN: "1",
  CUSTOMER: "2",
};

const passwordValidation = /^[a-zA-Z0-9.!$]+$/;

const baseSchema = Yup.object().shape({
  id: Yup.number().notRequired(),
  name: Yup.string()
    .required("Name is required")
    .min(3, "At least 3 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(
      passwordValidation,
      "Password can only contain letters, numbers, and the characters . or ! or $"
    )
    .required("Password is required"),
  verify_password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(
      passwordValidation,
      "Password can only contain letters, numbers, and the characters . or ! or $"
    )
    .required("Password is required"),
  level: Yup.string()
    .oneOf(["1", "2", "3", "4", "0"], "Please select a level first")
    .notOneOf(["0"])
    .required("Level is required"),
  roles: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
    )
    .min(1, "Role is required")
    .default([]),
  image_profile: Yup.string().notRequired(),
  signature: Yup.string().notRequired(),
  x_type: Yup.string().required("x_type is required"),
});

export const usersFormSchema = ({ level }: { level: string }) => {
  let specificRules = {};

  switch (level) {
    case LEVEL.CUSTOMER:
      specificRules = {
        reference_id: Yup.number()
          .min(1, "Customer is Required")
          .required("Customer is Required"),
      };
      break;

    default:
      specificRules = {
        reference_id: Yup.number().notRequired(),
      };
      break;
  }

  return baseSchema.shape(specificRules);
};

export const userProfileSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "At least 3 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "At least 8 characters")
      .matches(
        passwordValidation,
        "Password can only contain letters, numbers, and the characters . or ! or $"
      )
      .required("Password is required"),
    verify_password: Yup.string()
      .min(8, "At least 8 characters")
      .matches(
        passwordValidation,
        "Verification password can only contain letters, numbers, and the characters . or ! or $"
      )
      .required("Verification password is required"),
    image_profile: Yup.string().required("Profile Picture is required"),
    signature: Yup.string().required("Signature is required"),
  });
};

export type IUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
  verify_password: string;
  level: string;
  roles: { value: string; label: string }[];
  image_profile?: string;
  signature?: string;
  x_type: string;
  reference_id?: number;
};

export const userInitialValue: IUser = {
  name: "",
  email: "",
  password: "",
  verify_password: "",
  level: "0",
  roles: [],
  image_profile: "",
  signature: "",
  x_type: "Admin",
  reference_id: 0,
};

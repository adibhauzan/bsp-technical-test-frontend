"use client";

import { Field, Form, Formik } from "formik";
import {
  LoginFormValues,
  loginFormSchema,
  loginInitialValues,
} from "./login-form-schema";
import { Button } from "@/components/ui/button";
import { setCookie } from "cookies-next";
import { API } from "@/lib/api";
import { toast } from "@/components/ui/sweet-alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconHidePasswordEye,
  IconShowPassword,
} from "@/components/icons/icon-eye-password";
import { getLoggedInUser } from "@/lib/api/user";
import themeConfig from "@/theme.config";
import { useTheme } from "@/context/themeContext";
import { getDecodedToken } from "@/lib/jwt";

type Props = {
  email: string;
  password: string;
  rememberMe: string;
  loading: string;
  submit: string;
};

interface Forms {
  form_name: string;
  xText_ID: string;
  xText_EN: string;
  xType: string;
  xActive: number;
  xURL: string;
  xIcon: string;
  permissions: string[];
  menus: any[];
}

const initialState = {
  isDarkMode: false,
  sidebar: false,
  menu: themeConfig.menu,
  rtlClass: themeConfig.rtlClass,
  theme: themeConfig.theme,
  layout: themeConfig.layout,
  animation: themeConfig.animation,
  // user: null as User | null,
  id: 0,
  name: "",
  email: "",
  level: "",
  image_profile: "",
  forms: [] as Forms[],
};
type ThemeState = typeof initialState;

const ClientLoginForm = ({ props }: { props: Props }) => {
  const [isVerified, setIsverified] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { fetchUserData } = useTheme();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    await API.POST("auth/login", data, "", true)
      .then(async (res: any) => {
        if (res.code === 200) {
          const { access_token } = res.data;
          const decoded = getDecodedToken(access_token);
          console.log(decoded);
          const loggedInUser = await getLoggedInUser(access_token);

          console.log(loggedInUser);
          if (loggedInUser.code === 200) {
            const data = loggedInUser.data?.user;
            if (decoded.Level === "1") {
              setCookie("access_token", access_token);
              setIsSuccess(true);
              router.push("/admin");

              toast.fire({
                icon: "success",
                title: `Welcome to dashboard, ${data?.name}`,
                padding: "10px 20px",
              });
            } else if (decoded.Level === "2" || decoded.Level === "3") {
              await API.POST("auth/logout", {}, access_token, true);
              setCookie("access_token", "", { maxAge: -1 });
              toast.fire({
                icon: "error",
                title: "User not found.",
                padding: "10px 20px",
              });
            }
            fetchUserData(access_token);
          } else {
            await API.POST("auth/logout", {}, access_token, true);
            toast.fire({
              icon: "error",
              title: "You are not authorized",
              padding: "10px 20px",
            });
          }
        } else if (
          res.code === 400 &&
          res.message === "email or password incorrect"
        ) {
          toast.fire({
            icon: "error",
            titleText: `ERROR\n${res.message}`,
            padding: "10px 20px",
          });
        } else {
          toast.fire({
            icon: "error",
            titleText: `${res.code} - ${res.status}\n${res.message}`,
            padding: "10px 20px",
          });
        }
      })
      .catch((error: Error) => {
        toast.fire({
          icon: "error",
          title: `catch error: ${error.message}`,
          padding: "10px 20px",
        });
      });
  };

  return (
    <>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginFormSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-2  ">
            <div className="space-y-2">
              <div className={touched.email && errors.email ? "has-error" : ""}>
                <label htmlFor="email" className="font-normal">
                  {props.email}
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                />
                {touched.email && errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>

              <div
                className={
                  touched.password && errors.password ? "has-error" : ""
                }
              >
                <label htmlFor="password" className="font-normal">
                  {props.password}
                </label>
                <div className="flex">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="form-input rounded-r-none"
                  />
                  <div className="flex items-center justify-center rounded-r-md border border-l-0 border-white-light bg-[#eee] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b]">
                    <label className="relative mb-0 h-5 w-6 cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer absolute z-10 h-full w-full cursor-pointer opacity-0 focus:outline-none focus:ring-0"
                        id="custom_switch_checkbox2"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <IconHidePasswordEye className="hidden text-primary peer-checked:block" />
                      <IconShowPassword className="peer-checked:hidden" />
                    </label>
                  </div>
                </div>
                {touched.password && errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r  hover:from-blue-400 hover:to-blue-300 text-white-light py-2 rounded-md"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ClientLoginForm;

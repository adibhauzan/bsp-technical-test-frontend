import LoginForm from "./_components/login-form";

export default function SignInPage() {
  const signInLocale = {
    email: "email",
    password: "password",
    rememberMe: "remember-me",
    loading: "loading",
    submit: "submit",
  };

  return (
    <div className="relative grid h-svh items-center justify-center bg-cover bg-bottom lg:max-w-none lg:px-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/60" />
      <div className="relative rounded-xl bg-gray-100/80">
        <div className="relative m-1.5 rounded-xl bg-white/85 p-6 md:w-[400px] md:p-8">
          <div className="mb-6 flex flex-col space-y-6">
            <h1 className="text-center text-4xl font-extrabold text-primary/80">
              Login
            </h1>
          </div>
          <LoginForm props={signInLocale} />
        </div>
      </div>
    </div>
  );
}

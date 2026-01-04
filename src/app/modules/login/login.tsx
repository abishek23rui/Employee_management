import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../../../components/Formfield";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  username: string;
  password: string;
};

const loginSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

function Login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    const { username } = data;

    const mockUser = {
      id: "USR-" + Math.floor(Math.random() * 10000),
      username,
      role: "Factory Manager",
      token: btoa(`${username}-${Date.now()}`),
    };

    localStorage.setItem("userId", mockUser.id);
    localStorage.setItem("userName", mockUser.username);
    localStorage.setItem("role", mockUser.role);
    localStorage.setItem("token", mockUser.token);
    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Employee Portal Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Username"
            name="username"
            type="input"
            placeholder="Enter username"
            control={control}
            isRequired
            error={errors.username?.message}
          />

          <FormField
            label="Password"
            name="password"
            type="input"
            placeholder="Enter password"
            control={control}
            isRequired
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

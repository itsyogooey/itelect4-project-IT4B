// ===== GT3: a username, and a token this page made up =====
// const handleLogin = ({ username }: LoginFormValues) => {
//   login(username, "student", "student-1");   // invented token and id
//   navigate("/");
// };
//
// NOTE: There was nothing to get wrong, so nothing to report. Now the
//       password can be wrong, the email unknown, or the API unreachable.
// ===== GT4 Part 2: email and password, checked by the API =====
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../store/authStore";
import { loginUser } from "../api/client";
import { loginSchema, type LoginFormValues } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Logging in is a POST that changes something, so it is a mutation.
  const logIn = useMutation({
    mutationFn: loginUser,
    onSuccess: (reply) => {
      // The token came from the API. The store just keeps it.
      setSession(reply.token, reply.user.name);
      navigate("/");
    },
  });

  const onSubmit = (values: LoginFormValues): void => {
    logIn.mutate(values);
  };

  return (
    <main className="page-frame page-panel login-panel">
      <p className="page-eyebrow">Campus lost and found</p>
      <h2 className="page-title">Sign in</h2>
      <p className="page-intro">Sign in to report and track campus lost and found items.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="juan@dlsl.edu.ph"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" className="text-xs font-semibold text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password">Password</Label>
          {/* type="password" hides the characters as they are typed. */}
          <Input
            id="password"
            type="password"
            aria-invalid={errors.password ? true : undefined}
            {...register("password")}
          />
          {errors.password && (
            <p role="alert" className="text-xs font-semibold text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={logIn.isPending} className="mt-2 w-full">
          {logIn.isPending ? "Signing in..." : "Log In"}
        </Button>
      </form>

      {/* The API's own sentence, e.g. "Email or password is incorrect". */}
      {logIn.isError && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{logIn.error.message}</p>
      )}

      <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
        No account yet?{" "}
        <Link to="/register" className="font-semibold text-blue-600">
          Register
        </Link>
      </p>
    </main>
  );
}

export default LoginPage;

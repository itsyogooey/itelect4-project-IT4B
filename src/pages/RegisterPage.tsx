// src/pages/RegisterPage.tsx -- a NEW page. Until GT4 nobody had an account.
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../store/authStore";
import { loginUser, registerUser } from "../api/client";
import { registerSchema, type RegisterFormValues } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterPage() {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const signUp = useMutation({
    // Two requests, in order. /register creates the user but issues no
    // token -- only /login signs one. Without the second call the new user
    // would have to type the same password again on the login page.
    mutationFn: async (values: RegisterFormValues) => {
      await registerUser(values);
      return loginUser({ email: values.email, password: values.password });
    },
    onSuccess: (reply) => {
      setSession(reply.token, reply.user.name);
      navigate("/");
    },
  });

  const onSubmit = (values: RegisterFormValues): void => {
    signUp.mutate(values);
  };

  return (
    <main className="page-frame page-panel login-panel">
      <p className="page-eyebrow">Campus lost and found</p>
      <h2 className="page-title">Create an account</h2>
      <p className="page-intro">Register to report lost and found items on campus.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Juan Dela Cruz"
            aria-invalid={errors.name ? true : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p role="alert" className="text-xs font-semibold text-red-600">{errors.name.message}</p>
          )}
        </div>

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

        <Button type="submit" disabled={signUp.isPending} className="mt-2 w-full">
          {signUp.isPending ? "Creating account..." : "Register"}
        </Button>
      </form>

      {/* e.g. "That email is already registered" -- the API's own words. */}
      {signUp.isError && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{signUp.error.message}</p>
      )}

      <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          Log in
        </Link>
      </p>
    </main>
  );
}

export default RegisterPage;

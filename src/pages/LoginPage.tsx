import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = ({ username }: LoginFormValues) => {
    login(username, "student", "student-1");
    navigate("/");
  };

  return (
    <main className="page-frame page-panel login-panel">
      <p className="page-eyebrow">Campus lost and found</p>
      <h2 className="page-title">Sign in</h2>
      <p className="page-intro">
        Sign in to browse campus lost and found items.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(handleLogin)}>
        <Label htmlFor="username" className="block">
          Username
          <Input id="username" type="text" placeholder="Username" {...register("username")} />
        </Label>
        {errors.username && <p role="alert" className="text-xs font-semibold text-red-600">{errors.username.message}</p>}
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          Login
        </Button>
      </form>
    </main>
  );
}

export default LoginPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema, type LoginForm } from "../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginDTO } from "../dto/login.dto";
import Form from "@/shared/components/ui/form/form";
import { FormItem } from "@/shared/components/ui/form/form-item";
import Input from "@/shared/components/ui/form/input";
import useLogin from "../hooks/useLogin";
import Button from "@/shared/components/ui/button";
import LoaderButton from "@/shared/components/ui/loader-button";
import { useDispatch } from "react-redux";
import { handleSetSessionStore } from "@/app/store/features/sessionSlice.store";
import { handleApiError } from "@/core/errors/handleApiError";

export default function LoginPage() {
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const {
     register,
     handleSubmit,
     formState: {
       errors
     }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });
  const {mutate: loginQuery, isPending: isLoginPending} = useLogin();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginDTO) => {
    await loginQuery(data, {
        onSuccess: ( data ) => {
            const { data: sessionData } = data;
            console.log(sessionData);
            dispatch(handleSetSessionStore({
              user: sessionData.user, token: sessionData.accessToken
            }));
            navigate('/admin/dashboard');
        },
        onError: (error) => {
            console.error('Login failed', error);
             handleApiError(error, setApiErrors);
        }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Connexion
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Manager votre projets
        </p>

        <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormItem label="Email" error={errors.email?.message || apiErrors.email}>
            <Input
              type="email"
              {...register('email')}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
          </FormItem>

          {/* Mot de passe */}
          <FormItem label="Mot de passe" error={errors.password?.message}>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register('password')}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 outline-none transition focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FiEyeOff size={12} />
                ) : (
                  <FiEye size={12} />
                )}
              </button>
            </div>
          </FormItem>

          <Button
            type="submit"
            className="w-full flex justify-center rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            {isLoginPending ? 
              <LoaderButton title="Connexion..." />
            : 'Se connecter'}
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
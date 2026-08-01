import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "@/shared/components/ui/button";
import { FormItem } from "@/shared/components/ui/form/form-item";
import Input from "@/shared/components/ui/form/input";
import Form from "@/shared/components/ui/form/form";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterForm } from "../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hooks/useRegister";
import { notify } from "@/core/feedback/notify";
import { handleApiError } from "@/core/errors/handleApiError";
import LoaderButton from "@/shared/components/ui/loader-button";

export default function RegisterPage() {
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerQuery, isPending: isRegister } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });
 
  const onSubmit = (data: RegisterForm) => {
     console.log(navigate);
     registerQuery(data, {
        onSuccess: () => {
           notify.success('Inscription avec succès!connectez-vous pour continuer.');
           navigate('/login');
        },
        onError: (error) => {
            handleApiError(error, setApiErrors);
        },
     });
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Inscription
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Créez votre compte pour continuer.
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormItem label="Nom complet" error={errors.name?.message}>
             <Input {...register('name')}/>
          </FormItem>

          <FormItem label="Email" error={errors.email?.message || apiErrors.email}>
              <Input type="email" {...register('email')}/>
          </FormItem>

          {/* Mot de passe */}
          <div>

            <div className="relative">
              <FormItem label="Mot de passe" error={errors.password?.message}>
                <Input type={showPassword ? "text" : "password"} {...register('password')}/>
              </FormItem>


              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-7 translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FiEyeOff size={12} />
                ) : (
                  <FiEye size={12} />
                )}
              </button>
            </div>
          </div>

          <FormItem label="Confirmer" error={errors.confirmPassword?.message}>
             <Input type={showPassword ? "text" : "password"} {...register('confirmPassword')} />
          </FormItem>

           <Button disabled={isRegister}>
              { isRegister ?
                <LoaderButton title="Inscription en cours..."/>
              :
                "S'inscrire"
              }
           </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
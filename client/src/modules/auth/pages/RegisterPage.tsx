import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Button from "@/shared/components/ui/button";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Inscription
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Créez votre compte pour continuer.
        </p>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Nom complet
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Mot de passe
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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
          </div>

          {/* Confirmation */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirmer le mot de passe
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 outline-none transition focus:border-blue-500"
              />

            </div>
          </div>

           <Button>
              S'inscrire
           </Button>
        </form>

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
import { lazy } from "react";
import { Route } from "react-router-dom";

const LoginPage = lazy(() => import("@modules/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@modules/auth/pages/RegisterPage"));

const AuthRoute = (
    <>
        <Route path={"/login"} element={<LoginPage />}/>
        <Route path={"/register"} element={<RegisterPage />}/>
    </>
);

export default AuthRoute;
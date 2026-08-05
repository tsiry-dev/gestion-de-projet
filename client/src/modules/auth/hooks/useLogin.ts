import { useMutation } from "@tanstack/react-query"
import loginService from "../services/login.service";

const useLogin = () => {
    return useMutation({
        mutationFn: loginService,
        mutationKey: ['login']
    });
}

export default useLogin;
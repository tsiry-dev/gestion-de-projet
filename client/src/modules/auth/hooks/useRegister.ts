import { useMutation } from "@tanstack/react-query"
import registerService from "../services/register.service";

const useRegister = () => {
    return useMutation({
        mutationFn: registerService,
        mutationKey: ['register']
    });
}

export default useRegister;
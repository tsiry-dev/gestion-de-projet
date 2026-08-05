import { useMutation } from "@tanstack/react-query";
import logoutService from "../services/logout.service";

const useLogout = () => {

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: logoutService,
    });
}

export default useLogout;
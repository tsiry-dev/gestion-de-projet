import loginApi from "../api/loginApi";
import type { LoginDTO } from "../dto/login.dto";

const loginService = async(data: LoginDTO) => {
    return await loginApi(data);
}

export default loginService;
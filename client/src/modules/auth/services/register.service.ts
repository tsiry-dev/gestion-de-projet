import { registerApi } from "../api/registerApi"
import type { RegisterDTO } from "../dto/register.dto";

const registerService = async(data: RegisterDTO) => {
    await registerApi(data);
}

export default registerService;
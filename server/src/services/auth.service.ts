import UserModel, { User } from "@/models/user.model";
import { LoginDTO, RegisterDTO } from "@/shared/dtos/auth.dto";
import { ConflictError } from "@/shared/errors/ConflictError";
import { ValidationError } from "@/shared/errors/ValidationError";
import { comparePassword } from '../shared/utils/bcript';
import { JwtUtils } from "@/shared/utils/jwt";

export class AuthService {

    public async register (data: RegisterDTO): Promise<User> {
        const { email } = data;
        
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) {
            throw new ConflictError(
                'Email invalide!',
                {
                    email: 'L\'email est déja utilisé'
                }
            )
        }

        return await UserModel.create(data);
    }

    public async login (data: LoginDTO): Promise<{
        accessToken: string,
        refreshToken: string
    }> {
        const { email, password } = data;

        const existingUser = await UserModel.findOne({ email }).select("+password");
        if(!existingUser) {
            throw new ValidationError(
                'Identifiant invalide!',
                {
                    email: 'Email ou mot de passe incorrecte!'
                }
            );
        }

        const isPasswordMatch = await comparePassword(
            password,
            existingUser.password
        );

        if(!isPasswordMatch) {
            throw new ValidationError(
                'Identifiant invalide!',
                {
                    email: 'Email ou mot de passe incorrecte!'
                }
            );  
        }

        const accessToken = JwtUtils.signAccessToken({
            userId: existingUser._id.toString(),
        });

        const refreshToken = JwtUtils.signRefreshToken({
            userId: existingUser._id.toString(),
        });

        return {
            accessToken, 
            refreshToken
        }

    }
}
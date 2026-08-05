import UserModel, { User } from "@/models/user.model";
import { LoginDTO, RegisterDTO } from "@/shared/dtos/auth.dto";
import { ConflictError } from "@/shared/errors/ConflictError";
import { ValidationError } from "@/shared/errors/ValidationError";
import { comparePassword } from '../shared/utils/bcript';
import { JwtUtils, RefreshTokenPayload } from "@/shared/utils/jwt";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { NotFoundError } from "@/shared/errors/NotFoundError";

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
        user: User,
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
            user: existingUser,
            accessToken, 
            refreshToken
        }

    }

    public async refreshToken(refreshToken: string | undefined) {
        if (!refreshToken) {
            throw new UnauthorizedError(
                "Session inexistante."
            );
        }

        let payload: RefreshTokenPayload;

        try {
            payload = JwtUtils.verifyRefreshToken(refreshToken);
        } catch {
            throw new UnauthorizedError("Token invalide ou expiré !");
        }

        const user = await UserModel.findById(payload.userId);

        if (!user) {
            throw new UnauthorizedError("Utilisateur introuvable.");
        }

        const newAccessToken = JwtUtils.signAccessToken({
            userId: user._id.toString(),
        });

        const newRefreshToken = JwtUtils.signRefreshToken({
            userId: user._id.toString(),
        });

        return {
            newAccessToken,
            newRefreshToken,
        };
    }

    public async me(userId: string | undefined): Promise<User> {

        if (!userId) {
            throw new UnauthorizedError(
                "Utilisateur non authentifié !"
            );
        }


        const user = await UserModel.findById(userId);


        if (!user) {
            throw new NotFoundError(
                "Utilisateur introuvable !"
            );
        }


        return user;
    }
}
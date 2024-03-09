import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
import { RolesGuard } from "./guard/role.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        }
    ],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule { }
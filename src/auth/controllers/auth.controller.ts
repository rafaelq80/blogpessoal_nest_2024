import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Usuario')
@ApiBearerAuth()
@Controller("/usuarios")
export class AuthController{
    
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() usuarioLogin: UsuarioLogin): Promise<any>{
        return this.authService.login(usuarioLogin)
    }
    
}
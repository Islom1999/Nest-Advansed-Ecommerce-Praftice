import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/shared/dto/register-dto';
import { LoginDto } from 'src/shared/dto/login-dto';
import { UserService } from 'src/shared/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(@Body() userDto: RegisterDto){
    const user =  await this.userService.create(userDto)
    const payload = {
      username: user.username,
    }
    const token = await this.authService.signIn(payload)

    return {user: user, token: token}
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userDto: LoginDto){ 
    const user = await this.userService.findByLogin(userDto)

    const payload = {
      username: user.username,
    }
    const token = await this.authService.signIn(payload)

    return {user: user, token: token}
  }

  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  async check(){
    return "Authorized"
  }
}

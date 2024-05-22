import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body('email') email: string, @Body('password') password: string) {
    const userExists = this.authService.getUserByEmail(email);
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const userId = this.authService.insertUser(email, password);
    return { userId };
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user = this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { message: 'Login successful', userId: user.id };
  }
}

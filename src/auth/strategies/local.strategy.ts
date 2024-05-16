import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

type loginUserData = {
  username: string;
  id: number;
} 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<loginUserData> {
    
    const user: User = await this.authService.validateUser(username, password);

    if (!user) {
      throw new HttpException('Некорректная пара логин и пароль', HttpStatus.UNAUTHORIZED)
    }

    return { username: user.username, id: user.id }
  }
}
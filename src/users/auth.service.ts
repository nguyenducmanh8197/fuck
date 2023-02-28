import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(email: string, password: string, admin: boolean) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email is use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + hash.toString('hex');
    const user = await this.userService.create(email, result, admin);

    return user;
  }

  async signin(email: string, password: string) {
    const [users] = await this.userService.find(email);

    if (!users) {
      throw new NotFoundException('Use Not Found ');
    }
    const [salt, storedHash] = users.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash === hash.toString('hex')) {
      return users;
    } else {
      throw new BadRequestException('Bad password');
    }
  }
}

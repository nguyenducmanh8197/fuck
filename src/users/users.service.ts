import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string, admin: boolean) {
    const user = this.repo.create({ email, password, admin });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    return this.repo.findOneBy({
      id,
    });
  }
  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User Not Found');
    }
    Object.assign(id, attrs);
    this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User Not Found');
    }
    return this.repo.remove(user);
  }
}

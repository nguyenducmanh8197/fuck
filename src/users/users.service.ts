import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(email: string, password: string, admin: boolean) {
    const user = await this.repo.create({ email, password, admin });
    return this.repo.save(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async find(email: string) {
    const user = await this.repo.findBy({ email });
    return user;
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(id, attrs);
    this.repo.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return this.repo.remove(user);
  }
}

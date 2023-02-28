import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Insert ' + this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Update' + this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Remove ' + this.id);
  }
}

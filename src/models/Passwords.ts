import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Passwords {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  website!: string;

  @Column()
  password!: string;

  @Column()
  iv!: string;
}

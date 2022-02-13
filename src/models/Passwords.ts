import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Passwords {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  password!: string;

  @Column()
  website!: string;

  @Column()
  iv!: string;
}

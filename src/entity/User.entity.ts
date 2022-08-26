import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column('simple-array')
  firebaseTokens: string[];

  @Column({ type: 'jsonb', nullable: true })
  profile: profile[];
}

export interface profile {
  token: string;
  isActive: boolean;
}
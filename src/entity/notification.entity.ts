import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  body: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  header: string;

  @Column({ type: 'simple-array', nullable: true })
  isRead: number[];
}

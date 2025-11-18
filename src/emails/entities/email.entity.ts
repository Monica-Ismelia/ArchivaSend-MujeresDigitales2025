export class Emails {}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { File } from '../../files/entities/file.entity';

@Entity({ name: 'emails' })
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column({ nullable: true })
  fileId: string;

  @ManyToOne(() => File, { onDelete: 'SET NULL' })
  file: File;

  @ManyToOne(() => User)
  sender: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
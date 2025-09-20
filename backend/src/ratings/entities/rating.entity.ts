import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Store } from '../../stores/entities/store.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  score: number; // e.g., 1–5 stars

  @Column({ length: 400, nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relation → A rating belongs to a store
  @ManyToOne(() => Store, (store) => store.ratings, { onDelete: 'CASCADE' })
  store: Store;

  // Relation → A rating is given by a user
  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: User;
}

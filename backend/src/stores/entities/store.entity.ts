import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 400 })
  address: string;

  // average rating of the store (optional, can be computed)
  @Column({ type: 'float', default: 0 })
  averageRating: number;

  // Relation → A store belongs to a user (store owner)
  @ManyToOne(() => User, (user) => user.stores, { onDelete: 'CASCADE' })
  owner: User;

  // Relation → A store can have many ratings
  @OneToMany(() => Rating, (rating) => rating.store)
  ratings: Rating[];
}

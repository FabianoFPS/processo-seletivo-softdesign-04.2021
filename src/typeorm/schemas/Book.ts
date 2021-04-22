import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  creator: string;

  @Column()
  publisher: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

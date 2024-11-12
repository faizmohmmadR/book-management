// src/books/entities/book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;  // ID as a number

  @Column()
  title: string;

  @Column()
  author: string;


  @Column({ nullable: true })
  publishedDate?: string;  // or `Date`, depending on your DB field type
}

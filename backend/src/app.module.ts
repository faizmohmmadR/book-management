// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // MySQL host
      port: 3306,
      username: 'nest_user',  // Your MySQL username
      password: 'nest_user',   // Your MySQL password
      database: 'book_management',  // Your database name
      entities: [Book],  // Add your Book entity here
      synchronize: true,  // Synchronize schema (do not use in production)
    }),
    BooksModule,
  ],
})
export class AppModule {}

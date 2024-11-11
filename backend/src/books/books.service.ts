import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './create-book-dto';
import { UpdateBookDto } from './update-book-dto';

@Injectable()
export class BooksService {
  books = [];
  findAll(role?: 'TEST') {
    if (role) {
      return this.books.filter((book) => book.role === role);
    }

    return this.books;
  }

  findOne(id: number) {
    const user = this.books.find((book) => book.id === id);
    return user;
  }

  create(createBookDto: CreateBookDto) {
    this.books.push(createBookDto);

    return createBookDto;
  }

  update(
    id: number,
    updateBookDto: UpdateBookDto,
  ) {
    const book = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, updateBookDto };
      }
    });
    return updateBookDto;
  }
  

  delete(id: number) {
    const removedBook = this.findOne(id);

    this.books = this.books.filter((book) => book.id !== id);

    return removedBook;
  }
}

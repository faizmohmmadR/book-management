import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // Validate ID format (number)
  private validateId(id: number): void {
    if (isNaN(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    this.validateId(id); // Ensure the ID is valid
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Ensure createBookDto does not include a string id if you are using number type IDs
    const book = this.booksRepository.create(createBookDto); // Create book without id
    return this.booksRepository.save(book); // Save the book, and id will be auto-generated
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    this.validateId(id); // Ensure the ID is valid
    const book = await this.findOne(id); // Ensure book exists
    Object.assign(book, updateBookDto); // Update fields
    return this.booksRepository.save(book);
  }
  

  async remove(id: number): Promise<void> {
    this.validateId(id); // Ensure the ID is valid
    const result = await this.booksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}

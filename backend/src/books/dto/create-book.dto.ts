// src/books/dto/create-book.dto.ts
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;


  @IsOptional()  // Published date is optional
  @IsDateString()
  publishedDate?: string;  // or `Date`, depending on your DB field type
}

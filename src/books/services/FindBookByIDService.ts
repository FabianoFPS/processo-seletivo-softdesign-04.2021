import { IBooksRepository } from '../../repositories/IBooksRepository';
import { Book } from '../../typeorm/schemas/Book';

export class FindBooksByIdService {
  constructor(private bookRepository: IBooksRepository) { }

  public async execute(id: string): Promise<Book | void> {
    return this.bookRepository.findById(id);
  }
}

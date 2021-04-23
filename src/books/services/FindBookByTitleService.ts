import { IFindBookByTitleDTO } from '../../dtos/IFindBookByTitle.DTO';
import { IBooksRepository } from '../../repositories/IBooksRepository';
import { Book } from '../../typeorm/schemas/Book';

export class FindBooksByTitleService {
  constructor(private bookRepository: IBooksRepository) { }

  public async execute({ title, skip, take }: IFindBookByTitleDTO): Promise<Book[]> {
    return this.bookRepository.findByTitle({ title, skip, take });
  }
}

import { APIProvider } from '../api/APIProvider';
import { Book } from '../models/Book';

const BooksAPI : string = '/books';

class BookService {
    getAllBooks() {
        return APIProvider.get(BooksAPI);
    }

    createBook(book: Book) {
        return APIProvider.post(BooksAPI, book);
    }

    getBookById(bookId: number) {
        return APIProvider.get(BooksAPI +`/${bookId}`);
    }

    updateBook(bookId: number, book: Book) {
        return APIProvider.put(BooksAPI + `/${bookId}`, book);
    }

    deleteBook(bookId: number | undefined) {
        return APIProvider.delete(BooksAPI + `/${bookId}`);
    }

    searchBooksByTitle(bookTitle: string): Promise<Book[]> {
        return APIProvider.get(BooksAPI + `/search/${bookTitle}`)
            .then(response => response.data)
            .catch(error => {
                throw new Error(`Error searching books by name: ${error}`);
            });
    }
}

const bookService = new BookService();
export default bookService;

import React, { useEffect, useState } from 'react'
import bookService from '../services/BookServices';
import BookList from '../components/BookComponents/BookList';
import { Link } from 'react-router-dom';
import { Book } from '../models/Book';
import SearchComponent from '../components/searchComponent';

const BookPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTitle, setSearchTitle] = useState('');

    const handleDelete = (bookId: number|undefined) => {
        if(confirm("are you sure you want to delete this book ")){
          bookService.deleteBook(bookId)
          .then(() => {
            setBooks(books.filter((book) => book.id !== bookId));
              console.log('User deleted:', bookId);
          })
          .catch((error) => console.error('Error deleting book:', error));
        }  
        
      };

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(event.target.value);
    };
  
    const handleSearch = (query: string) => {
        bookService.searchBooksByTitle(query)
            .then((searchBooks) => {
                setBooks(searchBooks);
                console.log('Search results:', searchBooks);
            })
            .catch((error) => console.error('Error searching books:', error));
    };
  

    useEffect(() => {
        bookService.getAllBooks()
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);


  return (
    <div className='Content'>
          <h2>User List</h2>
          <div className="search-and-link">
              <SearchComponent
                  onSearch={handleSearch}
                  searchName={searchTitle}
                  handleChange={handleChange}
              />

              <Link to={'/book/add'} className="btn btn-primary" id='addUserButton'>
                          Add book
              </Link>
          </div>
    <BookList books={books} onDelete={handleDelete}/>
  </div>
  )
}

export default BookPage
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book } from '../../models/Book';
import bookService from '../../services/BookServices';


const BookDetails: React.FC = () => {
    const { id } = useParams();
    const bookId = id ? parseInt(id, 10) : 0;
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        bookService.getBookById(bookId)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book:', error);
            });

       
    }, [bookId]);

    return (
       <div>
             
                <div className="card">
                    <div className="card-header">
                        Book Infos
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{book?.title}</h5>
                        <p className="card-text">Price : {book?.price} DH</p>
                        <p className="card-text">Genre : {book?.genre}</p>
                        <p className="card-text">{book?.resume}</p>
                        <Link to={`/book/update/${book?.id}`} className="btn btn-primary">
                        Update
                    </Link>                    </div>
                </div>
           
        </div>
    );
};

export default BookDetails;

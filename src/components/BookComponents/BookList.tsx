import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Book } from '../../models/Book';

type Props = {
    books: Book[] | undefined;
    onDelete: (userId: number | undefined) => void;
};

const BookList: React.FC<Props> = ({ books = [], onDelete }) => {
    
    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">genre</th>
                        <th scope="col">price</th>
                        <th scope="col">details</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <th scope="row">{book.id}</th>
                            <td>{book.title}</td>
                            <td>{book.genre} </td>
                            <td>{book.price} DH</td>

                            <td>
                                <Link to={`/book/detail/${book.id}`} className="btn btn-light">
                                    Detail
                                </Link>
                            </td>

                            <td>
                                <Link to={`/book/update/${book.id}`} className="btn btn-success">
                                    Update
                                </Link>
                            </td>
                            <td>
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(book.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;

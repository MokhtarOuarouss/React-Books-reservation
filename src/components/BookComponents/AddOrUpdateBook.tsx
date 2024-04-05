import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bookService from '../../services/BookServices';
import userService from '../../services/UserServices';
import { Book } from '../../models/Book';
import { User } from '../../models/User';
import { validateBookForm } from '../../utils/helpers';

const BookForm = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [resume, setResume] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [ownerId, setOwnerId] = useState<number>();
    const [owner, setOwner] = useState<User|undefined>();

    const navigate = useNavigate();
    const { id } = useParams();
    const bookId = id ? parseInt(id, 10) : 0;

    useEffect(() => {
        if (id) {
            bookService.getBookById(bookId)
                .then(response => {
                    const { title, genre, resume, price, owner } = response.data;
                    setTitle(title);
                    setGenre(genre);
                    setResume(resume);
                    setPrice(price);
                    setOwner(owner);
                    if (owner && owner.id) {
                        setOwnerId(owner.id);
                    }
                })
                .catch(error => console.error('Error fetching Book:', error));
        }
    
        userService.getAllUsers()
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, [id, bookId]);
    
    useEffect(() => {
        if (ownerId) {
            userService.getUserById(ownerId)
                .then(response => setOwner(response.data))
                .catch(error => console.error('Error fetching owner:', error));
        }
    }, [ownerId]);
    


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const book: Book = {
            title, genre, resume, price, owner 
        };
        console.log(book);
        
        const validationErrors = validateBookForm(book);
        if (validationErrors.length === 0) {
            try {
                if (bookId) {
                    await bookService.updateBook(bookId, book);
                    console.log('Book Updated:', book);
                } else {
                    await bookService.createBook(book);
                    console.log('Book created:', book);
                }

                navigate('/book');
            } catch (error) {
                console.error('Error creating/updating book:', error);
            }
        } else {
            console.log('Validation errors:', validationErrors);
        }
    };

    const formTitle = id ? "Update Book" : "Add Book";

    return (
        <div className="form-container">
            <h1>{formTitle}</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" placeholder="Enter Title" />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control" id="genre" placeholder="Enter Genre" />
                </div>

                <div className="form-group">
                    <label htmlFor="resume">Resume</label>
                    <textarea value={resume} onChange={(e) => setResume(e.target.value)} className="form-control" id="resume" placeholder="Enter Resume" />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="form-control" id="price" placeholder="Enter Price" />
                </div>

                <div className="form-group">
                    <label htmlFor="owner">Owner</label>
                    <select value={ownerId} onChange={(e) => setOwner(e.target.value as User)} className="form-select" id="owner">
    <option value="">Select an owner</option>
    {users.map(user => (
        <option key={user.id} value={user.id}>{user.userName}</option>
    ))}
</select>



                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default BookForm;

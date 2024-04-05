import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../models/User';
import userService from '../../services/UserServices';
import { Book } from '../../models/Book';

const UserDetails: React.FC = () => {
    const { id } = useParams();
    const userId = id ? parseInt(id, 10) : 0;
    const [user, setUser] = useState<User | null>(null);
    const [ownedBooks, setOwnedBooks] = useState<Book[]>([]);

    useEffect(() => {
        userService.getUserById(userId)
            .then(response => {
                setUser(response.data);
                userService.getBooksByUser(userId)
                    .then(booksResponse => {
                        setOwnedBooks(booksResponse.data);
                    })
                    .catch(error => {
                        console.error('Error fetching owned books:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, [userId]);

    return (
        <div>
            <h1>User Details</h1>
            {user && (
                <div>
                    <p><strong> Username: </strong> {user.userName}</p>
                    <p><strong> Email: </strong> {user.email}</p>
                    <h2>Owned Books</h2>
                    {ownedBooks.map(book => (
                        <div key={book.id}>
                          <div className="card">
                    
                            <div className="card-body">
                                <h3 className="card-title">Title : {book?.title}</h3>
                                <p className="card-text">Price : {book?.price} DH</p>
                                <p className="card-text">Genre : {book?.genre}</p>
                                <p className="card-text"><Ri:d></Ri:d>esume : {book?.resume}</p>
                            </div>
                           </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDetails;

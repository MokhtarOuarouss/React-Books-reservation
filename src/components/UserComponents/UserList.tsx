import React from 'react';
import { Button } from 'react-bootstrap';
import { User } from '../../models/User';
import { Link } from 'react-router-dom';

type Props = {
    users: User[] | undefined;
    onDelete: (userId: number | undefined) => void;
};

const UserList: React.FC<Props> = ({ users = [], onDelete }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">email</th>
                        <th scope="col">Details</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/user/detail/${user.id}`} className="btn btn-light">
                                    Detail
                                </Link>
                            </td>
                            <td>
                                <Link to={`/user/update/${user.id}`} className="btn btn-success">
                                    Update
                                </Link>
                            </td>
                            <td>
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(user.id)}
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

export default UserList;

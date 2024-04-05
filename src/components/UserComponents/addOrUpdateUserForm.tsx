import React, { useEffect, useState } from 'react'
import { User } from '../../models/User';
import { useNavigate, useParams } from 'react-router-dom';
import { validateUserForm } from '../../utils/helpers';
import userService from '../../services/UserServices';

const UserForm = () => {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();
    const {id} = useParams();
    const userId = id ? parseInt(id, 10) : 0; 


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const user: User = {
            userName,
            email
        };
        const validationErrors = validateUserForm(user);
        if (validationErrors.length === 0) {
            try {
                if(userId){
                    await userService.updateUser(userId, user);
                    console.log('User Updated:', user);
                }
                else {
                    await userService.createUser(user);
                    console.log('User created:', user);
                }
                
                navigate('/');
            } catch (error) {
                console.error('Error  user:', error);
            }
        } else {
            console.log('Validation errors:', validationErrors);
        }
    };

    useEffect(() => {
        if (id) {
            userService.getUserById(userId)
                .then(response => {
                    const { userName, email } = response.data;
                    setUserName(userName);
                    setEmail(email);
                })
                .catch(error => console.error('Error fetching user:', error));
        }
    }, [id]);

    const title = () => {

        if(id){
            return "Update User"
        }else{
            return "Add User"
        }
    }

    return (
        <div className="form-container">
        <h1>{title()}</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userName">Name</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="userName" placeholder="Enter Name" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email" />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    );
};

export default UserForm;

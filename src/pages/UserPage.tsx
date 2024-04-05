import React, { useEffect, useState } from 'react'
import userService from '../services/UserServices';
import { User } from '../models/User';
import SearchComponent from '../components/searchComponent';
import { Link } from 'react-router-dom';
import UserList from '../components/UserComponents/UserList';

export const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchName, setSearchName] = useState('');


    const handleDelete = (userId: number|undefined) => {
      if(confirm("are you sure you want to delete this user ")){
        userService.deleteUser(userId)
        .then(() => {
            setUsers(users.filter((user) => user.id !== userId));
            console.log('User deleted:', userId);
        })
        .catch((error) => console.error('Error deleting user:', error));
      }  
      
    };

    useEffect(() => {
        userService.getAllUsers()
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchName(event.target.value);
  };

  const handleSearch = (query: string) => {
      userService.searchUsersByName(query)
          .then((searchUsers) => {
              setUsers(searchUsers);
              console.log('Search results:', searchUsers);
          })
          .catch((error) => console.error('Error searching users:', error));
  };

  return (
      <div className='Content'>
          <h2>User List</h2>
          <div className="search-and-link">
              <SearchComponent
                  onSearch={handleSearch}
                  searchName={searchName}
                  handleChange={handleChange}
              />

              <Link to={'/add'} className="btn btn-primary" id='addUserButton'>
                          Add User
              </Link>
          </div>
    <UserList users={users} onDelete={handleDelete}/>
  </div>
  )
}

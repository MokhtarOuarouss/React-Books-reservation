import { APIProvider } from '../api/APIProvider';
import { User } from '../models/User';

const UsersAPI : string = '/users';

class UserService {
    getAllUsers() {
        return APIProvider.get(UsersAPI);
    }

    createUser(user: User) {
        return APIProvider.post(UsersAPI, user);
    }

    getUserById(userId: number) {
        return APIProvider.get(UsersAPI +`/${userId}`);
    }

    getBooksByUser(userId:number){
        return APIProvider.get(UsersAPI +'/OwnedBooks'+`/${userId}`);
    }

    updateUser(userId: number, user: User) {
        return APIProvider.put(UsersAPI + `/${userId}`, user);
    }

    deleteUser(userId: number | undefined) {
        return APIProvider.delete(UsersAPI + `/${userId}`);
    }

    searchUsersByName(userName: string): Promise<User[]> {
        return APIProvider.get(UsersAPI + `/search/${userName}`)
            .then(response => response.data)
            .catch(error => {
                throw new Error(`Error searching users by name: ${error}`);
            });
    }
}

const userService = new UserService();
export default userService;

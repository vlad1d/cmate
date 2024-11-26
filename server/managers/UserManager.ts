import { User } from '../models/User';

export class UserManager {
    private users: User[] = [];
    private id: number = 0;

    getUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    createUser(name: string, password: string): User {
        const user = new User(this.id++, name, password);
        this.users.push(user);
        return user;
    }

    deleteUser(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
    }

    changeUserName(id: number, new_name: string): User {
        const user = this.getUserById(id);
        user.name = new_name;
        return user;
    }
}
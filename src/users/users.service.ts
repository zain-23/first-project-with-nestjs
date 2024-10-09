import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Zain Ali',
      email: 'info@zaynali.dev',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Hasin Mehood',
      email: 'Hasin@april.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((u) => u.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((u) => {
      if (u.id === id) {
        return { ...u, ...updatedUser };
      }
      return u;
    });
    return this.findOne(id);
  }

  deleteUser(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== user.id);
    return user;
  }
}

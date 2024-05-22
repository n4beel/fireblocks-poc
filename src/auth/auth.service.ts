import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import * as fs from 'fs-extra'; // Import fs-extra

const USER_FILE_PATH = './users.json'; // Define a path for the JSON file

@Injectable()
export class AuthService {
  private users: User[] = [];

  async onModuleInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      const data = await fs.readFile(USER_FILE_PATH, 'utf-8');
      this.users = JSON.parse(data);
    } catch (error) {
      this.users = [];
      await fs.writeFile(USER_FILE_PATH, JSON.stringify(this.users)); // Create file if it doesn't exist
    }
  }

  async insertUser(email: string, password: string) {
    const userId = Math.random().toString();
    const newUser = new User(userId, email, password, "");
    this.users.push(newUser);
    await this.saveUsers(); // Save users to file
    return userId;
  }

  getUserByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  async saveUsers() {
    await fs.writeFile(USER_FILE_PATH, JSON.stringify(this.users, null, 2)); // Save users to the JSON file with pretty print
  }

  validateUser(email: string, password: string): User | undefined {
    const user = this.getUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return undefined;
  }

  async setUserAddress(userId: string, address: string) {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      user.address = address;
      await this.saveUsers();
    }
  }

  getUserAddress(userId: string): { address: string } | undefined {
    const user = this.users.find(user => user.id === userId);
    return { address: user?.address };
  }
}

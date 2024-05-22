export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string, // Note: In a real application, passwords should be hashed
    public address: string, // Note: In a real application, passwords should be hashed
  ) { }
}
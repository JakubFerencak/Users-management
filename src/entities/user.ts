export class User {
  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password = ''
  ){}

  toString(): string {
    return "name: " + this.name + ", email:" + this.email;
  }
}
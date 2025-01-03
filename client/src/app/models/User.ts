export class User {
  private id: number;
  private username: string;
  private email: string;
  private password: string;
  private role: string;
  private created_at: string;
  private updated_at: string;
  private date_of_birth: string;

  constructor(data: User) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.date_of_birth = data.date_of_birth;
  }

  getId(): number {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): string {
    return this.role;
  }

  getCreatedAt(): string {
    return this.created_at;
  }

  getUpdatedAt(): string {
    return this.updated_at;
  }

  getDateOfBirth(): string {
    return this.date_of_birth;
  }
}

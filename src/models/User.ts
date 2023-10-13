export class User {
  #password: string | null = null;

  constructor(
    public email: string,
    public name: string = '',
    public birthYear: number | null = null,
    public gender: Gender | null = null,
    public photoURL: string | null = '',
  ) {}

  set definePrivatePassword(password: string) {
    this.#password = password;
  }

  get getPrivatePassword() {
    return this.#password;
  }
}

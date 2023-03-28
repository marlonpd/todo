declare interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

declare interface User {
  id: string | undefined;
  email: string;
  name: string;
  token: string | undefined;
}

declare interface LoginCredential {
  email: string;
  password: string;
}

declare interface RegisterCredential {
  email: string;
  name: string;
  password: string;
  password2: string;
}

export interface USER_ROLE {
  role: "user" | "admin";
}

export interface USER_DATA extends USER_ROLE {
  id: number | string;
  name: string;
  email: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

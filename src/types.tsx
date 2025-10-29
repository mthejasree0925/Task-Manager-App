export enum Role {
  MEMBER = 'ROLE_MEMBER',
  ADMIN = 'ROLE_ADMIN',
}

export type User = {
  id: string;
  name: string;
  role: Role;
  token?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

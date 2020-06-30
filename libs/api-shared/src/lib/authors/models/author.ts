export interface AuthorInterace {
  id?: number;
  nickname: string;
  password: string;
  role: Role;
}

export enum Role {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

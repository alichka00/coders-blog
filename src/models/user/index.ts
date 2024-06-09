import { I_User } from 'services/users/models/responses'

export type T_UserForm = {
  username: string
  avatar: string
  email: string
  from: string
}

export enum E_UserFrom {
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
}

export type T_UserRecord = I_User & {
  key: number
}
